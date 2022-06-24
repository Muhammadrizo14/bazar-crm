import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ModuleRef} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {AuthDto} from "./dto/authDto";
import organizationNotFoundException from "../util/exeptions/organizationNotFoundException";

@Injectable()
export class AuthService {
    private userService: UserService;

    constructor(private moduleRef: ModuleRef, private jwtService: JwtService) {
        this.userService = this.moduleRef.get(UserService, {strict: false})
    }

    async validateUser({username, password}: AuthDto, organization_id: number) {
        const user = await this.userService.findOneByEmail({username, password})
        if (user && user.organization_id !== organization_id) {
            throw organizationNotFoundException
        }
        if (!user || user.password !== password) {
            return false
        }
        delete user.password
        return user
    }

    async sign(authDto: AuthDto, organization_id: number) {
        const user = await this.validateUser(authDto, organization_id).then((data) => {
            return data
        })
        if (user) {
            return {
                token: this.jwtService.sign(user)
            }
        }
        throw new UnauthorizedException()
    }
}

import {Body, Controller, Get, Post, Response, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {Me} from "./guards/me.guard";
import {AuthDto} from "./dto/authDto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {validateOrganization} from "../util";

@ApiBearerAuth()
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    async login(@Body() authDto: AuthDto, @Response() res, @Request() req) {
        const organization = await validateOrganization(req)
        return res.status(200).send(await this.authService.sign(authDto, organization.id))
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@Me() me) {
        return me
    }
}

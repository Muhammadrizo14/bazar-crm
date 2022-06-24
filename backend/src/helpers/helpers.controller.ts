import {Controller, Get, Request} from "@nestjs/common";
import {getTraslates, validateOrganization} from "../util"

@Controller('helpers')
export class HelpersController {
    constructor() {}
    @Get('get-translates')
    async getTranslates(@Request() req) {
        const organization = await validateOrganization(req)
        return getTraslates()
    }
}
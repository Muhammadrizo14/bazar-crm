import { PartialType } from '@nestjs/swagger';
import { CreateUserBalanceDto } from './create-user_balance.dto';

export class UpdateUserBalanceDto extends PartialType(CreateUserBalanceDto) {}

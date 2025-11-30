import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto.js';

export class UpdateCartDto extends PartialType(CreateCartDto) {}

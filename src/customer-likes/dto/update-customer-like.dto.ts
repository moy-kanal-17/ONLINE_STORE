import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerLikeDto } from './create-customer-like.dto';

export class UpdateCustomerLikeDto extends PartialType(CreateCustomerLikeDto) {}

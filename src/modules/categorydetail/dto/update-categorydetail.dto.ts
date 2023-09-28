import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorydetailDto } from './create-categorydetail.dto';

export class UpdateCategorydetailDto extends PartialType(CreateCategorydetailDto) {}

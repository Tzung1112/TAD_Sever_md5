import { PartialType } from '@nestjs/mapped-types';
import { CreateProductpictureDto } from './create-productpicture.dto';

export class UpdateProductpictureDto extends PartialType(CreateProductpictureDto) {}

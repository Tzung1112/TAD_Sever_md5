import { Allow } from "class-validator";
import { Category } from "src/modules/categories/entities/category.entity";

export class CreateCategorydetailDto {
    @Allow()
    name: string;
}

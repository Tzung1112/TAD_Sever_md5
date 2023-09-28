import { Allow } from "class-validator";

export class CreateCategoryDto {
    @Allow()// phai truyen khong truyen bi do
    name:string
}

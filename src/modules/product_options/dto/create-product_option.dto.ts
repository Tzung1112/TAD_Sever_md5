import { Allow } from "class-validator";

export class CreateProductOptionDto {
    @Allow()
    name:string;
    @Allow()
    productId:number;
}

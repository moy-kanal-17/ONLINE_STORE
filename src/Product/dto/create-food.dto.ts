// src/Product/dto/create-food.dto.tsimport { IsString, IsNumber, IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFoodDto {
  @ApiProperty({ example: "Pizza", description: "Product name" })
  @IsString()
  name: string;

  @ApiProperty({ example: "pizza.jpg", description: "Product image filename" })
  @IsString()
  image: string;

  @ApiProperty({ example: 10.99, description: "Product price" })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 4.5, description: "Product rating", required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    example: "Delicious pizza",
    description: "Product description",
    required: false,
  })
  @IsOptional()
  @IsString()
  describtion?: string;

  @ApiProperty({ example: 1, description: "Seller ID" })
  @IsInt()
  seller_id: number;

  @ApiProperty({
    example: 10,
    description: "Discount in percent",
    required: false,
  })
  @IsOptional()
  @IsInt()
  skids?: number;

  @ApiProperty({
    example: "30 min",
    description: "Delivery time",
    required: false,
  })
  @IsOptional()
  @IsString()
  delivery_time?: string;
}

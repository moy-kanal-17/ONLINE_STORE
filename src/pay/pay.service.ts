import { InjectModel } from "@nestjs/sequelize";import { Pay } from "./entities/pay.entity";import { CreatePayDto } from "./dto/create-pay.dto";import { UpdatePayDto } from "./dto/update-pay.dto";import { Injectable, Req, Res } from "@nestjs/common";import { Buy } from "src/buy/entities/buy.entity";import { BuyService } from "src/buy/buy.service";import { randomUUID } from "crypto";import { Request, Response } from "express";import * as jwt from "jsonwebtoken"; import { FoodService } from "src/Product/food.service";import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/Product/entities/food.entity";
@Injectable()export class PayService {  constructor(
    @InjectModel(Pay)
    private payModel: typeof Pay,
    private readonly buyModel: BuyService,
    private readonly productModel: FoodService
  ) {}

  async create(createPayDto: CreatePayDto, res: Response, req: Request) {
    createPayDto.terminal = randomUUID();
    const productId = createPayDto.product_id;

    const product = await this.productModel.findone(productId);

    const productPrice = product!.price;

    if (!productPrice ) {
      throw new Error("Product ID is required in CreatePayDto");
    }


    createPayDto.price = productPrice;
    await this.payModel.create(createPayDto as any);

    const pay = await this.payModel.findOne({
      where: { terminal: createPayDto.terminal },
    });

    if (!pay) {
      throw new Error("Payment not found");
    }

    const accessToken = req.cookies["access_token"];
    console.log("Customer token from cookie:", accessToken);

    if (!accessToken) {
      throw new Error("Access token not found in cookie");
    }

    try {
      const decodedToken: any = jwt.decode(accessToken);
      const customerId = decodedToken?.sub;
      console.log("Customer ID from token:", customerId);

      if (!customerId) {
        throw new Error("Customer ID not found in token");
      }



      const product = await this.productModel.findone(productId);

      const productPrice = product?.price;

      const buyData = {
        customer_id: customerId,
        product_id: productId,
        price: productPrice,
        pay_id: pay.id,
      };

      const buy = await this.buyModel.create(buyData);

      if (!buy) {
        throw new Error("Buy not created");
      }
    } catch (error) {
      console.error("Tokenni dekodlashda xatolik:", error);
      throw new Error("Tokenni dekodlashda xatolik");
    }
  }

  async findAll(): Promise<Pay[]> {
     return this.payModel.findAll({
       include: [
         {
           model: Customer,
           attributes: ["id", "first_name", "last_name", "email"],
         },
         {
           model: Product,
           attributes: ["id", "name", "price"], 
         }
     ]})}

  async findOne(id: number): Promise<Pay | null> {
    return this.payModel.findByPk(id);
  }

  async update(id: number, updatePayDto: UpdatePayDto): Promise<Pay | null> {
    await this.payModel.update(updatePayDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.payModel.destroy({ where: { id } });
  }
}


import { CustomerLike } from "./entities/customer-like.entity";
import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCustomerLikeDto } from "./dto/create-customer-like.dto";

@Injectable()
export class CustomerLikeService {
  constructor(
    @InjectModel(CustomerLike)
    private customerLikeRepository:typeof  CustomerLike
  ) {}

  async create(customerLike: CreateCustomerLikeDto) {
    return this.customerLikeRepository.create(customerLike as any);
  }

  async findAll(): Promise<CustomerLike[]> {
    return this.customerLikeRepository.findAll();
  }

  async findOne(id:number): Promise<CustomerLike|null> {
    return this.customerLikeRepository.findOne({
      where: { id }
  });
  }

  async remove(id: number): Promise<void> {
    const customerLike = await this.findOne(id);
    if (customerLike) {
      await customerLike.destroy();
    }
  }
}

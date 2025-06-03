import { CustomerLikeService } from "./customer-likes.service";
import { CustomerLike } from "./entities/customer-like.entity";
import { CreateCustomerLikeDto } from "./dto/create-customer-like.dto";
export declare class CustomerLikeController {
    private readonly customerLikeService;
    constructor(customerLikeService: CustomerLikeService);
    create(customerLike: CreateCustomerLikeDto): Promise<CustomerLike>;
    findAll(): Promise<CustomerLike[]>;
    findOne(id: string): Promise<CustomerLike | null>;
    remove(id: string): Promise<void>;
}

import { CustomerLike } from "./entities/customer-like.entity";
import { CreateCustomerLikeDto } from "./dto/create-customer-like.dto";
export declare class CustomerLikeService {
    private customerLikeRepository;
    constructor(customerLikeRepository: typeof CustomerLike);
    create(customerLike: CreateCustomerLikeDto): Promise<CustomerLike>;
    findAll(): Promise<CustomerLike[]>;
    findOne(id: number): Promise<CustomerLike | null>;
    remove(id: number): Promise<void>;
}

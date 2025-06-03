import {  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";
import { Customer } from "../../customer/entities/customer.entity";

@Table({
  tableName: "customer_likes",
  timestamps: true,
})
export class CustomerLike extends Model<CustomerLike> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number; 

  @Column(DataType.INTEGER)
  product_id: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customer_id: number;

  @BelongsTo(() => Customer, { onDelete: "CASCADE" })
  customer: Customer;
}

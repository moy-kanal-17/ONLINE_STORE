import {  Table,  Column,  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Product } from "../../Product/entities/food.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { Pay } from "../../pay/entities/pay.entity";


@Table({ tableName: "buy" })
export class Buy extends Model<Buy> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Customer)
  @Column
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Pay)
  @Column(DataType.INTEGER)
  pay_id: number;

  @BelongsTo(() => Pay)
  pay: Pay;
}

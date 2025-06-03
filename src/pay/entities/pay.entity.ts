import {  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Customer } from "../../customer/entities/customer.entity";
import { Product } from "../../Product/entities/food.entity";

@Table({ tableName: "pay" })
export class Pay extends Model<Pay> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;


  @ForeignKey(() => Customer)
  @Column({type:DataType.INTEGER,onDelete: 'CASCADE'})
  declare customer_id: number;
  

  @BelongsTo(() => Customer)
  declare customer: Customer;


  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare product_id: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column(DataType.INTEGER)
  declare price: number;

  @Column(DataType.STRING)
  declare terminal: string;

  @Column(DataType.STRING)
  declare type: string;

  @Column(DataType.DATEONLY)
  declare date: Date;
}

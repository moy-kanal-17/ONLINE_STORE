import {  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
  Unique,
  
} from "sequelize-typescript";
import { Buy } from "../../buy/entities/buy.entity";
import { CustomerLike } from "../../customer-likes/entities/customer-like.entity";

@Table({
  tableName: "customer",
  freezeTableName: true,
  timestamps: true,
})
export class Customer extends Model<Customer> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone_number?: string;

  @Unique(true)
  @Column({
    type: DataType.STRING,
    allowNull: false,
   
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM("male", "female", "other"),
    allowNull: true,
  })
  declare gender?: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare birthday?: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare active_link?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare hashed_token?: string;

  @HasMany(() => Buy)
  buys: Buy[];

  @HasMany(() => CustomerLike)
  likes: CustomerLike[];
}

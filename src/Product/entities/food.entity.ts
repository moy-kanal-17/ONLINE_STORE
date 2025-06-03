import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Buy } from "src/buy/entities/buy.entity";
import { Seller } from "src/seller/entities/seller.entity";

interface ProductAttributes {
  id: number;
  name: string;
  image: string;
  price: number;
  rating?: number;
  describtion?: string;
  seller_id: number; // Новое поле
  skids?: number;
  delivery_time?: string;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    "id" | "rating" | "describtion"| "skids" | "delivery_time"
  > {}

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  })
  declare id: number;

  @HasMany(() => Buy)
  buys: Buy[]; // Заменяем TypeORM @OneToMany на Sequelize @HasMany

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "name",
  })
  declare name: string;

  @Column({ type: DataType.STRING(2500), allowNull: true })
  declare describtion?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "image",
  })
  declare image: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    field: "price",
  })
  declare price: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: "rating",
  })
  declare rating?: number;
  // Убираем author, так как это поле не используется в новой модели

  @ForeignKey(() => Seller)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "seller_id",
  })
  declare seller_id: number;

  @BelongsTo(() => Seller)
  seller: Seller; // Связь с моделью Seller

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "skids",
  })
  declare skids?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "delivery_time",
  })
  declare delivery_time?: string;
}

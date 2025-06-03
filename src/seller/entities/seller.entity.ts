import {  Table,  Column,  Model,  PrimaryKey,  AutoIncrement,} from "sequelize-typescript";

@Table({ tableName: "sellers" })
export class Seller extends Model {
  @Column({ allowNull: false ,autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ allowNull: false })
  declare last_name: string;

  @Column({ allowNull: false })
  declare first_name: string;

  @Column({ allowNull: false })
  declare phone_number: string;

  @Column({ allowNull: false, unique: true })
  declare email: string;

  @Column({ defaultValue: true })
  declare is_active: boolean;

  @Column({ allowNull: true })
  declare active_link: string;

  @Column({ allowNull: true })
  declare hashed_token: string;

  @Column({ allowNull: true })
  declare adress: string;

  @Column({ allowNull: false })
  declare password: string;
}

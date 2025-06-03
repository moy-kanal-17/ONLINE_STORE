import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({ tableName: "admins" })
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name?: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare username?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_token: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  active_link?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare iscreator: boolean;
}

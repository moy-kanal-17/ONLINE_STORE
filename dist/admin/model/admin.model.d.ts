import { Model } from 'sequelize-typescript';
export declare class Admin extends Model<Admin> {
    id: number;
    full_name?: string;
    email: string;
    username?: string;
    password: string;
    is_active: boolean;
    hashed_token: string | null;
    active_link?: string;
    iscreator: boolean;
}

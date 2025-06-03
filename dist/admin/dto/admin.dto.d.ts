export declare class CreateAdminDto {
    full_name: string;
    email: string;
    username?: string;
    password: string;
    is_active?: boolean;
    iscreator?: boolean;
}
export declare class UpdateAdminDto {
    full_name?: string;
    email?: string;
    username?: string;
    password?: string;
    is_active?: boolean;
    iscreator?: boolean;
    hashed_token?: string;
    active_link?: string;
}
export declare class FilterAdminDto {
    email?: string;
    is_active?: boolean;
    iscreator?: boolean;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
}

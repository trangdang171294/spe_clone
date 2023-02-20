type Role = 'User' | 'Admin';

export interface User {
    id: string;
    roles: Role[];
    email: string;
    name: string;
    date_of_birth?: null;
    address?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

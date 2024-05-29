
export interface UserProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
}

export interface HttpRes extends UserProfile {
    success: boolean;
    message: string;
    token: string;
}

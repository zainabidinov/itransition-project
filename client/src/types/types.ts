
export interface UserProfile {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface HttpRes extends UserProfile {
    success: boolean;
    message: string;
    token: string;
}

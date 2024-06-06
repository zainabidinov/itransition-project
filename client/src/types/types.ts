
export interface UserProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
    avatarUrl?: string;
}

export interface HttpRes extends UserProfile {
    success: boolean;
    message: string;
    token: string;
}

export interface CollectionProperties {
    id: string;
    title: string;
    category: string;
    imageUrl?: string;
    userId: string;
}

export interface ItemProperties extends CollectionProperties {
    itemTag: string;
    likes?: number;
    comments?: number;
}

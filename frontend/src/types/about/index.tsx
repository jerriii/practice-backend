export interface Value {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface Team {
    name: string;
    role: string;
    image: string;
}

export interface Milestone {
    year: string;
    title: string;
    description: string;
    image: string;
}

export interface WishlistItem {
    id: number;
    name: string;
    price: string;
    image: string;
}

export interface Order {
    id: number;
    date: string;
    status: string;
    total: number;
    items: number;
}


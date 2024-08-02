export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: UserAddress;
    phone?: string;
    website?: string;
    company?: Company;
    editing?: boolean;
}

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoCoords;
}

export interface GeoCoords {
    lat: string;
    long: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
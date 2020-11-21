export type ROLE_ADMIN = 'ADMIN';
export type ROLE_CUSTOMER = 'CUSTOMER';

export type ROLE = ROLE_ADMIN | ROLE_CUSTOMER;

export interface UserAuth {
  name: string;
  surname: string;
  email: string;
  role: ROLE;
}

export interface Admin {
  name: string;
  surname: string;
  email: string;
  hashedPassword?: string;
  role: ROLE_ADMIN;
}
export interface Customer {
  name: string;
  surname: string;
  email: string;
  hashedPassword?: string;
  role: ROLE_CUSTOMER;
  addresses: { [key: string]: Address };
  mainAddress: string;
}

export interface Address {
  street: string;
  number: string;
  complement: string;
  neigh: string;
  state: string;
  zip: string;
  country: string;
}

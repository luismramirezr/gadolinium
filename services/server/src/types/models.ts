export type UserType = 'CUSTOMER' | 'ADMIN';

export interface User {
  name: string;
  surname: string;
  email: string;
  type: UserType;
  password: string;
  adresses: Array<Address>;
}

export interface Address {
  name: string;
  main: boolean;
  street: string;
  complement: string;
  neigh: string;
  state: string;
  zip: string;
  country: string;
}

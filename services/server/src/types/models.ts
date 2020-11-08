export type UserType = 'CUSTOMER' | 'ADMIN';

export interface User {
  name: string;
  surname: string;
  email: string;
  type: UserType;
  password: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  main: boolean;
  street: string;
  complement: string;
  neigh: string;
  state: string;
  zip: string;
  country: string;
}

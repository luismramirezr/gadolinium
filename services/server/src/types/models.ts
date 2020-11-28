export type ROLE_ADMIN = 'ADMIN';
export type ROLE_CUSTOMER = 'CUSTOMER';

export type ROLE = ROLE_ADMIN | ROLE_CUSTOMER;

export interface WithKeys {
  PK: string;
  SK: string;
}

export interface WithGSI {
  GSI1PK: string;
  GSI1SK: string;
}
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
  addresses: { [key: string]: Address | undefined };
  mainAddress: string;
  avatar?: string;
}

export interface Address {
  name: string;
  slug: string;
  street: string;
  number: string;
  complement: string;
  neigh: string;
  state: string;
  zip: string;
  country: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  photo: string;
}

export interface Product {
  category: string;
  slug: string;
  name: string;
  description: string;
  value: number;
  stock: number;
}

export interface Order {
  customerId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalValue: number;
  address: { name: string } & Address;
  products: Array<Product & { quantity: number }>;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: string;
  storageClass: string;
  serverSideEncryption: string;
  metadata: string;
  location: string;
  etag: string;
  public: boolean;
}

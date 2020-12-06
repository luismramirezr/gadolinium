import { PagSeguroTransaction } from 'types/gateway/pagseguro';

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
  cpf: string;
  phone: string;
  dob: string;
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
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
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

export interface Transaction {
  transactionId: string;
  orderId: string;
  transaction: PagSeguroTransaction;
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

export type CreditCardPayment = {
  method: 'creditCard';
  creditCard: {
    token: string;
    holder: {
      name: string;
      documents: { document: { type: 'CPF'; value: string } };
      phone: { areaCode: string; number: string };
      birthDate: string;
    };
    installment: {
      quantity: number;
      value: number;
    };
  };
  billingAddress: {
    street: string;
    complement: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export type BoletoPayment = {
  method: 'boleto';
};

export type PaymentForm = (CreditCardPayment | BoletoPayment) & {
  hash: string;
};

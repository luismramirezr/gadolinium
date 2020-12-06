export interface TransactionStatusDescription {
  1: 'WAITING_PAYMENT';
  2: 'UNDER_ANALISYS';
  3: 'PAID';
  4: 'AVAILABLE';
  5: 'UNDER_REVIEW';
  6: 'RETURNED';
  7: 'CANCELLED';
  8: 'DEBITED';
  9: 'TEMPORARY_RETENTION';
}

export interface PaymentMethodTypeDescription {
  1: 'CREDIT_CARD';
  2: 'BOLETO';
  3: 'TEF';
  4: 'BALANCE';
  5: 'OI_PAGGO';
  6: 'DEPOSIT';
}

export interface PaymentMethodCodeDescription {
  101: 'VISA';
  102: 'MASTERCARD';
  103: 'AMERICAN_EXPRESS';
  104: 'DINERS';
  105: 'HIPERCARD';
  106: 'AURA';
  107: 'ELO';
  108: 'PLENOCARD';
  109: 'PERSONALCARD';
  110: 'JCB';
  111: 'DISCOVER';
  112: 'BRASILCARD';
  113: 'FORTBRASIL';
  114: 'CARDBAN';
  115: 'VALECARD';
  116: 'CABAL';
  117: 'MAIS!';
  118: 'AVISTA';
  119: 'GRANDCARD';
  120: 'SOROCRED';
  122: 'UP_POLICARD';
  123: 'BANESE_CARD';
  201: 'BRADESCO';
  202: 'SANTANDER';
  301: 'BRADESCO';
  302: 'ITAÚ';
  303: 'UNIBANCO';
  304: 'BANCO_DO_BRASIL';
  305: 'BANCO_REAL';
  306: 'BANRISUL';
  307: 'HSBC';
  401: 'BALANCE';
  501: 'OI_PAGGO';
  701: 'BANCO_DO_BRASIL';
}

export interface TransactionShippingTypeDescription {
  1: 'PAC';
  2: 'SEDEX';
  3: 'UNDEFINED';
}

export type TransactionShippingType = keyof TransactionShippingTypeDescription;

export type PaymentMethodType = keyof PaymentMethodTypeDescription;

export type PaymentMethodCode = keyof PaymentMethodCodeDescription;

export type TransactionStatus = keyof TransactionStatusDescription;

export type TransactionGeneric = {
  date: string;
  lastEventDate: string;
  code: string;
  type: number;
  status: TransactionStatus;
  paymentMethod: {
    type: PaymentMethodType;
    code: PaymentMethodCode;
  };
  grossAmount: number;
  discountAmount: number;
  feeAmount: number;
  netAmount: number;
  extraAmount: number;
  itemCount: number;
  transaction: {
    items: Array<{
      item: {
        id: string;
        description: string;
        amount: number;
        quantity: number;
      };
    }>;
  };
  sender: {
    email: string;
    name: string;
    phone: {
      areaCode: number;
      phone: number;
    };
  };
  shipping: {
    type: TransactionShippingType;
    cost: number;
    address: {
      country: 'BRA';
      state: string;
      city: string;
      postalCode: number;
      district: string;
      street: string;
      number: string;
      complement: string;
    };
  };
  reference: string;
};

export type TransactionWithCreditCard = TransactionGeneric & {
  paymentMethod: {
    type: 1;
    code: PaymentMethodCode;
  };
  insallmentCount: number;
};

export type TransactionWithLink = TransactionGeneric & {
  paymentMethod: {
    type: 2 | 3;
    code: PaymentMethodCode;
  };
  paymentLink: string;
};

export type TransactionWithEscrowEndDate = (
  | TransactionGeneric
  | TransactionWithLink
  | TransactionWithCreditCard
) & {
  status: 3 | 4 | 5 | 6;
  escrowDate: string;
};

export type TransactionCancelled = (
  | TransactionGeneric
  | TransactionWithLink
  | TransactionWithCreditCard
  | TransactionWithEscrowEndDate
) & {
  status: 7;
  cancellationSource: 'INTERNAL' | 'EXTERNAL';
};

export type PagSeguroTransaction =
  | TransactionGeneric
  | TransactionWithLink
  | TransactionWithCreditCard
  | TransactionWithEscrowEndDate
  | TransactionCancelled;

export interface Notification {
  notificationCode: string;
  notificationType: string;
}

/**
 * Package Types
 */

export interface ResponseError {
  error: {
    message: string;
    config?: object;
    response?: object;
    error?: object;
  };
}

/**
 * PagSeguro Requests Bodies
 */

export interface Sender {
  hash: string;
  name: string;
  email: string;
  phone: {
    areaCode: string;
    number: string;
  };
  documents: {
    document: {
      type: 'CPF' | 'CNPJ';
      value: string;
    };
  };
}

export interface Item {
  id: string;
  description: string;
  quantity: string;
  amount: string;
}

export interface ShippingAddress {
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: 'BRL';
  postalCode: string;
}

export interface Holder {
  name: string;
  documents: {
    document: {
      type: 'CPF' | 'CNPJ';
      value: string;
    };
  };
  birthDate: string;
  phone: {
    areaCode: string;
    number: string;
  };
}

export interface BillingAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  complement: string;
}

export interface Installment {
  quantity: number;
  value: string;
  noInterestInstallmentQuantity?: number;
}

export interface CreditCard {
  token: string;
  installment: Installment;
  holder: Holder;
  billingAddress: BillingAddress;
}

export interface GenericCheckout {
  reference?: string;
  sender: Sender;
  items: Array<{ item: Item }>;
  shipping: {
    addressRequired: boolean;
    address?: ShippingAddress;
    type?: 1 | 2 | 3;
    cost?: string;
  };
  extraAmount?: string;
  notificationURL?: string;
}

export type GetPaymentPayloadCreditCard = GenericCheckout & {
  method: 'creditCard';
  creditCard: CreditCard;
};

export type GetPaymentPayloadBoleto = GenericCheckout & {
  method: 'boleto';
};

export type GetPaymentPayloadData =
  | GetPaymentPayloadCreditCard
  | GetPaymentPayloadBoleto;

export interface MakePayment {
  data: GetPaymentPayloadData;
  print?: boolean;
  dryRun?: boolean;
}

/**
 * Commom Body
 */

export interface DefaultCheckoutBody {
  payment: {
    mode: 'default';
    currency: 'BRL';
    reference?: string;
    receiver: {
      email: string;
    };
    sender: Sender;
    items: Array<{ item: Item }>;
    shipping: {
      addressRequired: boolean;
      address?: ShippingAddress;
      type?: 1 | 2 | 3;
      cost?: string;
    };
    extraAmount?: string;
    notificationURL?: string;
  };
}

export type BoletoCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'boleto';
  };
};

export type CreditCardCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'creditCard';
    creditCard: CreditCard;
  };
};

export type Checkout = BoletoCheckout | CreditCardCheckout;

/**
 * PagSeguro Responses
 */

export interface CreateSession {
  session: {
    id: string;
  };
}

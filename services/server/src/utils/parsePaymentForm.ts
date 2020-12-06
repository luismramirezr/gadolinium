import { Customer, Order, PaymentForm, Product } from 'types/models';
import { GetPaymentPayloadData, Item } from '~/types/gateway/pagseguro';

export const parseFormData = (
  form: PaymentForm,
  order: Order,
  products: Array<Product & { quantity: number }>,
  customer: Customer
): GetPaymentPayloadData => {
  const items: Array<{ item: Item }> = products.map((product) => {
    return {
      item: {
        id: product.slug,
        description: product.description,
        quantity: String(product.quantity),
        amount: product.value.toFixed(2),
      },
    };
  });
  const paymentData = {
    items,
    sender: {
      hash: form.hash,
      name: `${customer.name} ${customer.surname}`,
      email: customer.email,
      documents: {
        document: {
          type: 'CPF' as 'CPF' | 'CNPJ',
          value: customer.cpf.match(/\d+/g)!.join(''),
        },
      },
      phone: {
        areaCode: customer.phone.substr(1, 2),
        number: customer.phone.substr(4).match(/\d+/g)!.join(''),
      },
    },
    shipping: {
      addressRequired: true,
      address: {
        street: order.address.street,
        number: order.address.number,
        complement: order.address.complement,
        district: order.address.district,
        city: order.address.city,
        state: order.address.state,
        postalCode: order.address.postalCode,
        country: 'BRL' as 'BRL',
      },
    },
  };
  if (form.method === 'creditCard')
    return {
      ...paymentData,
      method: 'creditCard',
      creditCard: {
        token: form.creditCard.token,
        holder: {
          name: form.creditCard.holder.name,
          documents: form.creditCard.holder.documents,
          birthDate: form.creditCard.holder.birthDate,
          phone: form.creditCard.holder.phone,
        },
        installment: {
          quantity: form.creditCard.installment.quantity,
          value: form.creditCard.installment.value.toFixed(2),
        },
        billingAddress: {
          ...form.billingAddress,
          country: 'BRL' as 'BRL',
        },
      },
    };
  return {
    ...paymentData,
    method: 'boleto',
  };
};

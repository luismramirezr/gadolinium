import { TransactionStatusDescription } from 'types/gateway/pagseguro';

const transactionStatus: TransactionStatusDescription = {
  1: 'WAITING_PAYMENT',
  2: 'UNDER_ANALISYS',
  3: 'PAID',
  4: 'AVAILABLE',
  5: 'UNDER_REVIEW',
  6: 'RETURNED',
  7: 'CANCELLED',
  8: 'DEBITED',
  9: 'TEMPORARY_RETENTION',
};

export default transactionStatus;

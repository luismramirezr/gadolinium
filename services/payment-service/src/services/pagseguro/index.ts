import PagSeguro from './pagSeguro';

import {
  NODE_ENV,
  PAGSEGURO_EMAIL,
  PAGSEGURO_TOKEN,
  PAGSEGURO_SANDBOX_EMAIL,
} from 'config/constants';

class PagSeguroSingleton {
  static instance: PagSeguro;
  private constructor() {
    return new PagSeguro({
      email: PAGSEGURO_EMAIL,
      token: PAGSEGURO_TOKEN,
      sandbox: NODE_ENV !== 'production',
      sandboxEmail: PAGSEGURO_SANDBOX_EMAIL,
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new PagSeguroSingleton() as PagSeguro;
    }

    return this.instance;
  }
}

export default PagSeguroSingleton.getInstance();

import parser from 'fast-xml-parser';
import { toXML } from 'jstoxml';
import fetch, { Response, RequestInit } from 'node-fetch';
import { URLSearchParams } from 'url';
import errorCodes, { ErrorMessage } from './errorCodes';

import { Checkout, GetPaymentPayloadData, MakePayment } from './types';

interface Constructor {
  email: string;
  token: string;
  sandbox?: boolean;
  sandboxEmail?: string;
}

class PagSeguro {
  private static credentials: {
    email: string;
    token: string;
  };
  private static isSandbox: boolean;
  private static sandboxEmail: string;
  private static url: string;
  private static api: (
    endpoint: string,
    options: RequestInit,
    withCredentials?: boolean
  ) => Promise<Response>;
  private static qs: URLSearchParams;

  constructor({ email, token, sandbox = false, sandboxEmail }: Constructor) {
    PagSeguro.credentials = { email, token };

    PagSeguro.isSandbox = sandbox;
    if (sandbox && sandboxEmail) PagSeguro.sandboxEmail = sandboxEmail;

    PagSeguro.url = PagSeguro.isSandbox
      ? 'https://ws.sandbox.pagseguro.uol.com.br/v2'
      : 'https://ws.pagseguro.uol.com.br/v2';

    PagSeguro.qs = new URLSearchParams({
      email: PagSeguro.credentials.email,
      token: PagSeguro.credentials.token,
    });

    PagSeguro.api = (
      endpoint: string,
      options: RequestInit,
      withCredentials = true
    ) =>
      fetch(
        `${PagSeguro.url}/${endpoint}${
          withCredentials ? `?${PagSeguro.qs}` : ''
        }`,
        options
      );
  }

  private handleError(e: any) {
    if (!e.response) throw new Error(e);
    const { response } = e;
    const { statusText, headers } = response;
    if (
      headers['content-type'] &&
      headers['content-type'].includes('text/plain')
    )
      return {
        status: false,
        message: statusText,
      };

    const error = parser.parse(e.error);
    const errors = error.errors.error;
    if (!Array.isArray(errors)) {
      const { code, message } = errors as ErrorMessage;
      return {
        status: false,
        message: errorCodes[code],
        error: { code, message },
      };
    }
    return {
      status: false,
      messages: (errors as Array<ErrorMessage>).map(
        ({ code }) => errorCodes[code]
      ),
      errors: errors.map(({ code, message }) => ({ code, message })),
    };
  }

  public getSandboxEmail() {
    return PagSeguro.sandboxEmail;
  }

  private static getPaymentPayload(data: GetPaymentPayloadData): Checkout {
    if (data.method === 'creditCard') {
      return {
        payment: {
          mode: 'default',
          currency: 'BRL',
          receiver: {
            email: PagSeguro.credentials.email,
          },
          ...data,
          sender: {
            ...data.sender,
            email: PagSeguro.isSandbox
              ? PagSeguro.sandboxEmail
              : data.sender.email,
          },
        },
      };
    }
    return {
      payment: {
        mode: 'default',
        currency: 'BRL',
        receiver: {
          email: PagSeguro.credentials.email,
        },
        ...data,
        sender: {
          ...data.sender,
          email: PagSeguro.isSandbox
            ? PagSeguro.sandboxEmail
            : data.sender.email,
        },
      },
    };
  }

  public async makePayment({
    data,
    print = false,
    dryRun = false,
  }: MakePayment): Promise<any> {
    const payload = PagSeguro.getPaymentPayload(data);
    if (print) console.dir(payload, { depth: 5 });
    if (dryRun)
      return new Promise((resolve) =>
        resolve({ status: true, response: payload })
      );
    try {
      const xml = toXML(payload);
      const response = await PagSeguro.api('/transactions', {
        method: 'post',
        body: xml,
        headers: {
          'Content-Type': 'application/xml; charset=ISO-8859-1',
        },
      }).then((response) => response.textConverted());
      return parser.parse(response);
    } catch (e) {
      return this.handleError(e);
    }
  }

  public async getTransactionFromNotification(
    notificationCode: string
  ): Promise<any> {
    try {
      const response = await PagSeguro.api(
        `/transactions/notifications/${notificationCode}`,
        {
          method: 'get',
        },
        false
      ).then((response) => response.text());
      return parser.parse(response);
    } catch (e) {
      const error = parser.parse(e.error);
      const errors = error.errors.error;
      if (!Array.isArray(errors)) {
        const { code, message } = errors as ErrorMessage;
        return {
          status: false,
          message: errorCodes[code],
          error: { code, message },
        };
      }
      return {
        status: false,
        messages: (errors as Array<ErrorMessage>).map(
          ({ code }) => errorCodes[code]
        ),
        errors: errors.map(({ code, message }) => ({ code, message })),
      };
    }
  }

  public async getSession() {
    try {
      const response = await PagSeguro.api('/sessions', {
        method: 'post',
      }).then((response) => response.text());
      return parser.parse(response);
    } catch (e) {
      console.log(e);
      const error = parser.parse(e.error);
      const errors = error.errors.error;
      if (!Array.isArray(errors)) {
        const { code, message } = errors as ErrorMessage;
        return {
          status: false,
          message: errorCodes[code],
          error: { code, message },
        };
      }
      return {
        status: false,
        messages: (errors as Array<ErrorMessage>).map(
          ({ code }) => errorCodes[code]
        ),
        errors: errors.map(({ code, message }) => ({ code, message })),
      };
    }
  }
}

export default PagSeguro;

import { dot } from 'dot-object';

import { ptMessages } from './locales';

const formatMessages = (messages: any): { [key: string]: string } =>
  dot(messages);

const formattedMessages = {
  pt: formatMessages(ptMessages),
};

export default formattedMessages;

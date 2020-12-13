export const parse = (data: string): { [key: string]: string } =>
  data.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    return {
      ...acc,
      [key]: value,
    };
  }, {});

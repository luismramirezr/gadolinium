import JsSHA from 'jssha';

const leftpad = (str: string, len: number, pad: string) => {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join(pad) + str;
  }
  return str;
};

const hex2dec = (s: string) => {
  return parseInt(s, 16);
};

const dec2hex = (s: number) => {
  return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
};

const base32tohex = (base32: string) => {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let hex = '';

  for (let i = 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += leftpad(val.toString(2), 5, '0');
  }

  for (let i = 0; i + 4 <= bits.length; i += 4) {
    const chunk = bits.substr(i, 4);
    hex = hex + parseInt(chunk, 2).toString(16);
  }
  return hex;
};

export const getToken = (key: string, variation = 0) => {
  const options = {
    period: 30,
    digits: 6,
  };
  const base32Key = base32tohex(key);

  const epoch = Math.round(Date.now() / 1000.0 + variation * options.period);

  const time = leftpad(dec2hex(Math.floor(epoch / options.period)), 16, '0');

  const shaObj = new JsSHA('SHA-1', 'HEX');
  shaObj.setHMACKey(base32Key, 'HEX');
  shaObj.update(time);
  const hmac = shaObj.getHMAC('HEX');
  const offset = hex2dec(hmac.substring(hmac.length - 1));
  const opt = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
  return opt.substr(opt.length - options.digits, options.digits);
};

// const verifyToken = (key: string) {

// }

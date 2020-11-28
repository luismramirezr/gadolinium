import { getToken, verifyToken } from 'utils/totp';

describe('totp generation', () => {
  it('should generate token with date now = 1971', () => {
    global.Date.now = () => {
      return 0;
    };
    expect(getToken('JBSWY3DPEHPK3PXP')).toEqual('282760');
  });

  it('should generate token with date now = 2016', () => {
    global.Date.now = () => {
      return 1465324707000;
    };
    expect(getToken('JBSWY3DPEHPK3PXP')).toEqual('341128');
  });

  it('should generate token with a leading zero', () => {
    global.Date.now = () => {
      return 1365324707000;
    };
    expect(getToken('JBSWY3DPEHPK3PXP')).toEqual('089029');
  });

  it('should generate token with date now = 2016', () => {
    global.Date.now = () => {
      return 1465324707000;
    };
    expect(getToken('JBSWY3DPEHPK3PXP')).toEqual('341128');
  });
});

describe('topt verification', () => {
  it('should verify token with same date', () => {
    global.Date.now = () => {
      return 1465324737000;
    };
    expect(verifyToken('JBSWY3DPEHPK3PXP', '370323')).toEqual(true);
  });

  it('should verify token with date within 2 seconds later', () => {
    global.Date.now = () => {
      return 1465324739000;
    };
    expect(verifyToken('JBSWY3DPEHPK3PXP', '370323')).toEqual(true);
  });

  it('should verify token with date within 2 seconds earlier', () => {
    global.Date.now = () => {
      return 1465324735000;
    };
    expect(verifyToken('JBSWY3DPEHPK3PXP', '370323')).toEqual(true);
  });
});

import bcrypt from 'bcryptjs';
import Model from 'database/Model';
import { User as schema } from 'database/schemas';
import { SALT } from 'config/constants';

import { User } from 'types/models';

export default new Model<User>(schema, 'email', 'USER', ['password'], {
  password: (value: string) => bcrypt.hashSync(value, SALT),
});

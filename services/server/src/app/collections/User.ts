import bcrypt from 'bcryptjs';
import Model from 'database/Model';
import { createSchema } from 'database/database';
import { SALT } from 'config/constants';

import { User } from 'types/models';

export const schema = createSchema({
  _id: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: 'USER',
    forceDefault: true,
  },
  data: {
    type: Object,
    schema: {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  },
});

export default new Model<User>(schema, 'email', 'USER', ['password'], {
  password: (value: string) => bcrypt.hashSync(value, SALT),
});

import { createSchema } from 'database/database';

export const User = createSchema({
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

import * as yup from 'yup';
import { useGetMessage } from 'utils/i18n/getMessage';

export interface Form {
  email: string;
  password: string;
  rememberMe: boolean;
}

const createSchema = () => {
  const getMessage = useGetMessage('Form.Errors');
  return yup.object().shape({
    email: yup
      .string()
      .email(getMessage('InvalidEmail'))
      .required(getMessage('Required')),
    password: yup.string().required(getMessage('Required')),
  });
};

export default createSchema;

import { Formik, FormikHelpers, Form, Field, FieldProps } from 'formik';
import { object, string } from 'yup';
import { FC, useState } from 'react';
import Input from '../common/input/Input';
import { Button } from '../common/button/Button';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import Cookies from 'js-cookie';
import 'tailwindcss/tailwind.css';

type FormValues = {
   email: string;
   password: string;
};

const Login: FC = () => {
   const [errorMessage, setErrorMessage] = useState('');
   const router = useRouter();

   const initialValues: FormValues = {
      email: '',
      password: '',
   };

   const validationSchema = object().shape({
      email: string()
         .required('Please enter your email')
         .email('Something is wrong with this email'),
      password: string().required('Please enter your password'),
   });

   const login = async (email, password) => {
      const { data: token } = await api.post('auth/login', { email, password });
      if (token) {
         Cookies.set('token', token, { expires: 3600 });
         api.defaults.headers.Authorization = `Bearer ${token.access_token}`;
      }
   };

   const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      const { password, email } = values;
      try {
         await login(email, password);
         return router.push((router.query.from as string) || '/map');
      } catch (error) {
         let message = 'Sorry, an error occurred';
         if (error.code === 'NotAuthorizedException') {
            message = 'Email or password is incorrect';
         }
         setErrorMessage(message);
      }
      actions.setSubmitting(false);
   };

   return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
         {(props) => {
            const { isSubmitting } = props;

            return (
               <Form>
                  <Field id="email" name="email">
                     {(fieldProps: FieldProps) => (
                        <Input label="Email" type="text" {...fieldProps} />
                     )}
                  </Field>
                  <Field id="password" name="password">
                     {(fieldProps: FieldProps) => (
                        <Input label="Password" type="password" {...fieldProps} />
                     )}
                  </Field>

                  <div className="flex items-center justify-between ">
                     <Button disabled={isSubmitting} isSubmitting={isSubmitting} type="submit">
                        Sign In
                     </Button>
                  </div>
                  {errorMessage && <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>}
               </Form>
            );
         }}
      </Formik>
   );
};

export default Login;

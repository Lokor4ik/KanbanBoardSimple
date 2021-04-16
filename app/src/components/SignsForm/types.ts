import { ReactNode } from 'react';
import { FormikValues } from 'formik';

export type SignsProps = {
  formik: FormikValues;
  title: string;
  children?: ReactNode;
  nameField?: ReactNode;
  haveAnAccount: ReactNode;
};

import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import SignsForm from 'components/SignsForm/SignsForm';
import CustomLink from 'shared/Link/Link';

import { loginUser } from 'store/auth/action';
import { ParamsLoginUser } from 'store/auth/types';

import './SignIn.scss';

const SignInContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleSumbit = ({ email, password }: ParamsLoginUser) => {
    dispatch(loginUser({ enqueueSnackbar, email, password }));
  };

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  return (
    <div className="sign-in__wrapper">
      <SignsForm
        formik={formik}
        title="Sign In"
        haveAnAccount={
          <CustomLink title="Sign up for an account" path="/signup" className="link--purple" />
        }
      />
    </div>
  );
};

export default SignInContainer;

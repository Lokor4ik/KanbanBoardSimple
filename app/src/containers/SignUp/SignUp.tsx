import { useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import TextField from '@material-ui/core/TextField';

import SignsForm from 'components/SignsForm/SignsForm';
import CustomLink from 'shared/Link/Link';
import NameField from 'components/NameField/NameField';

import { registerUser } from 'store/auth/action';
import { ParamsRegisterUser } from 'store/auth/types';

import './SignUp.scss';

const SignUpContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleSumbit = ({ name, email, password }: ParamsRegisterUser) => {
    dispatch(registerUser({ enqueueSnackbar, name, email, password }));
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .when('password', {
        is: (val: Array<string>) => val && val.length > 0,
        then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  return (
    <div className="sign-up__wrapper">
      <SignsForm
        formik={formik}
        title="Sign Up"
        haveAnAccount={
          <CustomLink
            title="Already have an account? Log In"
            path="/signin"
            className="link--purple"
          />
        }
        nameField={<NameField formik={formik} />}
      >
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </SignsForm>
    </div>
  );
};

export default SignUpContainer;

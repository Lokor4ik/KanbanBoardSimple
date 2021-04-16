import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { SignsProps } from './types';

import './SignsForm.scss';

const useStyles = makeStyles({
  h4: {
    marginBottom: 40,
    color: '#9c27b0',
  },
  submit: {
    marginTop: 40,
  },
});

const SignsForm: React.FC<SignsProps> = ({ formik, title, children, nameField, haveAnAccount }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.h4}>
        {title}
      </Typography>

      <form className="signs-form" onSubmit={formik.handleSubmit}>
        {nameField}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {children}

        <ColorButton fullWidth type="submit" className={classes.submit}>
          Submit
        </ColorButton>

        {haveAnAccount}
      </form>
    </>
  );
};

export default SignsForm;

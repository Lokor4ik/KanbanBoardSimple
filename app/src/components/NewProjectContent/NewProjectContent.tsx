import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { NewProjectContentProps } from './types';

import './NewProjectContent.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
  submit: {
    marginTop: 40,
  },
});

const NewProjectContent: React.FC<NewProjectContentProps> = ({ formik }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.h6}>
        New project
      </Typography>

      <div className="new-project__form">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="key"
            name="key"
            label="Key"
            type="key"
            value={formik.values.key}
            onChange={formik.handleChange}
            error={formik.touched.key && Boolean(formik.errors.key)}
            helperText={formik.touched.key && formik.errors.key}
          />

          <ColorButton fullWidth type="submit" className={classes.submit}>
            Submit
          </ColorButton>
        </form>
      </div>
    </>
  );
};

export default NewProjectContent;

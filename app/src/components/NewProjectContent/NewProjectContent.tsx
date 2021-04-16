import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';
import NameField from 'components/NameField/NameField';

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
          <NameField formik={formik} />
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

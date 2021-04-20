import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { NewTicketContentTypes } from './types';

import './NewTicketContent.scss';

const useStyles = makeStyles({
  newTicketTitle: {
    fontSize: 20,
    margin: '10px 0',
  },
  keyProject: {
    marginTop: 15,
  },
  submit: {
    marginTop: 20,
    marginBottom: 10,
  },
});

const NewTicketContent: React.FC<NewTicketContentTypes> = ({ keyProject, formik }) => {
  const classes = useStyles();

  return (
    <>
      <div className="container" id="transition-modal-description">
        <Typography className={classes.newTicketTitle}>New ticket</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="descr"
            name="descr"
            label="Description"
            type="descr"
            value={formik.values.descr}
            onChange={formik.handleChange}
            error={formik.touched.descr && Boolean(formik.errors.descr)}
            helperText={formik.touched.descr && formik.errors.descr}
          />

          <Typography className={classes.keyProject}>{`Key: ${keyProject}`}</Typography>

          <ColorButton fullWidth type="submit" className={classes.submit}>
            Create
          </ColorButton>
        </form>
      </div>
    </>
  );
};

export default NewTicketContent;

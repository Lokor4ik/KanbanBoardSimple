import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import TextEditor from 'shared/TextEditor/TextEditor';
import ColorButton from 'shared/Button/Button';

import { NewTicketContentTypes } from './types';

import './NewTicketContent.scss';

const useStyles = makeStyles({
  keyProject: {
    marginTop: 15,
    color: '#757575',
  },
  submit: {
    marginTop: 20,
    width: 200,
  },
});

const NewTicketContent: React.FC<NewTicketContentTypes> = ({
  descrTicket,
  keyProject,
  handleClose,
  handleChange,
  formik,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="new-ticket__container" id="transition-modal-description">
        <div className="new-ticket__title-wrapper">
          <p className="new-ticket__title">New ticket</p>

          <CloseIcon onClick={handleClose} />
        </div>

        <form className="new-ticket__form" onSubmit={formik.handleSubmit}>
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

          <p className="new-ticket__descr">Description: </p>
          <TextEditor editTextEditor descrValue={descrTicket} handleChange={handleChange} />

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

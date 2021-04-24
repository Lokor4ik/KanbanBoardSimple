import CloseIcon from '@material-ui/icons/Close';

import TextEditor from 'shared/TextEditor/TextEditor';
import ColorButton from 'shared/Button/Button';
import { TextField } from '@material-ui/core';

import { CurrentTicketContentProps } from './types';

import './CurrentTicketContent.scss';

const CurrentTicketContent: React.FC<CurrentTicketContentProps> = ({
  title,
  handleClose,
  handleChange,
  descr,
  editTextEditor,
  setEditTextEditor,
  formik,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="current-ticket__title-wrapper">
        {!editTextEditor ? (
          <p className="current-ticket__title">{title}</p>
        ) : (
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
        )}

        <CloseIcon onClick={handleClose} />
      </div>
      <div className="current-ticket__descr-wrapper">
        <p className="current-ticket__descr">Description:</p>
        <TextEditor
          editTextEditor={editTextEditor}
          handleChange={handleChange}
          descrValue={descr}
        />
      </div>
      <div className="current-ticket__btns">
        {!editTextEditor ? (
          <ColorButton
            onClick={() => setEditTextEditor(true)}
            fullWidth
            type="button"
            className="current-ticket__edit"
          >
            Edit
          </ColorButton>
        ) : (
          <>
            <ColorButton
              onClick={() => setEditTextEditor(false)}
              fullWidth
              type="button"
              className="current-ticket__cancel"
            >
              Cancel
            </ColorButton>
            <ColorButton fullWidth type="submit" className="current-ticket__save">
              Save
            </ColorButton>
          </>
        )}
      </div>
    </form>
  );
};

export default CurrentTicketContent;

import CloseIcon from '@material-ui/icons/Close';

import ColorButton from 'shared/Button/Button';

import { ModalDeleteProps } from './types';

import './ModalDelete.scss';

const ModalDelete: React.FC<ModalDeleteProps> = ({ cancelDelete, fetchDelete, text }) => {
  return (
    <>
      <div className="delete-common__title-wrapper">
        <p className="delete-common__title">{text}</p>
        <CloseIcon onClick={cancelDelete} />
      </div>

      <div className="delete-common__btns">
        <ColorButton
          onClick={cancelDelete}
          fullWidth
          type="button"
          className="current-ticket__cancel"
        >
          Cancel
        </ColorButton>
        <ColorButton
          onClick={fetchDelete}
          fullWidth
          type="submit"
          className="current-ticket__delete"
        >
          Delete
        </ColorButton>
      </div>
    </>
  );
};

export default ModalDelete;

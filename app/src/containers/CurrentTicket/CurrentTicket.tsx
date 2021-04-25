import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import { RouteInfo } from 'containers/Kanban/types';

import CurrentTicketContent from 'components/CurrentTicketContent/CurrentTicketContent';
import ModalDelete from 'shared/ModalDelete/ModalDelete';

import {
  changeCurrentTicketValue,
  changeTexEditorValue,
  getTickets,
  deleteCurrentTicket,
} from 'store/kanban/action';
import { initialStateKanban } from 'store/kanban/reducer';
import { TicketDescrType } from 'store/kanban/types';
import { RootState } from 'store/types';

import './CurrentTicket.scss';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const CurrentTicket: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [clickOutsideDown, setClickOutsideDown] = useState(false);
  const [editTextEditor, setEditTextEditor] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { columns, ticketDescr, loading } = useSelector((state: RootState) => state.kanban);

  const currentTicket = columns.find((item) => item._id === match.params.ticketId);

  const handleSumbit = async ({ title }: { title: string }) => {
    setUpdates(true);

    await dispatch(
      changeCurrentTicketValue({
        projectId: match.params.projectId,
        ticketId: String(currentTicket?._id),
        title,
        descr: ticketDescr,
        enqueueSnackbar,
      })
    );

    await dispatch(getTickets({ projectId: match.params.projectId, enqueueSnackbar }));

    formik.resetForm();
    changeSetEditTextEditor(false);
    setUpdates(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required').trim().max(70),
  });

  const formik = useFormik({
    initialValues: {
      title: String(currentTicket?.title),
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  useEffect(() => {
    if (currentTicket?._id) {
      formik.setValues({
        title: String(currentTicket?.title),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTicket?._id, updates]);

  const handleClose = () => {
    if (editTextEditor) {
      dispatch(changeTexEditorValue({ textEditorValue: initialStateKanban.ticketDescr }));
    }

    history.push(`/projects/${match.params.projectId}`);
  };

  const handleOutsideUp = () => {
    if (clickOutsideDown) {
      handleClose();
    }
  };

  const handleOutsideDown = () => {
    setClickOutsideDown(true);
  };

  const clickDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleChange = (descr: TicketDescrType) => {
    dispatch(changeTexEditorValue({ textEditorValue: descr }));
  };

  const changeSetEditTextEditor = (value: boolean) => {
    if (!value) {
      dispatch(changeTexEditorValue({ textEditorValue: initialStateKanban.ticketDescr }));

      formik.setValues({
        title: String(currentTicket?.title),
      });
    } else {
      dispatch(changeTexEditorValue({ textEditorValue: currentTicket?.descr }));
    }

    setEditTextEditor(value);
  };

  const fetchDeleteTicket = async () => {
    setUpdates(true);

    await dispatch(
      deleteCurrentTicket({
        projectId: match.params.projectId,
        ticketId: String(currentTicket?._id),
        enqueueSnackbar,
      })
    );

    await dispatch(getTickets({ projectId: match.params.projectId, enqueueSnackbar }));

    setUpdates(false);
    handleClose();
  };

  const deleteTicket = () => {
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  if (loading || updates) {
    return <Loader />;
  }

  return (
    <>
      <Fade in>
        <div
          className="current-ticket__inner"
          onMouseDown={handleOutsideDown}
          onMouseUp={handleOutsideUp}
        >
          <div className="current__ticket-wrapper" onMouseDown={clickDown}>
            <CurrentTicketContent
              formik={formik}
              editTextEditor={editTextEditor}
              setEditTextEditor={changeSetEditTextEditor}
              title={String(currentTicket?.title)}
              descr={!editTextEditor ? currentTicket?.descr : ticketDescr}
              handleClose={handleClose}
              handleChange={handleChange}
              deleteTicket={deleteTicket}
            />
          </div>
        </div>
      </Fade>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="delete-ticket__inner">
            <ModalDelete
              fetchDelete={fetchDeleteTicket}
              cancelDelete={handleCloseModal}
              text="You definitely want to delete this ticket?"
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default withRouter(CurrentTicket);

import { useEffect, useState, useCallback } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';
import NewTicketContent from 'components/NewTicketContent/NewTicketContent';

import { kanbanTables } from 'assets/code/kanbanTables';

import { RootState } from 'store/types';
import {
  changeCardColumn,
  changeCardPosition,
  changeTexEditorValue,
  createNewTicket,
  getTickets,
} from 'store/kanban/action';
import { clearProjectErrors, getOneProject } from 'store/projects/action';
import { initialStateKanban } from 'store/kanban/reducer';
import { TicketDescrType } from 'store/kanban/types';

import { RouteInfo, FormikParamsNewTicket } from './types';

import './Kanban.scss';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const KanbanContainer: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

  const { columns, ticketDescr } = useSelector((state: RootState) => state.kanban);

  const { loading: loadingProject, error, currentProject } = useSelector(
    (state: RootState) => state.projects
  );

  const [fetchIsEndCurrentProject, setFetchIsEndCurrentProject] = useState(false);
  const [fetchIsEndProjectTickets, setFetchIsEndProjectTickets] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSumbit = async ({ title }: FormikParamsNewTicket) => {
    setFetchIsEndProjectTickets(false);

    const index = columns.filter((item) => item.columnId === kanbanTables[0].id).length;

    await dispatch(
      createNewTicket({
        projectId: match.params.projectId,
        title,
        index,
        columnId: kanbanTables[0].id,
        descr: ticketDescr,
        keyNumber: columns.length + 1,
        enqueueSnackbar,
      })
    );
    setFetchIsEndProjectTickets(true);

    formik.resetForm();
    handleCloseModal();
    fetchProjectTickets();
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required').trim().max(70),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  const fetchCurrentProject = useCallback(async () => {
    if (!fetchIsEndCurrentProject && !error) {
      await dispatch(getOneProject({ id: match.params.projectId, enqueueSnackbar }));

      setFetchIsEndCurrentProject(true);
    }
  }, [dispatch, enqueueSnackbar, fetchIsEndCurrentProject, error, match.params.projectId]);

  const fetchProjectTickets = useCallback(async () => {
    if (fetchIsEndCurrentProject && !error) {
      await dispatch(getTickets({ projectId: match.params.projectId, enqueueSnackbar }));

      setFetchIsEndProjectTickets(true);
    }
  }, [dispatch, enqueueSnackbar, match.params.projectId, fetchIsEndCurrentProject, error]);

  useEffect(() => {
    fetchCurrentProject();
    fetchProjectTickets();
  }, [fetchCurrentProject, fetchProjectTickets]);

  useEffect(() => {
    if (error) {
      dispatch(clearProjectErrors());

      history.push('/projects');
    }
  }, [error, history, dispatch]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        changeCardColumn({
          projectId: match.params.projectId,
          draggableId,
          srcIndex: source.index,
          destIndex: destination.index,
          srcDroppableId: source.droppableId,
          destDroppableId: destination.droppableId,
          enqueueSnackbar,
        })
      );
    } else {
      dispatch(
        changeCardPosition({
          projectId: match.params.projectId,
          draggableId,
          srcIndex: source.index,
          destIndex: destination.index,
          srcDroppableId: source.droppableId,
          enqueueSnackbar,
        })
      );
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    dispatch(changeTexEditorValue({ textEditorValue: initialStateKanban.ticketDescr }));
    formik.resetForm();

    setOpen(false);
  };

  const handleTikectClick = (ticketId: string) => {
    history.push(`/projects/${match.params.projectId}/ticket/${ticketId}`);
  };

  const handleChange = (textEditorValue: TicketDescrType) => {
    dispatch(changeTexEditorValue({ textEditorValue }));
  };

  if (
    !fetchIsEndCurrentProject ||
    !fetchIsEndProjectTickets ||
    loadingProject ||
    !currentProject._id
  ) {
    return <Loader />;
  }

  return (
    <div className="kanban__wrapper shared--wrapper">
      <button type="button" className="link link--purple" onClick={handleOpenModal}>
        Create new ticket
      </button>

      <div className="kanban__content">
        <DragDropContext onDragEnd={onDragEnd}>
          {kanbanTables.map(({ id, name }) => (
            <KanbanColumn key={id} columnId={id} name={name}>
              <KanbanColumnContent
                columnId={id}
                columns={columns}
                keyProject={currentProject.key}
                handleTikectClick={handleTikectClick}
              />
            </KanbanColumn>
          ))}
        </DragDropContext>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="new-ticket__inner">
            <NewTicketContent
              descrTicket={ticketDescr}
              keyProject={currentProject.key}
              handleClose={handleCloseModal}
              handleChange={handleChange}
              formik={formik}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(KanbanContainer);

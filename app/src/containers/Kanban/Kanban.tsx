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
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';
import NewTicketContent from 'components/NewTicketContent/NewTicketContent';

import { RootState } from 'store/types';
import { changeCardColumn, changeCardPosition } from 'store/kanban/action';
import { clearProjectErrors, getOneProject } from 'store/projects/action';

import { kanbanTables } from 'assets/code/kanbanTables';

import { RouteInfo, FormikParamsNewTicket } from './types';

import './Kanban.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const KanbanContainer: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const { columns } = useSelector((state: RootState) => state.kanban);

  const { loading, error, currentProject } = useSelector((state: RootState) => state.projects);

  const [fetchIsEnd, setFetchIsEnd] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSumbit = async ({ title, descr }: FormikParamsNewTicket) => {
    console.log(title, descr);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    descr: yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      descr: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  const fetchCurrentProject = useCallback(async () => {
    await dispatch(getOneProject({ id: match.params.id, enqueueSnackbar }));

    setFetchIsEnd(true);
  }, [dispatch, enqueueSnackbar, match.params.id]);

  useEffect(() => {
    fetchCurrentProject();
  }, [fetchCurrentProject]);

  useEffect(() => {
    if (error) {
      dispatch(clearProjectErrors());

      history.push('/projects');
    }
  }, [error, history, dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        changeCardColumn({
          draggableId,
          srcIndex: source.index,
          destIndex: destination.index,
          srcDroppableId: source.droppableId,
          destDroppableId: destination.droppableId,
        })
      );
    } else {
      dispatch(
        changeCardPosition({
          draggableId,
          srcIndex: source.index,
          destIndex: destination.index,
          srcDroppableId: source.droppableId,
        })
      );
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  if (!fetchIsEnd || loading || !currentProject._id) {
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
              <KanbanColumnContent columnId={id} columns={columns} />
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
            <NewTicketContent keyProject={currentProject.key} formik={formik} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(KanbanContainer);

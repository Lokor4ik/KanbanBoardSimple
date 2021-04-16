import { useEffect } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';
import CustomLink from 'shared/Link/Link';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';

import { RootState } from 'store/types';
import { changeCardColumn, changeCardPosition } from 'store/kanban/action';
import { clearProjectErrors, getOneProject } from 'store/projects/action';

import { RouteInfo } from './types';

import './Kanban.scss';

const useStyles = makeStyles({
  body1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  h6: {
    fontWeight: 500,
  },
  projectValues: {
    fontWeight: 600,
  },
});

const KanbanContainer: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const { columns } = useSelector((state: RootState) => state.kanban);
  const { loading: loadingProject, error, currentProject } = useSelector(
    (state: RootState) => state.projects
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProject({ id: match.params.id, enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar, match.params.id]);

  useEffect(() => {
    if (error) {
      dispatch(clearProjectErrors());

      history.push('/projects');
    }
  }, [error, history, dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        changeCardColumn({
          srcDroppableId: source.droppableId,
          destDroppableId: destination.droppableId,
          srcIndex: source.index,
          destIndex: destination.index,
        })
      );
    } else {
      dispatch(
        changeCardPosition({
          srcDroppableId: source.droppableId,
          srcIndex: source.index,
          destIndex: destination.index,
        })
      );
    }
  };

  if (loadingProject || !currentProject._id) {
    return <Loader />;
  }

  return (
    <div className="kanban__wrapper shared--wrapper">
      <div className="kanban__top">
        <div className="kanban__top-title">
          <div className="kanban__top-names">
            <Typography variant="h6" className={classes.h6}>
              Project:
            </Typography>
            <Typography variant="subtitle1" className={classes.h6}>
              Key:
            </Typography>
          </div>
          <div className="kanban__top-values">
            <Typography variant="h6" className={classes.projectValues}>
              {currentProject.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.projectValues}>
              {currentProject.key}
            </Typography>
          </div>
        </div>

        <CustomLink
          title="Project settings"
          path={`/projects/${match.params.id}/project-settings`}
          className="link--blue link--no-margins"
        />
      </div>
      <div className="kanban__content">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn key={columnId} columnId={columnId} column={column}>
              <KanbanColumnContent columnId={columnId} column={column} />
            </KanbanColumn>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default withRouter(KanbanContainer);

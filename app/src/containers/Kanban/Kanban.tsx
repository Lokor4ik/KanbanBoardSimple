import { useEffect, useState, useCallback } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';

import Loader from 'shared/Loader/Loader';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';

import { RootState } from 'store/types';
import { changeCardColumn, changeCardPosition } from 'store/kanban/action';
import { clearProjectErrors, getOneProject } from 'store/projects/action';

import { RouteInfo } from './types';

import './Kanban.scss';

const KanbanContainer: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const { columns } = useSelector((state: RootState) => state.kanban);
  const { loading, error, currentProject } = useSelector((state: RootState) => state.projects);

  const [fetchIsEnd, setFetchIsEnd] = useState(false);

  const dispatch = useDispatch();

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

  if (!fetchIsEnd || loading || !currentProject._id) {
    return <Loader />;
  }

  return (
    <div className="kanban__wrapper shared--wrapper">
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

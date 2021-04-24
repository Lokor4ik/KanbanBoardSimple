import { Droppable, Draggable } from 'react-beautiful-dnd';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { PropsKanbanColumnContent, TypeGetItemStyle } from './types';

import './KanbanColumnContent.scss';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#49006736' : '#ececec',
  padding: 5,
  width: 300,
  minHeight: 670,
  maxHeight: 670,
  overflow: 'auto',
  borderRadius: 7,
});

const getItemStyle: TypeGetItemStyle = (isDragging, restStyles) => ({
  userSelect: 'none',
  padding: 16,
  margin: '0 0 5px 0',
  minHeight: '50px',
  maxHeight: '170px',
  backgroundColor: isDragging ? '#bdbdbd' : '#ffffff',
  color: '#000000',
  borderRadius: 7,
  boxShadow: 'rgb(162 162 162 / 45%) 0px 0px 5px 0px',
  cursor: 'pointer',
  ...restStyles,
});

const useStyles = makeStyles({
  key: {
    fontSize: 13,
    color: '#737373',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  },
  title: {
    fontSize: 17,
    marginTop: 7,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  },
  descr: {},
});

const KanbanColumnContent: React.FC<PropsKanbanColumnContent> = ({
  columnId,
  columns,
  keyProject,
  handleTikectClick,
}) => {
  const styles = useStyles();

  return (
    <div className="kanban__column-content">
      <Droppable droppableId={columnId}>
        {(providedUpper, snapshotUpper) => (
          <div
            {...providedUpper.droppableProps}
            ref={providedUpper.innerRef}
            style={getListStyle(snapshotUpper.isDraggingOver)}
          >
            {columns.map(
              (item) =>
                columnId === item.columnId && (
                  <Draggable key={item._id} draggableId={item._id} index={item.index}>
                    {(providedLower, snapshotLower) => (
                      <div
                        {...providedLower.draggableProps}
                        {...providedLower.dragHandleProps}
                        ref={providedLower.innerRef}
                        style={getItemStyle(
                          snapshotLower.isDragging,
                          providedLower.draggableProps.style
                        )}
                        onClick={() => handleTikectClick(item._id)}
                      >
                        <Typography className={styles.key}>
                          {`${keyProject} - ${item.keyNumber}`}
                        </Typography>

                        <Typography className={styles.title}>{item.title}</Typography>
                      </div>
                    )}
                  </Draggable>
                )
            )}
            {providedUpper.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumnContent;

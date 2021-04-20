import { Droppable, Draggable } from 'react-beautiful-dnd';

import Typography from '@material-ui/core/Typography';

import { PropsKanbanColumnContent, TypeGetItemStyle } from './types';

import './KanbanColumnContent.scss';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 4,
  width: 300,
  minHeight: 600,
});

const getItemStyle: TypeGetItemStyle = (isDragging, restStyles) => ({
  userSelect: 'none',
  padding: 16,
  margin: '0 0 8px 0',
  minHeight: '50px',
  backgroundColor: isDragging ? '#263B4A' : '#456C86',
  color: 'white',
  ...restStyles,
});

const KanbanColumnContent: React.FC<PropsKanbanColumnContent> = ({
  columnId,
  columns,
  keyProject,
}) => (
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
                    >
                      <Typography variant="body2">{`${keyProject} - ${item.keyNumber}`}</Typography>

                      <Typography variant="h6">{item.title}</Typography>

                      <Typography variant="body1">{item.descr}</Typography>
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

export default KanbanColumnContent;

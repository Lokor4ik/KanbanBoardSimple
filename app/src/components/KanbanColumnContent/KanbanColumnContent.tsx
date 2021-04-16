import { Droppable, Draggable } from 'react-beautiful-dnd';

import { PropsKanbanColumnContent, TypeGetItemStyle } from './types';

import './KanbanColumnContent.scss';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 4,
  width: 250,
  minHeight: 500,
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

const KanbanColumnContent: React.FC<PropsKanbanColumnContent> = ({ columnId, column }) => (
  <div className="kanban__column-content">
    <Droppable droppableId={columnId}>
      {(providedUpper, snapshotUpper) => (
        <div
          {...providedUpper.droppableProps}
          ref={providedUpper.innerRef}
          style={getListStyle(snapshotUpper.isDraggingOver)}
        >
          {column.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(providedLower, snapshotLower) => (
                <div
                  {...providedLower.draggableProps}
                  {...providedLower.dragHandleProps}
                  ref={providedLower.innerRef}
                  style={getItemStyle(snapshotLower.isDragging, providedLower.draggableProps.style)}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {providedUpper.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default KanbanColumnContent;

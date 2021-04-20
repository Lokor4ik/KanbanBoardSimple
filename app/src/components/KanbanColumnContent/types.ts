import { CSSProperties } from 'react';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export type PropsKanbanColumnContent = {
  columnId: string;
  columns: Array<{
    id: string;
    columnId: string;
    index: number;
    content: string;
  }>;
};

export type TypeGetItemStyle = (
  isDragging: boolean,
  restStyles: DraggingStyle | NotDraggingStyle | undefined
) => CSSProperties | undefined;

import { CSSProperties } from 'react';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export type PropsKanbanColumnContent = {
  columnId: string;
  columns: Array<{
    _id: string;
    columnId: string;
    index: number;
    title: string;
    descr: string;
    keyNumber: number;
  }>;
  keyProject: string;
};

export type TypeGetItemStyle = (
  isDragging: boolean,
  restStyles: DraggingStyle | NotDraggingStyle | undefined
) => CSSProperties | undefined;

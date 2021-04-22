import { CSSProperties } from 'react';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { ColumnsType } from 'store/kanban/types';

export type PropsKanbanColumnContent = {
  columnId: string;
  columns: Array<ColumnsType>;
  keyProject: string;
};

export type TypeGetItemStyle = (
  isDragging: boolean,
  restStyles: DraggingStyle | NotDraggingStyle | undefined
) => CSSProperties | undefined;

export const SET_CARD_DESTINATION = 'SET_CARD_DESTINATION';

export interface KanbanInitialState {
  columns: Array<{
    id: string;
    index: number;
    columnId: string;
    content: string;
  }>;
}

export interface TypeKanbanColumns {
  [key: string]: {
    name: string;
    items: Array<{ id: string; content: string }>;
  };
}

export type ParamsChangeCardPosition = {
  draggableId: string;
  srcIndex: number;
  destIndex: number;
  srcDroppableId: string;
};

export type ParamsChangeCardColumn = ParamsChangeCardPosition & {
  destDroppableId: string;
};

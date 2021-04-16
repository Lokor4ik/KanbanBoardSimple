export const SET_CARD_DESTINATION = 'SET_CARD_DESTINATION';

export interface KanbanInitialState {
  columns: {
    [x: string]: {
      name: string;
      items: {
        id: string;
        content: string;
      }[];
    };
  };
}

export interface TypeKanbanColumns {
  [key: string]: {
    name: string;
    items: Array<{ id: string; content: string }>;
  };
}

export type ParamsChangeCardPosition = {
  srcDroppableId: string;
  srcIndex: number;
  destIndex: number;
};

export type ParamsChangeCardColumn = ParamsChangeCardPosition & {
  destDroppableId: string;
};

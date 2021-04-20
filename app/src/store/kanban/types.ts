export const SET_CARD_DESTINATION = 'SET_CARD_DESTINATION';
export const CREATE_NEW_TICKET_REQUEST = 'CREATE_NEW_TICKET_REQUEST';
export const CREATE_NEW_TICKET_SUCCESS = 'CREATE_NEW_TICKET_SUCCESS';
export const KANBAN_FAILURE = 'KANBAN_FAILURE';
export const GET_TICKETS_REQUEST = 'GET_TICKETS_REQUEST';
export const GET_TICKETS_SUCCESS = 'GET_TICKETS_SUCCESS';

export interface KanbanInitialState {
  columns: Array<{
    _id: string;
    index: number;
    columnId: string;
    title: string;
    descr: string;
    keyNumber: number;
  }>;
  loading: boolean;
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

export type ParamsGetTickets = {
  projectId: string;
};

export type ParamsCreateNewTicket = ParamsGetTickets & {
  index: number;
  title: string;
  descr: string;
  keyNumber: number;
};

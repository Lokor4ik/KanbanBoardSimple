import { AnyAction } from 'redux';
// import { v4 as uuidv4 } from 'uuid';

import {
  SET_CARD_DESTINATION,
  SET_CARD_DESTINATION_REQUEST,
  SET_CARD_DESTINATION_SUCCESS,
  CREATE_NEW_TICKET_REQUEST,
  CREATE_NEW_TICKET_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  SET_TEXT_EDITOR_DESCR,
  CHANGE_CURRENT_TICKET_REQUEST,
  CHANGE_CURRENT_TICKET_SUCCESS,
  DELETE_CURRENT_TICKET_REQUEST,
  DELETE_CURRENT_TICKET_SUCCESS,
  KANBAN_FAILURE,
  KanbanInitialState,
} from './types';

/* let index = 0;
const testData = Array.from({ length: 20 }, () => ({
  id: uuidv4(),
  index: index++,
  columnId: '1',
  content: `${index} task`,
})); */

export const initialStateKanban: KanbanInitialState = {
  columns: [],
  loading: false,
  ticketDescr: [
    {
      type: '',
      children: [{ text: '' }],
    },
  ],
};

export default function reducer(state = initialStateKanban, action: AnyAction) {
  switch (action.type) {
    case CREATE_NEW_TICKET_REQUEST:
    case GET_TICKETS_REQUEST:
    case SET_CARD_DESTINATION_REQUEST:
    case CHANGE_CURRENT_TICKET_REQUEST:
    case DELETE_CURRENT_TICKET_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_NEW_TICKET_SUCCESS:
    case SET_CARD_DESTINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        ticketDescr: initialStateKanban.ticketDescr,
      };
    }
    case GET_TICKETS_SUCCESS: {
      return {
        ...state,
        columns: action.payload.tickets,
        loading: false,
      };
    }
    case SET_CARD_DESTINATION: {
      return {
        ...state,
        columns: action.payload.modifiedColumns,
      };
    }
    case SET_TEXT_EDITOR_DESCR: {
      return {
        ...state,
        ticketDescr: [...action.payload.textEditorValue],
      };
    }
    case CHANGE_CURRENT_TICKET_SUCCESS:
    case DELETE_CURRENT_TICKET_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case KANBAN_FAILURE: {
      return {
        ...initialStateKanban,
      };
    }
    default:
      return state;
  }
}

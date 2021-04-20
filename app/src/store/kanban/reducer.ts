import { AnyAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { SET_CARD_DESTINATION, KanbanInitialState } from './types';

let index = 0;
const testData = Array.from({ length: 20 }, () => ({
  id: uuidv4(),
  index: index++,
  columnId: '1',
  content: `${index} task`,
}));

export const initialStateKanban: KanbanInitialState = {
  columns: testData,
};

export default function reducer(state = initialStateKanban, action: AnyAction) {
  switch (action.type) {
    case SET_CARD_DESTINATION: {
      return {
        ...state,
        columns: action.payload.modifiedColumns,
      };
    }
    default:
      return state;
  }
}

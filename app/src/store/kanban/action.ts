import { RootThunkAction } from 'store/types';
import { SET_CARD_DESTINATION, ParamsChangeCardColumn, ParamsChangeCardPosition } from './types';

export const changeCardColumn = ({
  draggableId,
  srcIndex,
  destIndex,
  srcDroppableId,
  destDroppableId,
}: ParamsChangeCardColumn): RootThunkAction => async (dispatch, getState) => {
  const { columns } = getState().kanban;

  // findOneUpdate in DB & loop with findOneAndUpdate
  const modifiedColumns = columns
    .map((item) => {
      // looking for the same dragged card and change its position and board
      if (item.id === draggableId) {
        return { ...item, columnId: destDroppableId, index: destIndex };
      }

      // looking for cards belonging to the board from which the card
      // was removed, in order to change their positions. Then change positions
      // by one less of all those cards that are larger than the index of the
      // card that was removed.
      if (item.columnId === srcDroppableId && item.index > srcIndex) {
        return { ...item, index: item.index - 1 };
      }

      // looking for cards that belong to the board to which the card
      // was moved and change these cards to one more position
      if (item.columnId === destDroppableId && item.id !== draggableId && item.index >= destIndex) {
        return { ...item, index: item.index + 1 };
      }

      return item;
    })
    .sort((a, b) => a.index - b.index);

  /* 
  const sourceColumn = columns[srcDroppableId];
  const destColumn = columns[destDroppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  const [removed] = sourceItems.splice(srcIndex, 1);
  destItems.splice(destIndex, 0, removed);

  const modifiedColumns = {
    ...columns,
    [srcDroppableId]: {
      ...sourceColumn,
      items: sourceItems,
    },
    [destDroppableId]: {
      ...destColumn,
      items: destItems,
    },
  }; */

  dispatch({
    type: SET_CARD_DESTINATION,
    payload: { modifiedColumns },
  });
};

export const changeCardPosition = ({
  draggableId,
  srcIndex,
  destIndex,
  srcDroppableId,
}: ParamsChangeCardPosition): RootThunkAction => async (dispatch, getState) => {
  const { columns } = getState().kanban;

  const modifiedColumns = columns
    .map((item) => {
      if (item.columnId === srcDroppableId && item.id === draggableId) {
        return { ...item, index: destIndex };
      }

      if (
        destIndex > srcIndex &&
        item.columnId === srcDroppableId &&
        item.id !== draggableId &&
        item.index > srcIndex
      ) {
        return { ...item, index: item.index - 1 };
      }

      if (
        destIndex < srcIndex &&
        item.columnId === srcDroppableId &&
        item.id !== draggableId &&
        item.index <= destIndex
      ) {
        return { ...item, index: item.index + 1 };
      }

      return item;
    })
    .sort((a, b) => a.index - b.index);

  /*  const column = columns[srcDroppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(srcIndex, 1);
  copiedItems.splice(destIndex, 0, removed);

  const modifiedColumns = {
    ...columns,
    [srcDroppableId]: {
      ...column,
      items: copiedItems,
    },
  }; */

  dispatch({
    type: SET_CARD_DESTINATION,
    payload: { modifiedColumns },
  });
};

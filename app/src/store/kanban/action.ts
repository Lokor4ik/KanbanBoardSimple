import handleErrors from 'utils/actionErrors';
import getFetchHeaders from 'utils/getFetchHeaders';

import { kanbanTables } from 'assets/code/kanbanTables';

import request from 'services/axios';

import { RootThunkAction, ProviderContextNotistack } from 'store/types';

import {
  SET_CARD_DESTINATION,
  CREATE_NEW_TICKET_REQUEST,
  CREATE_NEW_TICKET_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  KANBAN_FAILURE,
  ParamsChangeCardColumn,
  ParamsChangeCardPosition,
  ParamsCreateNewTicket,
  ParamsGetTickets,
} from './types';

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
      if (item._id === draggableId) {
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
      if (
        item.columnId === destDroppableId &&
        item._id !== draggableId &&
        item.index >= destIndex
      ) {
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
      if (item.columnId === srcDroppableId && item._id === draggableId) {
        return { ...item, index: destIndex };
      }
      console.log(destIndex, srcIndex);
      console.log(item);

      if (
        destIndex > srcIndex &&
        item.columnId === srcDroppableId &&
        item._id !== draggableId &&
        item.index >= srcIndex + 1 &&
        item.index <= destIndex
      ) {
        return { ...item, index: item.index - 1 };
      }

      if (
        destIndex < srcIndex &&
        item.columnId === srcDroppableId &&
        item._id !== draggableId &&
        item.index <= srcIndex - 1 &&
        item.index >= destIndex
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

export const createNewTicket = ({
  projectId,
  title,
  descr,
  index,
  keyNumber,
  enqueueSnackbar,
}: ParamsCreateNewTicket & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_TICKET_REQUEST,
    });

    const headers = getFetchHeaders();
    const body = JSON.stringify({
      projectId,
      title,
      descr,
      columnId: kanbanTables[0].id,
      index,
      keyNumber,
    });
    const { msg, severity } = await request('/api/ticket', 'POST', body, headers);

    enqueueSnackbar(msg, {
      variant: severity,
    });

    dispatch({
      type: CREATE_NEW_TICKET_SUCCESS,
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: KANBAN_FAILURE,
    });
  }
};

export const getTickets = ({
  projectId,
  enqueueSnackbar,
}: ParamsGetTickets & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKETS_REQUEST,
    });

    const headers = getFetchHeaders();
    const tickets = await request(`/api/ticket/${projectId}`, 'GET', null, headers);

    dispatch({
      type: GET_TICKETS_SUCCESS,
      payload: { tickets },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: KANBAN_FAILURE,
    });
  }
};

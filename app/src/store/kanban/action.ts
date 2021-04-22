import handleErrors from 'utils/actionErrors';
import getFetchHeaders from 'utils/getFetchHeaders';

import request from 'services/axios';

import { RootThunkAction, ProviderContextNotistack } from 'store/types';

import {
  SET_CARD_DESTINATION,
  SET_CARD_DESTINATION_REQUEST,
  SET_CARD_DESTINATION_SUCCESS,
  CREATE_NEW_TICKET_REQUEST,
  CREATE_NEW_TICKET_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  KANBAN_FAILURE,
  ParamsChangeCardColumn,
  ParamsChangeCardPosition,
  ParamsCreateNewTicket,
  ParamsGetTickets,
  ColumnsType,
} from './types';

export const changeCardColumn = ({
  projectId,
  draggableId,
  srcIndex,
  destIndex,
  srcDroppableId,
  destDroppableId,
  enqueueSnackbar,
}: ParamsChangeCardColumn & ProviderContextNotistack): RootThunkAction => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SET_CARD_DESTINATION_REQUEST,
    });

    const { columns } = getState().kanban;

    // findOneUpdate in DB & loop with findOneAndUpdate
    const updatedTickets = columns
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

    dispatch({
      type: SET_CARD_DESTINATION,
      payload: { modifiedColumns: updatedTickets },
    });

    const headers = getFetchHeaders();
    const body = JSON.stringify({
      projectId,
      updatedTickets,
    });

    await request('/api/ticket/position', 'PATCH', body, headers);

    dispatch({
      type: SET_CARD_DESTINATION_SUCCESS,
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
};

export const changeCardPosition = ({
  projectId,
  draggableId,
  srcIndex,
  destIndex,
  srcDroppableId,
  enqueueSnackbar,
}: ParamsChangeCardPosition & ProviderContextNotistack): RootThunkAction => async (
  dispatch,
  getState
) => {
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

  /*   dispatch({
    type: SET_CARD_DESTINATION,
    payload: { modifiedColumns },
  }); */

  try {
    dispatch({
      type: SET_CARD_DESTINATION_REQUEST,
    });

    const { columns } = getState().kanban;

    const updatedTickets = columns
      .map((item) => {
        if (item.columnId === srcDroppableId && item._id === draggableId) {
          return { ...item, index: destIndex };
        }

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

    dispatch({
      type: SET_CARD_DESTINATION,
      payload: {
        modifiedColumns: updatedTickets,
      },
    });

    const headers = getFetchHeaders();
    const body = JSON.stringify({
      projectId,
      updatedTickets,
    });

    await request('/api/ticket/position', 'PATCH', body, headers);

    dispatch({
      type: SET_CARD_DESTINATION_SUCCESS,
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

export const createNewTicket = ({
  projectId,
  title,
  descr,
  columnId,
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
      columnId,
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
      payload: { tickets: tickets.sort((a: ColumnsType, b: ColumnsType) => a.index - b.index) },
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

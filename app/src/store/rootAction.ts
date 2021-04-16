import { CLEAR_ALL_REDUCERS_DATA, RootThunkAction } from './types';

export const clearAllStoreData = (): RootThunkAction => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: CLEAR_ALL_REDUCERS_DATA });
};

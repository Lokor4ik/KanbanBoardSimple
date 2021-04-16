import request from 'services/axios';

import getFetchHeaders from 'utils/getFetchHeaders';
import handleErrors from 'utils/actionErrors';

import { PROJECTS_FAILURE, ParamsCUProject } from 'store/projects/types';
import { ProviderContextNotistack, RootThunkDispatch } from 'store/types';

const createUpdateProject = async ({
  dispatch,
  dispatchTypeRequest,
  dispatchTypeSucces,
  body,
  method,
  enqueueSnackbar,
}: ParamsCUProject & ProviderContextNotistack & { dispatch: RootThunkDispatch }) => {
  try {
    dispatch({
      type: dispatchTypeRequest,
    });

    const headers = getFetchHeaders();
    const { msg, severity } = await request('/api/project', method, body, headers);

    enqueueSnackbar(msg, {
      variant: severity,
    });

    dispatch({
      type: dispatchTypeSucces,
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};

export default createUpdateProject;

import { RouteComponentProps } from 'react-router-dom';
import { FormikValues } from 'formik';

import { RouteInfo } from 'containers/Kanban/types';

export type ProjectSettingsContentProps = RouteComponentProps<RouteInfo> & {
  formik: FormikValues;
};

import { FormikValues } from 'formik';

import { TicketDescrType } from 'store/kanban/types';

export type NewTicketContentTypes = {
  keyProject: string;
  handleClose: () => void;
  descrTicket: TicketDescrType;
  handleChange: (value: TicketDescrType) => void;
  formik: FormikValues;
};

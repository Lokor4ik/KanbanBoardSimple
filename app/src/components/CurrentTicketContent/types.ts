import { FormikValues } from 'formik';

import { TicketDescrType } from 'store/kanban/types';

export type CurrentTicketContentProps = {
  title: string;
  handleClose: () => void;
  handleChange: (textEditorValue: TicketDescrType) => void;
  descr: TicketDescrType | undefined;
  editTextEditor: boolean;
  setEditTextEditor: (value: boolean) => void;
  formik: FormikValues;
};

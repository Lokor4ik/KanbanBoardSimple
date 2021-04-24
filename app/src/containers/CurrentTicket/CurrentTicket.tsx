import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Fade from '@material-ui/core/Fade';

import { RouteInfo } from 'containers/Kanban/types';

import CurrentTicketContent from 'components/CurrentTicketContent/CurrentTicketContent';

import { changeTexEditorValue } from 'store/kanban/action';
import { initialStateKanban } from 'store/kanban/reducer';
import { TicketDescrType } from 'store/kanban/types';
import { RootState } from 'store/types';

import './CurrentTicket.scss';

const CurrentTicket: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [clickOutsideDown, setClickOutsideDown] = useState(false);
  const [editTextEditor, setEditTextEditor] = useState(false);

  const { columns, ticketDescr } = useSelector((state: RootState) => state.kanban);

  const currentTicket = columns.find((item) => item._id === match.params.ticketId);

  const handleSumbit = async ({ title }: { title: string }) => {
    console.log(title);
    formik.resetForm();
    changeSetEditTextEditor(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: String(currentTicket?.title),
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  useEffect(() => {
    if (currentTicket?._id) {
      formik.setValues({
        title: String(currentTicket?.title),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTicket?._id]);

  const handleClose = () => {
    if (editTextEditor) {
      dispatch(changeTexEditorValue({ textEditorValue: initialStateKanban.ticketDescr }));
    }

    history.push(`/projects/${match.params.id}`);
  };

  const handleOutsideUp = () => {
    if (clickOutsideDown) {
      handleClose();
    }
  };

  const handleOutsideDown = () => {
    setClickOutsideDown(true);
  };

  const clickDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleChange = (descr: TicketDescrType) => {
    dispatch(changeTexEditorValue({ textEditorValue: descr }));
  };

  const changeSetEditTextEditor = (value: boolean) => {
    if (!value) {
      dispatch(changeTexEditorValue({ textEditorValue: initialStateKanban.ticketDescr }));

      formik.setValues({
        title: String(currentTicket?.title),
      });
    } else {
      dispatch(changeTexEditorValue({ textEditorValue: currentTicket?.descr }));
    }

    setEditTextEditor(value);
  };

  return (
    <Fade in>
      <div
        className="current-ticket__inner"
        onMouseDown={handleOutsideDown}
        onMouseUp={handleOutsideUp}
      >
        <div className="current__ticket-wrapper" onMouseDown={clickDown}>
          <CurrentTicketContent
            formik={formik}
            editTextEditor={editTextEditor}
            setEditTextEditor={changeSetEditTextEditor}
            title={String(currentTicket?.title)}
            descr={!editTextEditor ? currentTicket?.descr : ticketDescr}
            handleClose={handleClose}
            handleChange={handleChange}
          />
        </div>
      </div>
    </Fade>
  );
};

export default withRouter(CurrentTicket);

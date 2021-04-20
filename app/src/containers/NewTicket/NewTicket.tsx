import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import NewTicketContent from 'components/NewTicketContent/NewTicketContent';

import { RootState } from 'store/types';

import { FormikParamsNewTicket } from './types';

import './NewTicket.scss';

const NewTicket = () => {
  const history = useHistory();

  const { currentProject } = useSelector((state: RootState) => state.projects);

  const handleSumbit = async ({ title, descr }: FormikParamsNewTicket) => {
    console.log(title, descr);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    descr: yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      descr: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  const clickOutside = () => {
    history.push('/projects/${match.id}');
  };

  return (
    <div className="new-ticket__wrapper" onClick={clickOutside} aria-hidden="true">
      <NewTicketContent keyProject={currentProject.key} formik={formik} />
    </div>
  );
};

export default NewTicket;

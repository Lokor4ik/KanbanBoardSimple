import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import NewProjectContent from 'components/NewProjectContent/NewProjectContent';

import { RootState } from 'store/types';
import { createNewProject } from 'store/projects/action';

import { FormikParamsNewProject } from './types';

const NewProject = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state: RootState) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSumbit = ({ name, key }: FormikParamsNewProject) => {
    dispatch(
      createNewProject({ enqueueSnackbar, name, key: key.toUpperCase(), lead: String(user?.email) })
    );

    history.push('/projects');
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    key: yup.string().required('Key is required (for example: KISS, sas, Gign)'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      key: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  return (
    <div className="new-project__wrapper shared--wrapper">
      <NewProjectContent formik={formik} />
    </div>
  );
};

export default NewProject;

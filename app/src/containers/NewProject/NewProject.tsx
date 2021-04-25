import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import NewProjectContent from 'components/NewProjectContent/NewProjectContent';

import { clearProjectRows, createNewProject } from 'store/projects/action';
import { RootState } from 'store/types';

import { FormikParamsNewProject } from './types';

const NewProject = () => {
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const dispatch = useDispatch();

  const { rows } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (rows?.length) {
      dispatch(clearProjectRows());
    }
  }, [dispatch, rows?.length]);

  const handleSumbit = async ({ name, key }: FormikParamsNewProject) => {
    await dispatch(createNewProject({ enqueueSnackbar, name, key: key.toUpperCase() }));

    history.push('/projects');
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').trim(),
    key: yup.string().required('Key is required (for example: KISS, sas, Gign)').trim(),
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

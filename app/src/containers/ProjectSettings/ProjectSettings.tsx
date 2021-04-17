import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Loader from 'shared/Loader/Loader';

import ProjectSettingsContent from 'components/ProjectSettingsContent/ProjectSettingsContent';

import { RouteInfo } from 'containers/Kanban/types';
import { FormikParamsNewProject } from 'containers/NewProject/types';

import { RootState } from 'store/types';
import { clearProjectErrors, getOneProject, updateProject } from 'store/projects/action';

const ProjectSettings: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { currentProject, loading, error } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (error) {
      dispatch(clearProjectErrors());

      history.push('/projects');
    }
  }, [error, history, dispatch]);

  useEffect(() => {
    if (!currentProject._id) {
      dispatch(getOneProject({ id: match.params.id, enqueueSnackbar }));
    }
  }, [dispatch, enqueueSnackbar, match.params.id, currentProject._id]);

  const handleSumbit = async ({ name, key }: FormikParamsNewProject) => {
    if (name !== currentProject.name || key !== currentProject.key) {
      await dispatch(updateProject({ id: match.params.id, name, key, enqueueSnackbar }));
    }

    history.push(`/projects/${match.params.id}`);
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    key: yup.string().required('Key is required (for example: KISS, sas, Gign)'),
  });

  const formik = useFormik({
    initialValues: {
      name: currentProject.name,
      key: currentProject.key,
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  useEffect(() => {
    if (currentProject._id && !formik.values.name) {
      formik.setValues({ name: currentProject.name, key: currentProject.key });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject._id, currentProject.name, currentProject.key]);

  if (loading || !currentProject._id) {
    return <Loader />;
  }

  return (
    <div className="project-settings__wrapper shared--wrapper">
      <ProjectSettingsContent formik={formik} />
    </div>
  );
};

export default withRouter(ProjectSettings);

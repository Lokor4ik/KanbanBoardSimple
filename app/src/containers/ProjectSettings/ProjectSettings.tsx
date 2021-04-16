import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import ProjectSettingsContent from 'components/ProjectSettingsContent/ProjectSettingsContent';

import { RouteInfo } from 'containers/Kanban/types';

import { RootState } from 'store/types';
import { clearProjectErrors, getOneProject } from 'store/projects/action';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
});

const ProjectSettings: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSumbit = () => {};

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
      <Typography variant="h6" className={classes.h6}>
        Project settings
      </Typography>

      <ProjectSettingsContent formik={formik} />
    </div>
  );
};

export default withRouter(ProjectSettings);

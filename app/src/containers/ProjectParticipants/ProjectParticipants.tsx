import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import { RouteInfo } from 'containers/Kanban/types';

import ProjectsSettingsMembers from 'components/ProjectsSettingsMembers/ProjectsSettingsMembers';

import { RootState } from 'store/types';
import {
  addUserInProject,
  clearProjectErrors,
  deleteUserFromProject,
  getOneProject,
} from 'store/projects/action';

import { ProjectParticipantsForms } from './types';

// import { RootState } from 'store/types';
const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
});

const ProjectParticipants: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, currentProject, error } = useSelector((state: RootState) => state.projects);
  const { user: userData } = useSelector((state: RootState) => state.auth);

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

  const handleSumbit = ({ user }: ProjectParticipantsForms) => {
    const findedUser =
      currentProject.participants.find((participantItem) => participantItem.email === user) ||
      user === currentProject.lead;

    if (!findedUser) {
      dispatch(addUserInProject({ user, projectId: currentProject._id, enqueueSnackbar }));
    } else {
      enqueueSnackbar('This user has already been added', {
        variant: 'warning',
      });
    }
  };

  const validationSchema = yup.object({
    user: yup.string().email('Enter a valid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      user: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  const deleteMember = (id: string) => {
    dispatch(deleteUserFromProject({ userId: id, projectId: currentProject._id, enqueueSnackbar }));
  };

  if (loading || !currentProject._id) {
    return <Loader />;
  }

  return (
    <div className="project-participants__wrapper shared--wrapper">
      <Typography variant="h6" className={classes.h6}>
        Project participants
      </Typography>

      <ProjectsSettingsMembers
        lead={currentProject.lead}
        currentUser={String(userData?.email)}
        participants={currentProject.participants}
        formik={formik}
        deleteMember={deleteMember}
      />
    </div>
  );
};

export default withRouter(ProjectParticipants);

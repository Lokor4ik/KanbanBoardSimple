import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import ProjectSettingsContent from 'components/ProjectSettingsContent/ProjectSettingsContent';

import { RouteInfo } from 'containers/Kanban/types';
import { FormikParamsNewProject } from 'containers/NewProject/types';

import { RootState } from 'store/types';
import {
  clearProjectErrors,
  getOneProject,
  updateProject,
  deleteCurrentProject,
} from 'store/projects/action';
import ModalDelete from 'shared/ModalDelete/ModalDelete';

import './ProjectSettings.scss';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const ProjectSettings: React.FC<RouteComponentProps<RouteInfo>> = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { currentProject, loading, error } = useSelector((state: RootState) => state.projects);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(clearProjectErrors());

      history.push('/projects');
    }
  }, [error, history, dispatch]);

  useEffect(() => {
    if (!currentProject._id) {
      dispatch(getOneProject({ id: match.params.projectId, enqueueSnackbar }));
    }
  }, [dispatch, enqueueSnackbar, match.params.projectId, currentProject._id]);

  const handleSumbit = async ({ name, key }: FormikParamsNewProject) => {
    if (name !== currentProject.name || key !== currentProject.key) {
      await dispatch(
        updateProject({ id: match.params.projectId, name, key: key.toUpperCase(), enqueueSnackbar })
      );
    }

    history.push(`/projects/${match.params.projectId}`);
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').trim(),
    key: yup.string().required('Key is required (for example: KISS, sas, Gign)').trim(),
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const deleteProject = async () => {
    await dispatch(deleteCurrentProject({ id: match.params.projectId, enqueueSnackbar }));

    history.push('/projects');
  };

  if (loading || !currentProject._id) {
    return <Loader />;
  }

  return (
    <div className="project-settings__wrapper shared--wrapper">
      <ProjectSettingsContent formik={formik} handleOpenModal={handleOpenModal} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="delete-project__inner">
            <ModalDelete
              fetchDelete={deleteProject}
              cancelDelete={handleCloseModal}
              text="You definitely want to delete this project?"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(ProjectSettings);

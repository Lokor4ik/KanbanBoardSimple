import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import CryptoAES from 'crypto-js/aes';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';
import CustomLink from 'shared/Link/Link';

import ProjectsTable from 'components/ProjectsTable/ProjectsTable';

import { RootState } from 'store/types';
import { getProjects } from 'store/projects/action';

import './Projects.scss';

const useStyles = makeStyles({
  body1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  h6: {
    fontWeight: 500,
  },
});

const ProjectsContainer = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { rows, loading, creatingProject } = useSelector((state: RootState) => state.projects);

  const dispatch = useDispatch();

  const fetchProjects = useCallback(async () => {
    dispatch(getProjects({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (!creatingProject) {
      fetchProjects();
    }
  }, [fetchProjects, creatingProject]);

  const fetchProject = async (id: string) => {
    /* const encryptId = CryptoAES.encrypt(id, String(process.env.REACT_APP_ENCRYPT_SECRET_KEY));
    const convertedId = encodeURIComponent(encryptId.toString()); */

    history.push(`/projects/${id}`);
  };

  const tableContainerClasses = useMemo(
    () =>
      rows && rows.length >= 13
        ? 'projects__wrapper projects__wrapper--box-shadow'
        : 'projects__wrapper',
    [rows]
  );

  if (loading || creatingProject || (rows && !rows.length)) {
    return <Loader />;
  }

  return (
    <div className={`${tableContainerClasses} shared--wrapper`}>
      <div className="projects__top">
        <Typography variant="h6" className={classes.h6}>
          Projects
        </Typography>

        <CustomLink
          title="Create a new project"
          path="/new-project"
          className="link--blue link--no-margins"
        />
      </div>
      {rows?.length ? (
        <ProjectsTable fetchProject={fetchProject} rows={rows} />
      ) : (
        <Typography className={classes.body1} variant="body1">
          There are no projects in which you are involved
        </Typography>
      )}
    </div>
  );
};

export default ProjectsContainer;

import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

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
});

const ProjectsContainer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { rows, loading, creatingProject } = useSelector((state: RootState) => state.projects);

  const dispatch = useDispatch();

  const fetchProjects = useCallback(async () => {
    await dispatch(getProjects({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (!creatingProject) {
      fetchProjects();
    }
  }, [creatingProject, fetchProjects]);

  const fetchProject = async (id: string) => {
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
      {rows?.length ? (
        <ProjectsTable fetchProject={fetchProject} rows={rows} />
      ) : (
        <Typography className={classes.body1} variant="body1">
          There are no projects
        </Typography>
      )}
    </div>
  );
};

export default ProjectsContainer;

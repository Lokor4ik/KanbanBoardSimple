import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { ProjectSettingsContentProps } from './types';

import './ProjectSettingsContent.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
  submit: {
    marginTop: 40,
  },
});

const ProjectSettingsContent: React.FC<ProjectSettingsContentProps> = ({ formik }) => {
  const classes = useStyles();

  return (
    <div className="project-settings__form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="key"
          name="key"
          label="Key"
          type="key"
          value={formik.values.key}
          onChange={formik.handleChange}
          error={formik.touched.key && Boolean(formik.errors.key)}
          helperText={formik.touched.key && formik.errors.key}
        />

        <ColorButton fullWidth type="submit" className={classes.submit}>
          Save
        </ColorButton>
      </form>
    </div>
  );
};

export default ProjectSettingsContent;

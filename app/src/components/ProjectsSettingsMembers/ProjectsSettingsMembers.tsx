import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';

import { ProjectsSettingsMembersProps } from './types';

import './ProjectsSettingsMembers.scss';

const useStyles = makeStyles({
  participants: {
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 10,
  },
  list: {
    width: '100%',
    position: 'relative',
    boxShadow: '0px 0px 10px #d0d0d0',
    borderRadius: '10px',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  lead: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.54)',
    marginTop: 20,
  },
  text: {
    color: 'gray',
  },
  deleteBtn: {
    color: 'gray',
    transition: 'all ease-in-out .2s',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
  },
});

const ProjectsSettingsMembers: React.FC<ProjectsSettingsMembersProps> = ({
  lead,
  currentUser,
  participants,
  formik,
  deleteMember,
}) => {
  const classes = useStyles();

  return (
    <div className="project-settings__members">
      <div className="members__wrapper">
        <Typography variant="caption" className={classes.lead}>
          Lead
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {lead}
        </Typography>

        {currentUser === lead && (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="user"
              name="user"
              label="Invited user"
              type="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
            />
            <button type="submit">Invite</button>
          </form>
        )}

        <Typography variant="caption" className={classes.participants}>
          Participants
        </Typography>
        {participants.length ? (
          <List className={classes.list}>
            {participants.map((participant) => (
              <ListItem key={participant._id}>
                <ListItemText primary={participant.email} />

                {currentUser === lead && (
                  <HighlightOffIcon
                    onMouseUp={() => deleteMember(participant._id)}
                    className={classes.deleteBtn}
                  />
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          'There are no project participants yet.'
        )}
      </div>
    </div>
  );
};

export default ProjectsSettingsMembers;

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { LandingContentProps } from './types';

const useStyles = makeStyles({
  tBody: {
    marginBottom: '20px',
  },
});

const LandingContent: React.FC<LandingContentProps> = ({ handleSignUp }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Welcome to Kanban board.
      </Typography>

      <Typography className={classes.tBody} variant="h5">
        Sigh up now to start assigning tasks and keeping track of your progress.
      </Typography>

      <ColorButton onClick={handleSignUp}>Sign up-it&lsquo;s free!</ColorButton>
    </>
  );
};

export default LandingContent;

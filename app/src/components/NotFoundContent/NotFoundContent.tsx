import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h5: {
    fontWeight: 600,
  },
});

const NotFoundContent = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" className={classes.h5}>
        404 Error Oops!
      </Typography>
      <Typography variant="subtitle1">We can&lsquo;t find that page.</Typography>
    </>
  );
};

export default NotFoundContent;

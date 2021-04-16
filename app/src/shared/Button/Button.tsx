import Button from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    fontSize: '14px',
  },
}))(Button);

export default CustomButton;

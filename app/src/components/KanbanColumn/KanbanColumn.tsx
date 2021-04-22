import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { PropsKanbanColumn } from './types';

import './KanbanColumn.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 600,
    marginLeft: 15,
    color: '#444444',
  },
});

const KanbanColumn: React.FC<PropsKanbanColumn> = ({ columnId, name, children }) => {
  const classes = useStyles();

  return (
    <div className="kanban__column" key={columnId}>
      <Typography className={classes.h6} variant="h6">
        {name}
      </Typography>
      {children}
    </div>
  );
};

export default KanbanColumn;

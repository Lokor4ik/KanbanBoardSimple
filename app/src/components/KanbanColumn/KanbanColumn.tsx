import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { PropsKanbanColumn } from './types';

import './KanbanColumn.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 600,
  },
});

const KanbanColumn: React.FC<PropsKanbanColumn> = ({ columnId, column, children }) => {
  const classes = useStyles();

  return (
    <div className="kanban__column" key={columnId}>
      <Typography className={classes.h6} variant="h6">
        {column.name}
      </Typography>
      {children}
    </div>
  );
};

export default KanbanColumn;

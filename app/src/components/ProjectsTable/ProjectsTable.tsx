import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ProjectsTableProps } from './types';

const useStyles = makeStyles({
  tableContainer: {
    overflowY: 'auto',
    height: 700,
    marginTop: 20,
  },
  table: {
    minWidth: 650,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  tableHeaderCell: {
    fontWeight: 600,
    color: '#5a5a5a',
    fontSize: 13,
    paddingBottom: 8,
  },
  tableCell: {
    borderBottom: 'none',
  },
  tableCellProject: {
    cursor: 'pointer',
    transition: 'all easy-in-out .2s',
    '&:hover': {
      color: '#9c27b0',
    },
  },
});

const ProjectsTable: React.FC<ProjectsTableProps> = ({ rows, fetchProject }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Key</TableCell>
            <TableCell className={classes.tableHeaderCell}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell
                className={`${classes.tableCell} ${classes.tableCellProject}`}
                onClick={() => fetchProject(row._id)}
              >
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.key}</TableCell>
              <TableCell className={classes.tableCell}>
                {moment(row.createdAt).format('YYYY-MM-DD hh:mm:ss A')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;

import { ProjectsRows } from 'store/projects/types';

export type ProjectsTableProps = {
  rows: ProjectsRows;
  fetchProject: (id: string) => void;
};

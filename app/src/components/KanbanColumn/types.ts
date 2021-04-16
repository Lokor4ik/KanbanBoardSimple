import { PropsKanbanColumnContent } from 'components/KanbanColumnContent/types';

export type PropsKanbanColumn = PropsKanbanColumnContent & {
  children: React.ReactNode;
};

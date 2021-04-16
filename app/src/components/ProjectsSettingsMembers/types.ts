import { FormikValues } from 'formik';

import { ProjectParticipants } from 'store/projects/types';

export interface ProjectsSettingsMembersProps {
  lead: string;
  currentUser: string;
  formik: FormikValues;
  participants: ProjectParticipants;
  deleteMember: (id: string) => void;
}

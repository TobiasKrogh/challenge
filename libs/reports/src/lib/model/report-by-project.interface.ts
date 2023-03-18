import { IProject, IReport } from '@challenge/api';

export interface IReportByProject {
  data: IReport[];
  open: boolean;
  project: IProject;
  total: number;
}

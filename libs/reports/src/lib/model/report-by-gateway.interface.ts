import { IGateway, IReport } from '@challenge/api';

export interface IReportByGateway {
  data: IReport[];
  gateway: IGateway;
  open: boolean;
  total: number;
}

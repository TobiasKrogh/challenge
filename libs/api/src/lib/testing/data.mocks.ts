import {
  IGateway,
  IGatewaysResponse,
  IProject,
  IProjectsResponse,
  IReport,
  IReportResponse,
  IUser,
  IUsersResponse,
} from '../model';

export const MOCK_GATEWAY: IGateway = {
  apiKey: 'apiKey',
  description: 'description',
  gatewayId: 'gatewayId',
  name: 'name',
  secondaryApiKey: 'secondaryApiKey',
  type: 'type',
  userIds: ['userId'],
};

export const MOCK_GATEWAYS_RESPONSE: IGatewaysResponse = {
  code: '200',
  data: [MOCK_GATEWAY],
  error: null,
};

export const MOCK_PROJECT: IProject = {
  description: 'description',
  gatewayIds: ['gatewayId'],
  image: 'image',
  industry: 'industry',
  name: 'name',
  projectId: 'projectId',
  rule: 'rule',
  structure: 'structure',
  userIds: ['userId'],
  website: 'website',
};

export const MOCK_PROJECTS_RESPONSE: IProjectsResponse = {
  code: '200',
  data: [MOCK_PROJECT],
  error: null,
};

export const MOCK_REPORT: IReport = {
  amount: 50,
  created: 'date',
  gatewayId: 'gatewayId',
  modified: 'date',
  paymentId: 'paymentId',
  projectId: 'projectId',
  userIds: ['userId'],
};

export const MOCK_REPORT_RESPONSE: IReportResponse = {
  code: '200',
  data: [MOCK_REPORT],
  error: null,
};

export const MOCK_USER: IUser = {
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  userId: 'userId',
};

export const MOCK_USERS_RESPONSE: IUsersResponse = {
  code: '200',
  data: [MOCK_USER],
  error: null,
};

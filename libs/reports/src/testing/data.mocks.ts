import { IGateway, IProject, IReport } from '@challenge/api';

export const MOCK_GATEWAY: IGateway = {
  apiKey: 'apiKey',
  description: 'description',
  gatewayId: 'gatewayId',
  name: 'name',
  secondaryApiKey: 'secondaryApiKey',
  type: 'type',
  userIds: ['userId'],
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

export const MOCK_REPORT: IReport = {
  amount: 50,
  created: 'date',
  gatewayId: 'gatewayId',
  modified: 'date',
  paymentId: 'paymentId',
  projectId: 'projectId',
  userIds: ['userId'],
};

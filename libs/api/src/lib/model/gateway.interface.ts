export interface IGateway {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
}

export type TIndexedGateways = { [gatewayId: string]: IGateway };

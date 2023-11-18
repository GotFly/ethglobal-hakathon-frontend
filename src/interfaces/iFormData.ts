import { iNetworkInfo, iTokenInfo } from './iNetwork';

export interface iFormData {
  amount: string;
  route: iNetworkInfo | null;
  crypto: iTokenInfo | null;
  approvalAddress: string | null;
}

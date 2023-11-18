export interface iTransactionData {
  to: string;
  data: string;
  gasPrice: string | null;
  gasLimit: string | null;
  value: string | null;
  chainId: string;
  approvalAddress: string;
}


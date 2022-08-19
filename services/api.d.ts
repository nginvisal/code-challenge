export interface CreateSigner {
  name: string;
  npwp: string;
  statusTaxpayer: string;
  signatory: string;
  defaultSignatory: boolean;
}

export interface SignerData {
  id?: string;
  name: string;
  npwp: string;
  statusTaxpayer: string;
  signatory: string;
  defaultSignatory: boolean;
}
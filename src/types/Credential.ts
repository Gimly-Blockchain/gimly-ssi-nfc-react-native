import type { CredentialSubject, CredentialStatus, Proof } from './index';

export type Credential = {
  '@context': string[];
  'fileName'?: string;
  'id': string;
  'type': string[];
  'credentialSubject': CredentialSubject;
  'issuer': string|{ id: string };
  'issuanceDate': string;
  'expirationDate'?: string;
  'credentialStatus'?: CredentialStatus;
  'proof'?: Proof;
};

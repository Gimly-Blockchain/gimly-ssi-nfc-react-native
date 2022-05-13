import type { CredentialSubject, CredentialStatus, Proof } from './index'

export type VerifiableCredential = {
  issuanceDate: string,
  proof?: Proof,
  "@context": string[],
  id: string,
  type: string[],
  credentialSubject: CredentialSubject,
  issuer: string,
  expirationDate?: string,
  credentialStatus?: CredentialStatus,
};

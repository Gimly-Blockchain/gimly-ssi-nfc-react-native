import type { CredentialSubject, CredentialStatus, Proof } from './index'

export type VerifiableCredential = {
  issuanceDate: string,
  proof: Proof,
  "@context": [],
  id: string,
  type: [],
  credentialSubject: CredentialSubject,
  issuer: string,
  expirationDate: string,
  credentialStatus: CredentialStatus,
};

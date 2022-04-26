import type { CredentialSubject, CredentialStatus, Proof } from './index'

export type VerifiableCredential = {
  issuanceDate: String,
  proof: Proof,
  "@context": [],
  id: String,
  type: [],
  credentialSubject: CredentialSubject,
  issuer: String,
  expirationDate: String,
  credentialStatus: CredentialStatus,
};
import type { CredentialSubject, CredentialStatus } from './index'

export type Credential = {
  "@context": [],
  id: String,
  type: [],
  credentialSubject: CredentialSubject,
  issuer: String,
  issuanceDate: String,
  expirationDate: String,
  credentialStatus: CredentialStatus,
};
import type { CredentialSubject, CredentialStatus, Proof } from './index'

export type Credential = {
  "@context": string[],
  id: string,
  type: string[],
  credentialSubject: CredentialSubject,
  issuer: string,
  issuanceDate: string,
  expirationDate: string,
  credentialStatus: CredentialStatus,
  proof: Proof // TODO: added becouse test was ussing this parameter
};

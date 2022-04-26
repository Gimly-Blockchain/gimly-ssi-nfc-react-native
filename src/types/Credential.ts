import type { CredentialSubject, CredentialStatus } from './index'

export type Credential = {
  "@context": string[],
  id: string,
  type: string[],
  credentialSubject: CredentialSubject,
  issuer: string,
  issuanceDate: string,
  expirationDate: string,
  credentialStatus: CredentialStatus,
  proof: { // TODO: added becouse test was ussing this parameter
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    jws: string;
  }
};

import type { VerifiableCredential } from './index';

export type SignCredentialResponse = {
  verifiableCredential: VerifiableCredential,
  storageId: String,
};
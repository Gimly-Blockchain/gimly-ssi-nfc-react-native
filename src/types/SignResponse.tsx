import type { SignOutputFromInput } from './index';

export type SignResponse = {
  publicKeyMultibase: String,
  signatures: SignOutputFromInput[]
};
import type { SignOutputFromInput } from './index';

export type SignResponse = {
  publicKeyMultibase: string | undefined,
  signatures: SignOutputFromInput[]
};

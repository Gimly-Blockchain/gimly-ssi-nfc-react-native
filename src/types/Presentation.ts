import type { VerifiableCredential } from './index'

export type Presentation = {
  "@context": string[],
  type: string,
  verifiableCredential: VerifiableCredential[]
};

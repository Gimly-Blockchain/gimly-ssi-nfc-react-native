import type { VerifiableCredential, Proof } from './index'

export type VerifiablePresentation = {
  proof: Proof,
  "@context": string[],
  type: string,
  verifiableCredential: VerifiableCredential[]
};

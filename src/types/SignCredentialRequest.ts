import type { Credential } from './index'

export type SignCredentialRequest = {
  credential: Credential,
  store: Boolean,
};
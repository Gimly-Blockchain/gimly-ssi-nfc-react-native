import type { Credential } from './index';

export type SignCredentialRequest = {
  credential: Credential;
  controller: string;
  store: Boolean;
};

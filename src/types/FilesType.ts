import type { SuccessResponse } from 'tangem-sdk';
import type {
  Credential,
  StoredCredentialsResponse,
} from './index';

export type FilesType = {
  storeCredential: (credential: Credential, fileName: string) => Promise<SuccessResponse | null>
  getStoredCredentials: () => Promise<StoredCredentialsResponse | null>;
  getStoredCredential: (fileName: string) => Promise<StoredCredentialsResponse | null>;
  deleteStoredCredential: (credentialId: string) => Promise<SuccessResponse | null>;
};

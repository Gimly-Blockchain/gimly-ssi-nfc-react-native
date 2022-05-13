import type { VerifiableCredential } from './index';

export type Presentation = {
  '@context': string[];
  'type': string|string[];
  'verifiableCredential': VerifiableCredential[];
  'id'?: string;
  'holder'?: string;
};

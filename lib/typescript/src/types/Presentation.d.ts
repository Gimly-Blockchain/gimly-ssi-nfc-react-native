import type { VerifiableCredential } from './index';
export declare type Presentation = {
    "@context": string[];
    type: string;
    verifiableCredential: VerifiableCredential[];
};

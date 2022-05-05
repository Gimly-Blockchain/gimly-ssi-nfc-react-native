import type { VerifiableCredential, Proof } from './index';
export declare type VerifiablePresentation = {
    proof: Proof;
    "@context": string[];
    type: string;
    verifiableCredential: VerifiableCredential[];
};

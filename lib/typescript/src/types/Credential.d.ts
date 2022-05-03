import type { CredentialSubject, CredentialStatus, Proof } from './index';
export declare type Credential = {
    "@context": string[];
    id: string;
    type: string[];
    credentialSubject: CredentialSubject;
    issuer: string;
    issuanceDate: string;
    expirationDate: string;
    credentialStatus: CredentialStatus;
    proof: Proof;
};

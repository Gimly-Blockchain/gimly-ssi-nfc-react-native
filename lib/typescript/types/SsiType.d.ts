import type { SignRequest, SignResponse, SignCredentialRequest, SignCredentialResponse, SignPresentationRequest, SignPresentationResponse } from './index';
export declare type SsiType = {
    signUsingKey: (signRequest: SignRequest, keyId?: string | undefined) => Promise<SignResponse>;
    signCredential: (signCredentialRequest: SignCredentialRequest, keyId?: string | undefined) => Promise<SignCredentialResponse | null>;
    signPresentation: (signPresentationRequest: SignPresentationRequest, keyId?: string | undefined) => Promise<SignPresentationResponse>;
};

import type { SignOutputFromInput } from './index';
export declare type SignResponse = {
    publicKeyMultibase: string | undefined;
    signatures: SignOutputFromInput[];
};

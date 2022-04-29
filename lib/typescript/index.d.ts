import type { EmitterSubscription } from 'react-native';
import type { Card, CreateWalletResponse, NFCStatusResponse, EllipticCurve, InitialMessage, SignResponse, PurgeWalletResponse, SetUserCodesResponse } from 'tangem-sdk-react-native';
export declare const NfcSdkModule: import("tangem-sdk-react-native").TangemSdk;
export default class NfcSdk {
    static scanCard(initialMessage?: InitialMessage): Promise<Card>;
    static createKey(cardId: string, curve?: EllipticCurve, initialMessage?: InitialMessage): Promise<CreateWalletResponse | null>;
    static deactivateKey(): Promise<void>;
    static getKey(initialMessage: InitialMessage, cardId: string, keyId: string): Promise<Card>;
    static getKeys(initialMessage: InitialMessage, cardId?: string): Promise<Card>;
    static signCredential(hashes: [string], walletPublicKey: string, cardId: string, initialMessage: InitialMessage): Promise<SignResponse | null>;
    static signPresentation(hashes: [string], walletPublicKey: string, cardId: string, initialMessage: InitialMessage): Promise<SignResponse | null>;
    static signUsingKey(hashes: [string], walletPublicKey: string, cardId: string, initialMessage: InitialMessage): Promise<SignResponse | null>;
    static startSession(): Promise<void>;
    static stopSession(): Promise<void>;
    static sign(hashes: [string], walletPublicKey: string, cardId: string, initialMessage: InitialMessage): Promise<SignResponse | null>;
    static getStatus(): Promise<NFCStatusResponse>;
    static createWallet(cardId: string): Promise<CreateWalletResponse | null>;
    static purgeWallet(cardId: string, walletPublicKey: string): Promise<PurgeWalletResponse | null>;
    static setPassCode(cardId: string): Promise<SetUserCodesResponse | null>;
    static setAccessCode(cardId: string): Promise<SetUserCodesResponse | null>;
    static resetUserCodes(cardId: string): Promise<SetUserCodesResponse | null>;
    static nfcListener(): EmitterSubscription | undefined;
    static removeNfcListener(listener: EmitterSubscription): boolean;
}

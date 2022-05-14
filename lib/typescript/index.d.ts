import type { CardInfoResult, KeyInfo, KeyResults, SignCredentialRequest, SignCredentialResponse, SignPresentationRequest, SignPresentationResponse, SignRequest, SignResponse, StoredCredentialsResponse, WalletType, SsiType, FilesType, Message, SuccessResponse } from './types';
export declare const NfcSdkModule: import("tangem-sdk").TangemSdk;
export default class NfcSdk {
    /**
     *  Constructor for reusable parameters
     *
     * @param cardId the card identifier is store globally
     * @returns nothing
     */
    static cardId: string;
    static keyId: string;
    /**
     * Scan the NFC card
     *
     * @param initialMessage The message to display
     * @returns The card information retrieved with the scan
     */
    static scanCard(initialMessage?: Message): Promise<CardInfoResult>;
    /**
     * Create an asymmetric keypair on the NFC card
     *
     * @param curve A string with the elliptic Curve
     * @returns The results of the created key
     */
    static createKey(curve: string): Promise<KeyResults>;
    /**
     * Deactivate a key by card index, public key, or DID key
     *
     * @param keyId The Key index, public key, or DID/Verification method Key ID
     * @returns null
     */
    static deactivateKey(keyId?: string): Promise<SuccessResponse | null>;
    /**
     * Get all the keys of the card
     *
     * @param initialMessage The message to display
     * @returns The keys retrieved from the card
     */
    static getKeys(initialMessage: Message): Promise<KeyResults>;
    /**
     * Get a key by keyId
     *
     * @param initialMessage The message to display
     * @param keyId The Id of a key
     * @returns The key retrieved from the card
     */
    static getKey(initialMessage: Message, keyId?: string): Promise<KeyInfo | null>;
    /**
     * Sign one or more inputs using the private key stored on the NFC card
     *
     * @param keyId The Id of a key
     * @param signRequest Sign one or more inputs, typically hashes in hex format
     * @returns A successful response after signing or an error
     */
    static signUsingKey(signRequest: SignRequest, keyId?: string): Promise<SignResponse>;
    /**
     * Add a proof to the supplied credential, using the private key on the NFC card and thus making
     * it a Verifiable Credential. It allows for optional storage of the VC on the NFC card
     *
     * @param signCredentialRequest Signs one or more inputs, typically hashes in hex format
     * @param keyId The Id of a key
     * @param controller The DID of the controller
     * @returns A success response after signing
     */
    static signCredential(signCredentialRequest: SignCredentialRequest, keyId?: string): Promise<SignCredentialResponse | null>;
    /**
     * Verify a credential
     *
     * @param signedCredential a signed credential
     * @returns wheter the credential is valid or not
     */
    static verifyCredential(signCredentialRequest: SignCredentialRequest): Promise<boolean | null>;
    /**
     * Sign the supplied presentation using the key on the NFC card, adding a proof and making it
     * a verifiable presentation
     *
     * @param signPresentationRequest Signs a presentation
     * @param keyId The Id of a key
     * @param controller The DID of the controller
     * @param challenge The presentation challenge
     * @returns A successful response after signing
     */
    static signPresentation(signPresentationRequest: SignPresentationRequest, keyId?: string): Promise<SignPresentationResponse>;
    /**
     * Verifies a presentation
     *
     * @param signedPresentation A signed presentation
     * @returns wheter the credential is valid or not
     */
    static verifyPresentation(signPresentationRequest: SignPresentationRequest): Promise<boolean | null>;
    /**
     * Store a credential
     *
     * @param credential The credential to be stored
     * @param fileName The file name
     * @returns A success response or null
     */
    static storeCredential(credential: any, fileName: string): Promise<SuccessResponse | null>;
    /**
     * Delete a specific stored Verifiable Credential
     *
     * @param fileName The file name of a credential
     * @returns A successful response or null
     */
    static deleteStoredCredential(fileName: string): Promise<SuccessResponse | null>;
    /**
     * Return all the stored Verifiable Credentials
     *
     * @returns The stored credentials
     */
    static getStoredCredentials(): Promise<StoredCredentialsResponse>;
    /**
     * Return a specific stored Verifiable Credential
     *
     * @param fileName The file name of a credential
     * @returns The stored credential or null
     */
    static getStoredCredential(fileName: string): Promise<StoredCredentialsResponse | null>;
    /**
     * Set an access code on the card, if set all commands, including Scan Card, will require to submit this code
     *
     * @param accessCode The access code
     * @returns A success response or null
     */
    static setAccessCode(accessCode: string): Promise<SuccessResponse | null>;
    /**
     * Set a passcode. Passcode protects signing and operations that can alter security parameters
     *
     * @param passcode The pass code
     * @returns A success response or null
     */
    static setPasscode(passcode: string): Promise<SuccessResponse | null>;
    /**
     * Reset both access code and passcode if they were set
     *
     * @returns A success response or null
     */
    static resetUserCodes(): Promise<SuccessResponse | null>;
    /**
     * Exposes public methods related to wallet operations
     */
    static wallet: WalletType;
    /**
     * Exposes public methods related to ssi operation
     */
    static ssi: SsiType;
    /**
     * Exposes public methods related to wallet operations
     */
    static files: FilesType;
}
export * from './types';
export { EllipticCurve } from 'tangem-sdk';

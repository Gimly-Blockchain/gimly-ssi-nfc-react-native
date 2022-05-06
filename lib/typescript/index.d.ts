import type { SuccessResponse, Message } from 'tangem-sdk-react-native';
import type { CardInfoResult, KeyInfo, KeyResults, SignCredentialRequest, SignCredentialResponse, SignPresentationRequest, SignPresentationResponse, SignRequest, SignResponse, StoredCredentialsResponse, StoredCredentialResponse } from './types';
export declare const NfcSdkModule: import("tangem-sdk-react-native").TangemSdk;
export default class NfcSdk {
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
     * @param cardId The Id of a card
     * @param curve A string with the elliptic Curve
     * @returns The results of the created key
     */
    static createKey(cardId: string, curve: string): Promise<KeyResults>;
    /**
     * Deactivate a key by card index, public key, or DID key
     *
     * @param cardId The Id of a card
     * @param keyId The Key index, public key, or DID/Verification method Key ID
     * @returns null
     */
    static deactivateKey(cardId: string, keyId: string): Promise<SuccessResponse | null>;
    /**
     * Get all keys by card Id
     *
     * @param initialMessage The message to display
     * @param cardId The Id of a card
     * @returns The keys retrieved from the card
     */
    static getKeys(initialMessage: Message, cardId?: string): Promise<KeyResults>;
    /**
     * Get a key by Card Id and keyId
     *
     * @param initialMessage The message to display
     * @param cardId The Id of a card
     * @param keyId The Id of a key
     * @returns The key retrieved from the card
     */
    static getKey(initialMessage: Message, cardId: string, keyId: string): Promise<KeyInfo | null>;
    /**
     * Sign one or more inputs using the private key stored on the NFC card
     *
     * @param keyId The Id of a key
     * @param signRequest Sign one or more inputs, typically hashes in hex format
     * @param cardId The Id of a card
     * @returns A successful response after signing or an error
     */
    static signUsingKey(keyId: string, signRequest: SignRequest, cardId: string): Promise<SignResponse>;
    /**
     * Add a proof to the supplied credential, using the private key on the NFC card and thus making it a Verifiable Credential. It allows for optional storage of the VC on the NFC card
     *
     * @param keyId The Id of a key
     * @param signCredentialRequest Signs one or more inputs, typically hashes in hex format
     * @param cardId The Id of a card
     * @returns A success response after signing
     */
    static signCredential(keyId: string, signCredentialRequest: SignCredentialRequest, cardId: string): Promise<SignCredentialResponse | null>;
    /**
     * Sign the supplied presentation using the key on the NFC card, adding a proof and making it a verifiable presentation
     *
     * @param keyId The Id of a key
     * @param signPresentationRequest Signs a presentation
     * @param cardId The Id of a card
     * @returns A successful response after signing
     */
    static signPresentation(keyId: string, signPresentationRequest: SignPresentationRequest, cardId: string): Promise<SignPresentationResponse>;
    /**
     * Delete a specific stored Verifiable Credential
     *
     * @param credentialId The Id of a credential
     * @param cardId The Id of a card
     * @returns A successful response or null
     */
    static deleteStoredCredential(credentialId: string, cardId: string): Promise<SuccessResponse | null>;
    /**
     * Return all the stored Verifiable Credentials
     *
     * @param cardId The Id of a card
     * @returns The stored credentials
     */
    static getStoredCredentials(cardId: string): Promise<StoredCredentialsResponse>;
    /**
     * Return a specific stored Verifiable Credential
     *
     * @param cardId The Id of a card
     * @param credentialId  The Id of a credential
     * @returns The stored credential or null
     */
    static getStoredCredential(cardId: string, credentialId: string): Promise<StoredCredentialResponse | null>;
    /**
     * Set an access code on the card, if set all commands, including Scan Card, will require to submit this code
     *
     * @param accessCode The access code
     * @param cardId The Id of a card
     * @returns A success response or null
     */
    static setAccessCode(accessCode: string, cardId: string): Promise<SuccessResponse | null>;
    /**
     * Set a passcode. Passcode protects signing and operations that can alter security parameters
     *
     * @param passcode The pass code
     * @param cardId The Id of a card
     * @returns A success response or null
     */
    static setPasscode(passcode: string, cardId: string): Promise<SuccessResponse | null>;
    /**
     * Reset both access code and passcode if they were set
     *
     * @param cardId The Id of a card
     * @returns A success response or null
     */
    static resetUserCodes(cardId: string): Promise<SuccessResponse | null>;
}
export * from './types';
export { EllipticCurve } from 'tangem-sdk-react-native';

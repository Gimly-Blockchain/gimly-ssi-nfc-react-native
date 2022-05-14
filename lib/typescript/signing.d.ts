import 'text-encoding-polyfill';
import type { Credential, Presentation } from './types';
export default class Sign {
    /**
     * Gets the suit required to sign
     *
     * @param cardId the card Id
     * @param keyId the public key
     * @returns The suit
     */
    private static getSuite;
    /**
     * Gets the document
     *
     * @param url the document url
     * @returns The suit
     */
    private static documentLoader;
    /**
     * Sign the credential
     *
     * @param
     * @returns The signed credential
     */
    static credential(unsignedCredential: Credential, keyId: string, cardId: string, controller: string): Promise<any>;
    /**
     * Sign the presentation
     *
     * @param
     * @returns The signed presentation
     */
    static presentation(presentation: Presentation, keyId: string, cardId: string, controller: string, challenge: string): Promise<any>;
    /**
     * Verify a credential
     *
     * Currently in development
     *
     * @param signedVC a signed credential
     * @returns wheter the credential is valid or not
     */
    static verifyCredential(signedVC: Credential, keyId: string, cardId: string, controller: string): Promise<any>;
    /**
     * Verify a presentation
     *
     * Currently in development
     *
     * @param signedPresentation a signed presentation
     * @returns wheter the presentation is valid or not
     */
    static verifyPresentation(signedPresentation: Presentation, keyId: string, cardId: string, controller: string, challenge: string): Promise<any>;
}

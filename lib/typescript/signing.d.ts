import type { Credential, Presentation } from './types';
export default class Sign {
    /**
   * Gets the suit required to sign
   *
   * @param
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
    static credential(unsignedCredential: Credential, keyId: string): Promise<any>;
    /**
   * Sign the presentation
   *
   * @param
   * @returns The signed presentation
   */
    static presentation(presentation: Presentation, keyId: string): Promise<any>;
    /**
   * Verify a credential
   *
   * Currently in development
   *
   * @param signedVC a signed credential
   * @returns wheter the credential is valid or not
   */
    static verfyCredential(signedVC: any, keyId: string): Promise<any>;
}

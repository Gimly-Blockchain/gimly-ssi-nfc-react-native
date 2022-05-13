// @ts-ignore
import vc from '@digitalcredentials/vc';
// @ts-ignore
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
// @ts-ignore
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
// @ts-ignore
import { UniResolver } from '@sphereon/did-uni-client';
// @ts-ignore
import documentLoaderXhr from '@digitalcredentials/jsonld/lib/documentLoaders/xhr';
// @ts-ignore
import { frame } from '@digitalcredentials/jsonld';
// @ts-ignore
import jsonld from '@digitalcredentials/jsonld';

import type { Credential, Presentation } from './types';

export default class Sign {
    /**
   * Gets the suit required to sign
   *
   * @param
   * @returns The suit
   */
    private static async getSuite(keyId: string) {
    // TODO This suite is just for testing purposes
        const controller = 'https://example.edu/issuers/565049';

        const keyPair = await Ed25519VerificationKey2020.from({
            type: 'Ed25519VerificationKey2020',
            controller,
            id: controller + '#' + keyId,
            publicKeyMultibase: keyId,
        });

        const suite = new Ed25519Signature2020({ key: keyPair });
        suite.date = '2010-01-01T19:23:24Z';

        return suite;
    }

    /**
   * Gets the document
   *
   * @param url the document url
   * @returns The suit
   */
    private static async documentLoader(url: string) {
        if (url.startsWith('did:')) {
            const didResolver = new UniResolver();
            const result = await didResolver.resolve(url);

            if (result.didResolutionMetadata.error || !result.didDocument) {
                throw new Error(`Unable to resolve DID: ${url}`);
            }

            const framed = await frame(
                'https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/lds-ecdsa-secp256k1-recovery2020-0.0.jsonld',
                {
                    '@context': result.didDocument['@context'],
                    '@embed': '@never',
                    'id': url,
                }
            );

            return {
                contextUrl: null,
                documentUrl: url,
                document: framed,
            };
        }

        const loader = documentLoaderXhr.apply(jsonld, []);
        const response = await loader(url);

        return response;
    }

    /**
   * Sign the credential
   *
   * @param
   * @returns The signed credential
   */
    public static async credential(unsignedCredential: Credential, keyId: string): Promise<any> {
        const suite = await this.getSuite(keyId);

        try {
            const signedCredential = await vc.issue({
                credential: unsignedCredential,
                suite,
                documentLoader: this.documentLoader,
            });

            return signedCredential;
        } catch (err: any) { //TODO improve error handling
            throw new Error(err.message);
        }
    }

    /**
   * Sign the presentation
   *
   * @param
   * @returns The signed presentation
   */
    public static async presentation(presentation: Presentation, keyId: string): Promise<any> {
        const suite = await this.getSuite(keyId);
        const challenge = '1234';

        try {
            const signedPresentation = await vc.signPresentation({
                presentation,
                suite,
                challenge,
                documentLoader: this.documentLoader,
            });

            return signedPresentation;
        } catch (err: any) { //TODO improve error handling
            throw new Error(err.message);
        }
    }

    /**
   * Verify a credential
   *
   * Currently in development
   *
   * @param signedVC a signed credential
   * @returns wheter the credential is valid or not
   */
    public static async verfyCredential(signedVC: any, keyId: string): Promise<any> {
        const suite = await this.getSuite(keyId);

        const result = await vc.verifyCredential({
            credential: signedVC,
            suite,
            documentLoader: this.documentLoader,
        });

        return result;
    }
}

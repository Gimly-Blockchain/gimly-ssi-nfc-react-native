// @ts-ignore
import 'text-encoding-polyfill'; // @ts-ignore

import vc from '@digitalcredentials/vc'; // @ts-ignore

import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020'; // @ts-ignore

import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020'; // @ts-ignore

import { UniResolver } from '@sphereon/did-uni-client'; // @ts-ignore

import documentLoaderXhr from '@digitalcredentials/jsonld/lib/documentLoaders/xhr'; // @ts-ignore

import { frame } from '@digitalcredentials/jsonld'; // @ts-ignore

import jsonld from '@digitalcredentials/jsonld'; // @ts-ignore

import TangemSdk from 'tangem-sdk'; // @ts-ignore

export default class Sign {
  /**
   * Gets the suit required to sign
   *
   * @param cardId the card Id
   * @param keyId the public key
   * @returns The suit
   */
  static async getSuite(cardId, keyId, controller) {
    const keyPair = await Ed25519VerificationKey2020.from({
      type: 'Ed25519VerificationKey2020',
      controller: controller,
      id: controller + '#controllerKey',
      publicKeyMultibase: 'z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T',
      privateKeyMultibase: 'zrv2EET2WWZ8T1Jbg4fEH5cQxhbUS22XxdweypUbjWVzv1YD6VqYu' + 'W6LH7heQCNYQCuoKaDwvv2qCWz3uBzG2xesqmf'
    });
    const suite = new Ed25519Signature2020({
      key: keyPair
    });
    suite.signer = {
      async sign(_ref) {
        let {
          data
        } = _ref;
        console.log('data', data.toString('hex'));
        const response = await TangemSdk.signHashes([data.toString('hex')], keyId, cardId);
        console.log('response', response);
        return data;
      },

      id: keyPair.id
    };
    suite.date = new Date().toISOString();
    return suite;
  }
  /**
   * Gets the document
   *
   * @param url the document url
   * @returns The suit
   */


  static async documentLoader(url) {
    if (url && url.startsWith('did:')) {
      const didResolver = new UniResolver();
      const result = await didResolver.resolve(url);

      if (result.didResolutionMetadata.error || !result.didDocument) {
        throw new Error(`Unable to resolve DID: ${url}`);
      }

      const framed = await frame(result.didDocument, {
        '@context': result.didDocument['@context'],
        '@embed': '@never',
        'id': url
      });
      return {
        contextUrl: null,
        documentUrl: url,
        document: framed
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


  static async credential(unsignedCredential, keyId, cardId, controller) {
    const suite = await this.getSuite(cardId, keyId, controller);
    const signedCredential = await vc.issue({
      credential: unsignedCredential,
      suite,
      documentLoader: this.documentLoader
    });
    return signedCredential;
  }
  /**
   * Sign the presentation
   *
   * @param
   * @returns The signed presentation
   */


  static async presentation(presentation, keyId, cardId, controller, challenge) {
    const suite = await this.getSuite(cardId, keyId, controller);

    try {
      const signedPresentation = await vc.signPresentation({
        presentation,
        suite,
        challenge,
        documentLoader: this.documentLoader
      });
      return signedPresentation;
    } catch (err) {
      //TODO improve error handling
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


  static async verifyCredential(signedVC, keyId, cardId, controller) {
    const suite = await this.getSuite(cardId, keyId, controller);
    const result = await vc.verifyCredential({
      credential: signedVC,
      suite,
      documentLoader: this.documentLoader
    });
    return result;
  }
  /**
   * Verify a presentation
   *
   * Currently in development
   *
   * @param signedPresentation a signed presentation
   * @returns wheter the presentation is valid or not
   */


  static async verifyPresentation(signedPresentation, keyId, cardId, controller, challenge) {
    const suite = await this.getSuite(cardId, keyId, controller);
    const result = await vc.verify({
      presentation: signedPresentation,
      challenge,
      suite,
      documentLoader: this.documentLoader
    });
    return result;
  }

}
//# sourceMappingURL=signing.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("text-encoding-polyfill");

var _vc = _interopRequireDefault(require("@digitalcredentials/vc"));

var _ed25519VerificationKey = require("@digitalcredentials/ed25519-verification-key-2020");

var _ed25519Signature = require("@digitalcredentials/ed25519-signature-2020");

var _didUniClient = require("@sphereon/did-uni-client");

var _xhr = _interopRequireDefault(require("@digitalcredentials/jsonld/lib/documentLoaders/xhr"));

var _jsonld = _interopRequireWildcard(require("@digitalcredentials/jsonld"));

var _tangemSdk = _interopRequireDefault(require("tangem-sdk"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
class Sign {
  /**
   * Gets the suit required to sign
   *
   * @param cardId the card Id
   * @param keyId the public key
   * @returns The suit
   */
  static async getSuite(cardId, keyId, controller) {
    const keyPair = await _ed25519VerificationKey.Ed25519VerificationKey2020.from({
      type: 'Ed25519VerificationKey2020',
      controller: controller,
      id: controller + '#controllerKey',
      publicKeyMultibase: 'z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T',
      privateKeyMultibase: 'zrv2EET2WWZ8T1Jbg4fEH5cQxhbUS22XxdweypUbjWVzv1YD6VqYu' + 'W6LH7heQCNYQCuoKaDwvv2qCWz3uBzG2xesqmf'
    });
    const suite = new _ed25519Signature.Ed25519Signature2020({
      key: keyPair
    });
    suite.signer = {
      async sign(_ref) {
        let {
          data
        } = _ref;
        console.log('data', data.toString('hex'));
        const response = await _tangemSdk.default.signHashes([data.toString('hex')], keyId, cardId);
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
      const didResolver = new _didUniClient.UniResolver();
      const result = await didResolver.resolve(url);

      if (result.didResolutionMetadata.error || !result.didDocument) {
        throw new Error(`Unable to resolve DID: ${url}`);
      }

      const framed = await (0, _jsonld.frame)(result.didDocument, {
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

    const loader = _xhr.default.apply(_jsonld.default, []);

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
    const signedCredential = await _vc.default.issue({
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
      const signedPresentation = await _vc.default.signPresentation({
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
    const result = await _vc.default.verifyCredential({
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
    const result = await _vc.default.verify({
      presentation: signedPresentation,
      challenge,
      suite,
      documentLoader: this.documentLoader
    });
    return result;
  }

}

exports.default = Sign;
//# sourceMappingURL=signing.js.map
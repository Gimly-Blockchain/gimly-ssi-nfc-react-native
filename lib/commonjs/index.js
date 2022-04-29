"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NfcSdkModule = void 0;

var _tangemSdkReactNative = _interopRequireDefault(require("tangem-sdk-react-native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NfcSdkModule = _tangemSdkReactNative.default;
exports.NfcSdkModule = NfcSdkModule;

class NfcSdk {
  static async scanCard(initialMessage) {
    return await _tangemSdkReactNative.default.scanCard({
      initialMessage
    });
  }

  static async createKey(cardId, curve, initialMessage) {
    return await _tangemSdkReactNative.default.createWallet({
      cardId,
      curve,
      initialMessage
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }
  /* TODO:
      -  Can't find correlation on this method between terminal and tangem
  */


  static async deactivateKey() {}
  /*TODO: 
      - Method should be tested with real card.
  */


  static async getKey(initialMessage, cardId, keyId) {
    let key = null;
    const cards = await _tangemSdkReactNative.default.scanCard({
      initialMessage
    });

    if (cards) {
      const card = cards.filter(card => card.id === cardId);

      if (card) {
        key = card.wallets.filter(wallet => wallet.id === keyId);
      }
    }

    return key;
  }
  /* TODO: 
      - Method should be tested with real card.
  */


  static async getKeys(initialMessage, cardId) {
    let keys = [];
    const cards = await _tangemSdkReactNative.default.scanCard({
      initialMessage
    });

    if (cards) {
      const card = cards.filter(card => card.id === cardId);

      if (card) {
        keys = card.wallets;
      }
    }

    return keys;
  }
  /* TODO
      - sign method on tangem react native app, accept diferent parameters tha the kotlin version, implemented with react native library parameters
      - unable to identify the difference between signCredential, signPresentation and signUsingKey.
      - implement the three methods, with the same code.
  */


  static async signCredential(hashes, walletPublicKey, cardId, initialMessage) {
    const options = {
      hashes,
      walletPublicKey,
      cardId,
      initialMessage
    };
    return await _tangemSdkReactNative.default.sign(options).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }
  /* TODO
      - sign method on tangem react native app, accept diferent parameters tha the kotlin version, implemented with react native library parameters
      - unable to identify the difference between signCredential, signPresentation and signUsingKey.
      - implement the three methods, with the same code.
  */


  static async signPresentation(hashes, walletPublicKey, cardId, initialMessage) {
    const options = {
      hashes,
      walletPublicKey,
      cardId,
      initialMessage
    };
    return await _tangemSdkReactNative.default.sign(options).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }
  /* TODO
      - sign method on tangem react native app, accept diferent parameters tha the kotlin version, implemented with react native library parameters
      - unable to identify the difference between signCredential, signPresentation and signUsingKey.
      - implement the three methods, with the same code.
  */


  static async signUsingKey(hashes, walletPublicKey, cardId, initialMessage) {
    const options = {
      hashes,
      walletPublicKey,
      cardId,
      initialMessage
    };
    return await _tangemSdkReactNative.default.sign(options).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }
  /* TODO:
      - current "tangem-sdk-react-native" library does not have method "deleteFiles" however it seems to be implemented on this version:
      - https://github.com/tangem/tangem-sdk-react-native/blob/main/src/index.ts
  */

  /*public static async deleteStoredCredential(
      indicesToDelete: [number],
      cardId: string,
      initialMessage: InitialMessage
  ) Promise<any | null> {
      return await TangemSdk.deleteFiles({ indicesToDelete, cardId, initialMessage })
          .then(response => {
              return response;
          })
          .catch(() => {
              return null;
          });
  }*/

  /* TODO:
      - current "tangem-sdk-react-native" library does not have method "readFiles" however it seems to be implemented on this version:
      - https://github.com/tangem/tangem-sdk-react-native/blob/main/src/index.ts
  */

  /*public static async getStoredCredentials(
      readPrivateFiles: boolean,
      indices: [number],
      cardId: string,
      initialMessage: InitialMessage
  ) Promise<any | null> {
      return await TangemSdk.readFiles({ readPrivateFiles, indices, cardId, initialMessage })
          .then(response => {
              return response;
          })
          .catch(() => {
              return null;
          });
  }*/

  /* TODO:
      - current "tangem-sdk-react-native" library does not have method "readFiles" however it seems to be implemented on this version:
      - https://github.com/tangem/tangem-sdk-react-native/blob/main/src/index.ts
  */

  /*public static async getStoredCredential(
      readPrivateFiles: boolean,
      indices: [number],
      cardId: string,
      initialMessage: InitialMessage,
      credentialId: string,
  ) Promise<any | null> {
      const files = getStoredCredentials(readPrivateFiles, indices, cardId, initialMessage)
      return credentials.filter(cred => cred.id === credentialId )
          
  }*/

  /* LEGACY METHODS CURRETLY IN USE IN GIMLY-MOBILE, REMOVING THEN WILL BREAK THE MOBILE APP */


  static async startSession() {
    await _tangemSdkReactNative.default.startSession({});
  }

  static async stopSession() {
    await _tangemSdkReactNative.default.stopSession();
  }

  static async sign(hashes, walletPublicKey, cardId, initialMessage) {
    const options = {
      hashes,
      walletPublicKey,
      cardId,
      initialMessage
    };
    return await _tangemSdkReactNative.default.sign(options).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static async getStatus() {
    return await _tangemSdkReactNative.default.getNFCStatus();
  }

  static async createWallet(cardId) {
    return await _tangemSdkReactNative.default.createWallet({
      cardId
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static async purgeWallet(cardId, walletPublicKey) {
    return await _tangemSdkReactNative.default.purgeWallet({
      cardId,
      walletPublicKey
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static async setPassCode(cardId) {
    return await _tangemSdkReactNative.default.setPasscode({
      cardId
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static async setAccessCode(cardId) {
    return _tangemSdkReactNative.default.setAccessCode({
      cardId
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static async resetUserCodes(cardId) {
    return await _tangemSdkReactNative.default.resetUserCodes({
      cardId
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    });
  }

  static nfcListener() {
    return _tangemSdkReactNative.default.addListener('NFCStateChange', enabled => {
      return enabled;
    });
  }

  static removeNfcListener(listener) {
    if (listener) {
      listener.remove();
      return true;
    }

    return false;
  }

}

exports.default = NfcSdk;
//# sourceMappingURL=index.js.map
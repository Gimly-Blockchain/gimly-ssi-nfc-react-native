import TangemSdk from 'tangem-sdk';
import { EllipticCurve, FileVisibility, OwnerFile } from 'tangem-sdk';
import type {
  CardInfo,
  CardInfoResult,
  KeyInfo,
  KeyResults,
  SignCredentialRequest,
  SignCredentialResponse,
  SignOutputFromInput,
  SignPresentationRequest,
  SignPresentationResponse,
  SignRequest,
  SignResponse,
  StoredCredentialsResponse,
  WalletType,
  SsiType,
  FilesType,
  Message,
  SuccessResponse,
} from './types';
import Sign from './signing';

export const NfcSdkModule = TangemSdk;

export default class NfcSdk {
  /**
   *  Constructor for reusable parameters
   *
   * @param cardId the card identifier is store globally
   * @returns nothing
   */
  public static cardId: string;
  public static keyId: string;

  /**
   * Scan the NFC card
   *
   * @param initialMessage The message to display
   * @returns The card information retrieved with the scan
   */
  static async scanCard(initialMessage?: Message): Promise<CardInfoResult> {
    const data = await TangemSdk.scanCard(initialMessage);

    const {
      cardId,
      batchId,
      cardPublicKey: cardPublicKeyMultibase,
      supportedCurves: curves,
      firmwareVersion: { major, minor, type, hotFix: patch },
    } = data;

    const cardInfo: CardInfo = {
      curves,
      firmwareVersion: {
        major,
        minor,
        type,
        patch,
      },
    };

    NfcSdk.cardId = cardId;

    const response: CardInfoResult = {
      cardId,
      batchId,
      cardPublicKeyMultibase,
      cardInfo,
    };

    return response;
  }

  /**
   * Create an asymmetric keypair on the NFC card
   *
   * @param curve A string with the elliptic Curve
   * @returns The results of the created key
   */
  static async createKey(curve: string): Promise<KeyResults> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    let ellipticCurve = EllipticCurve.Secp256k1; //default

    if (curve === 'secp256k1') ellipticCurve = EllipticCurve.Secp256k1;
    if (curve === 'ed25519') ellipticCurve = EllipticCurve.Ed25519;
    if (curve === 'secp256r1') ellipticCurve = EllipticCurve.Secp256r1;

    const data = await TangemSdk.createWallet(ellipticCurve, NfcSdk.cardId);

    const keyInfo: KeyInfo = {
      publicKeyMultibase: data.wallet.publicKey,
      index: data.wallet.index,
    };

    const response: KeyResults = {
      id: data.cardId,
      keys: [keyInfo],
    };

    NfcSdk.keyId = keyInfo.publicKeyMultibase;

    return response;
  }

  /**
   * Deactivate a key by card index, public key, or DID key
   *
   * @param keyId The Key index, public key, or DID/Verification method Key ID
   * @returns null
   */
  static async deactivateKey(keyId?: string): Promise<SuccessResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    if (!keyId && !NfcSdk.keyId) {
      throw new Error('keyId not provided, please use getKeys first');
    }

    const response = await TangemSdk.purgeWallet(
      keyId || NfcSdk.keyId,
      NfcSdk.cardId
    );

    return response;
  }

  /**
   * Get all the keys of the card
   *
   * @param initialMessage The message to display
   * @returns The keys retrieved from the card
   */
  static async getKeys(initialMessage: Message): Promise<KeyResults> {
    const data = await TangemSdk.scanCard(initialMessage);

    const keys = data.wallets
      ? data.wallets.map((wallet: { publicKey: any; index: any }) => {
          const keyInfo: KeyInfo = {
            publicKeyMultibase: wallet.publicKey,
            index: wallet.index,
          };

          return keyInfo;
        })
      : [];

    const response: KeyResults = {
      id: data.cardId,
      keys,
    };

    if (response.keys.length > 0) {
      NfcSdk.keyId = response.keys[0].publicKeyMultibase;
    }

    return response;
  }

  /**
   * Get a key by keyId
   *
   * @param initialMessage The message to display
   * @param keyId The Id of a key
   * @returns The key retrieved from the card
   */
  static async getKey(
    initialMessage: Message,
    keyId?: string
  ): Promise<KeyInfo | null> {
    if (!keyId && !NfcSdk.keyId) {
      throw new Error('keyId not provided, please use getKeys first');
    }

    const keyResult: KeyResults = await this.getKeys(initialMessage);
    const { keys } = keyResult;

    const filtered = keys.filter(
      (k: KeyInfo) => k.publicKeyMultibase === (keyId || NfcSdk.keyId)
    );

    if (filtered.length === 0) return null;

    const keyInfo: KeyInfo = {
      publicKeyMultibase: filtered[0].publicKeyMultibase,
      index: filtered[0].index,
    };

    return keyInfo;
  }

  /**
   * Sign one or more inputs using the private key stored on the NFC card
   *
   * @param keyId The Id of a key
   * @param signRequest Sign one or more inputs, typically hashes in hex format
   * @returns A successful response after signing or an error
   */
  static async signUsingKey(
    signRequest: SignRequest,
    keyId?: string
  ): Promise<SignResponse> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    if (!keyId && !NfcSdk.keyId) {
      throw new Error('keyId not provided, please use getKeys first');
    }

    const { inputs } = signRequest;
    const hashes = inputs.map((input) => input.data);
    const data = await TangemSdk.signHashes(
      hashes,
      keyId || NfcSdk.keyId,
      NfcSdk.cardId
    );

    // @ts-ignore
    const signatures: SignOutputFromInput[] = data.signatures.map(
      (signature: string, index: number) => {
        return {
          input: { data: hashes[index], encoding: 'hex' },
          output: { data: signature, encoding: 'hex' },
        };
      }
    );

    const response: SignResponse = {
      publicKeyMultibase: keyId,
      signatures,
    };

    return response;
  }

  /**
   * Add a proof to the supplied credential, using the private key on the NFC card and thus making
   * it a Verifiable Credential. It allows for optional storage of the VC on the NFC card
   *
   * @param signCredentialRequest Signs one or more inputs, typically hashes in hex format
   * @param keyId The Id of a key
   * @param controller The DID of the controller
   * @returns A success response after signing
   */
  static async signCredential(
    signCredentialRequest: SignCredentialRequest,
    keyId?: string
  ): Promise<SignCredentialResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }
    if (!keyId && !NfcSdk.keyId) {
      throw new Error('keyId not provided, please use getKeys first');
    }
    const signedCredential = await Sign.credential(
      signCredentialRequest.credential,
      keyId || NfcSdk.keyId,
      NfcSdk.cardId,
      signCredentialRequest.controller
    );
    return signedCredential;
  }

  /**
   * Verify a credential
   *
   * @param signedCredential a signed credential
   * @returns wheter the credential is valid or not
   */
  static async verifyCredential(
    signCredentialRequest: SignCredentialRequest
  ): Promise<boolean | null> {
    const verification = await Sign.verifyCredential(
      signCredentialRequest.credential,
      NfcSdk.keyId,
      NfcSdk.cardId,
      signCredentialRequest.controller
    );
    return verification.verified;
  }

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
  static async signPresentation(
    signPresentationRequest: SignPresentationRequest,
    keyId?: string
  ): Promise<SignPresentationResponse> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }
    if (!keyId && !NfcSdk.keyId) {
      throw new Error('keyId not provided, please use getKeys first');
    }
    const signedPresentation = await Sign.presentation(
      signPresentationRequest.presentation,
      keyId || NfcSdk.keyId,
      NfcSdk.cardId,
      signPresentationRequest.controller,
      signPresentationRequest.challenge
    );
    return signedPresentation;
  }

  /**
   * Verifies a presentation
   *
   * @param signedPresentation A signed presentation
   * @returns wheter the credential is valid or not
   */
  static async verifyPresentation(
    signPresentationRequest: SignPresentationRequest
  ): Promise<boolean | null> {
    const verification = await Sign.verifyPresentation(
      signPresentationRequest.presentation,
      NfcSdk.keyId,
      NfcSdk.cardId,
      signPresentationRequest.controller,
      signPresentationRequest.challenge
    );
    return verification.verified;
  }

  /**
   * Store a credential
   *
   * @param credential The credential to be stored
   * @param fileName The file name
   * @returns A success response or null
   */
  static async storeCredential(
    credential: any,
    fileName: string
  ): Promise<SuccessResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    const sCredential = JSON.stringify(credential);
    const data = hexEncode(sCredential);

    const files = await TangemSdk.readFiles(true);
    // @ts-ignore
    const fileCounter = files.length + 1;

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const { startingSignature, finalizingSignature } =
      await TangemSdk.prepareHashes(
        NfcSdk.cardId,
        data,
        fileCounter,
        fileName,
        '11121314151617184771ED81F2BACF57479E4735EB1405083927372D40DA9E92' // TODO hardcoded key due to a Tangem SDK limitation
      );

    const file: OwnerFile = {
      startingSignature,
      finalizingSignature,
      data,
      fileName,
      counter: fileCounter,
      fileVisibility: FileVisibility.Public,
    };

    const response = await TangemSdk.writeFiles([file], NfcSdk.cardId);

    return response;
  }

  /**
   * Delete a specific stored Verifiable Credential
   *
   * @param fileName The file name of a credential
   * @returns A successful response or null
   */
  static async deleteStoredCredential(
    fileName: string
  ): Promise<SuccessResponse | null> {
    const files = await TangemSdk.readFiles(true, fileName);
    // @ts-ignore

    const indices = files.map((file: { index: any }) => file.index);

    await TangemSdk.deleteFiles(indices);

    const response: SuccessResponse = {
      cardId: NfcSdk.cardId,
    };

    return response;
  }

  /**
   * Return all the stored Verifiable Credentials
   *
   * @returns The stored credentials
   */
  static async getStoredCredentials(): Promise<StoredCredentialsResponse> {
    const files = await TangemSdk.readFiles(true);

    const credentials = files
      // @ts-ignore
      .map((item: { data: string; name: string }) => {
        try {
          const decodeData = hexDecode(item.data);
          return JSON.parse(decodeData);
        } catch {
          return null;
        }
      })
      .filter((item: { data: string; name: string }) => item);

    const response: StoredCredentialsResponse = { credentials };

    return response;
  }

  /**
   * Return a specific stored Verifiable Credential
   *
   * @param fileName The file name of a credential
   * @returns The stored credential or null
   */
  static async getStoredCredential(
    fileName: string
  ): Promise<StoredCredentialsResponse | null> {
    const files = await TangemSdk.readFiles(true, fileName);

    const credentials = files
      // @ts-ignore
      .map((item: { data: string; name: string }) => {
        try {
          const decodeData = hexDecode(item.data);
          return JSON.parse(decodeData);
        } catch {
          return null;
        }
      })
      .filter((item: { data: string; name: string }) => item);

    const response: StoredCredentialsResponse = { credentials };

    return response;
  }

  /**
   * Set an access code on the card, if set all commands, including Scan Card, will require to submit this code
   *
   * @param accessCode The access code
   * @returns A success response or null
   */
  static async setAccessCode(
    accessCode: string
  ): Promise<SuccessResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    const data = await TangemSdk.setAccessCode(accessCode, NfcSdk.cardId);

    return data;
  }

  /**
   * Set a passcode. Passcode protects signing and operations that can alter security parameters
   *
   * @param passcode The pass code
   * @returns A success response or null
   */
  static async setPasscode(passcode: string): Promise<SuccessResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    const data = await TangemSdk.setPasscode(passcode, NfcSdk.cardId);

    return data;
  }

  /**
   * Reset both access code and passcode if they were set
   *
   * @returns A success response or null
   */
  static async resetUserCodes(): Promise<SuccessResponse | null> {
    if (!NfcSdk.cardId) {
      throw new Error('Please use scanCard first');
    }

    const data = await TangemSdk.resetUserCodes(NfcSdk.cardId);

    return data;
  }

  /**
   * Exposes public methods related to wallet operations
   */
  public static wallet: WalletType = {
    scanCard: NfcSdk.scanCard,
    setAccessCode: NfcSdk.setAccessCode,
    setPasscode: NfcSdk.setPasscode,
    resetUserCodes: NfcSdk.resetUserCodes,
    createKey: NfcSdk.createKey,
    getKeys: NfcSdk.getKeys,
    getKey: NfcSdk.getKey,
    deactivateKey: NfcSdk.deactivateKey,
  };

  /**
   * Exposes public methods related to ssi operation
   */
  public static ssi: SsiType = {
    signUsingKey: NfcSdk.signUsingKey,
    signCredential: NfcSdk.signCredential,
    signPresentation: NfcSdk.signPresentation,
    verifyCredential: NfcSdk.verifyCredential
    // verifyPresentation: NfcSdk.verifyPresentation,
  };

  /**
   * Exposes public methods related to wallet operations
   */
  public static files: FilesType = {
    storeCredential: NfcSdk.storeCredential,
    getStoredCredentials: NfcSdk.getStoredCredentials,
    getStoredCredential: NfcSdk.getStoredCredential,
    deleteStoredCredential: NfcSdk.deleteStoredCredential,
  };
}

// TODO: REFACTOR. Move the following 3 methods to a separate file with common functions
const hexEncode = (input: string): string => {
  const json = JSON.stringify(input);
  const response = json
    .split('')
    .map((_c, i) => ('000' + json.charCodeAt(i).toString(16)).slice(-4))
    .join('');

  return response;
};

const hexDecode = (input: string): string => {
  const hexes = input.match(/.{1,4}/g) || [];
  const response = hexes
    .map((c) => String.fromCharCode(parseInt(c, 16)))
    .join('');

  return response;
};

export * from './types';
export { EllipticCurve } from 'tangem-sdk';

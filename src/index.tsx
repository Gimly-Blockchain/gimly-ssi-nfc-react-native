import TangemSdk from 'tangem-sdk-react-native';
import type {
  SuccessResponse,
  Message,
  File
} from 'tangem-sdk-react-native';

import { EllipticCurve } from 'tangem-sdk-react-native';

import type {
  CardInfoResult,
  CardInfo,
  KeyInfo,
  KeyResults,
  SignCredentialRequest,
  SignCredentialResponse,
  SignPresentationRequest,
  SignPresentationResponse,
  SignRequest,
  SignResponse,
  StoredCredentialsResponse,
  VerifiableCredential,
  StoredCredentialResponse,
  SignOutputFromInput,
} from './types';

export const NfcSdkModule = TangemSdk;

export default class NfcSdk {

  /**
   * Scan the NFC card
   *
   * @param initialMessage The message to display
   * @returns The card information retrieved with the scan
   */
  public static async scanCard(
    initialMessage?: Message,
  ): Promise<CardInfoResult> {
    const data = await TangemSdk.scanCard(initialMessage);

    const {
      cardId,
      batchId,
      cardPublicKey: cardPublicKeyMultibase,
      supportedCurves: curves,
      firmwareVersion: {major, minor, type, hotFix: patch},
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

    const response: CardInfoResult = {
      cardId,
      batchId,
      cardPublicKeyMultibase,
      cardInfo
    };

    return response;
  }

  /**
   * Create an asymmetric keypair on the NFC card
   *
   * @param cardId The Id of a card
   * @param curve A string with the elliptic Curve
   * @returns The results of the created key
   */
  public static async createKey(
    cardId: string,
    curve: string,
  ): Promise<KeyResults> {
    let ellipticCurve = EllipticCurve.Secp256k1; //default
    if (curve === 'secp256k1') ellipticCurve = EllipticCurve.Secp256k1;
    if (curve === 'ed25519') ellipticCurve = EllipticCurve.Ed25519;
    if (curve === 'secp256r1') ellipticCurve = EllipticCurve.Secp256r1;

    const data = await TangemSdk.createWallet(ellipticCurve, cardId);

    const keyInfo: KeyInfo = {
      publicKeyMultibase: data.wallet.publicKey,
      index: data.wallet.index
    };

    const response: KeyResults = {
      id: data.cardId,
      keys: [keyInfo]
    };

    return response;
  }

  /**
   * Deactivate a key by card index, public key, or DID key
   *
   * @param cardId The Id of a card
   * @param keyId The Key index, public key, or DID/Verification method Key ID
   * @returns null
   */
  public static async deactivateKey(
    cardId: string,
    keyId: string,
  ): Promise<null> {

    const data = await TangemSdk.purgeWallet(keyId, cardId);

    return null;
  }

  /**
   * Get all keys by card Id
   *
   * @param initialMessage The message to display
   * @param cardId The Id of a card
   * @returns The keys retrieved from the card
   */
  public static async getKeys(
    initialMessage: Message,
    cardId?: string,
  ): Promise<KeyResults> {
    const data = await TangemSdk.scanCard(initialMessage);

    const keys = data.wallets
      ? data.wallets.map(wallet => {
          const keyInfo: KeyInfo = {
            publicKeyMultibase: wallet.publicKey,
            index: wallet.index
          };

          return keyInfo;
        })
      : [];
    const response: KeyResults = {
      id: data.cardId,
      keys,
    };

    return response;
  }

  /**
   * Get a key by Card Id and keyId
   *
   * @param initialMessage The message to display
   * @param cardId The Id of a card
   * @param keyId The Id of a key
   * @returns The key retrieved from the card
   */
  public static async getKey(
    initialMessage: Message,
    cardId: string,
    keyId: string,
  ): Promise<KeyInfo|null> {
    const keyResult: KeyResults = await this.getKeys(initialMessage, cardId);
    const {keys} = keyResult;

    const filtered = keys.filter((k: KeyInfo) => k.publicKeyMultibase === keyId);

    if (filtered.length === 0) return null;

    const keyInfo: KeyInfo = {
      publicKeyMultibase: filtered[0].publicKeyMultibase,
      index: filtered[0].index
    };

    return keyInfo;
  }

  /**
   * Sign one or more inputs using the private key stored on the NFC card
   *
   * @param keyId The Id of a key
   * @param signRequest Sign one or more inputs, typically hashes in hex format
   * @param cardId The Id of a card
   * @returns A successful response after signing or an error
   */
  public static async signUsingKey(
    keyId: string,
    signRequest: SignRequest,
    cardId: string,
  ): Promise<SignResponse> {

    const {inputs} = signRequest;
    const hashes = inputs.map(input => input.data);
    const data = await TangemSdk.signHashes(hashes, keyId, cardId);

    const signatures: SignOutputFromInput[] = data?.[0].signatures.map(
      (signature, index) => {
        return {
          input: {data: hashes[index], encoding: 'hex'},
          output: {data: signature, encoding: 'hex'},
        };
      },
    );

    const response: SignResponse = {
      publicKeyMultibase: keyId,
      signatures,
    };

    return response;
  }

  /**
   * Add a proof to the supplied credential, using the private key on the NFC card and thus making it a Verifiable Credential. It allows for optional storage of the VC on the NFC card
   *
   * @param keyId The Id of a key
   * @param signCredentialRequest Signs one or more inputs, typically hashes in hex format
   * @param cardId The Id of a card
   * @returns A success response after signing
   */
  public static async signCredential(
    keyId: string,
    signCredentialRequest: SignCredentialRequest,
    cardId: string,
  ): Promise<SignCredentialResponse|null> {

    const file: File = {
      data: JSON.stringify(signCredentialRequest.credential),
    }

    const files: File[] = [file];

    try {
      const requestResponse = await TangemSdk.writeOwnerFile(files, keyId, cardId)

      console.log(requestResponse)

      return {
        verifiableCredential:  {
          issuanceDate: '',
          proof:  {
            type: '',
            created: '',
            proofPurpose: '',
            verificationMethod: '',
            jws: '',
          },
          "@context": [],
          id: '',
          type: [],
          credentialSubject: { id: ''},
          issuer: '',
          expirationDate: '',
          credentialStatus:  {
            id: '',
            type: '',
          },
        },
        storageId: '',
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Sign the supplied presentation using the key on the NFC card, adding a proof and making it a verifiable presentation
   *
   * @param keyId The Id of a key
   * @param signPresentationRequest Signs a presentation
   * @param cardId The Id of a card
   * @returns A successful response after signing
   */
  public static async signPresentation(
    keyId: string,
    signPresentationRequest: SignPresentationRequest,
    cardId: string,
  ): Promise<SignPresentationResponse> {
    console.log(keyId, signPresentationRequest, cardId);
    // TODO: Following code are hardcoded responses, expected as terminal api structure.
    const verifiableCredential_1: VerifiableCredential = {
      issuanceDate: '',
      proof: {
        type: '',
        created: '',
        proofPurpose: '',
        verificationMethod: '',
        jws: '',
      },
      '@context': [],
      id: '',
      type: [],
      credentialSubject: {id: ''},
      issuer: '',
      expirationDate: '',
      credentialStatus: {id: '', type: ''},
    };
    const response:SignPresentationResponse = {
      verifiablePresentation: {
        proof: {
          type: '',
          created: '',
          proofPurpose: '',
          verificationMethod: '',
          jws: '',
        },
        "@context": [],
        type: "",
        verifiableCredential: [verifiableCredential_1],
      }
    }
    return response;
  }

  /**
   * Delete a specific stored Verifiable Credential
   *
   * @param credentialId The Id of a credential
   * @param cardId The Id of a card
   * @returns A successful response or null
   */
  public static async deleteStoredCredential(
    credentialId: string,
    cardId: string,
  ): Promise<SuccessResponse | null> {
    console.log(credentialId)
    // TODO: as first parameter deleteFiles espects "indicesToDelete" which is an array of numbers. Investigate or ask correlation between credentialId(string) <-> indicesToDelete(array of numbers)
    // TODO: dummy const to bypass tsx errors
    const indicesToDelete: number[] = []; // Indexes of files that should be deleted. If undefined - deletes all files from card

    const data = await TangemSdk.deleteFiles(indicesToDelete, cardId);
    if (data) {
      return data;
    }
    return null;
  }

  /**
   * Return all the stored Verifiable Credentials
   *
   * @param cardId The Id of a card
   * @returns The stored credentials
   */
  public static async getStoredCredentials(
    cardId: string,
  ): Promise<StoredCredentialsResponse> {
    const readPrivateFiles: boolean = true;
    const indices = undefined;
    const data = await TangemSdk.readFiles(readPrivateFiles, indices, cardId);
    console.log(data);
    // TODO: convert data to credentials as expected by terminal format
    const response: StoredCredentialsResponse = {
      credentials: [
        {
          "@context": [""],
          id: "",
          type: [""],
          credentialSubject: {
            id: ""
          },
          issuer: "",
          issuanceDate: "",
          expirationDate: "",
          credentialStatus: {
            id: "",
            type: "",
          },
          proof: {
            type: "",
            created: "",
            verificationMethod: "",
            proofPurpose: "",
            jws: ""
          }
        }
      ]
    }
    return response;
  }

  /**
   * Return a specific stored Verifiable Credential
   *
   * @param cardId The Id of a card
   * @param credentialId  The Id of a credential
   * @returns The stored credential or null
   */
  public static async getStoredCredential(
    cardId: string,
    credentialId: string,
  ): Promise<StoredCredentialResponse|null> {
    const data = await this.getStoredCredentials(cardId);
    const filtered = data.credentials.filter(
      credential => credential.id === credentialId,
    );
    if (filtered.length === 0) {
      return null;
    }
    return {
      credential: filtered[0],
    };
  }

  /**
   * Set an access code on the card, if set all commands, including Scan Card, will require to submit this code
   *
   * @param accessCode The access code
   * @param cardId The Id of a card
   * @returns A success response or null
   */
  public static async setAccessCode(
    accessCode: string,
    cardId: string,
  ): Promise<SuccessResponse | null> {
    const data = await TangemSdk.setAccessCode(accessCode, cardId);
    if (data) {
      return data;
    }
    return null;
  }

  /**
   * Set a passcode. Passcode protects signing and operations that can alter security parameters
   *
   * @param passcode The pass code
   * @param cardId The Id of a card
   * @returns A success response or null
   */
  public static async setPasscode(
    passcode: string,
    cardId: string,
  ): Promise<SuccessResponse | null> {
    const data = await TangemSdk.setPasscode(passcode, cardId);
    if (data) {
      return data;
    }
    return null;
  }

  /**
   * Reset both access code and passcode if they were set
   *
   * @param cardId The Id of a card
   * @returns A success response or null
   */
  public static async resetUserCodes(
    cardId: string,
  ): Promise<SuccessResponse | null> {
    const data = await TangemSdk.resetUserCodes(cardId);
    if (data) {
      return data;
    }
    return null;
  }
}

export * from './types';

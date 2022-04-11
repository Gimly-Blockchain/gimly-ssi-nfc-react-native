import type { EmitterSubscription } from 'react-native';
import TangemSdk from 'tangem-sdk-react-native';
import type {
    Card,
    CreateWalletResponse,
    EllipticCurve,
    InitialMessage,
    PurgeWalletResponse,
    SuccessResponse
} from 'tangem-sdk-react-native';
import type {
    CardInfoResult,
    KeyResults,
    SignResult,
    SignCredentialRequest,
    SignCredentialResponse,
    SignPresentationRequest,
    SignPresentationResponse,
    SignRequest,
    SignResponse,
    StoredCredentialsResponse,
} from './types'
import {
    Curve
} from './constants'

export const NfcSdkModule = TangemSdk;

export default class NfcSdk {

    /*
        TODO:
        - Test with real card to verify data returned is correct
    */
    public static async scanCard(initialMessage?: InitialMessage): Promise<CardInfoResult> {
        const data = await TangemSdk.scanCard(initialMessage);
        return {
          cardId: data.cardId,
          batchId: data.batchId,
          cardPublicKeyMultibase: data.cardPublicKey,
          cardInfo: {
            curves: data.supportedCurves,
            firmwareVersion: data.firmwareVersion
          },
          linkedTerminal: data.linkedTerminalStatus,
        };
    }

    /* TODO:
        - tangem rn-sdk does not have the method createKey, we must investigate where can we get the parameters that the SSI standard has to return
    */
    public static async createKey(
        cardId: string,
        unrevokeable: boolean,
        curve: EllipticCurve,
    ): Promise<KeyResults> {
        const data = await TangemSdk.createWallet(curve, cardId)
        return {
          id: data.id,
          keys: data.keys,
        }
    }


    /* TODO:
        - tangem rn-sdk does not have the method deactiveKey, we must investigate where can we get the parameters that the SSI standard has to return
        -  Can't find correlation on this method between terminal and tangem
        - Waiting for responses from tangem. Provitionally using: purge_wallet
    */
    public static async deactiveKey(
        cardId: string,
        keyId: string,
    ): Promise<null> {
        const data = await TangemSdk.deactiveKey(cardId, keyId)
        return null;
        /*return await TangemSdk.purgeWallet(walletPublicKey, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });*/
    }

    /*TODO: 
        - Method should be tested with real card.
    */
    public static async getKey(
        initialMessage: InitialMessage,
        cardId: string,
        keyId: string
     ): Promise<Card> {
        let key = null;
        const cards = await TangemSdk.scanCard(initialMessage);
        if (cards) {
            const card = cards.filter((card: any) => card.id === cardId)
            if (card) {
                key = card.wallets.filter((wallet: any) => wallet.id === keyId)
            }
        }
        return key
    }

    /* TODO: 
        - Method should be tested with real card.
    */
    public static async getKeys(
        initialMessage: InitialMessage,
        cardId?: string,
     ): Promise<Card> {
        let keys = [];
        const cards = await TangemSdk.scanCard(initialMessage);
        if (cards) {
            const card = cards.filter((card: any) => card.id === cardId)
            if (card) {
                keys = card.wallets
            }
        }
        return keys
    }

    /* TODO:
        - tangem rn-sdk does not have the method sign, we must investigate where can we get the parameters that the SSI standard has to return
        - ssi parameters differs with rnsdk
    */
    public static async signUsingKey(
        keyId: string,
        signRequest: SignRequest,
        cardId: string,
    ): Promise<SignResponse> {
        const data = await TangemSdk.sign(keyId, signRequest, cardId)
        return {
          publicKeyMultibase: data.publicKeyMultibase,
          signatures: data.signatures,
        }
        /*return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });*/
    }


    /* TODO
        - method not available on rnsdk
        - unable to identify the difference between signCredential, signPresentation and signUsingKey.
        - implement the three methods, with the same code.
        - ssi parameters differs with rnsdk
    */
    public static async signCredential(
        keyId: string,
        signCredentialRequest: SignCredentialRequest,
        cardId: string,
    ): Promise<SignCredentialResponse> {
        const data = await TangemSdk.signCredential(keyId, signCredentialRequest, cardId)
        return {
          verifiableCredential: data.verifiableCredential,
          storageId: data.storageId,
        }
        /*return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });*/
    }

    /* TODO
        - method not available on rnsdk
        - unable to identify the difference between signCredential, signPresentation and signUsingKey.
        - implement the three methods, with the same code.
        - ssi parameters differs with rnsdk
    */
    public static async signPresentation(
        keyId: string,
        signPresentationRequest: SignPresentationRequest,
        cardId: string,
    ): Promise<SignPresentationResponse> {
        const data = await TangemSdk.signCredential(keyId, signPresentationRequest, cardId)
        return {
          verifiableCredential: data.verifiableCredential,
        }
        /*return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });*/
    }


    public static async deleteStoredCredential(
        credentialId: string,
        cardId: string,
    ): Promise<SuccessResponse | null> {
        return await TangemSdk.deleteFiles(credentialId, cardId)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }

    /* TODO
        - method not available on rnsdk
        - ssi parameters differs with rnsdk
    */
    public static async getStoredCredentials(
        cardId: string,
    ): Promise<StoredCredentialsResponse> {
        const data = await TangemSdk.getStoredCredentials(cardId)
        return {
          credentials: data.credentials,
        }
        /*return await TangemSdk.readFiles(readPrivateFiles, indices, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });*/
    }

    /* TODO
        - method not available on rnsdk
        - ssi parameters differs with rnsdk
    */
    public static async getStoredCredential(
        cardId: string,
        credentialId: string,
    ): Promise<StoredCredentialsResponse> {
        const data = await TangemSdk.getStoredCredential(cardId)
        return {
          credentials: data.credentials,
        }
        /*const credentials = await TangemSdk.readFiles(readPrivateFiles, indices, cardId, initialMessage)
        return credentials.filter(cred => cred.id === credentialId )*/
    }
}

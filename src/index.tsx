import type { EmitterSubscription } from 'react-native';
import TangemSdk from 'tangem-sdk-react-native';
import type {
    Card,
    CreateWalletResponse,
    EllipticCurve,
    InitialMessage,
    SignResponse,
    PurgeWalletResponse,
    SuccessResponse
} from 'tangem-sdk-react-native';

export const NfcSdkModule = TangemSdk;

export default class NfcSdk {

    public static async scanCard(initialMessage?: InitialMessage): Promise<Card> {
        return await TangemSdk.scanCard(initialMessage);
    }

    public static async createKey(
        cardId: string,
        curve: EllipticCurve,
        initialMessage?: InitialMessage
    ): Promise<CreateWalletResponse | null> {
        return await TangemSdk.createWallet(curve, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }


    /* TODO:
        -  Can't find correlation on this method between terminal and tangem
        - Waiting for responses from tangem. Provitionally using: purge_wallet
    */
    public static async deactiveKey(
        walletPublicKey: string,
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<PurgeWalletResponse | null> {
        return await TangemSdk.purgeWallet(walletPublicKey, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
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

    /* TODO
        - unable to identify the difference between signCredential, signPresentation and signUsingKey.
        - implement the three methods, with the same code.
    */
    public static async signCredential(
        hashes: string,
        walletPublicKey: string,
        hdPath: string,
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<SignResponse | null> {
        return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }

    /* TODO
        - unable to identify the difference between signCredential, signPresentation and signUsingKey.
        - implement the three methods, with the same code.
    */
    public static async signPresentation(
        hashes: string,
        walletPublicKey: string,
        hdPath: string,
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<SignResponse | null> {
        return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }


    /* TODO
        - unable to identify the difference between signCredential, signPresentation and signUsingKey.
        - implement the three methods, with the same code.
    */
    public static async signUsingKey(
        hashes: string,
        walletPublicKey: string,
        hdPath: string,
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<SignResponse | null> {
        return await TangemSdk.signHash(hashes, walletPublicKey, cardId, hdPath, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }

    public static async deleteStoredCredential(
        indicesToDelete: number[],
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<SuccessResponse | null> {
        return await TangemSdk.deleteFiles(indicesToDelete, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }

    public static async getStoredCredentials(
        readPrivateFiles: boolean,
        indices: number[],
        cardId: string,
        initialMessage: InitialMessage
    ): Promise<SuccessResponse | null> {
         return await TangemSdk.readFiles(readPrivateFiles, indices, cardId, initialMessage)
            .then(response => {
                return response;
            })
            .catch(() => {
                return null;
            });
    }

    /* TODO
        - Needs to be tested with real card
    */
    public static async getStoredCredential(
        readPrivateFiles: boolean,
        indices: number[],
        cardId: string,
        initialMessage: InitialMessage,
        credentialId: string,
    ): Promise<SuccessResponse | null> {
        const credentials = await TangemSdk.readFiles(readPrivateFiles, indices, cardId, initialMessage)
        return credentials.filter(cred => cred.id === credentialId )
    }
}

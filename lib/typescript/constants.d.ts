export declare const Curve: {
    Secp256k1: string;
    Ed25519: string;
    Secp256r1: string;
};
export declare const unsignedCredential: {
    "@context": string[];
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    credentialSubject: {
        id: string;
        YoutubeChannelOwner: {
            firstName: string;
            lastName: string;
            youtubeChannelName: string;
            youtubeChannelId: string;
            youtubeChannelCreationDate: string;
            youtubeChannelImageURL: string;
            youtubeChannelURL: string;
        };
    };
};

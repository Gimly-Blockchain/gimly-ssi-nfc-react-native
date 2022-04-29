import TangemSdk from 'tangem-sdk-react-native';
import type {
  Card,
  EllipticCurve,
  SuccessResponse,
  Message,
  FirmwareVersion,
} from 'tangem-sdk-react-native';
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
    // params = none;
    const data = await TangemSdk.scanCard(initialMessage);
    // data = {"backupStatus":{"status":"noBackup"},"isAccessCodeSet":false,"linkedTerminalStatus":"none","supportedCurves":["secp256k1","ed25519","secp256r1"],"cardPublicKey":"0297B5F98CFC498457778B7999F2B7BFEC6480D6A3DE4E0531CD8223C048AF751D","settings":{"maxWalletsCount":20,"isLinkedTerminalEnabled":true,"isFilesAllowed":true,"supportedEncryptionModes":["strong","fast","none"],"securityDelay":5000,"isBackupAllowed":true,"isSettingAccessCodeAllowed":false,"isResettingUserCodesAllowed":true,"isHDWalletAllowed":true,"isSettingPasscodeAllowed":true},"issuer":{"name":"TANGEM SDK","publicKey":"025F16BD1D2EAFE463E62A335A09E6B2BBCBD04452526885CB679FC4D27AF1BD22"},"firmwareVersion":{"minor":52,"patch":0,"major":4,"stringValue":"4.52d SDK","type":"d SDK"},"batchId":"AC01","isPasscodeSet":false,"manufacturer":{"name":"TANGEM","manufactureDate":"2021-03-15","signature":"C02845DC5AEDC168A63FEBC41BE0A0659CA0D237AD05B8FDDFE4525DD144BB7A04517CE3EB1E20448715EF5D85BE54482EBDDC471545F786E274FF7AFA9CECC2"},"attestation":{"cardKeyAttestation":"failed","walletKeysAttestation":"skipped","firmwareAttestation":"skipped","cardUniquenessAttestation":"skipped"},"cardId":"AC79000000000004","wallets":[{"totalSignedHashes":0,"index":0,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"02739E131C76098A6C577BBF86E3A7F94C3C4F661FA4D76B81D21CAFB343A91B77","chainCode":"6179C2B84CB428B83FD37C88F41C157874F2DA457ECE780AB8D6683B116F3572","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":1,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"A983FF0ACA1C27BCEC69A073A6888C92A4C7DECFA99DEB11573452CF882EC700","chainCode":"E438B6C676FF79F7CCE8D7277207C72AB35473459977A110F040D4467E3DE3B9","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":2,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40","chainCode":"5EBA4F6110925453AA5B46E812716F9212A63DAB146D0D8B7C8E07AF08A1B47E","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":3,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"39BA669D2C50935E0C4C60492FBA574B6A7740DFABB9328EA9792D57D366ADB8","chainCode":"66E1ABB3C11257EE7D49F6F461866A0A538A3A724959B29EE04F25767268391A","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":4,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"8B69ECCA96784F4CE551200E26AF75352F07C0C2952AF97E38FB4C773ED0B4A9","chainCode":"F2092E9233E628AB8A703A750860D1CA6C70DEC75576A474018A282E04E69661","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":5,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"4C53B4C6736F9A43DBE76093E71EFB95C9182739EC8B2E52DFE8E86760956FD5","chainCode":"B9149BB084C97DD33F679932DDFE13C5419F2A00F112939ED5C4D9129F228A09","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":6,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"89AC5E434B3E0697F5F70DD2DB9D576E74224F6886830C3963EA0A06A8DE359B","chainCode":"472165513BE599F178DA6E3F29149ACDE8735A46D4050CDD8A0673AE2405261D","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":7,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"3285782D56275FB013361B704B70F6D6FB19933798CA9D8528D94E67EAE07BFB","chainCode":"836922CB3F80C6CBFE2B1881A53910CF0B468B06638FB3F0A4A2C2AAAF1C8144","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":8,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"037C58B433A9063575C12232A0763DCC09423C8180E977AE9F8C527F462DBC4B5C","chainCode":"CB2C5D06D739E6D42321A8E456B3DF2E70308ECE75DF6EAE830D4D0B2B3F887B","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":9,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"039D37D865929C7F5FF702DD9A1922F7C97F3BE4A8E9D6429B9795F002FB1E6C70","chainCode":"E0C501DC9375E90C498FB036E79577627B2BEA68B0FE2B956210A9EAE069BAC9","settings":{"isPermanent":false}}]}

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

    // response = {"cardId":"AC79000000000004","batchId":"AC79000000000004","cardPublicKeyMultibase":"0297B5F98CFC498457778B7999F2B7BFEC6480D6A3DE4E0531CD8223C048AF751D","cardInfo":{"curves":["secp256k1","ed25519","secp256r1"],"firmwareVersion":{"minor":52,"patch":0,"major":4,"stringValue":"4.52d SDK","type":"d SDK"}}}

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
    curve: EllipticCurve,
  ): Promise<KeyResults> {
    // params = secp256k1 AC79000000000004

    const data = await TangemSdk.createWallet(curve, cardId);
    // data = {"cardId":"AC79000000000004","wallet":{"totalSignedHashes":0,"index":8,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"037C58B433A9063575C12232A0763DCC09423C8180E977AE9F8C527F462DBC4B5C","chainCode":"CB2C5D06D739E6D42321A8E456B3DF2E70308ECE75DF6EAE830D4D0B2B3F887B","settings":{"isPermanent":false}}}

    const keyInfo: KeyInfo = {
      publicKeyMultibase: data.wallet.publicKey,
      index: data.wallet.index
    };

    const response: KeyResults = {
      id: data.cardId,
      keys: [keyInfo], //TODO we have to check if we only have to return the new key or all of them
    };

    // response = {"id":"AC79000000000004","keys":[{"publicKey":"031174DA6836421B1CE23827D8F317B219F3AA4660A5C0A14161A30CD0366C89C5","index":11}]}
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
    // params = AC79000000000004 02AE76BE4E5A9308B3B272B396E5A0C7307C9CC1B74ED00D2E385215E7965B4A45

    const data = await TangemSdk.purgeWallet(keyId, cardId);
    // data = {cardId: 'AC79000000000004'}

    return null; // TODO Check the method response on the terminal API
  }

  /**
   * Get all keys by card Id
   *
   * @param initialMessage The message to display
   * @param cardId The Id of a card
   * @returns The keys retrieved from the card
   */
  public static async getKeys(
    initialMessage: Message, //TODO the initialMessage key is not defined on the Terminal API
    cardId?: string,
  ): Promise<KeyResults> {
    // params = '', AC79000000000004
    const data = await TangemSdk.scanCard(initialMessage);
    // {"backupStatus":{"status":"noBackup"},"isAccessCodeSet":false,"linkedTerminalStatus":"none","supportedCurves":["secp256k1","ed25519","secp256r1"],"cardPublicKey":"0297B5F98CFC498457778B7999F2B7BFEC6480D6A3DE4E0531CD8223C048AF751D","settings":{"maxWalletsCount":20,"isLinkedTerminalEnabled":true,"isFilesAllowed":true,"supportedEncryptionModes":["strong","fast","none"],"securityDelay":5000,"isBackupAllowed":true,"isSettingAccessCodeAllowed":false,"isResettingUserCodesAllowed":true,"isHDWalletAllowed":true,"isSettingPasscodeAllowed":true},"issuer":{"name":"TANGEM SDK","publicKey":"025F16BD1D2EAFE463E62A335A09E6B2BBCBD04452526885CB679FC4D27AF1BD22"},"firmwareVersion":{"minor":52,"patch":0,"major":4,"stringValue":"4.52d SDK","type":"d SDK"},"batchId":"AC01","isPasscodeSet":false,"manufacturer":{"name":"TANGEM","manufactureDate":"2021-03-15","signature":"C02845DC5AEDC168A63FEBC41BE0A0659CA0D237AD05B8FDDFE4525DD144BB7A04517CE3EB1E20448715EF5D85BE54482EBDDC471545F786E274FF7AFA9CECC2"},"attestation":{"cardKeyAttestation":"failed","walletKeysAttestation":"skipped","firmwareAttestation":"skipped","cardUniquenessAttestation":"skipped"},"cardId":"AC79000000000004","wallets":[{"totalSignedHashes":0,"index":0,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"02739E131C76098A6C577BBF86E3A7F94C3C4F661FA4D76B81D21CAFB343A91B77","chainCode":"6179C2B84CB428B83FD37C88F41C157874F2DA457ECE780AB8D6683B116F3572","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":1,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"A983FF0ACA1C27BCEC69A073A6888C92A4C7DECFA99DEB11573452CF882EC700","chainCode":"E438B6C676FF79F7CCE8D7277207C72AB35473459977A110F040D4467E3DE3B9","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":2,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40","chainCode":"5EBA4F6110925453AA5B46E812716F9212A63DAB146D0D8B7C8E07AF08A1B47E","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":3,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"39BA669D2C50935E0C4C60492FBA574B6A7740DFABB9328EA9792D57D366ADB8","chainCode":"66E1ABB3C11257EE7D49F6F461866A0A538A3A724959B29EE04F25767268391A","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":4,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"8B69ECCA96784F4CE551200E26AF75352F07C0C2952AF97E38FB4C773ED0B4A9","chainCode":"F2092E9233E628AB8A703A750860D1CA6C70DEC75576A474018A282E04E69661","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":5,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"4C53B4C6736F9A43DBE76093E71EFB95C9182739EC8B2E52DFE8E86760956FD5","chainCode":"B9149BB084C97DD33F679932DDFE13C5419F2A00F112939ED5C4D9129F228A09","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":6,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"89AC5E434B3E0697F5F70DD2DB9D576E74224F6886830C3963EA0A06A8DE359B","chainCode":"472165513BE599F178DA6E3F29149ACDE8735A46D4050CDD8A0673AE2405261D","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":7,"hasBackup":false,"derivedKeys":[],"curve":"ed25519","publicKey":"3285782D56275FB013361B704B70F6D6FB19933798CA9D8528D94E67EAE07BFB","chainCode":"836922CB3F80C6CBFE2B1881A53910CF0B468B06638FB3F0A4A2C2AAAF1C8144","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":8,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"037C58B433A9063575C12232A0763DCC09423C8180E977AE9F8C527F462DBC4B5C","chainCode":"CB2C5D06D739E6D42321A8E456B3DF2E70308ECE75DF6EAE830D4D0B2B3F887B","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":9,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"039D37D865929C7F5FF702DD9A1922F7C97F3BE4A8E9D6429B9795F002FB1E6C70","chainCode":"E0C501DC9375E90C498FB036E79577627B2BEA68B0FE2B956210A9EAE069BAC9","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":10,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"02143DFE2B1F54B6643872B3AF55929B7D5D2F6CD0684E2B0AAC5AB961A794B63D","chainCode":"1BBDB854DAA7F3EE22FBBC3AF10917B44AA3924ED02F99C850590641B2931050","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":11,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"031174DA6836421B1CE23827D8F317B219F3AA4660A5C0A14161A30CD0366C89C5","chainCode":"F8BB928964B2145A6BACE5CB1EF009C422F1086CF18738E1B1014F7B3F2D7A8D","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":12,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"0314CB0FD85EDA6135E0A1F68780A2667C35AA1FA7570AA987C69536F57E187EFD","chainCode":"991FD4D2D48E0F3729ACD3F69A9BA9C543AE06D1243094773070A7E32738D343","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":13,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"03E631AA921C3C46543ECC7AF668921859B7A1FEBA2C80419776B3AA6AC8553B13","chainCode":"95B2716896D4B51A839087984F624A90FF8AE0A0AEF5FF62259A7D5C02909579","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":14,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"03D239B6ED0C000A82A2F7B814395E3F3BF8E2982B0A52D8DAE6F794100281C518","chainCode":"547FCDE33BBADE43FB3C087F010E8555B1433A08EE1DEF18B2F17BAE855E2429","settings":{"isPermanent":false}},{"totalSignedHashes":0,"index":15,"hasBackup":false,"derivedKeys":[],"curve":"secp256k1","publicKey":"031B82821E3410B9E54A991A818E0B76F3B1D9FF8F4AC42B85E0C8BE40FBA4E134","chainCode":"125C6794DD11A7D55DDB35721221EFD4993728C200FDDA01EA467E92DBD09245","settings":{"isPermanent":false}}]}
    const keys = data.wallets
      ? data.wallets.map(wallet => {
          const keyInfo: KeyInfo = {
            publicKeyMultibase: wallet.publicKey,
            index: wallet.index,
            // status: '??', ---> TODO: we're not using this prop here and the terminal api
          };
          return keyInfo;
        })
      : [];
    const response: KeyResults = {
      id: data.cardId,
      keys,
    };
    // response = {"id":"AC79000000000004","keys":[{"publicKey":"02739E131C76098A6C577BBF86E3A7F94C3C4F661FA4D76B81D21CAFB343A91B77","index":0},{"publicKey":"A983FF0ACA1C27BCEC69A073A6888C92A4C7DECFA99DEB11573452CF882EC700","index":1},{"publicKey":"02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40","index":2},{"publicKey":"39BA669D2C50935E0C4C60492FBA574B6A7740DFABB9328EA9792D57D366ADB8","index":3},{"publicKey":"8B69ECCA96784F4CE551200E26AF75352F07C0C2952AF97E38FB4C773ED0B4A9","index":4},{"publicKey":"4C53B4C6736F9A43DBE76093E71EFB95C9182739EC8B2E52DFE8E86760956FD5","index":5},{"publicKey":"89AC5E434B3E0697F5F70DD2DB9D576E74224F6886830C3963EA0A06A8DE359B","index":6},{"publicKey":"3285782D56275FB013361B704B70F6D6FB19933798CA9D8528D94E67EAE07BFB","index":7},{"publicKey":"037C58B433A9063575C12232A0763DCC09423C8180E977AE9F8C527F462DBC4B5C","index":8},{"publicKey":"039D37D865929C7F5FF702DD9A1922F7C97F3BE4A8E9D6429B9795F002FB1E6C70","index":9},{"publicKey":"02143DFE2B1F54B6643872B3AF55929B7D5D2F6CD0684E2B0AAC5AB961A794B63D","index":10},{"publicKey":"031174DA6836421B1CE23827D8F317B219F3AA4660A5C0A14161A30CD0366C89C5","index":11},{"publicKey":"0314CB0FD85EDA6135E0A1F68780A2667C35AA1FA7570AA987C69536F57E187EFD","index":12},{"publicKey":"03E631AA921C3C46543ECC7AF668921859B7A1FEBA2C80419776B3AA6AC8553B13","index":13},{"publicKey":"03D239B6ED0C000A82A2F7B814395E3F3BF8E2982B0A52D8DAE6F794100281C518","index":14},{"publicKey":"031B82821E3410B9E54A991A818E0B76F3B1D9FF8F4AC42B85E0C8BE40FBA4E134","index":15}]}
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
    // params = '', AC79000000000004, 02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40

    const keyResult: KeyResults = await this.getKeys(initialMessage, cardId);
    const {keys} = keyResult;

    const filtered = keys.filter(
      (k: KeyInfo) => k.publicKeyMultibase === keyId,
    );

    if (filtered.length === 0) {
      // TODO: review what is the best response when we can't find any key
      return null;
    }

    const keyInfo: KeyInfo = {
      publicKeyMultibase: filtered[0].publicKeyMultibase,
      index: filtered[0].index,
      // status: '??', ---> TODO: we're not using this prop here and the terminal api
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
    // params = 02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40 {"inputs":[{"data":"44617461207573656420666f722068617368696e67"},{"data":"4461746120666f7220757365642068617368696e67"}]} AC79000000000004

    const {inputs} = signRequest;
    const hashes = inputs.map(input => input.data);

    const data = await TangemSdk.signHashes(hashes, keyId, cardId);
    // data = {"totalSignedHashes":12,"cardId":"AC79000000000004","signatures":["64B4BB5428A78605E2E1AD9FE1F7CDFE336094C8F1A2D0583D16C6591CACCB7775E142B0B32D8DC19868892DC9EB2EC50CE8657C24AB79A97B45A535A6455958","86F2980929F858170F89D39F9E3D07D8ABEC6F5FFAD9692D2FBF4725C95F091C14EEF455BC559F2BB76ECC9BCB6E90CB93C305D7D4ABAE3195D0463B6D5E9182"]}

    // TODO: probablemente data este mal digamos el objeto parece estar bien, pero signHashes responde con un array de datos [SignHashResponse] no un solo dato como parece que se implemento
    // y por tando da multiples errores de typescript.
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
    // response = {"publicKeyMultibase":"02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40","signatures":[{"input":{"data":"44617461207573656420666f722068617368696e67","encoding":"hex"},"output":{"data":"64B4BB5428A78605E2E1AD9FE1F7CDFE336094C8F1A2D0583D16C6591CACCB7775E142B0B32D8DC19868892DC9EB2EC50CE8657C24AB79A97B45A535A6455958","encoding":"hex"}},{"input":{"data":"4461746120666f7220757365642068617368696e67","encoding":"hex"},"output":{"data":"86F2980929F858170F89D39F9E3D07D8ABEC6F5FFAD9692D2FBF4725C95F091C14EEF455BC559F2BB76ECC9BCB6E90CB93C305D7D4ABAE3195D0463B6D5E9182","encoding":"hex"}}]}

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
    console.log(keyId, signCredentialRequest, cardId);

    // TODO we have to sign the credential and store it if that is requested. Not sure how to convert that VC to a hash in hex format, so we can use the sign method.

    //   * @param {File[]} files List of files that should be written to card
    // const files = null;

    // const data = await TangemSdk.writeFiles(files, cardId);
    //const data = await TangemSdk.readFiles(true, null, cardId);
    // We need to investigate how it's implemented on the android version of the SDK: https://github.com/Tangem/tangem-sdk-android
    return null;
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
    // TODO: as first parameter deleteFiles espects "indicesToDelete" which is an array of numbers. Investigate or ask correlation between credentialId(string) <-> indicesToDelete(array of numbers)
    // TODO: dummy const to bypass tsx errors
    const indicesToDelete: number[] = []; // Indexes of files that should be deleted. If undefined - deletes all files from card

    return await TangemSdk.deleteFiles(indicesToDelete, cardId)
      .then(response => {
        return response;
      })
      .catch(() => {
        return null;
      });
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
    return TangemSdk.setAccessCode(accessCode, cardId).then((result) => {
      return result;
    }).catch(() => {
      return null;
    });
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
    return TangemSdk.setPasscode(passcode, cardId).then((result) => {
      return result;
    }).catch(() => {
      return null;
    });
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
    return TangemSdk.resetUserCodes(cardId).then((result) => {
      return result;
    }).catch(() => {
      return null;
    });
  }
}

export * from './types';

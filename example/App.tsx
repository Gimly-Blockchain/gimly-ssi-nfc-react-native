/**
 * Sample React Native App for Gimly
 * https://gimly.io
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PolyfillCrypto from 'react-native-webview-crypto'
import NfcSdk, { EllipticCurve } from './src'; // change to 'src' to use local files or gimly-ssi-nfc-react-native
import type {
  Message,
  SignInput,
  SignRequest,
  SignCredentialRequest,
  Credential,
  Presentation,
  SignPresentationRequest,
} from './src'; // change to 'src' to use local files

type LogItem = {
  method: string;
  params: string;
  type: string;
};

const LogElement = ({ method, params, type }: LogItem): JSX.Element => {
  if (type === 'OUTPUT') {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.logW}>{`> `}</Text>
          <Text style={styles.logW}>Response: </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.logR}>{params}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.logW}>{`> `}</Text>
      <Text style={styles.logM}>{method} </Text>
      <Text style={styles.logP}>{params}</Text>
    </View>
  );
};

const App = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [keyId, setKeyId] = useState<string>();
  const [tab, setTab] = useState<number>(1);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const containerStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  };

  const addLog = (method: string, params: string, type: string) => {
    setLogs((currentLog) => [...currentLog, { method, params, type }]);
    //console.log(`METHOD: ${method}, PARAMS: ${params}, TYPE: ${type}`);
  };

  const testScanCard = async () => {
    addLog('scanCard', 'No params', 'INPUT');
    try {
      const response = await NfcSdk.wallet.scanCard();
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testSetPasscode = async () => {
    const passcode = '123456';
    addLog('testResetUserCodes', `passcode: ${passcode}`, 'INPUT');

    try {
      const response = await NfcSdk.wallet.setPasscode(passcode);
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testResetUserCodes = async () => {
    addLog('testResetUserCodes', ``, 'INPUT');
    try {
      const response = await NfcSdk.wallet.resetUserCodes();
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testCreateKey = async () => {
    addLog('createKey', `curve=ed25519`, 'INPUT');
    const curve = 'ed25519';
    try {
      const response = await NfcSdk.wallet.createKey(EllipticCurve.Ed25519);

      setKeyId(response.keys[0].publicKeyMultibase);
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testDeactivateKey = async () => {
    addLog('deactivateKey', `keyId: ${keyId}`, 'INPUT');

    try {
      const response = await NfcSdk.wallet.deactivateKey(keyId);
      addLog('', 'Success', 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testGetKey = async () => {
    const initialMessage: Message = { body: '', header: '' };
    if (!keyId) {
      const initialMessage: Message = { body: '', header: '' };
      const { keys } = await NfcSdk.wallet.getKeys(initialMessage);
      setKeyId(keys[0].publicKeyMultibase);
    }
    addLog(
      'getKey',
      `initialMessage: ${JSON.stringify(
        initialMessage,
        null,
        2
      )}, keyId: ${keyId}`,
      'IN'
    );
    try {
      const response = await NfcSdk.wallet.getKey(initialMessage, keyId);
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testGetKeys = async () => {
    const initialMessage: Message = { body: '', header: '' };
    addLog(
      'getKeys',
      `initialMessage: ${JSON.stringify(initialMessage, null, 2)}`,
      'INPUT'
    );
    try {
      const response = await NfcSdk.wallet.getKeys(initialMessage);
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testSignUsingKey = async () => {
    const inputs: SignInput[] = [
      { data: '44617461207573656420666f722068617368696e67', encoding: {} },
      { data: '4461746120666f7220757365642068617368696e67', encoding: {} },
    ];

    const signRequest: SignRequest = { inputs };

    addLog(
      'signUsingKey',
      `keyId: ${keyId}, signRequest: ${JSON.stringify(signRequest, null, 2)}`,
      'INPUT'
    );
    try {
      const response = await NfcSdk.ssi.signUsingKey(signRequest, keyId);
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testSignCredential = async () => {
    let keyIdCurrent = keyId;

    const credential: Credential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://sphereon-opensource.github.io/vc-contexts/gimly/youtube/youtube-channel-owner.jsonld"
      ],
      "id": "1872",
      "type": ["VerifiableCredential", "YoutubeChannelOwner"],
      "issuer": "did:ethr:ropsten:0x02e9b18ecde0171ab0ea7b376b2922249441630a90b9f52de95642db7773fb6702",
      "issuanceDate": "2021-07-10T01:23:24Z",
      "credentialSubject": {
        "id": "did:ethr:ropsten:0x03f8b96c88063da2b7f5cc90513560a7ec38b92616fff9c95ae95f46cc692a7c75",
        "YoutubeChannelOwner": {
          "firstName": "John",
          "lastName": "Doe",
          "youtubeChannelName": "Teddy Kittens",
          "youtubeChannelId": "UCMFSkaC6CgOh4L3IcVP2P8g",
          "youtubeChannelCreationDate": "2018-02-01T23:01:44Z",
          "youtubeChannelImageURL": "https://yt3.ggpht.com/ytc/AKedOLTtFIzWxg7nYyzagwI2B-MP1lj4QzXMzUjHoRO9-Q=s88-c-k-c0x00ffffff-no-rj",
          "youtubeChannelURL": "https://www.youtube.com/channel/UCMFSkaC6CgOh4L3IcVP2P8g"
        }
      }
    }

    const signCredentialRequest: SignCredentialRequest = {
      credential,
      controller: 'did:ethr:ropsten:0x02e9b18ecde0171ab0ea7b376b2922249441630a90b9f52de95642db7773fb6702',
      store: true,
    };

    addLog(
      'signCredential',
      `keyId: ${keyIdCurrent}, signCredentialRequest: ${JSON.stringify(
        signCredentialRequest,
        null,
        2
      )}`,
      'INPUT'
    );
    try {
      const response = await NfcSdk.ssi.signCredential(
        signCredentialRequest,
        keyIdCurrent
      );
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
      return response
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testVerifyCredential = async () => {
    addLog('verifyCredential', ``, 'INPUT');
    // const signedCredential = await testSignCredential()
    // addLog('verifyCredential', `VC generated, verifying...`, 'INPUT');
    // const response = await NfcSdk.ssi.verifyCredential(signedCredential);
    // addLog('verifyCredential', `valid: ${response}`, 'OUTPUT');
  }

  const testSignPresentation = async () => {
    const presentation: Presentation = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiablePresentation"
      ],
      "verifiableCredential": [
        {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://sphereon-opensource.github.io/vc-contexts/gimly/youtube/youtube-channel-owner.jsonld"
          ],
          "id": "1872",
          "type": [
            "VerifiableCredential",
            "YoutubeChannelOwner"
          ],
          "issuer": "did:ethr:ropsten:0x02e9b18ecde0171ab0ea7b376b2922249441630a90b9f52de95642db7773fb6702",
          "issuanceDate": "2021-07-10T01:23:24Z",
          "credentialSubject": {
            "id": "did:ethr:ropsten:0x03f8b96c88063da2b7f5cc90513560a7ec38b92616fff9c95ae95f46cc692a7c75",
            "YoutubeChannelOwner": {
              "firstName": "John",
              "lastName": "Doe",
              "youtubeChannelName": "Teddy Kittens",
              "youtubeChannelId": "UCMFSkaC6CgOh4L3IcVP2P8g",
              "youtubeChannelCreationDate": "2018-02-01T23:01:44Z",
              "youtubeChannelImageURL": "https://yt3.ggpht.com/ytc/AKedOLTtFIzWxg7nYyzagwI2B-MP1lj4QzXMzUjHoRO9-Q=s88-c-k-c0x00ffffff-no-rj",
              "youtubeChannelURL": "https://www.youtube.com/channel/UCMFSkaC6CgOh4L3IcVP2P8g"
            }
          }
        }
      ],
      "id": "ebc6f1c2",
      "holder": "did:ethr:ropsten:0x02e9b18ecde0171ab0ea7b376b2922249441630a90b9f52de95642db7773fb6702"
    };

    const signPresentationRequest: SignPresentationRequest = {
      presentation,
      controller: 'did:ethr:ropsten:0x02e9b18ecde0171ab0ea7b376b2922249441630a90b9f52de95642db7773fb6702',
      challenge: '1234'
    };

    let keyIdCurrent = keyId;

    addLog(
      'signPresentation',
      `keyId: ${keyId}, signPresentationRequest: ${JSON.stringify(
        signPresentationRequest,
        null,
        2
      )}`,
      'IN'
    );
    try {
      const response = await NfcSdk.ssi.signPresentation(
        signPresentationRequest,
        keyIdCurrent,
      );
      addLog('', JSON.stringify(response, null, 2), 'OUTPUT');
      return response
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testVerifyPresentation = async () => {
    addLog('verifyPresentation', ``, 'INPUT');
    // const signedPresentation = await testSignPresentation()
    // addLog('verifyPresentation', `VP generated, verifying...`, 'INPUT');
    // const response = await NfcSdk.ssi.verifyPresentation(signedPresentation);
    // addLog('verifyPresentation', `valid: ${response}`, 'OUTPUT');
  }

  const testStoreCredential = async () => {
    // example: https://w3c-ccg.github.io/vc-examples/edu/university-degree-verifiable-credential.json
    const credential: Credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      'id': 'http://example.gov/credentials/3732',
      'type': ['VerifiableCredential', 'UniversityDegreeCredential'],
      'issuer': { id: 'did:web:vc.transmute.world' },
      'issuanceDate': '2020-03-10T04:24:12.164Z',
      'credentialSubject': {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
      'proof': {
        type: 'JsonWebSignature2020',
        created: '2020-03-21T17:51:48Z',
        verificationMethod:
          'did:web:vc.transmute.world#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        proofPurpose: 'assertionMethod',
        jws: 'eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFZERTQSJ9..OPxskX37SK0FhmYygDk-S4csY_gNhCUgSOAaXFXDTZx86CmI5nU9xkqtLWg-f4cqkigKDdMVdtIqWAvaYx2JBA',
      },
    };
    const fileName = 'university-degree-verifiable-credential.json';

    addLog(
      'storeCredential',
      `fileName: ${credential}, data: ${JSON.stringify(credential)}`,
      'IN'
    );

    try {
      const response = await NfcSdk.files.storeCredential(
        // @ts-ignore
        credential,
        fileName
      );
      addLog(
        'storeCredential',
        `Success. response=${JSON.stringify(response)}`,
        'OUTPUT'
      );
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testDeleteStoredCredential = async () => {
    const fileName = 'university-degree-verifiable-credential.json';

    addLog('deleteStoredCredential', `fileName: ${fileName}`, 'IN');

    try {
      const response = await NfcSdk.files.deleteStoredCredential(fileName);
      addLog('deleteStoredCredential', 'Successs', 'OUTPUT');
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testGetStoredCredentials = async () => {

    addLog('getStoredCredentials', ``, 'INPUT');

    try {
      const response = await NfcSdk.files.getStoredCredentials();
      addLog(
        'getStoredCredentials',
        JSON.stringify(response, null, 2),
        'OUTPUT'
      );
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  const testGetStoredCredential = async () => {
    const fileName = 'university-degree-verifiable-credential.json';

    addLog('getStoredCredential', `fileName: ${fileName}`, 'IN');

    try {
      const response = await NfcSdk.files.getStoredCredential(fileName);

      addLog(
        'getStoredCredential',
        JSON.stringify(response, null, 2),
        'OUTPUT'
      );
    } catch (error) {
      addLog('', error.message, 'OUTPUT');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <PolyfillCrypto/>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={containerStyle}>
        <Text style={styles.sectionTitle}>SSI-NFC-SDK Demo</Text>

        <View style={styles.terminal}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            contentInsetAdjustmentBehavior="automatic"
            onContentSizeChange={() => {
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.logW}>{`> `}</Text>
              <Text style={styles.logW}>Logs will display here</Text>
            </View>
            {logs.map((log, idx) => (
              <LogElement
                key={idx+1}
                method={log.method}
                params={log.params}
                type={log.type}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottom}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.tabTouchable}
              onPress={() => setTab(1)}
            >
              <View style={tab === 1 ? styles.tabActive : styles.tab}>
                <Text style={styles.tabText}>Wallet</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabTouchable}
              onPress={() => setTab(2)}
            >
              <View style={tab === 2 ? styles.tabActive : styles.tab}>
                <Text style={styles.tabText}>Ssi</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabTouchable}
              onPress={() => setTab(3)}
            >
              <View style={tab === 3 ? styles.tabActive : styles.tab}>
                <Text style={styles.tabText}>Files</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ maxHeight: '65%', paddingBottom: 20 }}
            contentContainerStyle={{ flexGrow: 1 }}
            contentInsetAdjustmentBehavior="automatic"
          >
            {/* WALLET tab*/}
            {tab === 1 && (
              <View>
                <View style={styles.button}>
                  <Button onPress={testScanCard} title="scanCard" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testSetPasscode} title="setPasscode" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testResetUserCodes} title="resetUserCodes" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testCreateKey} title="createKey" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testGetKeys} title="getKeys" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testGetKey} title="getKey" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testDeactivateKey} title="deactivateKey" />
                </View>
              </View>
            )}
            {/* end of WALLET tab*/}

            {/* SSI tab*/}
            {tab === 2 && (
              <View>
                <View style={styles.button}>
                  <Button onPress={testSignUsingKey} title="signUsingKey" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testSignCredential} title="signCredential" />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={testSignPresentation}
                    title="signPresentation"
                  />
                </View>
                <View style={styles.button}>
                  <Button onPress={testVerifyCredential} title="verifyCredential" />
                </View>
                <View style={styles.button}>
                  <Button onPress={testVerifyPresentation} title="verifyPresentation" />
                </View>
              </View>
            )}
            {/* end of SSI tab*/}

            {/* FILES tab*/}
            {tab === 3 && (
              <View>
                <View style={styles.button}>
                  <Button
                    onPress={testStoreCredential}
                    title="storeCredential"
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={testGetStoredCredentials}
                    title="getStoredCredentials"
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={testGetStoredCredential}
                    title="getStoredCredential"
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={testDeleteStoredCredential}
                    title="deleteStoredCredential"
                  />
                </View>
              </View>
            )}
            {/* end of FILES tab*/}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  bottom: {
    borderRadius: 5,
    width: '80%',
    height: '50%',
    padding: 10,
  },
  terminal: {
    borderRadius: 5,
    width: '80%',
    height: '50%',
    backgroundColor: '#383838',
    marginBottom: 20,
    padding: 10,
  },
  logW: {
    color: '#fff',
    fontSize: 11,
  },
  logM: {
    color: '#36927e',
    fontSize: 11,
  },
  logP: {
    color: '#5d9dc4',
    fontSize: 11,
  },
  logR: {
    color: '#ac6781',
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabTouchable: {
    flex: 1,
    height: 30,
  },
  tab: {
    flex: 1,
    height: 30,
    backgroundColor: '#A8BAC5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  tabActive: {
    flex: 1,
    height: 30,
    backgroundColor: '#3F90C2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;

/**
 * Sample React Native App for Gimly
 * https://gimly.io
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NfcSdk from 'gimly-ssi-nfc-react-native'; //import NfcSdk from 'gimly-ssi-nfc-react-native';
import type {
  CardInfoResult,
  Message,
  SignInput,
  SignRequest,
  SignCredentialRequest,
  Credential,
  SignPresentationRequest
} from 'gimly-ssi-nfc-react-native' // from 'gimly-ssi-nfc-react-native/types';

type LogItem = {
  method: string,
  params: string,
  type: string,
};

const LogElement = ({method, params, type}: LogItem): JSX.Element => {
  if (type === "OUTPUT") {
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
    )
  }
  return (
    <View style={{flexDirection: 'row'}}><Text style={styles.logW}>{`> `}</Text><Text style={styles.logM}>{method} </Text><Text style={styles.logP}>{params}</Text></View>
  )
}

const App = () => {
  const [logs, setLogs] = useState<LogItem[]>([])
  const [cardInformation, setCardInformation] = useState<CardInfoResult>()
  const [cardId, setCardId] = useState<string>()
  const [keyId, setKeyId] = useState<string>()

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const containerStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    padding: 10,
    alignItems: 'center',
    flex: 1
  };

  const addLog = (method: string, params: string, type: string) => {
    setLogs(currentLog => [...currentLog, {method,params,type}]);
    console.log(`METHOD: ${method}, PARAMS: ${params}, TYPE: ${type}`)
  };

  const testScanCard = () => {
    addLog('scanCard', 'No params', 'INPUT');
    NfcSdk.scanCard()
      .then(response => {
        setCardInformation(response);
        setCardId(response.cardId);

        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testCreateKey = () => {
    addLog('createKey', `cardId=${cardId} curve=secp256k1`, 'INPUT');

    const curve = 'secp256k1';

    NfcSdk.createKey(cardId, curve)
      .then(response => {
        setKeyId(response.keys[0].publicKeyMultibase);
        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testDeactivateKey = async () => {
    addLog('deactivateKey', `cardId: ${cardId}, keyId: ${keyId}`, 'INPUT');

    if (!keyId) {
      const initialMessage: Message = {body: '', header: ''};
      const { keys } = NfcSdk.getKeys(initialMessage, cardId);
      setKeyId(keys[0].publicKeyMultibase);
    }

    NfcSdk.deactivateKey(cardId, keyId)
    .then(() => {
      console.log('deactivateKey done');
      addLog('', 'Success', 'OUTPUT');
    })
    .catch(error => {
      console.log(error);
    });

  };

  const testGetKey = async () => {
    const initialMessage: Message = {body: '', header: ''};

    if (!keyId) {
      const initialMessage: Message = {body: '', header: ''};
      const { keys } = NfcSdk.getKeys(initialMessage, cardId);
      setKeyId(keys[0].publicKeyMultibase);
    }

    addLog('getKey', `initialMessage: ${JSON.stringify(initialMessage)}, cardId: ${cardId}, keyId: ${keyId}`, 'IN');

    NfcSdk.getKey(initialMessage, cardId, keyId)
    .then(response => {
      addLog('', JSON.stringify(response), 'OUTPUT');
    })
    .catch(error => {
      console.log(error);
    });
  };

  const testGetKeys = () => {
    const initialMessage: Message = {body: '', header: ''};

    addLog('getKeys', `initialMessage: ${JSON.stringify(initialMessage)}, cardId: ${cardId}`, 'INPUT');

    NfcSdk.getKeys(initialMessage, cardId)
      .then(response => {
        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testSignUsingKey = async () => {

    let keyId0; // TODO improve this

    if (!keyId) {
      const initialMessage: Message = {body: '', header: ''};
      const { keys } = await NfcSdk.getKeys(initialMessage, cardId);
      addLog('', keys[0].publicKeyMultibase, 'OUTPUT');

      setKeyId(keys[0].publicKeyMultibase);
      keyId0 = keys[0].publicKeyMultibase;
    }

    const inputs: SignInput[] = [{data: '44617461207573656420666f722068617368696e67'},{data: '4461746120666f7220757365642068617368696e67'}];

    const signRequest: SignRequest = {inputs};

    addLog('signUsingKey', `keyId: ${keyId}, signRequest: ${JSON.stringify(signRequest)}, cardId: ${cardId}`, 'INPUT');

    NfcSdk.signUsingKey(keyId || keyId0, signRequest, cardId)
      .then(response => {
        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testSignCredential = async () => {
    let keyId0; // TODO improve this

    if (!keyId) {
      const initialMessage: Message = {body: '', header: ''};
      const { keys } = await NfcSdk.getKeys(initialMessage, cardId);
      addLog('', keys[0].publicKeyMultibase, 'OUTPUT');

      setKeyId(keys[0].publicKeyMultibase);
      keyId0 = keys[0].publicKeyMultibase;
    }
    // got it from here: https://w3c-ccg.github.io/vc-examples/edu/university-degree-verifiable-credential.json
    // please check other examples on the same repo
    const credential: Credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: 'http://example.gov/credentials/3732',
      type: ['VerifiableCredential', 'UniversityDegreeCredential'],
      /*issuer: {
        id: 'did:web:vc.transmute.world',
      },*/
      issuer: 'did:web:vc.transmute.world', // TODO: according to doccumentation this type is a string, test and remove comment if correct
      issuanceDate: '2020-03-10T04:24:12.164Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
      proof: { // TODO: this parameter did not exist on Credential type so i hada to add it
        type: 'JsonWebSignature2020',
        created: '2020-03-21T17:51:48Z',
        verificationMethod:
          'did:web:vc.transmute.world#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        proofPurpose: 'assertionMethod',
        jws: 'eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFZERTQSJ9..OPxskX37SK0FhmYygDk-S4csY_gNhCUgSOAaXFXDTZx86CmI5nU9xkqtLWg-f4cqkigKDdMVdtIqWAvaYx2JBA',
      },
      expirationDate: '2020-03-10T04:24:12.164Z', // TODO: had to add this parameter, SDK is expecting it
      credentialStatus: { // TODO: had to add this parameter, SDK is expecting it
        id: '',
        type: ''
      }
    };

    const signCredentialRequest: SignCredentialRequest = {
      credential,
      store: true,
    };

    addLog('signCredential', `keyId: ${keyId || keyId0}, signCredentialRequest: ${JSON.stringify(signCredentialRequest)}, cardId: ${cardId}`, 'INPUT');

    NfcSdk.signCredential(keyId || keyId0, signCredentialRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testSignPresentation = () => {
    console.log('TEST signPresentation');

    const signPresentationRequest: SignPresentationRequest = {
      presentation:  {
        "@context": [],
        type: "",
        verifiableCredential: []
      }
    };

    const keyId =
      '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';

    addLog('signPresentation', `keyId: ${keyId}, signPresentationRequest: ${JSON.stringify(signPresentationRequest)}, cardId: ${cardId}`, 'IN');

    NfcSdk.signPresentation(keyId, signPresentationRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testDeleteStoredCredential = () => {
    const credentialId = '123456';

    addLog('deleteStoredCredential', `credentialId: ${credentialId}, cardId: ${cardId}`, 'IN');

    NfcSdk.deleteStoredCredential(credentialId, cardId)
      .then(() => {
        addLog('deleteStoredCredential', 'Successs', 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testGetStoredCredentials = () => {
    addLog('getStoredCredentials', `cardId: ${cardId}`, 'INPUT');
    NfcSdk.getStoredCredentials(cardId)
      .then(response => {
        addLog('getStoredCredentials', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const testGetStoredCredential = () => {
    console.log('TEST getStoredCredential');
    const credentialId = '';
    addLog('getStoredCredential', `cardId: ${cardId}, credentialId: ${credentialId}`, 'IN');
    NfcSdk.getStoredCredential(cardId, credentialId)
      .then(response => {
        addLog('getStoredCredential', JSON.stringify(response), 'OUTPUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <View style={containerStyle}>
          <Text style={styles.sectionTitle}>SSI-NFC-SDK Demo</Text>

          <View style={styles.terminal}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              contentInsetAdjustmentBehavior="automatic"
            >
              <View style={{flexDirection: 'row'}}><Text style={styles.logW}>{`> `}</Text><Text style={styles.logW}>Logs will display here</Text></View>
              {logs.map(log => <LogElement method={log.method} params={log.params} type={log.type} />)}
            </ScrollView>
          </View>

          <View style={styles.bottom}> 
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              contentInsetAdjustmentBehavior="automatic"
            >
            <View style={styles.button}>
              <Button onPress={testScanCard} title="scanCard" />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testCreateKey}
                title="createKey"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testGetKeys}
                title="getKeys"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testGetKey}
                title="getKey"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testDeactivateKey}
                title="deactivateKey"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testSignUsingKey}
                title="signUsingKey"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testSignCredential}
                title="signCredential"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testSignPresentation}
                title="signPresentation"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={testDeleteStoredCredential}
                title="deleteStoredCredential"
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
  button:  {
    marginBottom: 20,
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
    fontSize: 11
  },
  logM: {
    color: '#36927e',
    fontSize: 11
  },
  logP: {
    color: '#5d9dc4',
    fontSize: 11
  },
  logR: {
    color: '#ac6781',
    fontSize: 11
  },
  row: {
    flexDirection: 'row',
  }
});

export default App;

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

const LogElement = ({method, params, type}: LogItem) => {
  if (type === "OUT") {
    return (
      <View style={{flexDirection: 'row'}}><Text style={styles.logW}>{`> `}</Text><Text style={styles.logW}>Response: </Text><Text style={styles.logR}>{params}</Text></View>
    )
  }
  return (
    <View style={{flexDirection: 'row'}}><Text style={styles.logW}>{`> `}</Text><Text style={styles.logM}>{method} </Text><Text style={styles.logP}>{params}</Text></View>
  )
}

const App = () => {
  const [logs, setLogs] = useState<LogItem[]>([])
  const isDarkMode = useColorScheme() === 'dark';
  let cardInformation: CardInfoResult;
  let cardId: string;
  let keyId: string;

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
  };

  const test_scanCard = () => {
    console.log('TEST scanCard');
    addLog('scanCard', 'No params', 'IN');

    NfcSdk.scanCard()
      .then(response => {
        console.log('response', JSON.stringify(response));
        cardInformation = response;
        cardId = cardInformation.cardId;
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_createKey = () => {
    console.log('TEST createKey');
    addLog('createKey', 'No params', 'IN');

    const unrevokeable = false;
    const curve = cardInformation.cardInfo.curves[0];

    NfcSdk.createKey(cardId, unrevokeable, curve)
      .then(response => {
        console.log('response', JSON.stringify(response));
        keyId = response.keys[0].publicKeyMultibase; // TODO:  changed according to docummentation to: publicKeyMultibase;
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_deactiveKey = () => {
    console.log('TEST deactiveKey');
    addLog('deactiveKey', `cardId: ${cardId}, keyId: ${keyId}`, 'IN');

    NfcSdk.deactiveKey(cardId, keyId)
      .then(() => {
        console.log('deactiveKey done');
        addLog('', 'Success', 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getKey = () => {
    console.log('TEST getKey');
    const initialMessage: Message = {body: '', header: ''};
    const keyId = '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';
    addLog('getKey', `initialMessage: ${JSON.stringify(initialMessage)}, cardId: ${cardId}, keyId: ${keyId}`, 'IN');
    NfcSdk.getKey(initialMessage, cardId, keyId)
    .then(response => {
      console.log('response', JSON.stringify(response));
      addLog('', JSON.stringify(response), 'OUT');
    })
    .catch(error => {
      console.log(error);
    });
  };

  const test_getKeys = () => {
    console.log('TEST getKeys');

    const initialMessage: Message = {body: '', header: ''};
    addLog('getKeys', `initialMessage: ${JSON.stringify(initialMessage)}, cardId: ${cardId}`, 'IN');

    NfcSdk.getKeys(initialMessage, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_signUsingKey = () => {

    console.log('TEST signUsingKey');

    const keyId =
      '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';

    const inputs: SignInput[] = [
      {
        data: '44617461207573656420666f722068617368696e67',
        encoding: {} // TODO: SDK requires encoding parameter, test an remove this comment it it works ok.
      },
      {
        data: '4461746120666f7220757365642068617368696e67',
        encoding: {}
      },
    ];

    const signRequest: SignRequest = {inputs};

    addLog('signUsingKey', `keyId: ${keyId}, signRequest: ${JSON.stringify(signRequest)}, cardId: ${cardId}`, 'IN');

    NfcSdk.signUsingKey(keyId, signRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_signCredential = () => {
    console.log('TEST signCredential');

    const keyId =
      '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';

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

    addLog('signCredential', `keyId: ${keyId}, signCredentialRequest: ${JSON.stringify(signCredentialRequest)}, cardId: ${cardId}`, 'IN');

    NfcSdk.signCredential(keyId, signCredentialRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_signPresentation = () => {
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
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_deleteStoredCredential = () => {
    console.log('TEST deleteStoredCredential');

    const credentialId = '123456';

    addLog('deleteStoredCredential', `credentialId: ${credentialId}, cardId: ${cardId}`, 'IN');

    NfcSdk.deleteStoredCredential(credentialId, cardId)
      .then(() => {
        console.log('deleteStoredCredential done');
        addLog('', 'Successs', 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getStoredCredentials = () => {
    console.log('TEST getStoredCredentials');
    addLog('getStoredCredentials', `cardId: ${cardId}`, 'IN');
    NfcSdk.getStoredCredentials(cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getStoredCredential = () => {
    console.log('TEST getStoredCredential');
    const credentialId = '';
    addLog('getStoredCredential', `cardId: ${cardId}, credentialId: ${credentialId}`, 'IN');
    NfcSdk.getStoredCredential(cardId, credentialId)
      .then(response => {
        console.log('response', JSON.stringify(response));
        addLog('', JSON.stringify(response), 'OUT');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <View style={containerStyle}>
          <Text style={styles.sectionTitle}>Gimly NFC SDK tester</Text>

          <View style={styles.terminal}>
            <View style={{flexDirection: 'row'}}><Text style={styles.logW}>{`> `}</Text><Text style={styles.logW}>Logs will display here</Text></View>
            {logs.map(log => <LogElement method={log.method} params={log.params} type={log.type} />)}
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            contentInsetAdjustmentBehavior="automatic"
          >

          <View style={styles.button}>
            <Button onPress={test_scanCard} title="scanCard" />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_createKey}
              title="createKey"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_deactiveKey}
              title="deactiveKey"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_getKey}
              title="getKey"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_getKeys}
              title="getKeys"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_signUsingKey}
              title="signUsingKey"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_signCredential}
              title="signCredential"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_signPresentation}
              title="signPresentation"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_deleteStoredCredential}
              title="deleteStoredCredential"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_getStoredCredentials}
              title="getStoredCredentials"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={test_getStoredCredential}
              title="getStoredCredential"
            />
          </View>
          </ScrollView>
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
  }
});

export default App;

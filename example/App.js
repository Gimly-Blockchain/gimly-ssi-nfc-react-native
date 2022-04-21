/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
//import NfcSdk from 'gimly-ssi-nfc-react-native';
import NfcSdk from '../src';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  let cardInformation;
  let cardId;
  let keyId;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    padding: 10,
    alignItems: 'center',
  };

  const test_scanCard = () => {
    console.log('TEST scanCard');
    NfcSdk.scanCard()
      .then(response => {
        console.log('response', JSON.stringify(response));
        cardInformation = response;
        cardId = cardInformation.cardId;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_createKey = () => {
    console.log('TEST createKey');
    const unrevokeable = false;
    const curve = cardInformation.cardInfo.curves[0];
    NfcSdk.createKey(cardId, unrevokeable, curve)
      .then(response => {
        console.log('response', JSON.stringify(response));
        keyId = response.keys[0].publicKey;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_deactiveKey = () => {
    console.log('TEST deactiveKey');
    NfcSdk.deactiveKey(cardId, keyId)
      .then(() => {
        console.log('deactiveKey done');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getKey = () => {
    console.log('TEST getKey');
    const initialMessage = '';
    const keyId =
      '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';
    NfcSdk.getKey(initialMessage, cardId, keyId)
      .then(response => {
        console.log('response', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getKeys = () => {
    console.log('TEST getKeys');
    const initialMessage = '';
    NfcSdk.getKeys(initialMessage, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
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
      },
      {
        data: '4461746120666f7220757365642068617368696e67',
      },
    ];

    const signRequest: SignRequest = {inputs};

    NfcSdk.signUsingKey(keyId, signRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
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
      issuer: {
        id: 'did:web:vc.transmute.world',
      },
      issuanceDate: '2020-03-10T04:24:12.164Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2020-03-21T17:51:48Z',
        verificationMethod:
          'did:web:vc.transmute.world#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        proofPurpose: 'assertionMethod',
        jws: 'eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFZERTQSJ9..OPxskX37SK0FhmYygDk-S4csY_gNhCUgSOAaXFXDTZx86CmI5nU9xkqtLWg-f4cqkigKDdMVdtIqWAvaYx2JBA',
      },
    };

    const signCredentialRequest: SignCredentialRequest = {
      credential,
      store: true,
    };

    NfcSdk.signCredential(keyId, signCredentialRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_signPresentation = () => {
    console.log('TEST signPresentation');
    const signPresentationRequest = null;
    const keyId =
      '02EE0265FB7B23F19739CD9706E332209E28BB10C046DB0F984DF24A8B877BCA40';

    NfcSdk.signPresentation(keyId, signPresentationRequest, cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_deleteStoredCredential = () => {
    console.log('TEST deleteStoredCredential');
    const credentialId = '';
    NfcSdk.deleteStoredCredential(credentialId, cardId)
      .then(() => {
        console.log('deleteStoredCredential done');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getStoredCredentials = () => {
    console.log('TEST getStoredCredentials');
    NfcSdk.getStoredCredentials(cardId)
      .then(response => {
        console.log('response', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const test_getStoredCredential = () => {
    console.log('TEST getStoredCredential');
    const credentialId = '';
    NfcSdk.getStoredCredential(cardId, credentialId)
      .then(response => {
        console.log('response', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={containerStyle}>
          <Text style={styles.sectionTitle}>Gimly NFC SDK tester</Text>
          <View style={styles.button}>
            <Button onPress={test_scanCard} title="scanCard" />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_createKey}
              title="createKey"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_deactiveKey}
              title="deactiveKey"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_getKey}
              title="getKey"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_getKeys}
              title="getKeys"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_signUsingKey}
              title="signUsingKey"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_signCredential}
              title="signCredential"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_signPresentation}
              title="signPresentation"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_deleteStoredCredential}
              title="deleteStoredCredential"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_getStoredCredentials}
              title="getStoredCredentials"
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={test_getStoredCredential}
              title="getStoredCredential"
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
});

export default App;

<h2 style="text-align: center; vertical-align: middle">
    <a href="https://www.gimly.io/"><img src="https://avatars.githubusercontent.com/u/64525639?s=200&v=4" alt="Gimly" width="120" style="vertical-align: middle"></a></h2>

# Gimly SSI-NFC SDK

Gimly SSI-NFC SDK is a kit Self Sovereign Identity interactions between react native apps having an NFC reader and NFC cards.

The SDK is used as an easy integration means for React Native applications equipped with an NFC reader. The SDK is targeted at Self Sovereign Identity and Authentication use cases, meaning it can be used to create asymmetric keys for Decentralized Identifiers, as well as store and present Verifiable Credentials and Verifiable Presentations. Given the private key is securely stored in the NFC cards protected environment, it means the solution provides security for SSI use cases on desktop and terminal environments which typically would not be possible otherwise.

The current version of the SDK uses tangem under the hood, which may require additional native changes documented [here](https://developers.tangem.com/getting-started/react-native)


# Installation

```sh
yarn add gimly-ssi-nfc-react-native
```

# Scanning a card
To start working with the NFC card, you typically have to scan the card first

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.scanCard().then(cardInfo => {
  // handle cardInfo
}).catch(error => {
  // handle error
})
```

### Parameters
None

### Return type
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cardId** | **String** | The card id Id | [default to null]
**batchId** | **String** | The manufacturing batch id | [optional] [default to null]
**cardPublicKeyMultibase** | **String** | The card public key | [optional] [default to null]
**cardInfo** | **CardInfo** |  | [optional] [default to null]

# Creating a key(pair) on the NFC card
This creates an asymmetric keypair on the NFC card. The private key will never be disclosed and is safely stored in the card. The public key is disclosed. The key can be used as a regular keypair, not using DIDs at all if desired. To access and use the key later you can use the public key value, its card index or the DID Key id value 

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.createKey(cardId, unrevokeable, curve).then(keyInfo => {
  // handle keyInfo
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| The Id of a card | [optional] [default to null]
**unrevokeable** | **Boolean** | Whether this key can be unrevoked and thus reissued after revocation | [optional] [default to false]
**curve** | **Curve** |  | [optional] [default to null]


### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**publicKeyMultibase** | **String** | The public key in Multibase Format | [optional] [default to null]
**index** | **Integer** | The index of the key on the card | [optional] [default to null]
**status** | **KeyStatus** |  | [optional] [default to null]

# Deactivating Key
Deactivate a key by card index, public key or DID key

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.deactiveKey(cardId, keyId).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| The Id of a card | 
**keyId** | **String** | The Key index, public key or DID/Verification method key id |



### Return type

None


# Signing using the key on the NFC card

This method allows you to sign one or more inputs using the private key stored on the NFC card. 

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.sign(cardId, keyId, signRequest).then(signResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**cardId** | **String** | The Id of a card | [optional] [default to null]
**signRequest** | **SignRequest** | Signs one or more inputs, typically hashes in hex format |

### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**publicKeyMultibase** | **String** | The public key in Multibase Format | [optional] [default to null]
**signatures** | **Array<Signature>** |  | [optional] [default to null]


# Adding a proof to a credential
This method adds a proof to the supplied credential, using the private key on the NFC card and thus making it a Verifiable Credential. It allows for optional storage of the VC on the NFC card.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.signCredential(cardId, keyId, signCredentialRequest).then(signCredentialResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**cardId** | **String** | The Id of a card | [optional] [default to null]
**SignCredentialRequest** | **SignCredentialRequest** | Signs one or more inputs, typically hashes in hex format |

### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**verifiableCredential** | **Credential** |  | [optional] [default to null]
**storageId** | **String** | If the credential was stored it returns the id you can use (typically the credential id) | [optional] [default to null]


# Adding a proof to a presentation
Sign the supplied presentation using the key on the NFC card, adding a proof and making it a verifiable presentation. Please note that verifiable presentations cannot be stored, as the nature of Verifiable Presentations is to use them on singular invocations only

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.signPresentation(cardId, keyId, signPresentationRequest).then(signPresentationResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**cardId** | **String** | The Id of a card | [optional] [default to null]
**SignPresentationRequest** | **SignPresentationRequest** | Signs a presentation |

### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**verifiablePresentation** | **VerifiablePresentation** |  | [optional] [default to null]

# Get all Verifiable Credentials stored on the NFC card
Verified Credentials that are self-issued as well as externally issued with a subject that is related to the NFC card, can be stored on the NFC card. This method returns all stored Verifiable Credentials.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.getStoredCredentials(cardId).then(credentials => {
  // handle credentials
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| The Id of a card | [optional] [default to null]


### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**credentials** | **Array<Credential>** |  | [optional] [default to null]


# Getting a Verifiable Credential stored on the NFC card
Verified Credentials that are self-issued as well as externally issued with a subject that is related to the NFC card, can be stored on the NFC card. This method returns a specific stored Verifiable Credential.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.getStoredCredential(cardId, credentialId).then(credentials => {
  // handle credentials
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String** | The Id of a card | [optional] [default to null]
**credentialId** | **String** | The Id of a credential | [optional] [default to null]


### Return type

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**credentials** | **Array<Credential>** |  | [optional] [default to null]


# Deleting a Verifiable Credentials stored on the NFC card
Verified Credentials that are self-issued as well as externally issued with a subject that related to the NFC card, can be stored on the NFC card. This method delete a specific stored Verifiable Credential.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.deleteStoredCredential(cardId, credentialId).then(()) => {
  // handle success
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String** | The Id of a card | [optional] [default to null]
**credentialId** | **String** | The Id of a credential | [optional] [default to null]


### Return type

None

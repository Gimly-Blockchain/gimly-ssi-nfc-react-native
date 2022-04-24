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

[**CardInfoResult**](src/types/CardInfoResult.md)

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
**cardId**       | **String**                     | The Id of a card                                                     | [optional] [default to null]
**unrevokeable** | **Boolean**                    | Whether this key can be unrevoked and thus reissued after revocation | [optional] [default to false]
**curve**        | [**Curve**](src/types/Curve.md) |                                                                      | [optional] [default to null]


### Return type

[**KeyResults**](src/main/src/types/KeyResults.md)

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


# Get Keys
Gets all keys by card id

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.getKeys(initialMessage, cardId).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**initialMessage** | **String** | The message to display |
**cardId** | **String**| The Id of a card | 


### Return type

[**KeyResults**]src/main/src/types/KeyResults.md)


# Get single Key
Gets a key by card id and keyId

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.getKey(initialMessage, cardId, keyId).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**initialMessage** | **String** | The message to display |
**cardId** | **String**| The Id of a card | 
**keyId** | **String**| The Id of a key | 

### Return type

[**KeyInfo**]src/main/src/types/KeyInfo.md)


# Signing using the key on the NFC card

This method allows you to sign one or more inputs using the private key stored on the NFC card. 

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.signUsingKey(keyId, signRequest, cardId).then(signResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**signRequest** | [**SignRequest**](src/types/SignRequest.md) | Signs one or more inputs, typically hashes in hex format |
**cardId** | **String** | The Id of a card | [optional] [default to null]

### Return type

[**SignResponse**]src/main/src/types/SignResponse.md)


# Adding a proof to a credential
This method adds a proof to the supplied credential, using the private key on the NFC card and thus making it a Verifiable Credential. It allows for optional storage of the VC on the NFC card.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.signCredential(keyId, signCredentialRequest, cardId).then(signCredentialResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**SignCredentialRequest** | [**SignCredentialRequest**](src/types/SignCredentialRequest.md) | Signs one or more inputs, typically hashes in hex format |
**cardId** | **String** | The Id of a card | [optional] [default to null]

### Return type

[**SignCredentialResponse**](src/main/src/types/SignCredentialResponse.md)


# Adding a proof to a presentation
Sign the supplied presentation using the key on the NFC card, adding a proof and making it a verifiable presentation. Please note that verifiable presentations cannot be stored, as the nature of Verifiable Presentations is to use them on singular invocations only

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.signPresentation(keyId, signPresentationRequest, cardId).then(signPresentationResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id | [default to null]
**SignPresentationRequest** | [**SignPresentationRequest**](src/types/SignPresentationRequest.md) | Signs a presentation |
**cardId** | **String** | The Id of a card | [optional] [default to null]

### Return type

[**SignPresentationResponse**](src/main/src/types/SignPresentationResponse.md)

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

[**StoredCredentialsResponse**](src/main/src/types/StoredCredentialsResponse.md)


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

[**StoredCredentialsResponse**](src/main/src/types/StoredCredentialsResponse.md)


# Deleting a Verifiable Credentials stored on the NFC card
Verified Credentials that are self-issued as well as externally issued with a subject that related to the NFC card, can be stored on the NFC card. This method delete a specific stored Verifiable Credential.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.deleteStoredCredential(credentialId, cardId).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**credentialId** | **String** | The Id of a credential | [optional] [default to null]
**cardId** | **String** | The Id of a card | [optional] [default to null]


### Return type

None


# Set Access Code
If an Access code is set on the card, all commands, including Scan Card, will require to submit this code. So if the Access code is lost, there is no way to recover the data or even retrieve the public key. Access codes may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the access code from the card once it’s set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.setAccessCode(accessCode, cardId).then(credentials => {
  // handle response
}).catch(error => {
  // handle error
})
```
### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**accessCode** | **String**   | The access code  |
**cardId**     | **String**   | The Id of a card |

### Return type

[**SuccessResponse**](src/main/src/types/SuccessResponse.md)


# Set Pass Code
Passcode protects signing and operations that can alter security parameters. The passcode may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the passcode from the card once it’s set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.setPasscode(passcode, cardId).then(credentials => {
  // handle response
}).catch(error => {
  // handle error
})
```
### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**passcode** | **String**   | The pass code  |
**cardId**     | **String**   | The Id of a card |

### Return type

[**SuccessResponse**](src/main/src/types/SuccessResponse.md)


# Reset User Codes
Reset both access code and passcode if they were set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.resetUserCodes(cardId).then(credentials => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId**     | **String**   | The Id of a card |

### Return type

[**SuccessResponse**](src/main/src/types/SuccessResponse.md)

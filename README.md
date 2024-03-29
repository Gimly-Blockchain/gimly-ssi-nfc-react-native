<h2 style="text-align: center; vertical-align: middle">
    <a href="https://www.gimly.io/"><img src="https://avatars.githubusercontent.com/u/64525639?s=200&v=4" alt="Gimly" width="120" style="vertical-align: middle"></a></h2>

# Gimly SSI-NFC SDK

Gimly SSI-NFC SDK is a Open Source kit Self Sovereign Identity interactions between react native apps having an NFC reader and NFC cards.

The SDK is an easy integration means for React Native applications equipped with an NFC reader. The SDK is targeted at Self Sovereign-Identity and Authentication use cases, meaning it can be used to create asymmetric keys for Decentralized Identifiers and store and present Verifiable Credentials and Verifiable Presentations. Given the private key is securely stored in the NFC cards protected environment, it means the solution provides security for SSI use cases on desktop and terminal environments which typically would not be possible otherwise.

The current version of the SDK uses Tangem under the hood, which may require additional native changes documented [here](https://developers.tangem.com/getting-started/react-native)


# Installation

```sh
yarn add gimly-ssi-nfc-react-native
```

# Scanning a Card
To start working with the NFC card, you typically have to scan the card first

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.wallet.scanCard().then(cardInfo => {
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

NfcSdk.ssi.createKey(curve).then(keyInfo => {
  // handle keyInfo
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**curve**        | [**Curve**](src/types/Curve.md) |                                                                      | Optional. Default to null.


### Return type

[**KeyResults**](src/types/KeyResults.md)

# Deactivating Key
Deactivate a key by card index, public key or DID key

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.deactivateKey(keyId).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**keyId** | **String** | The Key index, public key or DID/Verification method key id |


### Return type

None


# Get Keys
Gets all keys by card id

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.getKeys(initialMessage).then(keyResults => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**initialMessage** | **String** | The message to display |


### Return type

[**KeyResults**](src/types/KeyResults.md)


# Get a Single Key
Gets a key by card id and keyId

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.getKey(initialMessage, keyId).then(keyResults => {
  // handle success
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**initialMessage** | **String** | The message to display |
**keyId** | **String**| The Id of a key |

### Return type

[**KeyResults**](src/types/KeyResults.md)


# Signing Using the Key on the NFC Card

This method allows you to sign one or more inputs using the private key stored on the NFC card.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.signUsingKey(signRequest, keyId).then(signResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**signRequest** | [**SignRequest**](src/types/SignRequest.md) | Signs one or more inputs, typically hashes in hex format |
**keyId** | **String** | The Key index, public key or DID/Verification method key id | Default to null.

### Return type

[**SignResponse**](src/types/SignResponse.md)


# Adding a Proof to a Credential
This method adds a proof to the supplied credential, using the private key on the NFC card and thus making it a Verifiable Credential. It allows for optional storage of the VC on the NFC card.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.signCredential(signCredentialRequest, keyId).then(signCredentialResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**SignCredentialRequest** | [**SignCredentialRequest**](src/types/SignCredentialRequest.md) | Signs one or more inputs, typically hashes in hex format
**keyId** | **String** | The Key index, public key or DID/Verification method key id | Default to null.

### Return type

[**SignCredentialResponse**](src/types/SignCredentialResponse.md)


# Adding a Proof to a Presentation
Sign the supplied presentation using the key on the NFC card, adding a proof and making it a verifiable presentation. Please note that verifiable presentations cannot be stored, as the nature of Verifiable Presentations is to use them on singular invocations only

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.ssi.signPresentation(signPresentationRequest, keyId).then(signPresentationResponse => {
  // handle sign response
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**SignPresentationRequest** | [**SignPresentationRequest**](src/types/SignPresentationRequest.md) | Signs a presentation.
**keyId** | **String** | The Key index, public key or DID/Verification method key id | Default to null.

### Return type

[**SignPresentationResponse**](src/types/SignPresentationResponse.md)

# Get all Verifiable Credentials stored on the NFC Card
Verified Credentials that are self-issued as well as externally issued with a subject that is related to the NFC card, can be stored on the NFC card. This method returns all stored Verifiable Credentials.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.files.getStoredCredentials().then(storedCredentialsResponse => {
  // handle credentials
}).catch(error => {
  // handle error
})
```

### Return type

[**StoredCredentialsResponse**](src/types/StoredCredentialsResponse.md)


# Getting a Verifiable Credential stored on the NFC Card
Verified Credentials that are self-issued as well as externally issued with a subject that is related to the NFC card, can be stored on the NFC card. This method returns a specific stored Verifiable Credential.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.files.getStoredCredential(fileName).then(storedCredentialsResponse => {
  // handle credentials
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**fileName** | **String** | The name of a credential |       |


### Return type

[**StoredCredentialsResponse**](src/types/StoredCredentialsResponse.md)


# Deleting a Verifiable Credentials stored on the NFC card
Verified Credentials that are self-issued as well as externally issued with a subject that related to the NFC card, can be stored on the NFC card. This method delete a specific stored Verifiable Credential.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.files.deleteStoredCredential(fileName).then(() => {
  // handle success
}).catch(error => {
  // handle error
})
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**fileName** | **String** | The file name of the credential |

### Return type

None


# Set Access Code
If an Access code is set on the card, all commands, including Scan Card, will require to submit this code. So if the Access code is lost, there is no way to recover the data or even retrieve the public key. Access codes may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the access code from the card once it’s set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.wallet.setAccessCode(accessCode).then(successResponse => {
  // handle response
}).catch(error => {
  // handle error
})
```
### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**accessCode** | **String**   | The access code  |

### Return type

[**SuccessResponse**](src/types/SuccessResponse.md)


# Set Pass Code
Passcode protects signing and operations that can alter security parameters. The passcode may be enabled or disabled during card configuration at the factory. Also, it’s possible to prohibit removing the passcode from the card once it’s set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.wallet.setPasscode(passcode).then(successResponse => {
  // handle response
}).catch(error => {
  // handle error
})
```
### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**passcode** | **String**   | The pass code

### Return type

[**SuccessResponse**](src/types/SuccessResponse.md)


# Reset User Codes
Reset both access code and passcode if they were set.

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.wallet.resetUserCodes().then(successResponse => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**SuccessResponse**](src/types/SuccessResponse.md)


# Store Credential
Stores a credential a credential on the card

```
import NfcSdk from 'gimly-ssi-nfc-react-native';

NfcSdk.files.storeCredential(credential, fileName).then(successResponse => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**credential** | **String** |The data to be stored.
**fileName** | String | The file name.
**fileCounter** | Number | The file name.

### Return type

[**SuccessResponse**](src/types/SuccessResponse.md)

<h2 style="text-align: center; vertical-align: middle">
    <a href="https://www.gimly.io/"><img src="https://avatars.githubusercontent.com/u/64525639?s=200&v=4" alt="Gimly" width="120" style="vertical-align: middle"></a></h2>

# Ggimly ssi nfc sdk

Gimly SDK to manage NFC and SSI communication

## Pre-requisites

Tangem (https://github.com/tangem/tangem-sdk-react-native)

Gimly usses tangem under the hood, which may require aditional native changes documented here

https://developers.tangem.com/getting-started/react-native

## Installation

```sh
yarn add gimly-ssi-nfc-react-native
```

# Usage

## Import

Library must be imported like:

```sh
import NfcSdk from 'gimly-ssi-nfc-react-native';
```

## Methods

## **getStatus**
> NfcSdk.getStatus

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
n/a | n/a  | n/a  | n/a

### example

```sh
NfcSdk.getStatus().then(status => {
  // handle status here
})
```

### Return type

[**status**] status response

## **startSession**
> NfcSdk.startSession

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
n/a | n/a  | n/a  | n/a

### example

```sh
NfcSdk.startSession()
```

### Return type

[**none**] no response

## **nfcListener**
> NfcSdk.nfcListener

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
n/a | n/a  | n/a  | n/a

### example

```sh
NfcSdk.nfcListener()
```

### Return type

[**none**] None

## **removeNfcListener**
> NfcSdk.removeNfcListener

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**listener** | **nfcListener**| Removes listener previous set | nfcListener must be stored on a variable and passed

### example

```sh
NfcSdk.removeNfcListener(listener)
```

### Return type

[**none**] None

## **stopSession**
> NfcSdk.stopSession

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
n/a | n/a  | Stops current set session  | n/a

### example

```sh
NfcSdk.stopSession()
```

### Return type

[**none**] no response

## **scanCard**
> NfcSdk.scanCard

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
n/a | n/a  | Scans for cards  | n/a

### example

```sh
NfcSdk.scanCard().then(card => {
  // handle card
}).catch(error => {
  // handle error
})
```

### Return type

[**card**] card response (object)

## **sign**
> NfcSdk.sign

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**hashes** | **String**| hashes | hashes
**walletPublicKey** | **String**| walletPublicKey | walletPublicKey
**cardId** | **String**| cardId | cardId
**initialMessage** | **String**| initialMessage | initialMessage

### example

```sh
NfcSdk.sign(
  hashes,
  walletPublicKey,
  cardId,
  initialMessage
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response (object)

## **createWallet**
> NfcSdk.createWallet

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| Card Identifier | n/a

### example

```sh
NgcSdk.createWallet(
  cardId
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response (object)

## **purgeWallet**
> NfcSdk.purgeWallet

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| Card Identifier | n/a
**walletPublicKey** | **String**| Public key for the wallet | n/a

### example

```sh
NgcSdk.purgeWallet(
  cardId,
  walletPublicKey
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response (object)

## **setPassCode**
> NfcSdk.setPassCode

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| Card Identifier | n/

### example

```sh
NgcSdk.setPassCode(
  cardId,
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response (object)

## **setAccessCode**
> NfcSdk.setAccessCode

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| Card Identifier | n/a

### example

```sh
NgcSdk.setAccessCode(
  cardId,
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response

## **resetUserCodes**
> NfcSdk.resetUserCodes (object)

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**cardId** | **String**| Card Identifier | n/a

### example

```sh
NgcSdk.resetUserCodes(
  cardId,
).then(response => {
  // handle response
}).catch(error => {
  // handle error
})
```

### Return type

[**response**] response (object)

## **NfcSdkModule**
> NfcSdkModule[command]

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**command** | **String**| to directly launch a Tangem command | n/a

### example

```sh
import { NfcSdkModule } from "react-native-gimly-ssi-nfc-sdk"; // to directly launch a Tangem command

NfcSdkModule[command]
```

### Return type

[**response**] response (could change, please see desired command at Tangem)

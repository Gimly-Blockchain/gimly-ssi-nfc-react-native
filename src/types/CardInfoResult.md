# CardInfoResult

## Properties

| Name                       | Type                                    | Description                | Notes                        |
| -------------------------- | --------------------------------------- | -------------------------- | ---------------------------- |
| **cardId**                 | **String**                              | The card id Id             | [default to null]            |
| **batchId**                | **String**                              | The manufacturing batch id | [optional] [default to null] |
| **cardPublicKeyMultibase** | **String**                              | The card public key        | [optional] [default to null] |
| **cardInfo**               | [**CardInfo**](CardInfo.md)             |                            | [optional] [default to null] |
| **isAccessCodeSet**        | **boolean**                             | Access code (aka PIN1) is set | [optional] [default to null] |
| **isPasscodeSet**          | **boolean**                             | Passcode (aka PIN2) is set.   | [optional] [default to null] |
| **keys**                   | [**Array\<KeyInfo>**](KeyInfo.md)       |                               | [optional] [default to null] |

[[Back to README]](/README.md)
import type { CardInfo } from './CardInfo'
import type { LinkedTerminal } from './LinkedTerminal'

export type CardInfoResult = {
  cardId: String,
  batchId: String,
  cardPublicKeyMultibase: String,
  cardInfo: CardInfo,
  // linkedTerminal: LinkedTerminal, TODO: this prop is not required on RN
};
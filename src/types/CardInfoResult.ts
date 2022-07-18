import type { CardInfo } from './CardInfo';
import type { KeyInfo } from './index'

export type CardInfoResult = {
  cardId: string;
  batchId: string;
  cardPublicKeyMultibase: string;
  cardInfo: CardInfo;
  isAccessCodeSet: boolean;
  isPasscodeSet: boolean;
  keys: KeyInfo[],
};

import type { CardInfo } from './CardInfo';

export type CardInfoResult = {
  cardId: string;
  batchId: String;
  cardPublicKeyMultibase: String;
  cardInfo: CardInfo;
};

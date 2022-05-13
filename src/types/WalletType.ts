import type {
  KeyResults,
  KeyInfo,
  SuccessResponse,
  Message
} from './index'

export type WalletType = {
  scanCard: () => {};
  setAccessCode: (accessCode: string) => Promise<SuccessResponse | null>;
  setPasscode: (passcode: string) => Promise<SuccessResponse | null>;
  resetUserCodes: () => {};
  createKey: (curve: string) => Promise<KeyResults>;
  getKeys: (initialMessage: Message) => Promise<KeyResults>;
  getKey: (initialMessage: Message, keyId: string) => Promise<KeyInfo | null>;
  deactivateKey: (keyId: string) => Promise<SuccessResponse | null>;
};

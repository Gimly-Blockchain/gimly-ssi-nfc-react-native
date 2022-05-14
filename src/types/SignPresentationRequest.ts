import type { Presentation } from './index'

export type SignPresentationRequest = {
  presentation: Presentation,
  controller: string,
  challenge: string
};
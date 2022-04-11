import type { Curve } from './Curve'
import type { FirmwareVersion } from './FirmwareVersion'

export type CardInfo = {
  curves: Curve[],
  firmwareVersion: FirmwareVersion
};
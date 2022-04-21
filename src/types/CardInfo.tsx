import type { EllipticCurve } from 'tangem-sdk-react-native';
import type { Curve } from './Curve'
import type { FirmwareVersion } from './FirmwareVersion'


export type CardInfo = {
  curves: EllipticCurve[],
  firmwareVersion: FirmwareVersion
};
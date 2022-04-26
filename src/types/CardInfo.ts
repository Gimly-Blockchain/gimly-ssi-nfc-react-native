import type { EllipticCurve } from 'tangem-sdk-react-native';
import type { FirmwareVersion } from './FirmwareVersion'


export type CardInfo = {
  curves: EllipticCurve[],
  firmwareVersion: FirmwareVersion
};

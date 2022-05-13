import type { EllipticCurve } from 'tangem-sdk';
import type { FirmwareVersion } from './FirmwareVersion';

export type CardInfo = {
  curves: EllipticCurve[];
  firmwareVersion: FirmwareVersion;
};

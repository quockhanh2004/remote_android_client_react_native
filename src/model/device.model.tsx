export interface CommandParam {
  command: string;
  deviceId: string;
}

export interface DeviceModel {
  id: string;
  deviceName: string;
  fcmTokenDevice: string;
  userId: string;
}

export interface AddDeviceParam {
  deviceName?: string;
  fcmTokenDevice: string;
}

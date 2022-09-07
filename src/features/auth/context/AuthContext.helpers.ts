import { AxiosResponseHeaders } from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { decamelizeKeys } from 'humps';
import { OAuthCredentials } from '..';
import { UpsertDeviceMutationVariables } from '../../../generated/graphql';
import { upsertDevice } from '../../user/user.api';

type GetCredentialsFromHeaders = (headers: AxiosResponseHeaders) => OAuthCredentials;

export const getCredentialsFromHeaders: GetCredentialsFromHeaders = (
  headers: AxiosResponseHeaders
) => {
  const credentials: OAuthCredentials = {
    accessToken: headers['access-token'],
    tokenType: headers['token-type'],
    expiresIn: Number(headers['expires-in']),
    refreshToken: headers['refresh-token'],
    scope: headers['scope'],
    createdAt: Date.parse(headers['created-at']),
  };

  return credentials;
};

interface DeviceInfo {
  brand: string | null;
  manufacturer: string | null;
  deviceModelName: string | null;
  deviceModelId: string | null;
  deviceYearClass: number | null;
  totalMemory: number | null;
  osName: string | null;
  osVersion: string | null;
  platformApiLevel: number | null;
  deviceName: string | null;
  exponentPushToken: string | null;
}

type GetDeviceInfo = () => Promise<DeviceInfo | null>;

const getDeviceInfo: GetDeviceInfo = async () => {
  if (Device.isDevice) {
    const exponentPushToken = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: 'your_account/expo-with-navigation',
      })
    ).data;

    const deviceInfo = {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      deviceModelName: Device.modelName,
      deviceModelId: Device.modelId,
      deviceYearClass: Device.deviceYearClass,
      totalMemory: (Device.totalMemory || 0) / Math.pow(1024, 3),
      osName: Device.osName,
      osVersion: Device.osVersion,
      platformApiLevel: Device.platformApiLevel,
      deviceName: Device.deviceName,
      exponentPushToken,
    };

    return deviceInfo;
  }

  return null;
};

const getDevice = async (userId: number) => {
  const deviceInfo = decamelizeKeys(await getDeviceInfo());
  const device: UpsertDeviceMutationVariables['device'] = {
    ...deviceInfo,
    user_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return device;
};

export const setDevice = async (userId: number) => {
  upsertDevice({ device: { ...(await getDevice(userId)), deleted_at: null } });
};

export const unsetDevice = async (userId: number) => {
  upsertDevice({ device: { ...(await getDevice(userId)), deleted_at: new Date() } });
};

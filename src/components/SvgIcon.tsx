import React from 'react';
import { Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface SvgIconProps extends SvgProps {
  icon: React.ElementType;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ icon: Icon, ...props }) => {
  if (Platform.OS === 'web' && Icon) {
    return <img src={Icon as string} {...(props as any)} />;
  }
  return <Icon {...props} />;
};

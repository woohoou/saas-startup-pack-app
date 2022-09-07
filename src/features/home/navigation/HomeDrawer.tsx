import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Factory } from 'native-base';
import React from 'react';
import { Sidebar } from './Sidebar';

export const HomeDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const DrawerContentScrollViewNB = Factory(DrawerContentScrollView);

  return (
    <DrawerContentScrollViewNB
      {...props}
      mt={-1}
      borderRightWidth="0"
      _light={{ bg: 'white', borderRightColor: 'coolGray.200' }}
      _dark={{ bg: 'coolGray.800', borderRightColor: 'coolGray.700' }}
      showsVerticalScrollIndicator={false}>
      <Sidebar />
    </DrawerContentScrollViewNB>
  );
};

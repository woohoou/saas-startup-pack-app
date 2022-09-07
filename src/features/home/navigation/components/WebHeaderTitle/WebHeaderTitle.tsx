import { HStack, Image, Pressable, useColorModeValue } from 'native-base';
import React, { useContext } from 'react';
import { SideMenuContext } from '../../context/SidemenuContext';
import logo_dark from './assets/header_dark.png';
import logo_light from './assets/header_light.png';
import menu_dark from './assets/menu_dark.png';
import menu_light from './assets/menu_light.png';

export const WebHeaderTitle = () => {
  const { toggleSideMenu } = useContext(SideMenuContext);
  return (
    <HStack space="3" alignItems="center">
      {/* Menu icon */}
      <Pressable onPress={toggleSideMenu}>
        <Image
          key={useColorModeValue('assets/menu_light.png', 'assets/menu_dark.png')}
          h="3"
          w="18"
          alt="Menu"
          resizeMode="contain"
          source={useColorModeValue(menu_light, menu_dark)}
        />
      </Pressable>
      {/* Logo image */}
      <Image
        key={useColorModeValue('logo_light', 'logo_dark')}
        h="10"
        w="56"
        alt="NativeBase Startup+"
        resizeMode="contain"
        source={useColorModeValue(logo_light, logo_dark)}
      />
    </HStack>
  );
};

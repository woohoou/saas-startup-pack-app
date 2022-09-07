import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  Menu,
  MoonIcon,
  Pressable,
  SunIcon,
  useColorMode,
  useColorModeValue,
  VStack,
} from 'native-base';
import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import logo_dark from './assets/header_dark.png';
import logo_light from './assets/header_light.png';
import menu_dark from './assets/menu_dark.png';
import menu_light from './assets/menu_light.png';

type HeaderProps = {
  title: string;
  subTitle?: string;
  toggleSidebar: () => void;
  menuButton: boolean;
  searchbar: boolean;
};

export function Header({ searchbar, toggleSidebar }: HeaderProps) {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      px="6"
      pt="3"
      pb="5"
      height={65}
      borderBottomWidth="1"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}>
      <VStack alignSelf="center" width="100%">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space="3" alignItems="center">
            {/* Menu icon */}
            <Pressable onPress={toggleSidebar}>
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
          {/* Search bar */}
          {searchbar && (
            <Input
              px="4"
              w="30%"
              size="sm"
              placeholder="Search"
              InputLeftElement={
                <Icon
                  px="2"
                  size="4"
                  name="search"
                  as={FontAwesome}
                  _light={{
                    color: 'coolGray.400',
                  }}
                  _dark={{
                    color: 'coolGray.100',
                  }}
                />
              }
            />
          )}

          <HStack space="3" alignItems="center">
            <Pressable onPress={toggleColorMode}>
              {useColorModeValue(<MoonIcon size="6" />, <SunIcon size="6" />)}
            </Pressable>

            <Menu
              closeOnSelect={false}
              w="200"
              placement="bottom right"
              onOpen={() => null}
              onClose={() => null}
              trigger={(triggerProps) => {
                return (
                  <Button variant="unstyled" p="0" {...triggerProps}>
                    <Image
                      w="8"
                      h="8"
                      source={require('../assets/pannel.png')}
                      alt="Alternate Text"
                      size="xs"
                    />
                  </Button>
                );
              }}
              _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}>
              <Menu.Group title="Profile">
                <Menu.Item>Account</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" _dark={{ bg: 'coolGray.700' }} />
              <Menu.Group title="Shortcuts">
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Group>
            </Menu>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

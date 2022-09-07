import {
  Box,
  HStack,
  Icon,
  IconButton,
  MoonIcon,
  SunIcon,
  Text,
  useColorMode,
  VStack,
} from 'native-base';
import React from 'react';

import { AntDesign, FontAwesome } from '@expo/vector-icons';

type MobileHeaderProps = {
  title: string;
  subTitle?: string;
  backButton: boolean;
  rightPanel?: boolean;
};

export function MobileHeader(props: MobileHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      px="1"
      pt="2"
      pb="2"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
      bg="amber.300">
      <HStack space="2" justifyContent="space-between">
        <HStack flex="1" space="2" justifyContent="space-between" alignItems="center">
          <>
            <HStack alignItems="center" space="1">
              {props.backButton && (
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  _icon={{ color: 'coolGray.50' }}
                  icon={<Icon size="6" as={AntDesign} name="arrowleft" />}
                />
              )}
              <VStack>
                <Text color="coolGray.50" fontSize="lg">
                  {props.title}
                </Text>
                {props.subTitle ? (
                  <Text color="coolGray.50" fontSize="sm" fontWeight="normal">
                    {props.subTitle}
                  </Text>
                ) : undefined}
              </VStack>
            </HStack>
            {/* right panel */}

            <HStack space="1">
              <IconButton
                variant="unstyled"
                colorScheme="light"
                onPress={toggleColorMode}
                _icon={{ color: 'white' }}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              />
              {props.rightPanel && (
                <IconButton
                  variant="unstyled"
                  colorScheme="light"
                  icon={
                    <Icon
                      size="6"
                      name="search"
                      as={FontAwesome}
                      _dark={{
                        color: 'coolGray.200',
                      }}
                      _light={{
                        color: 'coolGray.50',
                      }}
                    />
                  }
                />
              )}
            </HStack>
          </>
        </HStack>
      </HStack>
    </Box>
  );
}

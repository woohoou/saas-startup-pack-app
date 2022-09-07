import { Box, Center, Stack, StatusBar } from 'native-base';
import React from 'react';
type GuestLayoutProps = {
  children: React.ReactNode;
};

export function GuestLayout(props: GuestLayoutProps) {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Box safeAreaTop _light={{ bg: 'primary.900' }} _dark={{ bg: 'coolGray.900' }} />
      <Center
        flex="1"
        my="auto"
        p={{ md: 8 }}
        _dark={{ bg: 'coolGray.900' }}
        _light={{ bg: { md: '#2E165B', base: 'primary.900' } }}>
        <Stack
          w="100%"
          maxW={{ md: '1016' }}
          flex={{ base: '1', md: undefined }}
          direction={{ base: 'column', md: 'row' }}>
          {props.children}
        </Stack>
      </Center>
    </>
  );
}

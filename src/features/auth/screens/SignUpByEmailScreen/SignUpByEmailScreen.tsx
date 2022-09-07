import { AntDesign } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { Center, Hidden, HStack, Icon, IconButton, Image, Text, VStack } from 'native-base';
import React from 'react';
import { GuestLayout } from '../../../../layouts';
import { AuthEmailStackParams } from '../../navigator';
import Logo from './assets/logo.png';
import { SignUpForm } from './components';

export type SignUpByEmailScreenProps = StackScreenProps<AuthEmailStackParams, 'SignUp'>;

export const SignUpByEmailScreen: React.FC<SignUpByEmailScreenProps> = ({
  navigation: { navigate },
}) => {
  return (
    <GuestLayout>
      {/* Mobile Header */}
      <Hidden from="md">
        <VStack px="4" mt="4" mb="5" space="9">
          <HStack space="2" alignItems="center">
            <IconButton
              pl="0"
              variant="unstyled"
              onPress={() => {
                navigate('Splash');
              }}
              icon={<Icon size="6" as={AntDesign} name="arrowleft" color="coolGray.50" />}
            />
            <Text color="coolGray.50" fontSize="lg">
              Sign Up
            </Text>
          </HStack>
          <VStack space="2">
            <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
              Welcome
            </Text>
            <Text
              fontSize="md"
              fontWeight="normal"
              _dark={{
                color: 'coolGray.400',
              }}
              _light={{
                color: 'primary.300',
              }}>
              Sign up to continue
            </Text>
          </VStack>
        </VStack>
      </Hidden>
      {/* SideContainerWeb */}
      <Hidden till="md">
        <Center
          flex="1"
          bg="primary.700"
          borderTopLeftRadius={{ base: '0', md: 'xl' }}
          borderBottomLeftRadius={{ base: '0', md: 'xl' }}>
          <Image h="24" size="80" alt="NativeBase Startup+ " resizeMode="contain" source={Logo} />
        </Center>
      </Hidden>
      <SignUpForm />
    </GuestLayout>
  );
};

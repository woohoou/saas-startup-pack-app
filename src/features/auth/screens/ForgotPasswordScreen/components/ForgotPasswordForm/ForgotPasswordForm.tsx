import { MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Hidden,
  HStack,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import * as Yup from 'yup';
import { FormInput } from '../../../../../../components';
import { setErrors } from '../../../../../../helpers/forms';
import { useThemedToast } from '../../../../../../hooks/useThemedToast';
import { UserForgotPassword } from '../../../../../user/user.api';
import { AuthContext } from '../../../../context';
import { ForgotPasswordScreenProps } from '../../ForgotPasswordScreen';

export const ForgotPasswordForm: React.FC = () => {
  const [forgotPasswordIsLoading, setForgotPasswordIsLoading] = React.useState<boolean>(false);
  const { forgotPassword } = useContext(AuthContext);
  const toast = useThemedToast();
  const { navigate } = useNavigation<ForgotPasswordScreenProps['navigation']>();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserForgotPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: UserForgotPassword) => {
    setForgotPasswordIsLoading(true);
    try {
      await forgotPassword(values);
      reset();
    } catch (err: any) {
      setErrors<UserForgotPassword>(setError, err?.response?.data?.errors);
    } finally {
      toast.info({
        description: 'Please check your email and follow the email instructions.',
      });
      setForgotPasswordIsLoading(false);
    }
  };

  function Header() {
    const { goBack } = useNavigation<ForgotPasswordScreenProps['navigation']>();
    return (
      <HStack space="2" px="1" py="4" alignItems="center">
        <Pressable onPress={goBack}>
          <Icon
            alignItems="center"
            justifyContent="center"
            size="6"
            as={MaterialIcons}
            name="keyboard-backspace"
            color="coolGray.50"
          />
        </Pressable>
        <Text color="coolGray.50" fontSize="lg">
          Forgot Password
        </Text>
      </HStack>
    );
  }

  function SideContainerWeb() {
    const key = useColorModeValue('1', '2');

    return (
      <Center
        flex={{ md: 1 }}
        pt={{ base: 9, md: '190' }}
        pb={{ base: '52', md: '190' }}
        px={{ base: 4, md: '50' }}
        _light={{ bg: { base: 'white', md: 'primary.900' } }}
        _dark={{ bg: { base: 'coolGray.800', md: 'primary.700' } }}
        borderTopLeftRadius={{ md: 'md' }}
        borderBottomLeftRadius={{ md: 'md' }}>
        <Image
          resizeMode="contain"
          height={40}
          width={56}
          key={key}
          _light={{ source: require('./images/WebLightMode.png') }}
          _dark={{ source: require('./images/WebDarkMode.png') }}
          alt="Alternate Text"
        />
      </Center>
    );
  }
  function MobileScreenImage() {
    const key = useColorModeValue('1', '2');

    return (
      <Center
        py={{ base: 12, md: '190' }}
        px={{ base: 4, md: 12 }}
        _light={{ bg: { base: 'white', md: 'primary.900' } }}
        _dark={{ bg: { base: 'coolGray.800', md: 'primary.700' } }}
        borderTopRightRadius={{ md: 'md' }}
        borderBottomRightRadius={{ md: 'md' }}
        mb="-0.5">
        <Image
          resizeMode="contain"
          height={40}
          width={56}
          key={key}
          _light={{ source: require('./images/MobileLightMode.png') }}
          _dark={{ source: require('./images/MobileDarkMode.png') }}
          alt="Alternate Text"
        />
      </Center>
    );
  }

  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <VStack
      flexDirection={{ md: 'row' }}
      flex={1}
      _light={{ bg: 'primary.900' }}
      _dark={{ bg: 'coolGray.900' }}>
      <Hidden from="md">
        <Header />
      </Hidden>
      <Hidden till="md">
        <SideContainerWeb />
      </Hidden>
      <Hidden from="md">
        <MobileScreenImage />
      </Hidden>
      <Box
        pt={{ base: '0', md: '8' }}
        pb="8"
        px={{ base: '4', md: '8' }}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        flex="1"
        borderTopRightRadius={{ md: 'md' }}
        borderBottomRightRadius={{ md: 'md' }}>
        <Box flex={1} justifyContent="space-between">
          <Box>
            <VStack space={4} alignItems={{ md: 'left', base: 'center' }}>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
                textAlign={{ base: 'center', md: 'left' }}>
                Forgot Password?
              </Text>
              <Text
                _light={{ color: 'coolGray.800' }}
                _dark={{ color: 'coolGray.400' }}
                fontSize="sm"
                fontWeight="normal"
                textAlign={{ base: 'center', md: 'left' }}>
                Not to worry! Enter email address associated with your account and we’ll send a link
                to reset your password.
              </Text>
            </VStack>
            <VStack space="8" mt="9">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    label="Email"
                    errorMessage={errors.email?.message}
                    mb={{ base: 0, md: 4 }}
                    inputProps={{
                      isRequired: true,
                      onChangeText: onChange,
                      onBlur,
                      defaultValue: value,
                      labelColor: colors.coolGray[400],
                      labelBGColor: colorMode === 'light' ? 'white' : colors.coolGray[800],
                    }}
                  />
                )}
              />
              <Button
                disabled={forgotPasswordIsLoading}
                leftIcon={forgotPasswordIsLoading ? <Spinner color="white" /> : <></>}
                variant="solid"
                size="lg"
                onPress={handleSubmit(onSubmit)}>
                SUBMIT
              </Button>
            </VStack>
          </Box>
          <HStack
            mb="4"
            space="1"
            safeAreaBottom
            alignItems="center"
            justifyContent="center"
            mt={{ base: '5' }}>
            {/* Opening Link Tag navigateTo:"SignIn" */}
            <Link
              _text={{
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
              _light={{
                _text: {
                  color: 'primary.900',
                },
              }}
              _dark={{
                _text: {
                  color: 'primary.500',
                },
              }}
              onPress={() => {
                navigate('SignIn');
              }}>
              Go back to sign in
            </Link>
            {/* Closing Link Tag */}
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

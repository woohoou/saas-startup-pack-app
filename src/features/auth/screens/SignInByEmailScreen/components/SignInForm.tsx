import { Entypo } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Link,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, { useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { FormInput, IconFacebook, IconGoogle } from '../../../../../components';
import { setErrors } from '../../../../../helpers/forms';
import { useThemedToast } from '../../../../../hooks/useThemedToast';
import { AuthContext } from '../../../context';
import { SignInByEmailScreenProps } from '../SignInByEmailScreen';
YupPassword(Yup);

interface UserSignInByEmailForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInForm: React.FC = () => {
  const { navigate } = useNavigation<SignInByEmailScreenProps['navigation']>();
  const [showPass, setShowPass] = React.useState(false);
  const [signInIsLoading, setSignInIsLoading] = React.useState<boolean>(false);
  const [googleSignInIsLoading, setGoogleSignInIsLoading] = React.useState<boolean>(false);
  const [facebookSignInIsLoading, setFacebookSignInIsLoading] = React.useState<boolean>(false);
  const { signInByEmail, facebookSignIn, googleSignIn } = useContext(AuthContext);
  const toast = useThemedToast();

  const anySignInIsLoading = useMemo(
    () => signInIsLoading || googleSignInIsLoading || facebookSignInIsLoading,
    [signInIsLoading, googleSignInIsLoading, facebookSignInIsLoading]
  );

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().password().required('Required'),
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserSignInByEmailForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: UserSignInByEmailForm) => {
    setSignInIsLoading(true);
    try {
      await signInByEmail(values);
      reset();
    } catch (err: any) {
      const dataErrors = err?.response?.data?.errors;
      if (dataErrors) {
        setErrors<UserSignInByEmailForm>(setError, dataErrors);
      } else {
        console.error(err);
        toast.warning({
          description: 'Invalid username or password',
        });
      }
    } finally {
      setSignInIsLoading(false);
    }
  };

  const onGoogleSignInPress = async (): Promise<void> => {
    setGoogleSignInIsLoading(true);
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
      toast.show({ description: 'We are sorry, something went wrong' });
    } finally {
      setGoogleSignInIsLoading(false);
    }
  };

  const onFacebookSignInPress = async (): Promise<void> => {
    setFacebookSignInIsLoading(true);
    try {
      await facebookSignIn();
    } catch (err) {
      console.error(err);
      toast.show({ description: 'We are sorry, something went wrong' });
    } finally {
      setFacebookSignInIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}>
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}>
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Sign in to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack space={{ base: '7', md: '4' }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Email"
                      errorMessage={errors.email?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Password"
                      errorMessage={errors.password?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                        type: showPass ? undefined : 'password',
                        InputRightElement: (
                          <IconButton
                            variant="unstyled"
                            py={0}
                            my={0}
                            icon={
                              <Icon
                                size="4"
                                color="coolGray.400"
                                as={Entypo}
                                name={showPass ? 'eye-with-line' : 'eye'}
                              />
                            }
                            onPress={() => {
                              setShowPass(!showPass);
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
                {errors.password ? <Text color="danger.500">{errors.password.message}</Text> : null}
              </VStack>
              <Link
                onPress={() => navigate('ForgotPassword')}
                ml="auto"
                _text={{
                  fontSize: 'xs',
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
                }}>
                Forgot password?
              </Link>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox
                    alignItems="flex-start"
                    mt="5"
                    isChecked
                    value="demo"
                    colorScheme="primary"
                    defaultIsChecked={value}
                    onChange={onChange}
                    accessibilityLabel="Remember me">
                    <Text
                      pl="3"
                      fontWeight="normal"
                      _light={{ color: 'coolGray.800' }}
                      _dark={{ color: 'coolGray.400' }}>
                      Remember me and keep me logged in
                    </Text>
                  </Checkbox>
                )}
              />
              <Button
                disabled={anySignInIsLoading}
                leftIcon={signInIsLoading ? <Spinner color="white" /> : <></>}
                mt="5"
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={handleSubmit(onSubmit)}>
                SIGN IN
              </Button>
              <HStack
                mt="5"
                space="2"
                mb={{ base: 6, md: 7 }}
                alignItems="center"
                justifyContent="center">
                <Divider w="30%" _light={{ bg: 'coolGray.200' }} _dark={{ bg: 'coolGray.700' }} />
                <Text
                  fontWeight="medium"
                  _light={{ color: 'coolGray.300' }}
                  _dark={{ color: 'coolGray.500' }}>
                  or
                </Text>
                <Divider w="30%" _light={{ bg: 'coolGray.200' }} _dark={{ bg: 'coolGray.700' }} />
              </HStack>
            </VStack>
            <Center>
              <HStack space="4">
                <Pressable disabled={anySignInIsLoading} onPress={onFacebookSignInPress}>
                  {facebookSignInIsLoading ? <Spinner /> : <IconFacebook />}
                </Pressable>
                <Pressable disabled={anySignInIsLoading} onPress={onGoogleSignInPress}>
                  {googleSignInIsLoading ? <Spinner /> : <IconGoogle />}
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{ base: 'auto', md: '8' }}>
          <Text _light={{ color: 'coolGray.800' }} _dark={{ color: 'coolGray.400' }}>
            Don't have an account?
          </Text>
          {/* Opening Link Tag navigateTo:"SignUp" */}
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
              navigate('SignUp');
            }}>
            Sign up
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default SignInForm;

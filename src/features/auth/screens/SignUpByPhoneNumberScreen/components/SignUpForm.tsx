import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Checkbox, Hidden, HStack, Link, Spinner, Text, VStack } from 'native-base';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import 'yup-phone';
import { setErrors } from '../../../../../helpers/forms';
import { useThemedToast } from '../../../../../hooks/useThemedToast';
import { UserSignUpByPhoneNumber } from '../../../../user/user.api';
import { AuthContext } from '../../../context';
import { AuthPhoneNumberStackParams } from '../../../navigator';
YupPassword(Yup);

export interface UserSignUpByPhoneNumberForm extends UserSignUpByPhoneNumber {
  termsAccepted: boolean;
}

export type SignUpByPhoneNumberScreenProps = StackScreenProps<AuthPhoneNumberStackParams, 'SignUp'>;

export const SignUpForm = () => {
  // const router = useRouter(); //use incase of Nextjs
  const [signUpIsLoading, setSignUpIsLoading] = React.useState<boolean>(false);
  const { signUpByPhoneNumber } = useContext(AuthContext);
  const { navigate } = useNavigation<SignUpByPhoneNumberScreenProps['navigation']>();
  const toast = useThemedToast();

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().phone().required('Required'),
    termsAccepted: Yup.bool().oneOf([true], 'Field must be checked'),
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserSignUpByPhoneNumberForm>({
    defaultValues: {
      phoneNumber: '',
      termsAccepted: true,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: UserSignUpByPhoneNumberForm) => {
    setSignUpIsLoading(true);
    try {
      const data = await signUpByPhoneNumber({
        phoneNumber: values.phoneNumber,
      });
      reset();
      if (data) {
        setSignUpIsLoading(false);
        navigate('SignIn', { phoneNumber: data.phoneNumber });
      } else {
        throw new Error('User data not found');
      }
    } catch (err: any) {
      const dataErrors = err?.response?.data?.errors;
      if (dataErrors) {
        setErrors<UserSignUpByPhoneNumberForm>(setError, err?.response?.data?.errors);
      } else {
        console.error(err);
        toast.warning({
          description: 'User could not be created',
        });
      }
      setSignUpIsLoading(false);
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
        justifyContent="space-between"
        space="3"
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}>
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Sign up to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="8">
              <VStack space={{ base: '7', md: '4' }}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PhoneInput
                      defaultCode="MX"
                      containerStyle={{ width: '100%', height: 60 }}
                      codeTextStyle={{ fontSize: 18 }}
                      textInputStyle={{ height: 60, paddingVertical: 0, fontSize: 18 }}
                      textContainerStyle={{ height: 60, paddingVertical: 0 }}
                      withShadow
                      autoFocus
                      placeholder="0000000000"
                      value={value}
                      onChangeFormattedText={onChange}
                    />
                  )}
                />
                {errors.phoneNumber ? (
                  <Text color="danger.500">{errors.phoneNumber.message}</Text>
                ) : null}
              </VStack>
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox
                    alignItems="flex-start"
                    defaultIsChecked={value}
                    value="termsAccepted"
                    onChange={onChange}
                    color="primary"
                    accessibilityLabel="Accept terms and conditions">
                    <HStack alignItems="center">
                      <Text fontSize="sm" color="coolGray.400" pl="2">
                        I accept the{' '}
                      </Text>
                      <Link
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'semibold',
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
                        Terms of Use
                      </Link>
                      <Text fontSize="sm"> & </Text>

                      <Link
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'semibold',
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
                        Privacy Policy
                      </Link>
                    </HStack>
                  </Checkbox>
                )}
              />
              {errors.termsAccepted ? (
                <Text color="danger.500">{errors.termsAccepted.message}</Text>
              ) : null}
              <Button
                disabled={signUpIsLoading}
                leftIcon={signUpIsLoading ? <Spinner /> : <></>}
                size="md"
                borderRadius="4"
                _text={{
                  fontSize: 'sm',
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={handleSubmit(onSubmit)}>
                SIGN UP
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

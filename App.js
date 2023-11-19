import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import useCounterStore from './src/app/store';
import {Formik} from 'formik';
import Counter from './src/components/Counter';
import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';

const validationScheme = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-mail adresi giriniz ')
    .required('E-posta alanı zorunludur '),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
});

const App = () => {
  const showZuatandInfo = false;
  const isShowFormik = false;
  const isShowReactHookForms = true;
  const {increment, decrement} = useCounterStore(state => state);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({defaultValues: {email: '', password: ''}, mode: 'onChange'});
  const handleOnSubmit = () => {
    console.log('handleSubmit', handleOnSubmit);
  };

  console.log('err', errors);
  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      {showZuatandInfo && (
        <View>
          <Counter />
          <Button title="Arttır" onPress={increment} />
          <Button title="Azalt" onPress={decrement} />
        </View>
      )}
      {isShowFormik && (
        <View>
          <Formik
            validationSchema={validationScheme}
            initialValues={{email: '', password: ''}}
            onSubmit={handleOnSubmit}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={styles.inputContainer}>
                <Text>E-Posta</Text>
                <TextInput
                  placeholder="E-Posta"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                />
                <Text style={styles.errorText}>{errors.email}</Text>
                <Text>Password</Text>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  value={values.password}
                  autoCapitalize={'none'}
                />
                <Text style={styles.errorText}>{errors.password}</Text>

                <Button
                  title="Giriş Yap"
                  onPress={handleSubmit}
                  disabled={!isValid || dirty}
                />
              </View>
            )}
          </Formik>
        </View>
      )}
      {isShowReactHookForms && (
        <View>
          <View style={styles.inputContainer}>
            <Text>E-Posta</Text>
            <Controller
              control={control}
              name="email"
              rules={{required: {value: true, message: 'Bu alan zorunludur'}}}
              render={({field: {onChange, onBlur, value, errors}}) => (
                <TextInput
                  placeholder="E-Posta"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errors={errors}
                />
              )}
            />

            {errors.email && <Text>{errors?.email?.message}</Text>}
            <Text>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {value: true, message: 'Bu alan zorunludur'},
                maxLength: {
                  value: 20,
                  message: 'Şifre alanı en çok 20 karakter olmalıdır',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.password && <Text>{errors?.password?.message}</Text>}

            <Button title="Giriş Yap" onPress={handleSubmit(handleOnSubmit)} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
  inputContainer: {
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

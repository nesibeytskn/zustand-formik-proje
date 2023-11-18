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
  const {increment, decrement} = useCounterStore(state => state);
  const handleOnSubmit = values => {
    console.log('handleSubmit', values);
  };
  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      {showZuatandInfo && (
        <View>
          <Counter />
          <Button title="Arttır" onPress={increment} />
          <Button title="Azalt" onPress={decrement} />
        </View>
      )}
      <View>
        <Formik
          validationSchema={validationScheme}
          initialValues={{email: '', password: ''}}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleSubmit, values, errors, touched, isValid}) => (
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

              <Button title="Giriş Yap" onPress={handleSubmit} disabled={!isValid} />
            </View>
          )}
        </Formik>
      </View>
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

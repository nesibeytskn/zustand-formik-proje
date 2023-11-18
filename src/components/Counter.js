import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useCounterStore from '../app/store';

const Counter = () => {
  const count = useCounterStore(state => state.count);
  return (
    <View>
      <Text>Counter {count}</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});

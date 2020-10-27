/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Root from './components/Root';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {/* <StatusBar barStyle="light-content" hidden={true} /> */}
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  SafeAreaView: { flex: 1, backgroundColor: 'black' },
});

export default App;

import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

interface Props {
  navigation: any;
}

const Home = ({ navigation }: Props) => {
  return (
    <View style={[styles.container, styles.center]}>
      <Button
        title={'open test'}
        onPress={() => navigation.navigate('TestScreen', { reverse: false, conjunction: false })}
      />
      <View style={{marginBottom: 50}} />
      <Button
        title={'open reverse test'}
        onPress={() => navigation.navigate('TestScreen', { reverse: true, conjunction: false })}
      />
      <Button
        title={'open conjuction test'}
        onPress={() => navigation.navigate('TestScreen', { reverse: false, conjunction: true })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  SafeAreaView: { flex: 1, backgroundColor: 'black' },
});

export default Home;

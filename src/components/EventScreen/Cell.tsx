import React from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native';
import { OBJECT_TYPE, ScreenObject } from './';

const { height, width } = Dimensions.get('window');
export const CELL_HEIGHT = (height - 300) / 8;
export const CELL_WIDTH = (width - 200) / 10;

interface Props {
  i: number;
  j: number;
  screenObject?: ScreenObject | null;
}

const Cell = (props: Props) => {
  return <View style={styles.cell} />;
};

const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'aqua',
    // flex: 1,
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
  },
});

export default Cell;

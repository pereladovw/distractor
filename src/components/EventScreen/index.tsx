import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell, { CELL_HEIGHT, CELL_WIDTH } from './Cell';

const DISTRACTOR_RADIUS = 20;
const ROWS_COUNT = 8;
const COLUMNS_COUNT = 10;

export enum OBJECT_TYPE {
  TARGET,
  DISTRCATOR,
}

export interface ScreenObject {
  type: OBJECT_TYPE;
  cellX: number;
  cellY: number;
}

export default class EventScreen extends React.Component {
  screenOgjects: ScreenObject[][] = new Array(ROWS_COUNT).fill(new Array(COLUMNS_COUNT).fill(null));

  componentDidMount() {}

  createArray() {}

  selectRandomCell() {
    const i = Math.floor(Math.random() * ROWS_COUNT);
    const j = Math.floor(Math.random() * COLUMNS_COUNT);
    return { i, j };
  }

  renderRow(rowIndex: number) {
    const cellsInRow = [];
    for (let j = 0; j < COLUMNS_COUNT; j++) {
      cellsInRow.push(
        <Cell key={'key' + j} i={rowIndex} j={j} screenObject={this.screenOgjects[rowIndex][j]} />
      );
    }

    return <View style={styles.row}>{cellsInRow}</View>;
  }

  render() {
    const workSpace = [];
    for (let i = 0; i < ROWS_COUNT; i++) {
      const row = this.renderRow(i);
      workSpace.push(
        <View key={'key' + i} style={styles.container}>
          {row}
        </View>
      );
    }

    return <View style={[styles.container, styles.center, styles.screen]}>{workSpace}</View>;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  screen: { flex: 1, paddingVertical: 150, paddingHorizontal: 100 },
  SafeAreaView: { flex: 1, backgroundColor: 'black' },
  row: { flexDirection: 'row', flex: 1 },
});

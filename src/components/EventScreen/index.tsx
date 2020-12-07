import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Cell, { CELL_HEIGHT, CELL_WIDTH } from './Cell';

export const OBJECT_RADIUS = 10;
const DISTRACTORS_COUNT = 40;
const TARGETS_COUNT = 40;
const ROWS_COUNT = 8;
const COLUMNS_COUNT = 10;

export enum OBJECT_TYPE {
  TARGET,
  DISTRACTOR,
}

export interface ScreenObject {
  type: OBJECT_TYPE;
  cellX: number;
  cellY: number;
  colorIndex: number;
}

export interface ScreenObjectData {
  screenObject: ScreenObject;
  x: number;
  y: number;
  time?: number;
}

export enum STATUS {
  common,
  started,
  wrongPress,
  finished,
}

interface State {
  status: STATUS;
}

export default class EventScreen extends React.Component<{}, State> {
  screenOgjects: ScreenObject[][] = new Array(ROWS_COUNT).fill(new Array(COLUMNS_COUNT).fill(null));
  pressedTargets: ScreenObjectData[] = [];
  startTime: number = 0;

  constructor(props: {}) {
    super(props);
    // this.createArray();
    this.state = {
      status: STATUS.common,
    };
  }

  // componentDidMount() {}

  createArray() {
    for (let i = 0; i < ROWS_COUNT; i++) {
      this.screenOgjects[i] = new Array(COLUMNS_COUNT).fill(null);
    }

    function randomColor() {
      return Math.floor(Math.random() * 2);
    }

    function selectRandomCell() {
      const i = Math.floor(Math.random() * ROWS_COUNT);
      const j = Math.floor(Math.random() * COLUMNS_COUNT);
      return { i, j };
    }
    const xFrame = CELL_WIDTH - OBJECT_RADIUS * 4;
    const yFrame = CELL_HEIGHT - OBJECT_RADIUS * 4;
    function randomXY() {
      const x = Math.floor(Math.random() * (xFrame + 1)) - xFrame / 2;
      const y = Math.floor(Math.random() * (yFrame + 1)) - yFrame / 2;
      return { x, y };
    }

    // fullfill with distractors
    for (let k = 0; k < DISTRACTORS_COUNT; k++) {
      let cellUpdated = false;
      while (!cellUpdated) {
        const { i, j } = selectRandomCell();
        const cell = this.screenOgjects[i][j];

        if (!cell) {
          const { x, y } = randomXY();
          const colorIndex = randomColor();
          this.screenOgjects[i][j] = {
            type: OBJECT_TYPE.DISTRACTOR,
            cellX: x,
            cellY: y,
            colorIndex,
          };
          cellUpdated = true;
        }
      }
    }

    //fulfill with targets
    for (let k = 0; k < TARGETS_COUNT; k++) {
      let cellUpdated = false;
      while (!cellUpdated) {
        const { i, j } = selectRandomCell();
        const cell = this.screenOgjects[i][j];
        if (!cell) {
          const { x, y } = randomXY();
          const colorIndex = randomColor();
          this.screenOgjects[i][j] = {
            type: OBJECT_TYPE.TARGET,
            cellX: x,
            cellY: y,
            colorIndex,
          };
          cellUpdated = true;
        }
      }
    }
  }

  onStart() {
    this.pressedTargets = [];
    this.createArray();
    this.setState({ status: STATUS.started });
    this.startTime = new Date().getTime();
  }

  onObjectPress(item: ScreenObjectData) {
    if (item.screenObject.type === OBJECT_TYPE.TARGET) {
      item.time = new Date().getTime() - this.startTime;
      this.pressedTargets.push(item);
      if (this.pressedTargets.length >= TARGETS_COUNT) {
        this.setState({ status: STATUS.finished });
      }
    } else if (item.screenObject.type === OBJECT_TYPE.DISTRACTOR) {
      this.setState({ status: STATUS.wrongPress });
    }
  }

  renderRow(rowIndex: number) {
    const cellsInRow = [];
    for (let j = 0; j < COLUMNS_COUNT; j++) {
      cellsInRow.push(
        <Cell
          key={'key' + j}
          i={rowIndex}
          j={j}
          screenObject={this.screenOgjects[rowIndex][j]}
          onObjectPress={this.onObjectPress.bind(this)}
          reverse={this.props.route.params?.reverse}
        />
      );
    }

    return <View style={styles.row}>{cellsInRow}</View>;
  }

  render() {
    console.log(this.props, this.screenOgjects, CELL_HEIGHT, CELL_WIDTH);
    switch (this.state.status) {
      case STATUS.common:
        return (
          <View style={[styles.container, styles.center, styles.screen]}>
            <Button
              title={'START'}
              onPress={() => {
                this.onStart();
              }}
            />
          </View>
        );
      case STATUS.wrongPress:
        return (
          <View style={[styles.container, styles.center, styles.screen]}>
            <Text style={{ color: 'white' }}>Distractor was pressed</Text>
            <Button title={'RESTART'} onPress={() => this.onStart()} />
          </View>
        );
      case STATUS.finished:
        return (
          <View style={[styles.container, styles.center, styles.screen]}>
            <Text style={{ color: 'white' }}>Finished</Text>
            <Button title={'RESTART'} onPress={() => this.onStart()} />
          </View>
        );
      case STATUS.started: {
        const workSpace = [];
        for (let i = 0; i < ROWS_COUNT; i++) {
          const row = this.renderRow(i);
          workSpace.push(
            <View key={'key' + i}>
              {row}
            </View>
          );
        }

        return <View style={[styles.container, styles.center, styles.screen ]}><View style={[{width: 1024, height: 768, backgroundColor: 'gray'}, styles.center]}>{workSpace}</View></View>;
      }
      default:
        return <View />;
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  screen: { backgroundColor: 'black' },
  // SafeAreaView: { backgroundColor: 'black' },
  row: { flexDirection: 'row'},
});

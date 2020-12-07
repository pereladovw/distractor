import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { OBJECT_TYPE, ScreenObject, OBJECT_RADIUS, ScreenObjectData } from './';

const { height, width } = Dimensions.get('screen');
export const CELL_HEIGHT = (768 - 200) / 8;
export const CELL_WIDTH = (1024 - 300) / 10;

export const BUTTOM_SIZE = (OBJECT_RADIUS + 8) * 2;

const COLORS1 = ['yellow', 'blue'];
const COLORS2 = ['red', 'green'];

interface Props {
  i: number;
  j: number;
  screenObject?: ScreenObject | null;
  onObjectPress: (item: ScreenObjectData) => void;
  reverse: boolean;
}

const Cell = (props: Props) => {
  const [visible, setVisible] = useState(true);
  let refView: View | null = null;
  return (
    <View style={styles.cell}>
      {!!props.screenObject && visible && (
        <TouchableWithoutFeedback
          containerStyle={[
            styles.button,
            {
              top: props.screenObject.cellY,
              left: props.screenObject.cellX,
            },
          ]}
          onPress={() => {
            console.log('pressed', props);
            if (refView) {
              console.log(
                refView.measure((px, py) => {
                  console.log('X offset to page: ' + px);
                  console.log('Y offset to page: ' + py);
                  props.onObjectPress({
                    screenObject: props.screenObject!,
                    x: px - 150 - BUTTOM_SIZE,
                    y: py - 100 - BUTTOM_SIZE,
                  });
                  setVisible(false);
                })
              );
            }
          }}
          onLongPress={() => console.log('long pressed', props)}
        >
          <View
            ref={(ref) => (refView = ref)}
            style={[
              styles.object,
              {
                backgroundColor: props.reverse
                  ? props.screenObject.type === OBJECT_TYPE.DISTRACTOR
                    ? COLORS2[props.screenObject.colorIndex]
                    : COLORS1[props.screenObject.colorIndex]
                  : props.screenObject.type === OBJECT_TYPE.DISTRACTOR
                  ? COLORS1[props.screenObject.colorIndex]
                  : COLORS2[props.screenObject.colorIndex],
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    // backgroundColor: 'pink',
    // borderWidth: 1,
    // borderColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
  },
  object: {
    height: OBJECT_RADIUS * 2,
    width: OBJECT_RADIUS * 2,
    borderRadius: OBJECT_RADIUS,
  },
  button: {
    height: BUTTOM_SIZE,
    width: BUTTOM_SIZE,
    borderRadius: BUTTOM_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cell;

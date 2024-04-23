import React, { PureComponent } from 'react';
import { Animated, Dimensions, StyleSheet, View, LayoutChangeEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GREY = 'rgb(234, 234, 234)';
const shimmeringAnimatedValue = new Animated.Value(0);
const ShimmeringAnimation = Animated.loop(
  Animated.timing(shimmeringAnimatedValue, {
    useNativeDriver: false,
    delay: 1200,
    duration: 750,
    toValue: 1,
  }),
);

export default class Shimmering extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewWidth: -1,
    };
    this.animation = ShimmeringAnimation;
  }

  startAnimation() {
    this.animation.start();
  }

  render() {
    const { colors, gradientStyle, wrapperStyle } = this.props;
    const width = Dimensions.get('screen').width;
    const loadingStyle = { backgroundColor: GREY };
    const left = this.getLeftValue();
    return (
      <View style={{ width: wrapperStyle?.width ?? width, height: wrapperStyle?.height ?? 80 }}>
        <View style={[styles.container, loadingStyle, wrapperStyle]} onLayout={event => this.onLayoutChange(event)}>
          <Animated.View style={[{ flex: 1, left }, gradientStyle]}>
            <LinearGradient
              colors={colors || [GREY, '#fff', GREY]}
              start={{ x: 0.3, y: 0.2 }}
              end={{ x: 0.8, y: 0.5 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  onLayoutChange(event) {
    this.setState({
      viewWidth: event.nativeEvent.layout.width,
    });
    this.startAnimation();
  }

  getLeftValue() {
    const { viewWidth } = this.state;
    return shimmeringAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-viewWidth, viewWidth],
    });
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

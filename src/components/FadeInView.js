import React from 'react';
import { Animated, Text, View } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    // Animated.timing(                  // Animate over time
    //   this.state.fadeAnim,            // The animated value to drive
    //   {
    //     toValue: 1,                   // Animate to opacity: 1 (opaque)
    //     duration: 500,              // Make it take a while
    //   }
    // ).start();                        // Starts the animation

    Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: 200
          }),
          Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 500
          })
        ]),
        {
          iterations: 4
        }
      ).start()
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default FadeInView;
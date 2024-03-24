import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Button, Modal, TouchableOpacity } from 'react-native';

import styles from './quickview.style';

const QuickView = ({ onOff }) => {
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(800)).current;

  const animateViewUp = () => {
    setIsVisible(true);
    Animated.timing(
      translateY,
      {
        toValue: 250,
        duration:1000,
        useNativeDriver: true,
      }
    ).start();
  };

  useEffect(() => {
    if(onOff) {
      animateViewUp();
    }
  }, [isVisible])

  const animateViewDown = () => {
    Animated.timing(
      translateY,
      {
        toValue: 800,
        duration:1000,
        useNativeDriver: true,
      }
    ).start(() => setIsVisible(false));
  };


  return (
    // <View style={styles.container}>
    //   <Button title='Animate Up' onPress={animateViewUp} />
      <Modal
        visible={isVisible}
        transparent
        animationType='fade'
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.box, {transform: [{ translateY}] }]}
          >
            <Text>Your Content here</Text>
            <TouchableOpacity
              style={{ position: 'absolute', top: 0, right: 0 }}
              onPress={animateViewDown}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
  )
}

export default QuickView;
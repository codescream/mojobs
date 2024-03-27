import React, {useCallback, useEffect, useState} from 'react';
import { Text, View, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image, Pressable, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';


const Home = () => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [animateContent, setAnimateContent] = useState(<></>);
  const [animateHeight, setAnimateHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [rerender, setRerender] = useState(false);
  const translateY = useSharedValue(1000);
  const router = useRouter();

  // alert(showQuickView);
  // console.log(selectedJob);

  const animateViewUp = () => {
    translateY.value = withSpring(translateY.value - 1000);
  };

  useEffect(() => {
    if(showQuickView) {
      animateViewUp();
    }
  }, [showQuickView, selectedJob]);

  const onRefresh = () => {
      setRefreshing(true);
      setRerender(prevRender => !prevRender);
      setRefreshing(false);
      // setRerender(false);
  };
  

  const animateViewDown = () => {
    translateY.value = withSpring(translateY.value + 1000);
    setShowQuickView(false);
  }  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: ""
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Welcome />
          <Popularjobs onOff={setShowQuickView} job={setSelectedJob} setAnimateContent={setAnimateContent} animateViewDown={animateViewDown} setAnimateHeight={setAnimateHeight} rerender={rerender} setRerender={setRerender} />
          <Nearbyjobs rerender={rerender} setRerender={setRerender} />

          {
            showQuickView && (
              <Modal
                visible={showQuickView}
                transparent
                animationType='fade'
              >
                <Pressable 
                  style={{ height: animateHeight, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                  onPress={() => animateViewDown()}
                />
                <Animated.View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: COLORS.lightWhite,
                    padding: 10,
                    transform: [{ translateY }]
                  }}
                >
                  <TouchableOpacity
                    style={{ 
                      position: 'absolute', 
                      top: 5, 
                      right: 4, 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      zIndex: '100'
                    }}
                    onPress={() => animateViewDown()}
                  >
                    <Image 
                      source={icons.closeBtn} 
                      resizeMode='contain'
                      style={{ width: 25, height: 25, tintColor: COLORS.tertiary }} />
                  </TouchableOpacity>
                  {animateContent}
                </Animated.View>
              </Modal>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;
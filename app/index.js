import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { COLORS, FONT, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import { checkImageURL } from '../utils';


const Home = () => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
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
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Welcome />
          <Popularjobs onOff={setShowQuickView} job={setSelectedJob} />
          <Nearbyjobs />

          {
            showQuickView && (
              <Modal
                visible={showQuickView}
                transparent
                animationType='fade'
              >
                <Pressable 
                  style={{ height: 200, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                  onPress={() => animateViewDown()}
                />
                <Animated.View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: COLORS.lightWhite,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: 10,
                    transform: [{ translateY }]
                  }}
                >
                  <View style={{
                    display: 'flex',
                    height: 100,
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: 10,
                    columnGap: 10,
                  }}>
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.medium,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image 
                        source={{ uri: checkImageURL(selectedJob.employer_logo) ? selectedJob.employer_logo : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
                        resizeMode='contain'
                        style={{ width: '80%', height: '80%' }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{ 
                          fontSize: SIZES.large,
                          fontFamily: FONT.medium,
                          color: COLORS.primary
                        }}
                        numberOfLines={4}
                      >{selectedJob.job_title}</Text>
                      <Text>{selectedJob.employer_name}</Text>
                    </View>
                    
                  </View>
                  <ScrollView
                    style={{
                      flex: 1,
                      
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    <View
                      style={{
                        paddingBottom: 100
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        Job Summary:
                      </Text>
                      <Text
                        numberOfLines={45}
                      >
                        {selectedJob.job_description}
                      </Text>
                    </View>
                  </ScrollView>
                  <TouchableOpacity
                    style={{ 
                      position: 'absolute', 
                      top: 5, 
                      right: 4, 
                      justifyContent: 'center', 
                      alignItems: 'center'
                    }}
                    onPress={() => animateViewDown()}
                  >
                    <Image 
                      source={icons.closeBtn} 
                      resizeMode='contain'
                      style={{ width: 25, height: 25, tintColor: COLORS.tertiary }} />
                  </TouchableOpacity>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 10,
                      right: 10,
                      height: 80,
                      padding: SIZES.small,
                      backgroundColor: "#FFF",
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: SIZES.medium,
                        backgroundColor: COLORS.tertiary
                      }}
                      onPress={() => {
                        animateViewDown();
                        router.push(`/job-details/${selectedJob?.job_id}`)}}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontWeight: "bold"
                        }}
                      >Find Out More...</Text>
                    </TouchableOpacity>
                  </View>
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
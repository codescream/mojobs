import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './footer.style';
import { icons } from '../../../constants';

const Footer = ({ url, job_id }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(`liked-${job_id}`);
        if (value !== null) {
          setLiked(JSON.parse(value));
        } 
        // else {
        //   console.log('No data found for key:', key);
        //   return null;
        // }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const storeData = async (key, value) => {
    setLiked(value);
    try { 
      await AsyncStorage.setItem(key, JSON.stringify(value)); 
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.likeBtn}
        onPress={() => storeData(`liked-${job_id}`, !liked)}
      >
        <Image 
          source={liked ? icons.heart : icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hook/useFetch';

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const router = useRouter();
  
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const renderItem = ({item}) => {
    return <PopularJobCard item={item} selectedJob={selectedJob?.job_id} handleCardPress={() => setSelectedJob(item)} />
  };

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Popular Jobs</Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: COLORS.tertiary,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {}}
          >
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
      </View>
      <View
        style={styles.cardsContainer}
      >
        {
          isLoading ?(<ActivityIndicator 
            size="large"
            colors={COLORS.primary} 
            />) : error ? (
            <Text>Somethig went wrong</Text>
          ) : (<FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.job_id}
                contentContainerStyle={{ columnGap: SIZES.medium, paddingVertical: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal
              />)
        }
      </View>
    </View>
  )
}

export default Popularjobs
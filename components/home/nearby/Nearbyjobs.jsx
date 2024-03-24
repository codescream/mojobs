import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useFetch } from '../../../hook/useFetch';
import { COLORS, SIZES } from '../../../constants';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          ) : (
            data.map((job) => (
              <NearbyJobCard 
                key={job?.job_id} 
                job={job}
                handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
              />
            ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs;
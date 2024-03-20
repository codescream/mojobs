import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

import { COLORS, SIZES, icons } from '../../constants';
import { NearbyJobCard, ScreenHeaderBtn } from '../../components';
import styles from '../../styles/search';


const SearchJob = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const params = useLocalSearchParams();
  const jobType = params.values[1] ?? "";
  const searchTerm = params.values[0];

  console.log(jobType, searchTerm);

  const router = useRouter();

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  }

  // const { data, isLoading, error } = useFetch('search', {
  //   query: searchTerm,
  //   page: page,
  // });

  console.log(data);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/search`,
      params: {
       query: searchTerm,
       employment_types: jobType,
       page: page 
      },
      headers: {
        'X-RapidAPI-Key': '7ed853057bmsh1fa17ecb56f5b4bp1adab0jsn615a7c4ae69d',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };
  
    // const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setData(response.data.data);
        setIsLoading(false);
      }catch(e) {
        setError(e);
        console.log(e);
        alert('There was an error fetching data');
      }finally {
        setIsLoading(false);
      }
    // }

    // fetchData();
  }

  useEffect(() => {
    handleSearch();
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => {
            <ScreenHeaderBtn 
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          },
          headerTitle: "",
        }}
      />

      <View>
        <FlatList 
          data={data}
          renderItem={({ item }) => (
            <NearbyJobCard 
              job={item}
              handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            />
          )}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium, paddingBottom: 100 }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text 
                  style={styles.searchTitle}
                >{searchTerm}</Text>
                <Text
                  style={styles.noOfSearchedJobs}
                >
                  Job Opportunities
                </Text>
              </View>
              <View style={styles.loaderContainer}>
                {
                  isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                  ) : error && (
                    <Text>Oops! Something went wrong...</Text>
                  )
                }
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={() => (
          
          // )}
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePagination('left')}
        >
          <Image 
            source={icons.chevronLeft}
            style={styles.paginationImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.paginationTextBox}>
          <Text style={styles.paginationText}>
            {page}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePagination('right')}
        >
          <Image 
            source={icons.chevronRight}
            style={styles.paginationImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SearchJob;
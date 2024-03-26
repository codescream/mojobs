import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, FONT, SIZES, icons } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hook/useFetch';
import { checkImageURL } from '../../../utils';

const jobTypes = ["Fulltime", "Parttime", "Contractor", "Intern", "Show All"];

const PopularJobContent = ({ job, animateViewDown }) => {
  const router = useRouter();
  return (<>
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
          source={{ uri: checkImageURL(job?.employer_logo) ? job?.employer_logo : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
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
        >{job?.job_title}</Text>
        <Text>{job?.employer_name}</Text>
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
          {job?.job_description}
        </Text>
      </View>
    </ScrollView>
    
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
          router.push(`/job-details/${job?.job_id}`)}}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.medium,
            fontFamily: FONT.medium
          }}
        >Find Out More...</Text>
      </TouchableOpacity>
    </View>
  </>)
}

const Popularjobs = ({ onOff, job, setAnimateContent, animateViewDown, setAnimateHeight }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobCategory, setJobCategory] = useState('Show All');
  
  
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
    employment_types: jobCategory === "Show All" ? jobTypes.slice(0, 3).join(",") : jobCategory
  });  

  useEffect(() => {
    refetch();
  
  }, [jobCategory])
  

  const renderItem = ({item}) => {
    return <PopularJobCard item={item} selectedJob={selectedJob?.job_id} handleCardPress={() => {setSelectedJob(item); setAnimateHeight(200); onOff(true); job(item); setAnimateContent(<PopularJobContent job={item} animateViewDown={animateViewDown} />)}} />
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
            }}
            onPress={() => {onOff(true); setAnimateHeight("60%"); setAnimateContent(
              <>
                <View style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  flex: 1,
                }}>
                  <FlatList 
                    data={jobTypes}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ 
                          width: '100%', 
                          borderRadius: 10,
                          backgroundColor: item === jobCategory ? COLORS.tertiary : "transparent",
                        }}
                        onPress={() => {setJobCategory(item); animateViewDown()}}
                      >
                        <Text
                          style={{
                            fontSize: SIZES.large,
                            fontFamily: item === jobCategory ?FONT.bold : FONT.regular,
                            textAlign: 'center'
                          }}
                        >{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ rowGap: SIZES.large, paddingVertical: 10, justifyContent: 'center' }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
            )}}
          >
            <Text style={styles.headerBtn}>{ jobCategory }</Text>
            <Image 
              source={icons.dropDownBtn}
              resizeMode='contain'
              style={{
                width: 10,
                height: 10,
              }}
            />
          </TouchableOpacity>
      </View>
      <View
        style={styles.cardsContainer}
      >
        {
          isLoading ? (<ActivityIndicator 
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
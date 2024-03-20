import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList 
} from 'react-native';
import { icons, SIZES } from '../../../constants';

import styles from './welcome.style';

const jobTypes = ["Fulltime", "Parttime", "Contractor", "Intern"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Fulltime');
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push(`/search/${search}/${activeJobType}`);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text
          style={styles.userName}
        >Welcome Mark</Text>
        <Text
          style={styles.welcomeMessage}
        >Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput placeholder="what job are you looking for?"
            style={styles.searchInput}
            onChangeText={(text) => {setSearch(text)}}
            value={search}
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handleSearch()}
        >
          <Image 
            source={icons.search} 
            resizeMode='contain'
            style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                // router.push(`/search/${item}`);
              }}
            >
              <Text
                style={styles.tabText(activeJobType, item)}
              >{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small, alignItems: 'center', paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome
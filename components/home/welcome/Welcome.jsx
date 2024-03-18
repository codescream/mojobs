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

const jobTypes = ["Full-time", "Part-time", "Contractor", "Others"]

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');
  const [search, setSearch] = useState("");

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
            onChange={(e) => {setSearch(e.target.value)}}
            value={search}
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {}}
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
                router.push(`/search/${item}`);
              }}
            >
              <Text
                style={styles.tabText(activeJobType, item)}
              >{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small, alignItems: 'center', paddingVertical: 10 }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome
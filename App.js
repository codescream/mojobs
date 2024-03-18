import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';

const App = () => {
  return (
    <View>
      <Text style={styles.text}>Amen!</Text>
      <StatusBar style="auto" />
    </View>
  );
} 

export default App;
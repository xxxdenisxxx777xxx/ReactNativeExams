import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');

  const handleInputChange = (value) => {
    setApiKey(value);
  };

  const handleSaveApiKey = async () => {
    try {
      await AsyncStorage.setItem('API_KEY', apiKey);
      onApiKeySet(apiKey);
      console.log(`API Key saved: ${apiKey}`);
    } catch (error) {
      console.log('Error saving API Key:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <Image
    source={require('./Stars.jpeg')}
    style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423}}
    resizeMode="contain"
    />
      <Text style={{ margin: 10, color: '#fff', fontWeight: 'bold' }}>API AUTHENTICATION</Text>
      
      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 15,
          borderColor: '#fff',
          padding: 10,
          marginVertical: 10,
          color: '#fff',
          backgroundColor: '#222',
          width: 250,
          fontSize: 16,
        }}
        placeholder="Enter your API KEY here"
        placeholderTextColor="#888"
        value={apiKey}
        onChangeText={handleInputChange}
      />
      <Button title="Save API Key" onPress={handleSaveApiKey} />
    </View>
  );
};

export default HomeScreen;

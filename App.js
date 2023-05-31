import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Image, StyleSheet } from 'react-native';
import ApiKeyContext from './AuthenticationApi';
import HomeScreen from './components/Home';
import ApodScreen from './components/APOD';
import AsteroidsScreen from './components/Asteroid';
import EarthScreen from './components/Earth';
import MarsScreen from './components/Mars';
import EpicScreen from './components/Epic';

// API KEY - dqkcRdxWDtowGDln9oe8pmtkouFh7kBdL5uUP1sh

const Tab = createBottomTabNavigator();

const App = () => {
  const [apiKey, setApiKey] = useState('');

  const handleApiKeySet = (key) => {
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={apiKey}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000',
              
            },
            headerTintColor: '#ffffff',
            tabBarStyle: {
              backgroundColor: '#000000',
            },
            tabBarLabelStyle: {
              fontSize: 10,
              marginBottom: -1,
              color: '#ffffff',
            },
            tabBarActiveTintColor: '#666',
            tabBarInactiveTintColor: '#666',
          }}
        >
          <Tab.Screen
            name="API CHECK"
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./home.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          >
            {() => <HomeScreen onApiKeySet={handleApiKeySet} />}
          </Tab.Screen>
          
          <Tab.Screen
            name="Asteroids"
            component={AsteroidsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./Asteroid.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Mars"
            component={MarsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./Mars.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="APOD"
            component={ApodScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./Apod.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Earth"
            component={EarthScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./Earth.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          />
          
          <Tab.Screen
            name="EPIC"
            component={EpicScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                  <Image
                    source={require('./EPIC.png')}
                    style={styles.tabIconImage}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApiKeyContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  tabIconActive: {
    backgroundColor: '#fff',
  },
  tabIconImage: {
    width: 24,
    height: 24,
  },
});

export default App;
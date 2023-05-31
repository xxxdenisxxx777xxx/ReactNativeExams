import React, { useEffect, useState, useRef, useContext } from 'react';
import { Text, View, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { decode as atob, encode as btoa } from 'base-64';
import ApiKeyContext from '../AuthenticationApi';

function EpicScreen() {
  const [roverPhotos, setRoverPhotos] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const apiKey = useContext(ApiKeyContext);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=${apiKey}`, {
        responseType: 'arraybuffer',
      })
      .then(response => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        setRoverPhotos([{ id: 1, base64Image }]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {roverPhotos ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <Image
        source={require('./Stars.jpeg')}
        style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423}}
        resizeMode="contain"
        />
          <FlatList
            ref={flatListRef}
            data={roverPhotos}
            horizontal
            pagingEnabled
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: `data:image/png;base64,${item.base64Image}` }} style={styles.image} />
              </View>
            )}
            getItemLayout={(data, index) => ({ length: 415, offset: 415 * index, index })}
            initialScrollIndex={currentIndex}
            onScrollToIndexFailed={() => { }}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginTop: 125,
  },
  image: {
    width: 415,
    height: 400,
  },
  loadingText: {
    color: '#fff',
  },
});

export default EpicScreen;

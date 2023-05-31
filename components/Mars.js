import React, { useEffect, useState, useRef, useContext } from 'react';
import { Text, View, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import ApiKeyContext from '../AuthenticationApi';

const MarsScreen = () => {
    const [roverPhotos, setRoverPhotos] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const apiKey = useContext(ApiKeyContext);

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
            .then(response => setRoverPhotos(response.data.photos))
            .catch(error => console.log(error));
    }, []);

    const handleNextImage = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % roverPhotos.length);
        flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    };

    const handlePreviousImage = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + roverPhotos.length) % roverPhotos.length);
        flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    };

    return (
        <View style={{ flex: 1, backgroundColor:'#000' }}>
            {roverPhotos ? (
                <View>
                    <FlatList
                        ref={flatListRef}
                        data={roverPhotos}
                        horizontal
                        pagingEnabled
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                            <Image
                        source={require('./Stars.jpeg')}
                        style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423,}}
                        resizeMode="contain"
                        />
                                
                                <Image source={{ uri: item.img_src }} style={{ width: 415, height: 400, marginTop:125, borderRadius:'45', marginRight:0, }} />
                                <Text style={{color: '#fff', fontSize: 16, marginBottom: 5, marginTop:139}}>{item.earth_date}</Text>
                                <Text style={{color: '#fff', fontSize: 16, marginBottom: 5, marginTop:7}}>{item.camera.full_name}</Text>
                            </View>
                        )}
                        getItemLayout={(data, index) => ({ length: 415, offset: 415 * index, index })}
                        initialScrollIndex={currentIndex}
                        onScrollToIndexFailed={() => { }}
                    />
                
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

export default MarsScreen;

const styles = StyleSheet.create({
    itemOutput: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop:7,
    }
  });
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import ApiKeyContext from '../AuthenticationApi';

const AsteroidsScreen = () => {
    const apiKey = useContext(ApiKeyContext);
    const [asteroidsData, setAsteroidsData] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${apiKey}&count=100`)
            .then(response => setAsteroidsData(response.data.near_earth_objects))
            .catch(error => console.log(error));
    }, [apiKey]);

    const renderAsteroidItem = ({ item }) => {
        const nasaJplUrl = item[0].nasa_jpl_url;

        return (
            <View style={{backgroundcolor:'#fff'}}>
                <Text style={{ color:'#fff'}}>Name: {item[0].name}</Text>
                <Text style={{ color:'#fff'}}>Distance: {item[0].close_approach_data[0].miss_distance.kilometers} km</Text>
                <Image source={require('./Mars.jpeg')} style={{ width: 400, height: 400, marginTop:30, }}></Image>
                {nasaJplUrl && (
                    <Image source={{ uri: nasaJplUrl }} style={{ width: 200, height: 200 }} />
                )}
                {!nasaJplUrl && (
                    <View>
                        <Text>Loading...</Text>
                        {getAsteroidImageUrl().then(imageUrl => {
                            if (imageUrl) {
                                return (
                                    <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
                                );
                            }
                            return <Text></Text>;
                        })}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <Image
    source={require('./Stars.jpeg')}
    style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423}}
    resizeMode="contain"
    />
            {asteroidsData && Object.values(asteroidsData) ? (
                <FlatList
                    data={Object.values(asteroidsData)}
                    keyExtractor={item => item[0].id}
                    renderItem={renderAsteroidItem}
                />
            ) : (
                <Text style={{ margin: 10, color:'#fff'}}>Loading...{console.log(apiKey)}</Text>
            )}
        </View>
    );
}

export default AsteroidsScreen;
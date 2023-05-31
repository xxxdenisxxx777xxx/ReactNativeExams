import React, { useEffect, useState, useRef, useContext } from 'react';
import { Text, View, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import ApiKeyContext from '../AuthenticationApi';

const EarthScreen = () => {
    const [earthImageUrl, setEarthImageUrl] = useState(null);
    const [date, setDate] = useState(null);
    const apiKey = useContext(ApiKeyContext);

    useEffect(() => {
        fetchEarthImage();
    }, []);

    const fetchEarthImage = () => {
        const apiUrl = `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&&dim=0.10&api_key=${apiKey}`;
        axios
            .get(apiUrl)
            .then(response => {
                const { date, url } = response.data;
                setEarthImageUrl(url);
                setDate(date);
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <Image
        source={require('./Stars.jpeg')}
        style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423}}
        resizeMode="contain"
        />
            {earthImageUrl ? (
                <>
                    <Image source={{ uri: earthImageUrl }} style={{ width: 365, height: 350, borderRadius: 25 }} />
                    <Text style={{ color:'#fff', marginTop:30}}>VremData: {date}</Text>
                </>
            ) : (
                <Text style={{ color:'#fff'}}>Loading...</Text>
            )}
        </View>
    );
};


export default EarthScreen;
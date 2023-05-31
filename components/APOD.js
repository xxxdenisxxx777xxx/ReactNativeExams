import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import ApiKeyContext from '../AuthenticationApi';

const ApodScreen = () => {
    const apiKey = useContext(ApiKeyContext);
    const [apodData, setApodData] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then((response) => setApodData(response.data))
            .catch((error) => console.log(error));
    }, [apiKey]);

    return (
        <View style={styles.container}>
            <Image
                        source={require('./Stars.jpeg')}
                        style={{ position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, width:423,}}
                        resizeMode="contain"
                        />
            {apodData?.media_type === 'image' ? (
                <Image source={{ uri: apodData?.url }} style={styles.image} />
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
            <Text style={styles.title}>{apodData?.title}</Text>
            <Text style={styles.explanation}>{apodData?.explanation}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 415,
        height: 400,
        marginBottom: 20,
    },
    loadingText: {
        margin: 10,
        color: '#fff',
    },
    title: {
        margin: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    explanation: {
        margin: 10,
        color: '#fff',
        textAlign: 'center',
    },
});


export default ApodScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';
import { BASE_URL, API_Key } from '../config';
const ShowPage = ({ route }) => {
    const [media, setMedia] = useState(null);
    const { mediaId, type } = route.params;
  
    useEffect(() => {
      const fetchMediaDetails = async () => {
        
        const url = `https://api.themoviedb.org/3/${type}/${mediaId}?api_key=${API_Key}&language=en-US`;
  
        try {
          const response = await axios.get(url);
          setMedia(response.data);
        } catch (error) {
          console.error('Error fetching media details:', error);
        }
      };
  
      fetchMediaDetails();
    }, [mediaId, type]);
  
    if (!media) return <Text>Loading...</Text>;
  
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${media.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{media.title || media.name}</Text>
        <Text style={styles.details}>Release Date: {media.release_date || media.first_air_date}</Text>
        <Text style={styles.details}>Rating: {media.vote_average}</Text>
        <Text style={styles.overview}>{media.overview || "No overview available."}</Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  overview: {
    fontSize: 16,
    marginVertical: 16,
  },
});

export default ShowPage;



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL, API_Key } from '../config';

const MediaList = ({ route, navigation }) => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('popular'); 
  const { type } = route.params; 

  
  useEffect(() => {
    const fetchData = async () => {
     
      let url = '';

      if (type === 'tv') {
       
        url = `https://api.themoviedb.org/3/tv/${filter}?api_key=${API_Key}&language=en-US&page=1`;
      } else if (type === 'movie') {
        
        url = `https://api.themoviedb.org/3/movie/${filter}?api_key=${API_Key}&language=en-US&page=1`;
      }

      try {
        const response = await axios.get(url);
        setMediaList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching media data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, filter]); // Refetch when type or filter changes

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
   
      <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
        style={styles.picker}
      >
       
        {type === 'tv' ? (
          <>
            <Picker.Item label="Airing Today" value="airing_today" />
            <Picker.Item label="On The Air" value="on_the_air" />
            <Picker.Item label="Popular" value="popular" />
            <Picker.Item label="Top Rated" value="top_rated" />
          </>
        ) : (
        
          <>
            <Picker.Item label="Popular" value="popular" />
            <Picker.Item label="Top Rated" value="top_rated" />
            <Picker.Item label="Upcoming" value="upcoming" />
            <Picker.Item label="Now Playing" value="now_playing" />
          </>
        )}
      </Picker>

      
      <View style={styles.gridContainer}>
        {mediaList.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title || item.name}</Text>
            <Button
              title="More Details"
              onPress={() => navigation.navigate('ShowPage', { mediaId: item.id, type: type })}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1, 
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  itemContainer: {
    width: '48%', 
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: 200, 
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

export default MediaList;

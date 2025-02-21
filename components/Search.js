import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';
import { BASE_URL, API_Key } from '../config';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('movie'); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

   
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_Key}&query=${query}&language=en-US`;

    try {
      const response = await axios.get(url);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies or TV Shows"
        value={query}
        onChangeText={setQuery}
      />
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Movies" value="movie" />
        <Picker.Item label="TV Shows" value="tv" />
      </Picker>
      <Button title="Search" onPress={handleSearch} />
      
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Make it a 2x2 grid
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title || item.name}</Text>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigation.navigate('Detail', { mediaId: item.id, type: type })}
              >
                <Text style={styles.buttonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Search;

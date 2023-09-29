import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {nanoid} from 'nanoid';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import Snackbar from 'react-native-snackbar';

import Layout from '@app/layout/Layout';
import {addSeason} from '@app/store/seasonsSlice';

const Add = ({
  navigation,
}: {
  navigation: {navigate: (routeName: string) => void};
}) => {
  const disPatch = useDispatch();

  const [name, setName] = useState('');
  const [episodeCount, setEpisodeCount] = useState('');

  const addItem = async () => {
    if (!name || !episodeCount) {
      return Snackbar.show({
        text: 'Both fields are required.',
        backgroundColor: '#33272a',
      });
    }

    try {
      const season = {
        id: nanoid(),
        name,
        episodeCount,
        isWatched: false,
      };

      disPatch(addSeason(season));

      setName('');
      setEpisodeCount('');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter season name"
        />
        <TextInput
          style={styles.input}
          value={episodeCount}
          onChangeText={text => setEpisodeCount(text)}
          placeholder="Enter number of episodes"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add Season</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    flex: 1,
  },

  input: {
    borderWidth: 2,
    width: '100%',
    borderRadius: 10,
    borderColor: '#00214d',
    padding: 10,
    color: '#1b2d45',
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#ff5470',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {color: '#fffffe', fontSize: 20, fontWeight: '600'},
});

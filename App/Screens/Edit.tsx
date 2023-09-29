import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import 'react-native-get-random-values';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from '@app/Layout/Layout';
import {SeasonType} from './Home';

const Edit = ({
  navigation,
  route,
}: {
  navigation?: {navigate: (routeName: string) => void};
  route?: {
    key: string;
    name: string;
    params: string;
    path?: undefined;
  };
}) => {
  const [season, setSeason] = useState<SeasonType>({
    id: '',
    name: '',
    episodeCount: '',
    isWatched: false,
  });

  const updateItem = async () => {
    if (!season.name || !season.episodeCount) {
      return Snackbar.show({
        text: 'Both fields are required.',
        backgroundColor: '#33272a',
      });
    }

    try {
      const storedValues = await AsyncStorage.getItem('@Seasons_list');

      if (storedValues) {
        const seasons = JSON.parse(storedValues);
        const newSeasonList = seasons.map((existingSeason: SeasonType) => {
          if (existingSeason.id === season.id) {
            return {...season};
          }

          return existingSeason;
        });

        await AsyncStorage.setItem(
          '@Seasons_list',
          JSON.stringify(newSeasonList),
        );
        navigation?.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSeason = async () => {
      if (route?.params) {
        setSeason(JSON.parse(route?.params));
      }
    };

    getSeason();
  }, [route?.params]);

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={season?.name}
          onChangeText={text =>
            setSeason(prevSeason => ({...prevSeason, name: text}))
          }
          placeholder="Enter season name"
        />
        <TextInput
          style={styles.input}
          value={season?.episodeCount}
          onChangeText={text =>
            setSeason(prevSeason => ({...prevSeason, episodeCount: text}))
          }
          placeholder="Enter number of episodes"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={updateItem}>
          <Text style={styles.buttonText}>Update Season</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Edit;

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

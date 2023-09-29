import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import Snackbar from 'react-native-snackbar';

import {SeasonType} from './Home';
import Layout from '@app/layout/Layout';
import {updateSeason} from '@app/store/seasonsSlice';

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

  const dispatch = useDispatch();

  const updateItem = async () => {
    if (!season.name || !season.episodeCount) {
      return Snackbar.show({
        text: 'Both fields are required.',
        backgroundColor: '#33272a',
      });
    }

    try {
      dispatch(updateSeason(season));

      navigation?.navigate('Home');
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

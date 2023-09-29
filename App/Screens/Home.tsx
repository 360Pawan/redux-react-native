import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Fab from '@app/Components/Fab';
import Layout from '@app/Layout/Layout';
import {TouchableOpacity} from 'react-native';

export type SeasonType = {
  id: string;
  name: string;
  episodeCount: string;
  isWatched: boolean;
};

const Home = ({
  navigation,
}: {
  navigation: {navigate: (routeName: string, params?: {}) => void};
}) => {
  const isFocused = useIsFocused();

  const [seasonsList, setSeasonsList] = useState<SeasonType[]>([]);

  const getSeasonsList = async () => {
    // await AsyncStorage.clear();

    const storedValues = await AsyncStorage.getItem('@Seasons_list');

    if (!storedValues) {
      setSeasonsList([]);
      return;
    }

    const seasons = JSON.parse(storedValues);
    setSeasonsList(seasons);
  };

  const markWatched = async (id: string) => {
    const newSeasonsList = seasonsList.map((season: SeasonType) => {
      if (season.id === id) {
        return {
          ...season,
          isWatched: !season.isWatched,
        };
      }

      return season;
    });

    await AsyncStorage.setItem('@Seasons_list', JSON.stringify(newSeasonsList));
    setSeasonsList(newSeasonsList);
  };

  const deleteSeason = async (id: string) => {
    const newSeasonsList = seasonsList.filter(
      (season: SeasonType) => season.id !== id,
    );

    await AsyncStorage.setItem('@Seasons_list', JSON.stringify(newSeasonsList));
    setSeasonsList(newSeasonsList);
  };

  useEffect(() => {
    getSeasonsList();
  }, [isFocused]);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.list}>
          {seasonsList.length >= 1 ? (
            seasonsList.map((season: SeasonType) => (
              <View style={styles.listItem} key={season.id}>
                <BouncyCheckbox
                  size={30}
                  fillColor="#00ebc7"
                  isChecked={season.isWatched}
                  onPress={() => markWatched(season.id)}
                />
                <View>
                  <Text style={styles.listText}>{season.name}</Text>
                  <Text style={styles.listText}>
                    {season.episodeCount} Seasons to watch
                  </Text>
                </View>
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Edit', JSON.stringify(season))
                    }>
                    <Icons name="edit" size={24} color="#00ebc7" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteSeason(season.id)}>
                    <Icons name="trash" size={24} color="#ff5470" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.listItem}>
              <Text style={styles.listText}>No season to show.</Text>
            </View>
          )}
        </View>
      </View>
      <Fab onPress={() => navigation.navigate('Add')}>
        <Icons name="plus" size={24} color="#fffffe" />
      </Fab>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {padding: 20},

  list: {},

  listItem: {
    backgroundColor: '#fde24f',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 20,
  },

  item: {flexDirection: 'row', gap: 10, alignItems: 'center'},

  listText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
    color: '#1b2d45',
  },
});

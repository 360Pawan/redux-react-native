import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Fab from '@app/components/Fab';
import Layout from '@app/layout/Layout';
import {RootState} from '@app/store/store';

import {
  createSeasonList,
  markSeasonWatched,
  removeSeason,
} from '@app/store/seasonsSlice';

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
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {seasons} = useSelector((state: RootState) => state.seasons);

  const markWatched = async (id: string) => {
    dispatch(markSeasonWatched(id));
  };

  const deleteSeason = async (id: string) => {
    dispatch(removeSeason(id));
  };

  useEffect(() => {
    const getSeasonsList = async () => {
      // await AsyncStorage.clear();

      const storedValues = await AsyncStorage.getItem('@Seasons_list');

      if (!storedValues) {
        dispatch(createSeasonList([]));
        return;
      }

      const storesSeasons = JSON.parse(storedValues);
      dispatch(createSeasonList(storesSeasons));
    };

    getSeasonsList();
  }, [isFocused, dispatch]);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.list}>
          {seasons.length >= 1 ? (
            seasons.map((season: SeasonType) => (
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

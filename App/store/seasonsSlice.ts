import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SeasonType = {
  id: string;
  name: string;
  episodeCount: string;
  isWatched: boolean;
};

const initialState = {
  seasons: <any>[],
};

const seasonsSlice = createSlice({
  name: 'seasons',
  initialState,

  reducers: {
    createSeasonList(state, action: PayloadAction<any>) {
      state.seasons = action.payload;
    },

    addSeason(state, action: PayloadAction<any>) {
      state.seasons = [...state.seasons, action.payload];
      saveSeasonsToStorage(state.seasons);
    },

    removeSeason(state, action: PayloadAction<any>) {
      const newState = state.seasons.filter(
        (season: SeasonType) => season.id !== action.payload,
      );

      state.seasons = newState;
      saveSeasonsToStorage(state.seasons);
    },

    markSeasonWatched(state, action: PayloadAction<any>) {
      const newState = state.seasons.map((season: SeasonType) => {
        if (season.id === action.payload) {
          return {
            ...season,
            isWatched: !season.isWatched,
          };
        }

        return season;
      });

      state.seasons = newState;
      saveSeasonsToStorage(state.seasons);
    },

    updateSeason(state, action: PayloadAction<any>) {
      const newState = state.seasons.map((existingSeason: SeasonType) => {
        if (existingSeason.id === action.payload.id) {
          return {...action.payload};
        }

        return existingSeason;
      });

      state.seasons = newState;
      saveSeasonsToStorage(state.seasons);
    },
  },
});

const saveSeasonsToStorage = async (seasons: any) => {
  try {
    const serializedData = JSON.stringify(seasons);
    await AsyncStorage.setItem('@Seasons_list', serializedData);
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const {
  addSeason,
  createSeasonList,
  markSeasonWatched,
  removeSeason,
  updateSeason,
} = seasonsSlice.actions;
export default seasonsSlice.reducer;

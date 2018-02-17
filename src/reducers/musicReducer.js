import { MUSIC_FETCH, MUSIC_SORT, MUSIC_FILTER, MUSIC_FILTER_OPTIONS } from '../constants';

const INITIAL_STATE = {
  playlists: [],
  defaultPlaylist: [],
  column: {},
  filters: {},
  options: {},
  currentSelected: {},
  fetch: false,
};

const music = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MUSIC_FETCH: {
      const newPlaylists = action.payload;
      return {
        ...state,
        playlists: [
          ...state.playlists,
          ...newPlaylists,
        ],
        defaultPlaylist: [
          ...state.playlists,
          ...newPlaylists,
        ],
        fetch: true,
      };
    }
    case MUSIC_SORT: {
      const {
        columnName, orderStatus, playlists, column,
      } = action.payload;
      return {
        ...state,
        playlists,
        column: {
          ...state.column,
          ...column,
          [columnName]: orderStatus,
        },
      };
    }
    case MUSIC_FILTER: {
      const { filterPlaylist, currents } = action.payload;
      return {
        ...state,
        playlists: filterPlaylist,
        currentSelected: {
          ...state.currentSelected,
          ...currents,
        },
      };
    }
    case MUSIC_FILTER_OPTIONS: {
      const { name, genre, year } = action.payload;
      return {
        ...state,
        options: {
          ...state.options,
          name,
          genre,
          year,
        },
        fetch: false,
      };
    }
    default:
      return state;
  }
};

export default music;

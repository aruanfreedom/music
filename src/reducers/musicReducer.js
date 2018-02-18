import {
  MUSIC_FETCH,
  MUSIC_SORT,
  MUSIC_FILTER,
  MUSIC_FILTER_OPTIONS,
  MUSIC_COUNT_FIELD,
  MUSIC_NEXT_PAGE,
} from '../constants';

const INITIAL_STATE = {
  playlists: [],
  defaultPlaylist: [],
  column: {},
  filters: {},
  options: {},
  currentSelected: {},
  fetch: false,
  numberField: 10,
  currentNumberRow: 10,
  currentNumberPage: 1,
};

const music = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MUSIC_FETCH: {
      const { playlists, limitPlaylist } = action.payload;
      return {
        ...state,
        playlists: [
          ...state.playlists,
          ...limitPlaylist,
        ],
        defaultPlaylist: [
          ...state.defaultPlaylist,
          ...playlists,
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
    case MUSIC_COUNT_FIELD: {
      const { limitPlaylists, numberField } = action.payload;
      return {
        ...state,
        playlists: limitPlaylists,
        currentNumberRow: numberField,
      };
    }
    case MUSIC_NEXT_PAGE: {
      const { cutPlaylists, numberPage } = action.payload;
      return {
        ...state,
        playlists: cutPlaylists,
        currentNumberPage: numberPage,
      };
    }
    default:
      return state;
  }
};

export default music;

import { MUSIC_FETCH, MUSIC_SORT } from '../constants';

const INITIAL_STATE = {
  playlists: {},
};

const music = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MUSIC_FETCH: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          ...action.payload,
        },
      };
    }
    case MUSIC_SORT: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default music;

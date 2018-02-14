import { MUSIC_FETCH, MUSIC_SORT } from '../constants';

export const musicFetch = () => dispatch => fetch('http://localhost:3000/data/music.json')
  .then(response => response.json())
  .then(playlists => dispatch({ type: MUSIC_FETCH, payload: playlists }))
  .catch(e => console.log(e));

export const sortPlaylist = sort => (dispatch, getState) => {
  console.log(getState());
  // .sort(function (a, b) {
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   // a должно быть равным b
  //   return 0;
  // });
};

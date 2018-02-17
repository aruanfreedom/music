import _ from 'lodash';
import { MUSIC_FETCH, MUSIC_SORT, MUSIC_FILTER, MUSIC_FILTER_OPTIONS, ALL_FILETERS } from '../constants';
import { sortLetter, sortNumber } from '../helpers/helpers';

export const musicFetch = () => dispatch => fetch('http://localhost:3000/data/music.json')
  .then(response => response.json())
  .then(playlists => dispatch({ type: MUSIC_FETCH, payload: playlists }))
  .catch(e => console.log(e));

export const orderSetName = (columnName, orderStatus, sortList) => (dispatch, getState) => {
  const columnCopy = { ...getState().music.column };

  _.forOwn(columnCopy, (value, key) => {
    if (key !== columnName) {
      columnCopy[key] = false;
    }
  });

  dispatch({
    type: MUSIC_SORT,
    payload: {
      columnName,
      orderStatus,
      column: columnCopy,
      playlists: sortList,
    },
  });
};

export const filter = (filterName, parameter) => (dispatch, getState) => {
  const { defaultPlaylist, playlists, currentSelected } = getState().music;
  const playlistsWasFiltering = defaultPlaylist.length ? defaultPlaylist : playlists;
  const filterPlaylist = playlistsWasFiltering.filter((playlist) => {
    const otherParametres = Object.keys(currentSelected).filter(currentParameter => currentParameter !== parameter);

    if (!otherParametres.length) {
      return playlist[parameter] === filterName || filterName === ALL_FILETERS;
    }

    const findtherParametre = otherParametres.map(otherParametre =>
      (playlist[parameter] === filterName || filterName === ALL_FILETERS) &&
        (currentSelected[otherParametre] === playlist[otherParametre] ||
          currentSelected[otherParametre] === ALL_FILETERS));

    const findEveryParameter = findtherParametre.every(value => value === true);

    return findEveryParameter;
  });

  const currents = { [parameter]: filterName };

  dispatch({
    type: MUSIC_FILTER,
    payload: {
      filterPlaylist,
      currents,
    },
  });
};

export const getUniqueValues = (playlists, filterParameteres) => {
  const sortOptions = {};

  _.forOwn(filterParameteres, (value, filterName) => {
    const uniques = _.unionBy(playlists, playlist => playlist[filterName]);
    if (filterName === 'year') {
      sortOptions[filterName] = { ...sortNumber(uniques, filterName) };
    }
    sortOptions[filterName] = { ...sortLetter(uniques, filterName) };
  });

  if (_.isEmpty(sortOptions)) return null;

  return ({ type: MUSIC_FILTER_OPTIONS, payload: sortOptions });
};

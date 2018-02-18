import React, { Component } from 'react';
import { connect } from 'react-redux';
import { musicFetch, orderSetName, setCountField, setNavigation } from '../../actions/musicActions';
import { sortLetter, sortNumber } from '../../helpers/helpers';
import CountRowComponent from '../CountRowComponent/CountRow';
import Pagination from '../Pagination/Pagination';
import './table.css';

class Table extends Component {
  state = {
    headers: ['Исполнитель', 'Жанр', 'Год', 'Песня'],
  };

  componentDidMount() {
    this.props.musicFetch();
  }

  setOrder = (key) => {
    const { playlists, column } = this.props;
    const isExistsKey = column[key];
    const toggle = isExistsKey === undefined ? true : !column[key];
    const playlistCopy = [...playlists];
    const sortList = this.sortColumn(playlistCopy, key, toggle);
    this.props.orderSetName(key, toggle, sortList);
  };

  setCountField = (numberField) => {
    const { setCountField, defaultPlaylist } = this.props;
    const limitPlaylist = defaultPlaylist.slice(0, numberField);

    setCountField(limitPlaylist, numberField);
  };

  setNavigation = (numberPage) => {
    const { setNavigation, playlists, defaultPlaylist } = this.props;
    setNavigation(defaultPlaylist, playlists, numberPage);
  };

  sortColumn = (playlists, columnName, order) => {
    if (columnName === 'year') {
      return sortNumber(playlists, columnName, order);
    }
    return sortLetter(playlists, columnName, order);
  };

  render() {
    const {
      column, playlists, countFields, numbersPaginations, currentNumberPage, currentNumberRow,
    } = this.props;
    const { headers } = this.state;

    return (
      <div className="playlists">
        <h3>Плэйлист</h3>
        <table cellSpacing="0" border="1">
          <thead>
            <tr>
              {playlists.length ? Object.keys(playlists[0])
                .filter(key => key !== 'id')
                .map((key, item) => {
                  let arrowClassName = column[key];
                  if (arrowClassName !== undefined) {
                    if (column[key]) {
                      arrowClassName = 'arrow-top';
                    } else {
                      arrowClassName = 'arrow-bottom';
                    }
                  } else {
                    arrowClassName = 'arrow-default';
                  }
                  return (
                    <td key={headers[item]}>
                      <button
                        className="btn-td"
                        onClick={() => this.setOrder(key)}
                      >
                        <span className={arrowClassName}>{headers[item]}</span>
                      </button>
                    </td>
                  );
                }) :
              headers.map(header => (<td key={header}>{header}</td>))}
            </tr>
          </thead>
          <tbody>
            {playlists.map(playlist => (
              <tr key={playlist.id}>
                <td>{playlist.name}</td>
                <td>{playlist.genre}</td>
                <td>{playlist.year}</td>
                <td>{playlist.song}</td>
              </tr>
          ))}
          </tbody>
        </table>
        {!playlists.length && <div className="table-not-data"><h3>Данных нет</h3></div>}
        <div className="navigations-table">
          <Pagination
            currentNumberPage={currentNumberPage}
            btnClick={this.setNavigation}
            numbersPaginations={numbersPaginations}
          />
          <CountRowComponent
            btnClick={this.setCountField}
            currentNumberRow={currentNumberRow}
            countFields={countFields}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ music }) => {
  const {
    playlists, column, numberField, defaultPlaylist, currentNumberRow, currentNumberPage,
  } = music;
  const countFields = [];
  const numbersPaginations = [];
  const countField = defaultPlaylist.length / numberField;
  const countPaginations = defaultPlaylist.length ? Math.ceil(defaultPlaylist.length / currentNumberRow) : 1;

  for (let i = 1; i <= countPaginations; i += 1) {
    numbersPaginations.push(i);
  }

  for (let i = 0, j = numberField; countField > i; i += 1, j += numberField) {
    countFields.push(j);
  }

  return {
    playlists,
    column,
    countFields,
    defaultPlaylist,
    numbersPaginations,
    currentNumberPage,
    currentNumberRow,
  };
};

export default connect(mapStateToProps, {
  musicFetch, orderSetName, setCountField, setNavigation,
})(Table);

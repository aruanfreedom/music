import React, { Component } from 'react';
import { connect } from 'react-redux';
import { musicFetch, orderSetName } from '../../actions/musicActions';
import { sortLetter, sortNumber } from '../../helpers/helpers';
import './table.css';

class Table extends Component {
  state = {
    headers: ['Исполнитель', 'Жанр', 'Год', 'Песня'],
  };

  componentDidMount() {
    this.props.musicFetch();
  }

  sortColumn = (playlists, columnName, order) => {
    if (columnName === 'year') {
      return sortNumber(playlists, columnName, order);
    }
    return sortLetter(playlists, columnName, order);
  };

  orderSet = (key) => {
    const { playlists, column } = this.props;
    const isExistsKey = column[key];
    const toggle = isExistsKey === undefined ? true : !column[key];
    const playlistCopy = [...playlists];
    const sortList = this.sortColumn(playlistCopy, key, toggle);
    this.props.orderSetName(key, toggle, sortList);
  };

  render() {
    const { column, playlists } = this.props;
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
                            onClick={() => this.orderSet(key)}
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
      </div>
    );
  }
}

const mapStateToProps = ({ music }) => {
  const { playlists, column } = music;
  return { playlists, column };
};

export default connect(mapStateToProps, { musicFetch, orderSetName })(Table);

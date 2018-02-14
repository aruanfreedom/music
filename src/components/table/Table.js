import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { musicFetch, sortPlaylist } from '../../actions/musicActions';
import './table.css';

class Table extends Component {
  componentDidMount() {
    this.props.musicFetch();
  }

  sort = (sortValue) => {
    console.log(sortValue);
    this.props.sortPlaylist(sortValue);
  }

  render() {
    const { playlists } = this.props;
    return (
      <table className="playlists" cellSpacing="0" border="1">
        <thead>
          <tr>
            <td><button className="btn-td" onClick={() => this.sort('name')}>Исполнитель</button></td>
            <td><button className="btn-td" onClick={() => this.sort('song')}>Песня</button></td>
            <td><button className="btn-td" onClick={() => this.sort('genre')}>Жанр</button></td>
            <td><button className="btn-td" onClick={() => this.sort('year')}>Год</button></td>
          </tr>
        </thead>
        <tbody>
          {_.values(playlists).map(playlist => (
            <tr key={playlist.id}>
              <td>{playlist.name}</td>
              <td>{playlist.song}</td>
              <td>{playlist.genre}</td>
              <td>{playlist.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ music }) => music;

export default connect(mapStateToProps, { musicFetch, sortPlaylist })(Table);

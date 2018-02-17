import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { filter, getUniqueValues } from '../../actions/musicActions';
import { ALL_FILETERS } from '../../constants';
import './filterComponent.css';

class FilterComponent extends Component {
  componentWillReceiveProps(props) {
    const {
      getUniqueValues, defaultPlaylist, filterParameteres, fetch,
    } = props;

    if (fetch) getUniqueValues(defaultPlaylist, filterParameteres);
  }

  onChangeFilter = (event, parameter) => {
    const filterName = event.target.value;
    this.props.filter(filterName, parameter);
  };

  renderUniqueValues = (playlists, filterName) => {
    const { options } = this.props;

    if (_.isEmpty(options)) return null;

    const option = options[filterName];

    return Object.keys(option).map(unique => (<option key={option[unique].id}>{option[unique][filterName]}</option>));
  };

  render() {
    const { playlists, filterParameteres } = this.props;
    return (
      <div className="filter-block">
        <h3>Фильтр</h3>
        <div className="filter-sections">
          {Object.keys(filterParameteres).map(parameter =>
              (
                <div key={parameter}>
                  <p>{filterParameteres[parameter]}</p>
                  <select defaultValue={ALL_FILETERS} onChange={e => this.onChangeFilter(e, parameter)}>
                    <option value={ALL_FILETERS}>
                              Все
                    </option>
                    {this.renderUniqueValues(playlists, parameter)}
                  </select>
                </div>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ music }) => {
  const {
    defaultPlaylist, playlists, options, fetch,
  } = music;
  return {
    defaultPlaylist, playlists, options, fetch,
  };
};

export default connect(mapStateToProps, { filter, getUniqueValues })(FilterComponent);

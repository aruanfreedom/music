import React, { Component } from 'react';
import Table from '../table/Table';
import FilterComponent from '../filter/FilterComponent';
import './main.css';

class Main extends Component {
  filterParameteres = {
    name: 'Исполнитель',
    genre: 'Жанр',
    year: 'Год',
  };

  render() {
    return (
      <div className="main">
        <Table />
        <FilterComponent filterParameteres={this.filterParameteres} />
      </div>
    );
  }
}

export default Main;

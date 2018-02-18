import React, { PureComponent } from 'react';
import back from './images/back.png';
import forward from './images/forward.png';
import './pagination.css';

class CountRow extends PureComponent {
  clickPage = (numbersPagination) => {
    const { numbersPaginations, btnClick } = this.props;
    let { currentNumberPage } = this.props;

    if (numbersPagination === 'back' && currentNumberPage !== 1) {
      btnClick(currentNumberPage -= 1);
    }

    if (numbersPagination === 'forward' && currentNumberPage !== numbersPaginations.length) {
      btnClick(currentNumberPage += 1);
    }
    if (typeof numbersPagination === 'number') {
      btnClick(numbersPagination);
    }
  };

  render() {
    const { numbersPaginations, currentNumberPage } = this.props;
    return (
      <div className="paginations">
        <button className="pagination-left" onClick={() => this.clickPage('back')}>
          <img alt="back" src={back} />
        </button>
        {numbersPaginations.map(numbersPagination =>
          (
            <button
              onClick={() => this.clickPage(numbersPagination)}
              className={currentNumberPage === numbersPagination ? 'pagination-active' : ''}
              key={numbersPagination}
            >
              {numbersPagination}
            </button>))}
        <button className="pagination-right" onClick={() => this.clickPage('forward')}>
          <img alt="forward" src={forward} />
        </button>
      </div>);
  }
}

export default CountRow;

import React, { PureComponent } from 'react';
import './countRow.css';

class CountRow extends PureComponent {
  render() {
    const { countFields, btnClick, currentNumberRow } = this.props;
    return (
      <div className="count-row__btns">
        {countFields.map(numberField =>
      (
        <button
          key={numberField}
          className={currentNumberRow === numberField ? 'count-row__btn active-count-row' : 'count-row__btn'}
          onClick={() => btnClick(numberField)}
        >
          {numberField}
        </button>
      ))}
      </div>);
  }
}

export default CountRow;

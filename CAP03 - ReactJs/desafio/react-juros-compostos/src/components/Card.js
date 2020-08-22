import React from 'react';
import css from './card.module.css';
import { formatNumber } from '../helpers/calcs';

export default function Card(props) {
  const { index, acc, dif, perc } = props;

  const classCard = `card ${css.cardNew}`;
  return (
    <div className="col s2">
      <div className={classCard}>
        <div>{index}</div>
        <div className={css.infos}>
          <span
            className={
              perc > 0
                ? 'teal-text text-darken-3'
                : 'deep-orange-text text-darken-3'
            }
          >
            {formatNumber(acc)}
          </span>
          <span
            className={
              perc > 0
                ? 'teal-text text-darken-3'
                : 'deep-orange-text text-darken-3'
            }
          >
            {formatNumber(dif)}
          </span>
          <span
            className={
              perc > 0
                ? 'blue-text text-darken-3'
                : 'deep-orange-text text-darken-3'
            }
          >
            {perc}%
          </span>
        </div>
      </div>
    </div>
  );
}

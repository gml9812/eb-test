import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from 'redux/counterSlice';

import * as S from './style';

export function Main() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <button type="button" aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
        <span>{count}</span>
        <button type="button" aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  );
}

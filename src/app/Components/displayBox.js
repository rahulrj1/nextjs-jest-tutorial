import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { mySliceActions } from '../store';

const DisplayBox = () => {
  const dispatch = useDispatch();
  const mystate = useSelector(state => state.mySlice.mystate)
  return (
    <div>
      <h2>{mystate}</h2>
      <button className="p-2 m-2 bg-black text-white" onClick={() => dispatch(mySliceActions.setMyState('changed-state'))}>Change</button>
      <button className="p-2 m-2 bg-black text-white" onClick={() => dispatch(mySliceActions.setMyState('initial-state'))}>Reset</button>
    </div>
  )
}

export default DisplayBox

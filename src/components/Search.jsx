import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSerchValue } from '../redux/slices/filterSlice';
import '../styles/search.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSerchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSerchValue(str));
    }, 250),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <div className="search__container">
        <input ref={inputRef} value={value} onChange={onChangeInput} placeholder="Пошут товара" />
        {value && (
          <div onClick={onClickClear} className="search__clear">
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

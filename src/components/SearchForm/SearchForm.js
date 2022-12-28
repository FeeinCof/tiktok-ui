import { useState, useEffect } from 'react';
import * as searchService from '~/services/searchService';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import style from './SearchForm.module.scss';
import { PopperWrapper, UserSugItem } from '~/components';
import { CancerButton, Glass, LoadingCirle } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);

const SearchForm = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 200);

  const fetchApi = async (value) => {
    if (!value.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const result = await searchService.search(value);
    setSearchResult(result);
    setLoading(false);
    return;
  };

  useEffect(() => {
    fetchApi(debounced);
  }, [debounced]);

  const handleSearchValue = (event) => {
    if (!event.target.value.startsWith(' ')) setSearchValue(event.target.value);
  };

  return (
    <Tippy
      offset={[0, 5]}
      interactive
      placement="bottom-end"
      visible={searchResult.length > 0}
      appendTo={() => document.querySelector('.default-layout')}
      onClickOutside={() => {
        setSearchResult([]);
      }}
      render={(attr) => (
        <PopperWrapper>
          <div className={cx('search-result')} tabIndex="-1" {...attr}>
            <span className={cx('search-result-title')}>Accounts</span>
            {searchResult.map((user) => (
              <UserSugItem key={user.id} {...user} />
            ))}
          </div>
        </PopperWrapper>
      )}
    >
      <div className={cx('search')}>
        <input
          onChange={(e) => handleSearchValue(e)}
          onClick={(event) => {
            if (!event.target.value.startsWith(' ')) fetchApi(event.target.value);
          }}
          value={searchValue}
          type="search"
          placeholder="Search accounts and videos"
          spellCheck={false}
        />
        {searchValue && !isLoading && (
          <span
            onClick={() => {
              setSearchValue('');
              setSearchResult([]);
            }}
            className={cx('cancer-button')}
          >
            <CancerButton />
          </span>
        )}
        {searchValue && isLoading && (
          <span className={cx('loading-circle')}>
            <LoadingCirle />
          </span>
        )}
        <button onMouseDown={(e) => e.preventDefault()} className={cx('search-btn')}>
          <span className={cx('glass-icon')}>
            <Glass />
          </span>
        </button>
      </div>
    </Tippy>
  );
};

export default SearchForm;

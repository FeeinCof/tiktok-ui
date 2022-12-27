import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import * as searchService from '~/services/searchService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import Tippy from '@tippyjs/react/headless';
import style from './Header.module.scss';
import { Button, PopperWrapper, UserSugItem } from '~/components';
import { Logo, User, Video, Gear, QuestionCircle, Keyboard, Moon, Logout, EllipsisVertical } from '../Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(style);

const Header = ({ theme, setTheme }) => {
  const logined = false;
  var itemsMemory = [];
  const itemsGuest = [
    {
      content: 'English',
      icon: <FontAwesomeIcon icon={faChevronLeft} />,
      props: [
        {
          code: 'en',
          content: 'English',
        },
        {
          code: 'vi',
          content: 'Vietnamese',
        },
      ],
    },
    {
      content: 'Feelback and help',
      icon: <QuestionCircle />,
    },
    {
      content: 'Keyboard shortcuts',
      icon: <Keyboard />,
    },
  ];

  const itemsProfile = [
    {
      content: 'View profile',
      icon: <User />,
    },
    {
      content: 'LIVE studio',
      icon: <Video />,
    },
    {
      content: 'Setting',
      icon: <Gear />,
    },
    ...itemsGuest,
  ];
  logined ? (itemsMemory = [...itemsProfile]) : (itemsMemory = [...itemsGuest]);
  const [searchResult, setSearchResult] = useState([]);
  const [items, setItems] = useState(logined ? itemsProfile : itemsMemory);
  const [searchValue, setSearchValue] = useState('');

  const debounced = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      const result = await searchService.search(debounced);
      setSearchResult(result);
    };
    fetchApi();
  }, [debounced]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Logo color={theme === 'light' ? 'dark' : 'white'} />
        <div className={cx('search')}>
          <input
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            value={searchValue}
            type="search"
            placeholder="Search accounts and videos"
            spellCheck={false}
          />
          <Tippy
            offset={[0, 5]}
            interactive
            placement="bottom-end"
            visible={searchResult.length > 0}
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
            <button className={cx('search-btn')}>
              <svg
                width="24"
                data-e2e=""
                height="24"
                viewBox="0 0 48 48"
                className={cx('glass-icon')}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                ></path>
              </svg>
            </button>
          </Tippy>
        </div>
        <div className={cx('actions')}>
          <Button color={theme}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;&nbsp;Upload
          </Button>
          <div style={{ width: '16px' }}></div>
          {!logined && <Button color={'danger'}>Log in</Button>}
          <div style={{ width: '16px' }}></div>
          <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 500]}
            onHidden={() => setItems(itemsMemory)}
            render={(attr) => {
              return (
                <PopperWrapper>
                  <div className={cx('actions-wrapper')} tabIndex="-1" {...attr}>
                    {!items[0].icon && (
                      <div onClick={() => setItems(itemsMemory)} className={cx('actions-item')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Languages</span>
                      </div>
                    )}
                    {items.map((item, index) => {
                      let result;
                      item.props
                        ? (result = (
                            <div onClick={() => setItems(item.props)} key={index} className={cx('actions-item')}>
                              {item.icon}
                              <span>{item.content}</span>
                            </div>
                          ))
                        : (result = (
                            <div key={index} className={cx('actions-item')}>
                              {item.icon}
                              <span>{item.content}</span>
                            </div>
                          ));
                      return result;
                    })}
                    <div className={cx('actions-item')}>
                      <Moon />
                      <span>Dark mode</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Switch
                        onColor="#0BE09B"
                        onChange={setTheme}
                        activeBoxShadow="0 0 0px 0px #fff"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        checked={theme === 'dark' ? true : false}
                        width={44}
                        height={24}
                      />
                    </div>
                    {logined && (
                      <div className={cx('actions-item', 'br-top')}>
                        <Logout />
                        <span>Log out</span>
                      </div>
                    )}
                  </div>
                </PopperWrapper>
              );
            }}
          >
            {logined ? (
              <div
                className={cx('profile-image')}
                style={{
                  backgroundImage:
                    'url(https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/e64ca5e289c6da1d430bdcaca6653eb7~c5_720x720.jpeg?x-expires=1672232400&x-signature=X3T%2Fvx8pRDKfYuHc%2FpIlfOlImZw%3D)',
                }}
              ></div>
            ) : (
              <EllipsisVertical />
            )}
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default Header;

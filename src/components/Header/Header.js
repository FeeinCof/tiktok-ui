import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import Tippy from '@tippyjs/react/headless';
import style from './Header.module.scss';
import { Button, PopperWrapper, SearchForm } from '~/components';
import { Logo, User, Video, Gear, QuestionCircle, Keyboard, Moon, Logout, EllipsisVertical } from '~/components/Icons';

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
  const [items, setItems] = useState(logined ? itemsProfile : itemsMemory);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <span className={cx('logo')}>
          <Logo />
        </span>
        <SearchForm />
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
            hideOnClick={false}
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

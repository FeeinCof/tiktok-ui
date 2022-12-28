import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import { Header, Sidebar } from '~/components';
const cx = classNames.bind(style);

const DefaultLayout = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div className="default-layout" data-theme={theme}>
      <Header theme={theme} setTheme={changeTheme} />
      <div className={cx('container-fluid')}>
        <div className={cx('container')}>
          <Sidebar />
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

import classNames from 'classnames/bind';
import style from './Menu.module.scss';
const cx = classNames.bind(style);

const Menu = ({ children }) => {
  return <nav className={cx('menu')}>{children}</nav>;
};

export default Menu;

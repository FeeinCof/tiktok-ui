import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './MenuItem.module.scss';
const cx = classNames.bind(style);

const MenuItem = ({ title, icon, to }) => {
  return (
    <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
      {icon}
      <span className={cx('menu-title')}>{title}</span>
    </NavLink>
  );
};

export default MenuItem;

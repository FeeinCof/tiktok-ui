import classNames from 'classnames/bind';
import Menu from './Menu/Menu';
import MenuItem from './MenuItem/MenuItem';
import style from './Sidebar.module.scss';
import { Home } from '../Icons';
import config from '~/config';

const cx = classNames.bind(style);

const Sidebar = ({ theme, setTheme }) => {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For you" icon={<Home />} to={config.routes.home} />
      </Menu>
    </aside>
  );
};

export default Sidebar;

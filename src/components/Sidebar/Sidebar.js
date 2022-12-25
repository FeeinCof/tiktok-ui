import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

const Sidebar = ({ theme, setTheme }) => {
  return <div className={cx('wrapper')}></div>;
};

export default Sidebar;

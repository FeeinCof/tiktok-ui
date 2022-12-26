import classNames from 'classnames/bind';
import style from './PopperWrapper.module.scss';

const cx = classNames.bind(style);

const PopperWrapper = ({ children }) => {
  return <div className={cx('popper-wrapper')}>{children}</div>;
};

export default PopperWrapper;

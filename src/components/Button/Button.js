import classNames from 'classnames/bind';
import style from './Button.module.scss';

const cx = classNames.bind(style);

const Button = ({ color, children }) => {
  return <button className={cx('btn', color)}>{children}</button>;
};

export default Button;

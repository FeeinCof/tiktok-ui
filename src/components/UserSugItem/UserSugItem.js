import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './UserSugItem.module.scss';

const cx = classNames.bind(style);

const UserSugItem = (props) => {
  return (
    <div className={cx('user-sug-item')}>
      <img className={cx('user-image')} alt="User Image" src={props.avatar} />
      <div className={cx('user-info')}>
        <h4 className={cx('username')}>
          {props.nickname}
          <i className={cx('user-verify')}>{props.tick && <FontAwesomeIcon icon={faCircleCheck} />}</i>
        </h4>
        <p className={cx('nickname')}>{props.full_name}</p>
      </div>
    </div>
  );
};

export default UserSugItem;

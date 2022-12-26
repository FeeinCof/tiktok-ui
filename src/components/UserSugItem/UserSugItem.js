import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './UserSugItem.module.scss';

const cx = classNames.bind(style);

const UserSugItem = ({ img, src, username, nickname }) => {
  return (
    <div className={cx('user-sug-item')}>
      <img
        className={cx('user-image')}
        alt="User Image"
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0925cceb1c6d0b43ee23c7a7686c2b1b~c5_300x300.webp?x-expires=1672228800&x-signature=Zksdl7glGDZssb%2FF3DMBjARFkik%3D"
      />
      <div className={cx('user-info')}>
        <h4 className={cx('username')}>
          femin
          <i className={cx('user-verify')}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </i>
        </h4>
        <p className={cx('nickname')}>Thien An</p>
      </div>
    </div>
  );
};

export default UserSugItem;

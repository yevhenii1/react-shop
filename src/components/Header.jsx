import '../styles/header.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShowPopUp } from '../redux/slices/authSlices';

const Header = ({ onClickShowPopUp }) => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.auth.loaded);

  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="header__wrapper">
        <div className="header__account">
          {!loaded ? (
            <div className="" onClick={() => dispatch(setShowPopUp(true))}>
              Sign in
            </div>
          ) : (
            <div className="">
              <Link to="/dashboard">My account</Link>
            </div>
          )}
        </div>
        <div className="header__cart">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

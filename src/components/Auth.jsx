import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setLoaded, setShowPopUp } from '../redux/slices/authSlices';

import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase';

import '../styles/auth.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const showPopUp = useSelector((state) => state.auth.showPopUp);

  const [visibl, setVisibl] = React.useState('signIn');

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleClickOpenSignIn = () => {
    setVisibl('signIn');
  };

  const handleClickOpenSignUp = () => {
    setVisibl('signUp');
  };

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log('user', user);
    if (user) {
      // navigate('/dashboard');
      dispatch(setLoaded(true));
      dispatch(setShowPopUp(false));
    } else {
      dispatch(setLoaded(false));
    }
  }, [user, loading]);

  return (
    <div className={`auth ${showPopUp ? 'show' : ''}`}>
      <div className="auth__container">
        <div className="auth__inner">
          <div
            className={`auth__change ${visibl === 'signIn' ? 'active' : ''}`}
            onClick={handleClickOpenSignIn}>
            login
          </div>
          <div
            className={`auth__change ${visibl === 'signUp' ? 'active' : ''}`}
            onClick={handleClickOpenSignUp}>
            register
          </div>
        </div>
        <div className={`auth__wrapper ${visibl === 'signIn' ? 'active' : ''}`}>
          <div>
            <div className="group">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
            </div>
            <div className="group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="button">
              <button
                className="btn-sub"
                onClick={() => logInWithEmailAndPassword(email, password)}>
                Login
              </button>
            </div>
            <div className="button-google">
              <button onClick={signInWithGoogle}>Login with Google</button>
            </div>
            <div>{/* <Link to="/reset">Forgot Password</Link> */}</div>
            <div>{/* Don't have an account? <Link to="/register">Register</Link> now. */}</div>
          </div>
        </div>
        <div className={`auth__wrapper ${visibl === 'signUp' ? 'active' : ''}`}>
          <form>
            <div className="group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="group">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
            </div>
            <div className="group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="button">
              <button className="btn-sub" onClick={register}>
                Register
              </button>
            </div>
            <div className="button-google">
              <button onClick={signInWithGoogle}>Login with Google</button>
            </div>
            <div>{/* Already have an account? <Link to="/">Login</Link> now. */}</div>
          </form>
        </div>
        <div className="auth__close" onClick={() => dispatch(setShowPopUp(false))}>
          X
        </div>
      </div>
    </div>
  );
};

export default Auth;

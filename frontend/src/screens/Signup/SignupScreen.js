
import React, { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import './SignupScreen.css';
import signup from '../../images/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterActions } from '../../actions/userActions';

function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [match, setMatch] = useState(true);
    const [emailEmpty, setEmailEmpty] = useState(true);
    const [passwordEmpty, setPasswordEmpty] = useState(true);
    const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(true);
    const [emailsend, setEmailsend] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [serverError, setServerError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegisterData = useSelector(
        state => state.userRegisterData
    );

    const { error, loading, userRegister } = userRegisterData;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userRegister) {
            const detail = userRegister.detail || '';

            if (
                detail.toLowerCase().includes('verification email sent') ||
                detail.toLowerCase().includes('email send for verification') ||
                detail.toLowerCase().includes('verification')
            ) {
                setEmailsend(true);
                setUserExist(false);
                setServerError('');
            } else if (
                detail.toLowerCase().includes('already registered') ||
                detail.toLowerCase().includes('already exist')
            ) {
                setUserExist(true);
                setEmailsend(false);
                setServerError('');
            } else if (detail) {
                setServerError(detail);
            }
        }

        if (error) {
            const message =
                typeof error === 'string'
                    ? error
                    : error?.detail ||
                      error?.message ||
                      'Registration failed. Please try again.';

            setServerError(message);
        }
    }, [userRegister, error]);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        setEmailEmpty(email.trim() !== '');
        setPasswordEmpty(password !== '');
        setConfirmPasswordEmpty(confirmPassword !== '');

        setMatch(true);
        setEmailsend(false);
        setUserExist(false);
        setServerError('');

        if (
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            return;
        }

        if (password !== confirmPassword) {
            setMatch(false);
            return;
        }

        dispatch(
            userRegisterActions(email.trim(), password)
        );
    };

    return (
        <div style={{ backgroundColor: '#f3f1f1' }}>
            <div
                className="container"
                style={{
                    padding: '3rem',
                    backgroundColor: '#f3f1f1'
                }}
            >
                <div
                    className="row"
                    style={{
                        paddingTop: '4rem',
                        paddingBottom: '4rem'
                    }}
                >
                    <div
                        className="col-lg-6"
                        style={{ backgroundColor: 'white' }}
                    >
                        <form onSubmit={submitHandler}>
                            <div
                                style={{
                                    marginLeft: '2rem',
                                    marginTop: '2rem'
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: 'Poltawski Nowy',
                                        fontSize: '26px'
                                    }}
                                >
                                    Join over 10 million students
                                    <br />
                                    around the globe.
                                </p>

                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: 'grey'
                                    }}
                                >
                                    Let's get started by filling out
                                    information below
                                </p>

                                <p
                                    style={{
                                        fontSize: '13px',
                                        fontFamily: 'Poltawski Nowy',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Email
                                </p>

                                <MdEmail />

                                <input
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        marginTop: '-4px',
                                        borderRadius: '0px 10px 10px 0px',
                                        width: '70%',
                                        border: '0px',
                                        boxShadow: '0px 0px 5px 0px grey',
                                        marginLeft: '10px',
                                        fontFamily: 'Poltawski Nowy',
                                        fontSize: '15px',
                                        paddingLeft: '5px'
                                    }}
                                    type="email"
                                    autoComplete="email"
                                />

                                {!emailEmpty && (
                                    <p className="emptyMessage">
                                        * Please fill the email
                                    </p>
                                )}

                                <p
                                    style={{
                                        fontSize: '13px',
                                        fontFamily: 'Poltawski Nowy',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Password
                                </p>

                                <AiFillLock />

                                <input
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="id_password"
                                    style={{
                                        marginTop: '-4px',
                                        borderRadius: '0px 10px 10px 0px',
                                        width: '50%',
                                        border: '0px',
                                        boxShadow: '0px 0px 5px 0px grey',
                                        marginLeft: '10px',
                                        fontFamily: 'Poltawski Nowy',
                                        fontSize: '15px',
                                        paddingLeft: '5px'
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    style={{
                                        marginLeft: '-29px',
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'transparent'
                                    }}
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? 'far fa-eye'
                                                : 'far fa-eye-slash'
                                        }
                                    />
                                </button>

                                {!passwordEmpty && (
                                    <p className="emptyMessage">
                                        * Please fill the password
                                    </p>
                                )}

                                <p
                                    style={{
                                        fontSize: '13px',
                                        fontFamily: 'Poltawski Nowy',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Confirm Password
                                </p>

                                <AiFillLock />

                                <input
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    id="id_password2"
                                    style={{
                                        marginTop: '-4px',
                                        borderRadius: '0px 10px 10px 0px',
                                        width: '50%',
                                        border: '0px',
                                        boxShadow: '0px 0px 5px 0px grey',
                                        marginLeft: '10px',
                                        fontFamily: 'Poltawski Nowy',
                                        fontSize: '15px',
                                        paddingLeft: '5px'
                                    }}
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(prev => !prev)
                                    }
                                    style={{
                                        marginLeft: '-29px',
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'transparent'
                                    }}
                                    aria-label={
                                        showConfirmPassword
                                            ? 'Hide confirm password'
                                            : 'Show confirm password'
                                    }
                                >
                                    <i
                                        className={
                                            showConfirmPassword
                                                ? 'far fa-eye'
                                                : 'far fa-eye-slash'
                                        }
                                    />
                                </button>

                                <br />

                                {!confirmPasswordEmpty && (
                                    <p className="emptyMessage">
                                        * Please confirm the password
                                    </p>
                                )}

                                <div
                                    className="d-flex"
                                    style={{ marginTop: '18px' }}
                                >
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            required
                                        />
                                    </div>

                                    <label
                                        style={{
                                            fontSize: '13px',
                                            color: '#654e4e',
                                            paddingTop: '1px',
                                            paddingLeft: '6px'
                                        }}
                                    >
                                        I have read the{' '}
                                        <span
                                            style={{
                                                color: 'blue',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            terms
                                        </span>{' '}
                                        &{' '}
                                        <span
                                            style={{
                                                color: 'blue',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            conditions
                                        </span>{' '}
                                        of BeginTheTutor
                                    </label>
                                </div>

                                <button
                                    className="buttons"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Proceed'}
                                </button>

                                {!match && (
                                    <p className="error">
                                        Passwords do not match.
                                    </p>
                                )}

                                {emailsend && (
                                    <p className="success">
                                        Verification email sent. Please check
                                        your inbox and spam folder.
                                    </p>
                                )}

                                {userExist && (
                                    <p className="error">
                                        This email is already registered.
                                        Try signing in or requesting a
                                        verification email if your account
                                        is not activated.
                                    </p>
                                )}

                                {serverError && (
                                    <p className="error">
                                        {serverError}
                                    </p>
                                )}

                                <p
                                    style={{
                                        fontSize: '13px',
                                        marginTop: '18px'
                                    }}
                                >
                                    Already have an account{' '}
                                    <Link
                                        to="/signin"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                                color: 'blue'
                                            }}
                                        >
                                            Sign in
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div
                        className="col-lg-6"
                        style={{ backgroundColor: 'white' }}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${signup})`,
                                backgroundSize: 'cover',
                                boxShadow:
                                    'inset 0px 1000px rgb(28 44 193 / 30%)'
                            }}
                            className="img"
                        >
                            <p className="rightText">
                                Don't Dream,
                                <br />
                                Start Joining
                                <br />
                                Today
                            </p>

                            <p
                                style={{
                                    color: 'white',
                                    paddingLeft: '4rem',
                                    marginTop: '-70px'
                                }}
                            >
                                Make it happen! Bring Your Vision to Life,
                                <br />
                                Build amazing things with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupScreen;

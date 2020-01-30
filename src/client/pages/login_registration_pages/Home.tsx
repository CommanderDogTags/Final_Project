import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, setStorage, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';

const Home: React.FC<HomeProps> = props => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (User && User.role === "guest") {
            props.history.push('/all')
        }
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/auth/login', 'POST', { email, password });
            setStorage(response.token, { user_id: response.user_id, role: response.role })
            props.history.push(`/all`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        props.history.replace('', null);
    };

    const isEnabled = email.length > 0 && password.length > 0;

    return (
        <>
            {/* <div className="container-fluid h-100 fixed" style={{ backgroundImage: `url(images/plants1.jpg)`}}> */}
            <div className="row justify-content-center h-100 no-gutters">
                <div className="w-45 my-auto">
                    <div className="border rounded border-primary bg-white" id="clear-border">
                        <form className="form-group p-5">

                            <h1
                                className="text-primary text-center mb-4 mt-2 unselectable"
                                id="plantstagram-login">
                                Plantstagram
                            </h1>

                            <input
                                className="form-control p-2"
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <input
                                className="form-control mt-4 p-2"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary text-white form-control mt-4 shadow-sm"
                                onClick={handleSubmit}
                                disabled={!isEnabled}>
                                Login!
                        </button>

                            <hr className="linedivide mt-4" />

                            <p className="text-center text-light unselectable text-shadow">Don't have an account?</p>
                            <p className="text-primary text-center mb-0"><a href="/register">Sign Up!</a></p>
                        </form>
                    </div>

                    {props.location.state &&
                        <div className="alert alert-danger text-center">
                            {props.location.state.msg} <button className="btn btn-primary text-white btn-sm" onClick={handleDelete}>X</button>
                        </div>}

                </div>
            </div>
            {/* </div> */}
        </>
    );
};

interface HomeProps extends RouteComponentProps { }

export default Home;
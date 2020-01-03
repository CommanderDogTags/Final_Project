import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, setStorage, User } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";

const Register: React.FC<RegisterProps> = props => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        if (User && User.role === "guest") {
            props.history.push('/all')
        }
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/auth/register', 'POST', { email, password, firstname, lastname, username });
            setStorage(response.token, { user_id: response.user_id, role: response.role })
            props.history.push(`/all`);
        } catch (error) {
            console.log(error);
        }
    };

    const isEnabled = email.length > 0 && password.length > 0 && firstname.length > 0 && lastname.length > 0 && username.length >0;

    return (
        <>
        <div className="row h-100">
            <div className="col-md-6 offset-md-3 my-auto">
                <form className="form-group border rounded border-primary p-5 shadow-sm">

                    <h1 
                        className="text-primary text-center mb-4" 
                        id="plantstagram">
                            <a href="/">Plantstagram</a>
                    </h1>

                    <div className="input-group">
                        <input 
                            className="form-control mr-2" 
                            type="text" placeholder="first name" 
                            value={firstname} 
                            onChange={e => setFirstname(e.target.value)}
                        />

                        <input 
                            className="form-control ml-2" 
                            type="text" 
                            placeholder="last name" 
                            value={lastname} 
                            onChange={e => setLastname(e.target.value)}
                        />
                    </div>

                    <input 
                        className="form-control mt-4" 
                        type="text" placeholder="user name" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input 
                        className="form-control mt-4" 
                        type="email" placeholder="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        className="form-control mt-4" 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button 
                        type="submit" 
                        className="btn btn-primary text-white form-control mt-4 mb-3 shadow-sm" 
                        onClick={handleSubmit}
                        disabled={!isEnabled}>
                        Sign Up!
                    </button>

                </form>
            </div>
        </div>
        </>
    );
};

interface RegisterProps extends RouteComponentProps<{id: string}> {}

export default Register;
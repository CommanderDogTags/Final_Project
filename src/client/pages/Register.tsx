import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, setStorage, User } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Swal from 'sweetalert2';

const Register: React.FC<RegisterProps> = props => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmpassword] = useState<string>('');
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
        if (password !== confirmpassword) {
            Swal.fire({
                title: 'Your passwords do not match!',
                
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#67DDBB'
            })
        } else {
            try {
                let response: any = await json('/auth/register', 'POST', { email, password, firstname, lastname, username });
                setStorage(response.token, { user_id: response.user_id, role: response.role })
                props.history.push(`/all`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const togglePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let x = document.getElementById(`myInput`);
        if (x.type === `password`) {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    const isEnabled = email.length > 0 && password.length > 0 && firstname.length > 0 && lastname.length > 0 && username.length >0;

    return (
        <>
        <div className="row justify-content-center h-100 no-gutters">
            <div className="w-45 my-auto custom-width">
                <form className="form-group border rounded border-primary p-5 shadow-sm">

                    <h1 
                        className="text-primary text-center mb-4 unselectable" 
                        id="plantstagram">
                            Plantstagram
                    </h1>

                    <div className="input-group">
                        <input 
                            className="form-control mr-2 p-2" 
                            type="text" placeholder="first name" 
                            value={firstname} 
                            onChange={e => setFirstname(e.target.value)}
                        />

                        <input 
                            className="form-control ml-2 p-2" 
                            type="text" 
                            placeholder="last name" 
                            value={lastname} 
                            onChange={e => setLastname(e.target.value)}
                        />
                    </div>

                    <input 
                        className="form-control mt-4 p-2" 
                        type="text" placeholder="user name" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input 
                        className="form-control mt-4 p-2" 
                        type="email" placeholder="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            className="form-control mt-4 p-2" 
                            type="password" 
                            placeholder="password"
                            id="myInput" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                         <span className="input-group-btn">
                            <button 
                                className="btn btn-lg btn-outline-primary reveal mt-4 text-primary" 
                                id="hover" 
                                type="button"
                                onClick={togglePassword}>
                                 <IoMdEye id="hover" />
                            </button>
                         </span>
                     </div>

                    <div className="input-group">
                        <input 
                            className="form-control mt-4 p-2" 
                            type="password" 
                            placeholder="confirm password" 
                            value={confirmpassword}
                            onChange={e => setConfirmpassword(e.target.value)}
                        />
                         <span className="input-group-btn">
                            <button 
                                className="btn btn-lg btn-outline-primary reveal mt-4 text-primary" 
                                id="hover" 
                                type="button">
                                 <IoMdEye id="hover" />
                            </button>
                         </span>
                     </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary text-white form-control mt-4 mb-3 shadow-sm" 
                        onClick={handleSubmit}
                        disabled={!isEnabled}>
                        Sign Up!
                    </button>

                    <hr className="linedivide mt-2"/>

                    <p className="text-center text-light unselectable">Already have an account?</p>
                    <p className="text-primary text-center mb-1"><a href="/">Login!</a></p>

                </form>
            </div>
        </div>
        </>
    );
};

interface RegisterProps extends RouteComponentProps<{id: string}> {}

export default Register;
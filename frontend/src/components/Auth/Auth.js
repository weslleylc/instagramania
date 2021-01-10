import React, {useState, useEffect} from "react";
import {API} from '../../api-service';
import {useCookies} from "react-cookie";
import logo from "../../assets/images/371907300_INSTAGRAM_ICON_1080.png"
import Wrapper from "../Wrapper/Wrapper"
import "./Auth.css"

function Auth(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);
    const [cookies, setCookies] = useCookies(['mr-token']);
    

    const loginClicked = evt => {
        API.loginUser({username, password})
            .then( resp => setCookies('mr-token', resp.token))
            .catch( error => console.log(error))
    }

    const registerClicked = evt => {
        API.registerUser({username, password})
            .then( evt => loginClicked())
            .catch( error => console.log(error))
    }

    useEffect(() => {
        if (cookies['mr-token']) window.location.href = '/posts/';
    }, [cookies])

    const isDisable = username.length === 0 || password.length === 0;

    return (
        <Wrapper className="login-container ">
            <div className='centerdiv'>
                <div className="header">
                    <img src={logo} className="Home-logo" alt="logo" />
                    <h1>INSTAGRAMANIA</h1>
                    {isLoginView ?
                        <h2>Login</h2>:
                        <h2>Register</h2>
                    }
                </div>

                <label htmlFor="username">Username</label>
                <br/>
                <input id="username" type="text" placeholder="title" value={username}
                       onChange={evt => setUsername(evt.target.value)} required
                />
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input id="password" type="password" placeholder="Password"
                       value={password} onChange={ evt => setPassword(evt.target.value)} required
                />
                <br/>
                {isLoginView ?
                    <div className="center">
                        <button htmlFor="login" onClick={loginClicked} disabled={isDisable}> Login </button>
                        <br/>
                        <label htmlFor="login" onClick={()=> setIsLoginView(false)} > You Don't have an account? Register Here</label>
                    </div>
                    :
                    <div className="center">
                        <button htmlFor="register"  onClick={registerClicked} disabled={isDisable}> Register </button>
                        <br/>
                        <label htmlFor="register" onClick={()=> setIsLoginView(true)}> You have an account? Login Here</label>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

export default Auth;
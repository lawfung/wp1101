import displayStatus from "../../tools/display";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import React, { useState, useRef } from 'react'
import 'antd/dist/antd.css'
import { LOGIN } from '../../graphql/mutations.js'
import { useMutation } from '@apollo/client';
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1  {
        margin: 50;
        font-size: 3em;
    }
`;


export default function LoginPage(){
    const [, setCookie] = useCookies(['session']);
    const [login] = useMutation(LOGIN);
    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')  // textBody
    const passwdRef = useRef(null)
    const signIn = async () => {
        if ( !username || !passwd)
            displayStatus({
                type: "error",
                msg: "Missing username or password",
            });
        else{
          try {
            const res = await login({variables: {user: username, hashPasswd: passwd}});
            const cookie = res.data.Login;
            if(cookie){
                setCookie('session', cookie, { path: '/' })
                displayStatus({
                    type: "success",
                    msg: `Hello ${username}`,
                });
                setUsername("");
                setPasswd("");
            }
            else{
                displayStatus({
                    type: "error",
                    msg: "Login failed",
                });
            }
          } catch (e) {
            console.log(e);
            displayStatus({
              type: "error",
              msg: "Login failed",
            });
          
          }
        }
    }
    return (
    <Wrapper>
    <Title>
      <h1>Login</h1>
    </Title>
    <>
        <Input
            placeholder="Username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { passwdRef.current.focus() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Password
            ref={passwdRef}
            placeholder="Password"
            prefix={<LockOutlined />}
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { signIn() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Button
            type="primary"
            size="large" style={{ width: 100, margin : 5 }}
            onClick={signIn}
        >
            Sign In
        </Button>
    </>
    </Wrapper>
    )
}

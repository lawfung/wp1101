import displayStatus from "../../tools/display";
import { Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { REGISTER_USER } from '../../graphql/mutations.js'
import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react'
import 'antd/dist/antd.css'

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


export default function RegisterPage(){
    const [username, setUsername] = useState('')
    const [passwd, setPasswd] = useState('')
    const [passwd2, setPasswd2] = useState('')
    const [registerUser] = useMutation(REGISTER_USER);
    const passwdRef = useRef(null)
    const passwdRef2 = useRef(null)
    const submit = async () => {
        if ( !username || !passwd || !passwd2)
            displayStatus({
                type: "error",
                msg: "Please fill all the blanks"
            });
        else if(passwd !== passwd2)
            displayStatus({
                type: "error",
                msg: "Two passwords must be the same"
            });
        else {
            var tmp = await registerUser({
                variables: {
                    user: username, hashPasswd: passwd
                }
            });
            if (tmp['data']['Register'] === true)
                displayStatus({
                    type: "success",
                    msg: "Register Succeed"
                });
            else 
                displayStatus({
                    type: "error",
                    msg: "Deprecated Username"
                });
        }
        setUsername("");
        setPasswd("");
        setPasswd2("");
    }
    return (
    <Wrapper>
    <Title>
      <h1>Register</h1>
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
            onKeyDown={(e) => { if (e.key === 'Enter') { passwdRef2.current.focus() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Input.Password
            ref={passwdRef2}
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
            value={passwd2}
            onChange={(e) => setPasswd2(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { submit() }}}
            size="large" style={{ width: 300, margin : 5 }}
        />
        <Button
            type="primary"
            size="large" style={{ width: 100, margin : 5 }}
            onClick={submit}
        >
            Submit
        </Button>
    </>
    </Wrapper>
    )
}

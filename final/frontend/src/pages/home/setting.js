import { Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import displayStatus from "../../tools/display";
import styled from "styled-components";

import { CHANGE_PASSWORD } from "../../graphql";
import { useMutation } from "@apollo/client";
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

export default function Setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [cookie] = useCookies(["session"]);

  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD);
  const saveChange = async () => {
    if (newPassword === "") {
      displayStatus({
        type: "error",
        msg: "new password cannot be empty!",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmedPassword("");
      return;
    }
    if (newPassword !== confirmedPassword) {
      displayStatus({
        type: "error",
        msg: "confirmed password wrong!",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmedPassword("");
      return;
    }

    if (oldPassword === newPassword) {
      displayStatus({
        type: "error",
        msg: "old password and new password can not be the same!",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmedPassword("");
      return;
    }

    try {
      const res = await changePasswordMutation({variables: {oldPasswd: oldPassword, newPasswd: newPassword, cookie: cookie.session}});
      if (res.data.ChangePassword) {
        displayStatus({
          type: "success",
          msg: "new password is set!",
        });
      } else {
        displayStatus({
          type: "error",
          msg: "old password wrong!",
        });
      }
      setOldPassword("");
      setNewPassword("");
      setConfirmedPassword("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Title>
        <h1>Change Password</h1>
      </Title>
      <>
        <Input.Password
          placeholder="Current Password"
          prefix={<LockOutlined />}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { saveChange() }}}
          size="large" style={{ width: "30vw", margin : 5 }}
        />
        <Input.Password
          placeholder="New Password"
          prefix={<LockOutlined />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { saveChange() }}}
          size="large" style={{ width: "30vw", margin : 5 }}
        />
        <Input.Password
          placeholder="Confirmed Password"
          prefix={<LockOutlined />}
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { saveChange() }}}
          size="large" style={{ width: "30vw", margin : 5 }}
        />
        <Button
          type="primary"
          size="large" style={{ width: "15vw", margin : 5 }}
          onClick={saveChange}
        >
          Save Change
        </Button>
      </>
    </Wrapper>
  );
}

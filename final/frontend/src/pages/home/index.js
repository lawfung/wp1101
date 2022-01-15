import styled from "styled-components";
import React, { useState } from 'react';
import { Sidebar, NavItemsContainer, NavItem } from '../../tools/sidebar';
import { Settings, ViewList, Sort} from '@mui/icons-material';
import Setting from "./setting";
import Strategy from "./strategy";
import Profile from "./profile";
import 'antd/dist/antd.css';

const Wrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Homepage() {
  const [content, setContent] = useState("profile");
  return (
    <Wrapper>
      <Sidebar hideFooter={false} > 
        <NavItemsContainer>
          <NavItem label="Record" onClickAll={() => {setContent("profile");}} icon={<ViewList width="0.75rem" />} clean={false} />
          <NavItem label="Strategy" onClickAll={() => {setContent("strategy");}} icon={<Sort width="0.75rem" />} clean={false} />
          <NavItem label="Setting" onClickAll={() => {setContent("setting");}} icon={<Settings width="0.75rem" />} clean={false} />
        </NavItemsContainer>
      </Sidebar>
      <div style={{flexGrow: 1}}>
        {content === "profile" ? 
          <Profile /> : 
          content === "strategy" ? 
            <Strategy /> :
            <Setting />
        }
      </div>
    </Wrapper>
  );
}

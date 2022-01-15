import SwitchPage from "./pages/switch";
import { BrowserRouter, NavLink} from 'react-router-dom'
import { Toolbar, AppBar, Stack, Button, Typography } from '@mui/material';
import React, { useEffect } from "react";
import { useUsername } from "./tools/useUsername";
import { useCookies } from 'react-cookie';
import { useApolloClient, useMutation  } from "@apollo/client";
import { Username_QUERY } from "./graphql";
import { LOGOUT } from './graphql/mutations.js';
import display from "./tools/display";
import { AccountCircle } from '@mui/icons-material';
// import { Input } from "@mui/material";

function LinkedButton({to, color, sty2, text, variant, startIcon, height="100%"}) {
  return <NavLink to={to} style={{ textDecoration: 'none'}}>
            <Button color={color} style={{...sty2, height}} variant={variant} startIcon={startIcon}>
              {text}
            </Button>
          </NavLink>
}

function App() {
  const [cookies, , removeCookie] = useCookies(['session']); 
  const {username, changeUsername} = useUsername();
  const client = useApolloClient();
  useEffect( () =>{
      async function dummy() {
          // console.log("get username");
          const cookie = cookies.session;
          if(cookie) {
              // console.log("gogo")
              const res = await client.query({
                  query: Username_QUERY,
                  variables: {cookie}
              });
              const name = res.data.GetUsername;
              if(name){
                  changeUsername(name);
                  // console.log(name);
                  return;
              }
          }
          changeUsername("");
      }
      dummy();
  }, [client, changeUsername, cookies]);
  const [logoutQL] = useMutation(LOGOUT);
  const logout = async () => {
    const req = await logoutQL({variables: {user: username, cookie: cookies.session}});
    if(req.data.Logout) {
      display({type: 'success', msg: 'Logout successfully'});
    }
    removeCookie('session', { path: '/' });
  }
  // TODO :
  // (only when enter this website or refresh)
  // check cookie for auto-login (need to ask backend) (then setUserName and setLogin)
  // otherwise, clear cookie
  return (
    <div style={{ display: "flex", flexDirection: "column",height: "100vh" }}>
      <BrowserRouter>
        <AppBar position="relative" sx={{zIndex: (theme) => 1299, background: 'orange'}}>
          <Toolbar>
            <LinkedButton to="/" sty2={{ fontSize: '4vh', "fontFamily": "Roboto", color:"black"}} text="Awesome"/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Stack spacing={-0} direction="row" sx={{display: "flex", justifyContent: "space-around"}}>
                { username ? 
                <><LinkedButton to="/home" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text={"user: " + username} startIcon={<AccountCircle/>}/>
                <LinkedButton to="/trade" color="secondary" sty2={{ fontSize: '2.5vh', "fontFamily": "Nunito"}} text="Moniter &amp; Backtest"/></>
                : <></> }
              </Stack>
            </Typography>
            
            <Stack spacing={3} direction="row">
              {username ? <Button color="error" style={{height: "100%"}} variant="contained" onClick={logout}> Logout </Button>: <><LinkedButton to="/register" variant="contained" text="Register"/> <LinkedButton to="/login" variant="contained" text="Login"/></> }
            </Stack>
          </Toolbar>
        </AppBar>
        <SwitchPage />
      </BrowserRouter>
    </div>
  )
}
// export default function App() {
//     const [cookies, setCookie] = useCookies(['name']); 
//     function onChange(X) {
//         const newName = X.target.value
//         console.log(newName)
//       setCookie('name', newName, { path: '/' });
//     }

//     return (
//       <div>
//         <Input value={cookies.name} onChange={onChange} />
//         {cookies.name && <h1>Hello {cookies.name}!</h1>}
//       </div>
//     );
// }

export default App;

import React from 'react';
import HomePage from "./home";
import TradePage from "./trade";
import LoginPage from "./login";
import RegisterPage from "./register";
import RootPage from './root';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUsername } from "../tools/useUsername";

export default function SwitchPage() {
    const {username} = useUsername();
    return (
        <Routes>
            <Route path="/" element={<RootPage/>}/>
            <Route path="/home" element={username ? <HomePage/> : <Navigate replace to="/login" /> }/>
            <Route path="/trade" element={username ? <TradePage/> : <Navigate replace to="/login" />}/>
            <Route path="/register" element={!username ? <RegisterPage/> : <Navigate replace to="/" />}/>
            <Route path="/login" element={!username ? <LoginPage/> : <Navigate replace to="/" />}/>
        </Routes>
    )
}

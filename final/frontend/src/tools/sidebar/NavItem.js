import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconContainer, NavItemContainer } from "./styles"

export function NavItem({ children, to, label, icon, expand, clean = true, onClickAll =()=>{}, onClickClean=()=>{}, ...props }) {

    return (
        <NavItemContainer>
            {/* <NavLink ref={item} to={to} activeClassName='active' {...props}> */}
            <div onClick={() => {onClickAll();}}>
                <IconContainer>
                    {icon}
                </IconContainer>
                <span>{label}</span>
                {clean ? 
                    <IconContainer className='trashCan' onClick={(e) => {onClickClean(); e.stopPropagation();}}>
                        <DeleteIcon width='0.75rem' />
                    </IconContainer>
                    : <></>
                }
            </div>
            {/* </NavLink> */}
        </NavItemContainer>
    )
}
import React, { useState } from 'react'
import {DoubleArrowRightIcon} from './Icons'
import {IconContainer, NavItemsContainer, NavItemContainer, Container } from "./styles"

export function Sidebar({ children, defaultExpanded = false, hideFooter = false }) {
    const [expandedMode, setExpandedMode] = useState(defaultExpanded)

    const toggleExpandMode = () => {
        setExpandedMode(prevMode => !prevMode)
    }

    const toggleText = expandedMode ? 'Collapse Sidebar' : 'Keep Expanded'

    return (
        <Container className={expandedMode ? 'expand-mode' : ''}>
            <nav>
                {children}
            </nav>
            {!hideFooter && <footer>
                <NavItemsContainer>
                    <NavItemContainer onClick={toggleExpandMode}>
                        <div>
                            <IconContainer><DoubleArrowRightIcon className='expand-mode-toggle' width='0.75rem' /></IconContainer>
                            <span>{toggleText}</span>
                        </div>
                    </NavItemContainer>
                </NavItemsContainer>
            </footer>}
        </Container>
    )
}
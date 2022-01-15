import styled from 'styled-components';

export const NavItemsContainer = styled.ul`
display: grid;
grid-auto-flow: row;
gap: 0.15rem;
list-style-type: none;
padding: 0.5rem .5rem .5rem 0rem;
transition: padding var(--transition-settings-1, 0.2s ease);
`

export const IconContainer = styled.picture`
display: inline-grid;
place-items: center;
width: var(--icon-container-size, 1.75rem);
height: var(--icon-container-size, 1.75rem);
margin-left: 0.5rem;
margin-right: 1rem;
`

export const NavItemContainer = styled.li`
span {
white-space: nowrap;
overflow: hidden;
}

div {
    class : ""
    padding: 0.15rem 1rem 0.15rem 0rem;
    margin-top: 0.25rem;
    border-radius: 0.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    
    span {
        opacity: 0;
    }
}
div .trashCan : hover{
    background : red;
    border-radius: 0.3rem;
}
`

export const Container = styled.section`
position: fixed;
padding-top: 6rem;
top: 0rem;
bottom: 0;
left: 0;
min-width: 3rem;
max-width: 3rem;
background: var(--primary-surface, #FFF);
color: var(--on-primary-surface, #000);
transition: all var(--transition-settings-1, 0.2s ease);
z-index: var(--sidebar-z-index, 400);
width: var(--sidebar-max-width, 20vw);
box-shadow: var(--box-shadow-6dp, 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20));

* {
    overscroll-behavior: contain;
}

*::-webkit-scrollbar {
    width: 0rem;
}

*::-webkit-scrollbar-track {
    display: none;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--primary-accent, #009688);
  border-radius: 30%;
}

nav {
    max-height: 80vh;
    height: 84%;
    overflow-y: auto;
    overflow-x: hidden;
}

&:hover,
&.expand-mode {
    min-width: 15rem;
    max-width: var(--sidebar-max-width, 20vw);
    background: var(--primary-color, #333);
    color: var(--on-primary-color, #FFF);

    ${NavItemContainer} * span {
        opacity: 1;
    }

    ${NavItemContainer} > *:hover {
        background: var(--primary-accent, #009688);
        color: var(--on-primary-accent, #FFF);
        transition-duration: 0s;
    }
    ${NavItemContainer} *.active {
        background: var(--light-primary-color, #BBDEFB);
        color: var(--on-light-primary-color, #000);
    }

    * ${IconContainer},
    *.active ${IconContainer} {
        background: inherit;
        color: inherit;
        border-radius: 0%;
    }

    ${NavItemsContainer} {
        padding: 0.5rem .5rem .5rem 1rem;
    }

    *::-webkit-scrollbar {
        width: 0.35rem;
    }
}

& ~ * {
    transition: margin-left var(--transition-settings-1, 0.2s ease);
    margin-left: 3rem;
}
&.expand-mode ~ * {
    margin-left: calc(var(--sidebar-max-width, 20vw) + 0.0rem);
}

.expand-mode-toggle {
    transition: transform var(--transition-settings-1, 0.2s ease);
}

&.expand-mode .expand-mode-toggle {
    transform: rotate(180deg);
}
`
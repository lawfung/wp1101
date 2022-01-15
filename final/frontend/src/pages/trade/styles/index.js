import styled from "styled-components";
import { Grid, Stack, Typography } from "@mui/material";
export const HalfWrapper = styled.div`
    height: 100%;
    width : 50%;
    overflow : auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const MyGrid = styled(Grid)`
    display: flex;
    justify-content: space-around;
`
export const MyStack = styled(Stack)`
    display: flex;
    justify-content: space-around;
    margin-top: 2vh;
    width: 100%;
`
export const MyTitle = styled(Typography)`
    border-color: coral;
    border-width: thick;
    border-style: solid;
    border-radius: 2vh;
    padding: 1vh;
    background: Cornsilk;
`
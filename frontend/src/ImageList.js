import * as React from 'react';
import ReactDOM from 'react-dom';
import {Box, Container} from "@mui/material";
import TitlebarImageList from './TitlebarImageList';

function ImageList(props) {

    return (
    <Container>
    <TitlebarImageList itemData = {props.itemData}/>
    </Container>
    )
}

export default ImageList
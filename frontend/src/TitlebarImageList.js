import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AlertDialog from './AlertDialog';

export default function TitlebarImageList(props) {
  return (
    <ImageList sx={{height: '30vh'}}>
      <ImageListItem key="Subheader" cols={4}>
        {/* <ListSubheader component="div">December</ListSubheader> */}
      </ImageListItem>
      {props.itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={'Votes:' + item.votes}
            actionIcon={
              <AlertDialog name = {item.title}></AlertDialog>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
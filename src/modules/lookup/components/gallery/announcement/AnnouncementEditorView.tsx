import { layoutMessage } from '@layout/locales/messages';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as React from 'react';
import { AnnouncementEditorProps } from './AnnouncementEditor';

export const AnnouncementEditorView: React.SFC<AnnouncementEditorProps> = props => {
  const { isLoading, response } = props.announcementState.all;

  const RenderImageList = () => (
    <Grid container spacing={16}>
      {
        props.announcementImages.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} style={{height: '400'}}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{objectFit: 'cover'}}
                  image={image.imgPath}
                  title={image.imageName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {`#${image.order} - ${image.imageName}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {
                  index > 0 &&
                  <IconButton onClick={() => props.handleMoveAnnouncementImage(index, 'backward')}>
                    <ArrowBackIosIcon />
                  </IconButton>
                }
                <IconButton onClick={() => props.handleRemoveAnnouncementImage(image.imageUid)}>
                  <DeleteForeverIcon />
                </IconButton>
                {
                  index < (props.announcementImages.length - 1) &&
                  <IconButton onClick={() => props.handleMoveAnnouncementImage(index, 'forward')}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                }
              </CardActions>
            </Card>
          </Grid>
        ))
      }
      <Grid item xs={6} sm={4} md={3}>
      
      </Grid>
    </Grid>
  );

  const render = (
    <React.Fragment>
      <Grid container spacing={8}>
        {
          isLoading &&
          <Typography>
            {props.intl.formatMessage(layoutMessage.text.loading)}
          </Typography>
        }
        <Grid item xs={12}>
          {
            !isLoading &&
            response &&
            response.data &&
            props.loadImages &&
            props.handleSetAnnouncementImages(response.data)
          }
          {
            !isLoading &&
            RenderImageList()
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
  return render;
};
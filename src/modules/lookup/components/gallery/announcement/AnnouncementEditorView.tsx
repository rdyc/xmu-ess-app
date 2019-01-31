import { layoutMessage } from '@layout/locales/messages';
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as React from 'react';
import { AnnouncementEditorProps } from './AnnouncementEditor';

export const AnnouncementEditorView: React.SFC<AnnouncementEditorProps> = props => {
  const { isLoading, response } = props.announcementState.all;

  const RenderImageList = () => {
    return (
      <div>
        <GridList cellHeight={180} cols={3}>
          {props.announcementImages.map(image => (
            <GridListTile key={image.imageUid}>
              <img src={image.imgPath} alt={image.imageName} />
              <GridListTileBar
                title={image.imageName}
                actionIcon={
                  <IconButton>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

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
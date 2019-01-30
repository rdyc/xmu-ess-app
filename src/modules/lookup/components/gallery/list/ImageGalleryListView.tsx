import { layoutMessage } from '@layout/locales/messages';
import { IGallery } from '@lookup/classes/response/gallery';
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import { ImageGalleryListProps } from './ImageGalleryList';

export const ImageGalleryListView: React.SFC<ImageGalleryListProps> = props => {
  const { isLoading, response } = props.imageGalleryState.all;

  const RenderImageList = (images: IGallery[]) => {
    // const len = images.length - 1 ;

    return (
      <div>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            {/* <ListSubheader component="div">December</ListSubheader> */}
          </GridListTile>
          {images.map(image => (
            <GridListTile key={image.uid}>
              <img src={image.path.small} alt={image.name} />
              <GridListTileBar
                title={image.name}
                actionIcon={
                  <IconButton>
                    <InfoIcon />
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
            RenderImageList(response.data)
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
  return render;
};
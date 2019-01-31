import { IGallery } from '@lookup/classes/response/gallery';
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, List, ListSubheader, Paper, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';
import { ImageGalleryListProps } from './ImagesGalleryList';

export const ImagesGalleryListView: React.SFC<ImageGalleryListProps> = props => {
  const { isLoading, response } = props.imageGalleryState.all;

  const renderImageList = (images: IGallery[]) => {

    return (
      <div>
        <GridList cellHeight={180} cols={4} spacing={12}>
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
  
  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata &&
            response.metadata.paginate && 
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural one="image" other="images" value={response.metadata.total} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          }
        </ListSubheader>
      }
    >
      {
        response &&
        isArray(response.data) && 
        renderImageList(response.data)
      }
    </List>
  );

  const render = (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );

  return render;
};
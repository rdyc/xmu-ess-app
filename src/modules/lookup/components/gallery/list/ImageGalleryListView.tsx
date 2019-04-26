import { CollectionPageDataContainer } from '@layout/components/pages/collectionPage/CollectionPageDataContainer';
import { layoutMessage } from '@layout/locales/messages';
import { IGallery } from '@lookup/classes/response/gallery';
import { CircularProgress, Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import * as React from 'react';
import { ImageGalleryListProps } from './ImageGalleryList';

export const ImageGalleryListView: React.SFC<ImageGalleryListProps> = props => {
  const { isLoading, response } = props.imageGalleryState.all;

  const cusCompt: React.ReactNode = (
    <div>
      <IconButton color="inherit" onClick={() => props.history.push('/lookup/imagegalleries/announcement')}>
        <PictureInPictureIcon/>
      </IconButton>
      <IconButton color="inherit" onClick={() => props.history.push('/lookup/imagegalleries/form')}>
        <AddCircleIcon/>
      </IconButton>
    </div>
  );

  const RenderImageList = (images: IGallery[]) => {

    return (
      <div>
        <GridList cellHeight={180} cols={4} spacing={12}>
          {images.map(image => (
            <GridListTile key={image.uid}>
              <img src={image.path.small} alt={image.name} />
              <GridListTileBar
                title={image.name}
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
        <Grid item xs={12}>
          <CollectionPageDataContainer
            state={props.imageGalleryState.all}
            pagination={{
              field: props.orderBy,
              direction: props.direction,
              page: props.page,
              size: props.size,
            }}
            metadata={props.imageGalleryState.all.response && props.imageGalleryState.all.response.metadata}
            fields={props.fields}
            onClickSync={() => props.handleOnLoad()}
            onClickRetry={() => props.handleOnLoad()}
            onClickNext={() => props.setPageNext()}
            onClickPrevious={() => props.setPagePrevious()}
            onChangeField={props.setField}
            onChangeOrder={props.setOrder}
            onChangeSize={props.setSize}
          >
            {
              isLoading &&
              <div className={props.classes.preloader}>
                <div className={props.classes.preloaderContent}>
                  <CircularProgress 
                    style={{margin: 'auto'}} 
                    color="secondary"
                  />

                  <Typography
                    className={props.classes.marginFarTop}
                  >
                    {props.intl.formatMessage(layoutMessage.text.waiting)}
                  </Typography>
                </div>    
              </div>
            }
            {
              !isLoading &&
              response &&
              response.data &&
              RenderImageList(response.data)
            }
          </CollectionPageDataContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {
        props.customComponentFlag &&
        props.setCustomComponent(cusCompt)
      }
      {
        render
      }
    </React.Fragment>
  );
};
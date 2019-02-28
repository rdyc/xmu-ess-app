import { DataContainer } from '@layout/components/pages/dataContainer/DataContainer';
import { layoutMessage } from '@layout/locales/messages';
import { IGallery } from '@lookup/classes/response/gallery';
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import * as React from 'react';
import { ImageGalleryListProps } from './ImageGalleryList';

export const ImageGalleryListView: React.SFC<ImageGalleryListProps> = props => {
  const { isLoading, response } = props.imageGalleryState.all;

  const cusCompt: React.ReactNode = (
    <div>
      <IconButton onClick={() => props.history.push('/lookup/imagegalleries/announcement')}>
        <PictureInPictureIcon/>
      </IconButton>
      <IconButton onClick={() => props.history.push('/lookup/imagegalleries/form')}>
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
        {
          isLoading &&
          <Typography>
            {props.intl.formatMessage(layoutMessage.text.loading)}
          </Typography>
        }
        <Grid item xs={12}>
          <DataContainer
            isLoading={props.isLoading}
            state={{
              field: props.orderBy,
              direction: props.direction,
              page: props.page,
              size: props.size,
            }}
            className={props.classes.flex}
            metadata={response && response.metadata}
            fields={props.fields}
            onClickSync={() => props.setPageOne()}
            onClickNext={() => props.setPageNext()}
            onClickPrevious={() => props.setPagePrevious()}
            onChangeField={props.setField}
            onChangeOrder={props.setOrder}
            onChangeSize={props.setSize}
          >
            {
              !isLoading &&
              response &&
              response.data &&
              RenderImageList(response.data)
            }
          </DataContainer>
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
      {render}
    </React.Fragment>
  );
};
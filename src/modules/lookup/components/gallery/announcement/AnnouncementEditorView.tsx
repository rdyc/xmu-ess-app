import { IAnnouncement } from '@home/classes/response/announcement';
import { layoutMessage } from '@layout/locales/messages';
import { Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import { AnnouncementEditorProps, IAnnouncementImage } from './AnnouncementEditor';

export const AnnouncementEditorView: React.SFC<AnnouncementEditorProps> = props => {
  const { isLoading, response } = props.announcementState.all;

  const RenderImageList = (images: IAnnouncement[]) => {
    const announcementImages: IAnnouncementImage[] = images.map((item, index) => {
      const path = item.path && item.path.medium;

      return ({
      imageUid: path.slice(path.lastIndexOf('.'), -36),
      imageName: item.name,
      order: index - 1,
      imgPath: path
      });
    });

    return (
      <div>
        <GridList cellHeight={180} cols={3}>
          {announcementImages.map(image => (
            <GridListTile key={image.imageUid}>
              <img src={image.imgPath} alt={image.imageName} />
              <GridListTileBar
                title={image.imageName}
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
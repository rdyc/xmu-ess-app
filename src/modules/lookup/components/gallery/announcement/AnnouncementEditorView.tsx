import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Card, CardHeader, CardMedia, DialogActions, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as React from 'react';
import { AnnouncementEditorProps } from './AnnouncementEditor';
import { AnnouncementForm } from './form/AnnouncementForm';

export const AnnouncementEditorView: React.SFC<AnnouncementEditorProps> = props => {
  const { isLoading, response } = props.announcementState.all;

  const RenderImageList = () => (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          {
            props.announcementImages.map((image, index) => (
              <Grid item xs={12} key={index}>
                <Card style={{maxHeight: 200}}>
                  <Grid container spacing ={8}>
                    <Grid item xs={12} sm={6} md={5}>
                      <CardMedia
                        component="img"
                        image={image.imgPath}
                        title={image.imageName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                      <CardHeader
                        title={`#${image.order} - ${image.imageName}`}
                      >
                      </CardHeader>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                      <DialogActions>
                        <Tooltip title={props.intl.formatMessage(lookupMessage.gallery.action.moveUp)}>
                          <IconButton 
                            disabled={index <= 0} 
                            onClick={() => props.handleMoveAnnouncementImage(index, 'backward')}
                          >
                            <ArrowUpwardIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={props.intl.formatMessage(lookupMessage.gallery.action.moveDown)}>
                          <IconButton 
                            disabled={index >= (props.announcementImages.length - 1)} 
                            onClick={() => props.handleMoveAnnouncementImage(index, 'forward')}
                          >
                            <ArrowDownwardIcon />
                          </IconButton>
                        </Tooltip>
                          <Tooltip title={props.intl.formatMessage(lookupMessage.gallery.action.remove)}>
                          <IconButton 
                            onClick={() => props.handleRemoveAnnouncementImage(image.imageUid)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </DialogActions>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader 
                title={props.intl.formatMessage(lookupMessage.gallery.section.addTitle)}
              />
              <DialogActions>
                <Button disabled>
                  {props.intl.formatMessage(lookupMessage.gallery.section.addTitle)}
                </Button>
              </DialogActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader 
                title={props.intl.formatMessage(lookupMessage.gallery.section.submitTitle)}
              />
              <DialogActions>
                <Button 
                  onClick={() => response && response.data && props.handleSetAnnouncementImages(response.data)}
                  disabled={!props.enableReset}
                >
                  {props.intl.formatMessage(layoutMessage.action.reset)}
                </Button>
                <AnnouncementForm 
                  onSubmit={props.handleSubmitAnnouncement} 
                  onSubmitSuccess={props.handleSubmitSuccess}
                  onSubmitFail={props.handleSubmitFail}
                />
              </DialogActions>
            </Card>
          </Grid>
        </Grid>
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
import {
  AppBar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

import { MarkdownCategoryForm } from '../form/MarkdownCategoryForm';
import { MarkdownCategoryProps } from './MarkdownCategory';

export const MarkdownCategoryView: React.SFC<MarkdownCategoryProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isOpen}
      className={props.classes.shift}
      onClose={props.onClose}
    >
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            Category
          </Typography>

          <IconButton 
            onClick={() => { props.handleAddOpen(); props.handleChangeCategoryUid(undefined); }}
            color="inherit" aria-label="Add"
          >
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Divider/>

      <DialogContent style={{marginTop: '20px'}}>
        <Typography>
          DISINI LIST
        </Typography>
      </DialogContent>
    </Dialog>

    <MarkdownCategoryForm 
      isOpen={props.isAddOpen}
      onClose={props.handleAddOpen}
      uid={props.categoryUid}
    />
  </React.Fragment>
);
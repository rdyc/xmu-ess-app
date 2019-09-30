import { IHrCornerCategory } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { AppBar, Button, Dialog, DialogContent, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { HrCornerCategoryDetailView } from '../../detail/category/HrCornerCategoryDetailView';
import { HrCornerCategoryForm } from '../../form/category/HrCornerCategoryForm';
import { HrCornerCategoryListProps } from './HrCornerCategoryList';
import { HrCornerCategorySummary } from './HrCornerCategorySummary';

export const HrCornerCategoryListView: React.SFC<HrCornerCategoryListProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
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
            {props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'HR Corner Category'})}
          </Typography>

          <IconButton 
            onClick={() => props.handleOpenForm()}
            color="inherit" aria-label="Add"
          >
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Divider/>

      <DialogContent>    
        <CollectionPage
          // state & fields
          state={props.hrCornerCategoryState.all}
          fields={props.fields}
      
          // callback
          onLoadApi={props.handleOnLoadApi}
          onBind={props.handleOnBind}
          
          // row components
          summaryComponent={(item: IHrCornerCategory) => ( 
            <HrCornerCategorySummary data={item}/>
          )}
          actionComponent={(item: IHrCornerCategory) => (
            <React.Fragment>
              <Button 
                size="small"
                color="secondary"
                onClick={() => {
                  props.handleOpenForm();
                  props.handleCategory(item);
                }}
              >
                {props.intl.formatMessage(layoutMessage.action.modify)}
              </Button>
      
              <Button 
                size="small"
                color="secondary"
                onClick={() => {
                  props.handleOpenDetail(true);
                  props.handleChangeDetail(item);
                }}
              >
                {props.intl.formatMessage(layoutMessage.action.details)}
              </Button>
            </React.Fragment>
          )}
        />
      </DialogContent>
    </Dialog>
    
    <HrCornerCategoryDetailView 
      isDetailOpen={props.isDetailOpen}
      onClose={props.handleOpenDetail}
      data={props.detailData}
      handleOpenForm={props.handleOpenForm}
      handleCategory={props.handleCategory}
      handleOnLoadList={props.handleOnLoadApi}
    />
    
    <HrCornerCategoryForm 
      category={props.category}
      isFormOpen={props.isFormOpen}
      onClose={props.handleOpenForm}
      handleOnLoadList={props.handleOnLoadApi}
    />
  </React.Fragment>
);
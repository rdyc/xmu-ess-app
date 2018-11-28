import { ISystemType } from '@common/classes/response';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { CommonSummaryProps } from './CommonSummary';

export const CommonSummaryView: React.SFC<CommonSummaryProps> = props => {
  const { editableCategories, intl, handleGoToCategoryList } = props;
  const { isLoading, response } = props.commonSystemState.type;

  const RenderTypes = (categories: ISystemType[]) => (
    editableCategories.map(editableCategory => {
      
      const category = categories.find(_category => 
          _category.name === editableCategory.name
        );

      return (
        category &&
        <Grid item xs={12} sm={6} lg={3} key={editableCategory.name}>
          <Card square>
            <CardHeader
              title={category.name}
              titleTypographyProps={{
                noWrap: true
              }}
            />
            <CardContent>
              <Typography>
                {`${intl.formatMessage(commonMessage.system.text.active)} : `}
                {category.active}
              </Typography>
              <Typography>
                {`${intl.formatMessage(commonMessage.system.text.inActive)} : `}
                {category.inActive}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleGoToCategoryList(editableCategory.value)}
              >
                {intl.formatMessage(layoutMessage.action.modify)}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        );
      })
  );

  const render = (
    <React.Fragment>
      <Grid container spacing={16}>
        {
          !isLoading &&
          response &&
          response.data &&
          RenderTypes(response.data)
        }
      </Grid>
    </React.Fragment>
  );
  
  return render;
};
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ItemFormProps } from '@mileage/components/request/editor/forms/MileageRequestItemForm';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { ITimesheetMileages } from '@timesheet/classes/response/ITimesheetMileages';
import * as React from 'react';

export const MileageRequestItemFormView: React.SFC<ItemFormProps> = props => {
  const { isLoading, response, isExpired } = props.timesheetMileagesState;
  const { intl, active, isExpanded, handleToggle } = props;

  const renderItem = (items: ITimesheetMileages[]) => {
    const len = items.length - 1;

    return (
      <List>
        {items.map((item, i) => (
          <div key={i}>
            <Divider />
            <ListItem
              button
              selected={item.uid === active && isExpanded}
              onClick={() => handleToggle(item.uid)}
            >
              <ListItemText 
                primary={item.customer && item.customer.name}
                secondary={item.value}
              />
              <ListItemSecondaryAction>
                {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemSecondaryAction>
            </ListItem>
            {len !== i && <Divider />}             
            <Collapse
              in={active === item.uid && isExpanded}
              className={props.classes.paddingFar}
              timeout="auto"
              unmountOnExit
            >
              <TextField 
                {...GlobalStyle.TextField.ReadOnly}
                margin="dense"
                label={intl.formatMessage(mileageMessage.request.field.itemProject)}
                value={`${item.projectUid} - ${item.project && item.project.name}`}
              />
              <TextField 
                {...GlobalStyle.TextField.ReadOnly}
                margin="dense"
                label={intl.formatMessage(mileageMessage.request.field.itemSite)}
                value={item.site && item.site.name}
              />
              <TextField 
                {...GlobalStyle.TextField.ReadOnly}
                margin="dense"
                label={intl.formatMessage(mileageMessage.request.field.itemDate)}
                value={intl.formatDate(item.date, GlobalFormat.Date)}
              />
            </Collapse>
          </div>
        ))}
      </List>
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(mileageMessage.request.field.itemTitle)}
        subheader={
          props.formikBag &&
          props.formikBag.submitCount > 0 &&
          typeof props.formikBag.errors.items === 'string' &&
          props.formikBag.errors.items
        }
        subheaderTypographyProps={{
          color: 'error',
          variant: 'body1'
        }}
      />
      {isLoading &&
        <CardContent>
          <Typography variant="body2">
            {props.intl.formatMessage(layoutMessage.text.loading)}
          </Typography>
        </CardContent>
      }
      {!isLoading &&
        (isExpired || !response ||
          (response.data && response.data.length < 1)) && (
          <CardContent>
            <Typography variant="body2">
              {intl.formatMessage(mileageMessage.request.field.noData)}
            </Typography>
          </CardContent>
        )}
      {!isLoading &&
        !isExpired &&
        response &&
        response.data &&
        renderItem(response.data)}
    </Card>
  );

  return render;
};

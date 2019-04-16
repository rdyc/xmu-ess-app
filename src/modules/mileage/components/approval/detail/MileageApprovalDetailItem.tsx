import { WorkflowStatusType } from '@common/classes/types';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { IMileageRequestItem } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  items?: IMileageRequestItem[];
  ItemUids: string[];
  onChecked: (itemUid: string) => void;
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type MileageApprovalDetailItemProps 
  = IOwnProps 
  & IOwnState 
  & IOwnStateHandler 
  & InjectedIntlProps;

const createProps: mapper<MileageApprovalDetailItemProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<MileageApprovalDetailItemProps, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const mileageApprovalDetailItem: React.SFC<MileageApprovalDetailItemProps> = props => {
  const { items, active, isExpanded, intl, onChecked: handleCheckbox, ItemUids, handleToggle } = props;
  const len = items && items.length - 1;

  const isChecked = (mileageItemUid: string) => {
    const _mileageItemUids = new Set(ItemUids);
    return _mileageItemUids.has(mileageItemUid);
  };

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(mileageMessage.request.field.itemTitle)}
        subheader={intl.formatMessage(
          mileageMessage.request.field.itemSubHeader
        )}
      />
      <CardContent>
        <List>
          {
            items &&
            items.map((item, index) =>
              <React.Fragment key={item.uid}>
                <ListItem 
                  disableGutters
                  button
                  selected={item.uid === active && isExpanded}
                >
                  {item.status &&
                    item.status.type === WorkflowStatusType.Submitted && (
                      <Checkbox
                        key={item.uid}
                        onChange={() => handleCheckbox(item.uid)}
                        checked={isChecked(item.uid)}
                      />
                  )}
                  <div onClick={() => handleToggle(item.uid)}>
                    <ListItemText 
                      primary={intl.formatDate(item.date, GlobalFormat.Date)} 
                      secondary={`${item.status && item.status.value} - ${intl.formatNumber(Number(item.amount), GlobalFormat.CurrencyDefault)}`}
                    />
                    <ListItemSecondaryAction>
                      {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemSecondaryAction>
                  </div>
                </ListItem>
                {len !== index && <Divider />}                
                <Collapse
                  in={active === item.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={intl.formatMessage(mileageMessage.request.field.itemUid)}
                    value={item.uid}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={intl.formatMessage(mileageMessage.request.field.itemStatus)}
                    value={item.status ? item.status.value : 'N/A'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={intl.formatMessage(mileageMessage.request.field.itemDate)}
                    value={intl.formatDate(item.date, GlobalFormat.Date)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={intl.formatMessage(mileageMessage.request.field.itemCustomer)}
                    value={item.customer ? item.customer.name : 'N/A'}
                  />
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
                    value={item.site ? item.site.name : 'N/A'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={intl.formatMessage(mileageMessage.request.field.itemValue)}
                    value={intl.formatNumber(Number(item.amount), GlobalFormat.CurrencyDefault)}
                  />
                  {isExpanded && <Divider />}
                </Collapse>
              </React.Fragment>
            )
          }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};

export const MileageApprovalDetailItem = compose<MileageApprovalDetailItemProps, IOwnProps>(
  injectIntl,
  withStateHandlers(createProps, stateUpdaters)
)(mileageApprovalDetailItem);

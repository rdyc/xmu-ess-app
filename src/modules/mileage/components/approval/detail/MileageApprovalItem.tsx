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

interface OwnProps {
  items: IMileageRequestItem[] | null | undefined;
  handleCheckbox: (ItemUid: string) => void;
  ItemUids: string[];
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (uid: string) => OwnState;
}

type AllProps = OwnProps & OwnState & OwnStateHandler & InjectedIntlProps;

const createProps: mapper<AllProps, OwnState> = (): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const mileageApprovalItem: React.SFC<AllProps> = props => {
  const { items, active, isExpanded, intl, handleCheckbox, ItemUids, handleToggle } = props;
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
                {len !== index && !isExpanded && <Divider />}                
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

export const MileageApprovalItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(mileageApprovalItem);

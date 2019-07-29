import { IHRTemplateItem } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  items: IHRTemplateItem[] | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (uid: string) => OwnState;
}

type AllProps
  = OwnProps
  & OwnState
  & OwnStateHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

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

const hrTemplateItem: React.SFC<AllProps> = props => {
  const { items, intl, active, isExpanded, handleToggle } = props;
  const len = items && items.length - 1;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.template.section.itemTitle)}
      />
      <List>
        {
          items &&
          items.map((item, index) =>
            <React.Fragment key={item.uid}>
              <Divider />
              <ListItem
                button
                selected={item.uid === active && isExpanded}
                onClick={() => handleToggle(item.uid)}
              >
                <ListItemText 
                  primary={item.category && item.category.value} 
                  // secondary={item.target}
                />
                <ListItemSecondaryAction>
                  {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              {len !== index && <Divider />}                
              <Collapse
                in={active === item.uid && isExpanded}
                className={props.classes.paddingFar}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.template.field.itemUid)}
                  value={item.uid}
                />
                <TextField
                  multiline
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.template.field.category)}
                  value={item.category ? item.category.value : 'N/A'}
                />
                <TextField
                  multiline
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.template.field.target)}
                  value={item.target}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.template.field.weight)}
                  value={item.weight}
                />
                <Divider />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.measurement.field.uid)}
                  value={item.measurementUid}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  multiline
                  label={intl.formatMessage(hrMessage.measurement.field.measurementType)}
                  value={item.measurement && item.measurement.measurement && `${item.measurement.measurementType} - ${item.measurement.measurement.value}` || 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  multiline
                  label={intl.formatMessage(hrMessage.measurement.field.description)}
                  value={item.measurement && item.measurement.description || 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.measurement.field.weight)}
                  value={item.weight}
                />
              </Collapse>
            </React.Fragment>
          )
        }
      </List>
    </Card>
  );

  return render;
};

export const HRTemplateItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(hrTemplateItem);
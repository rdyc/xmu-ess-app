import { IHrCategoryItem } from '@hr/classes/response';
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
  items: IHrCategoryItem[];
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

const hrCompetencyClusterCategory: React.SFC<AllProps> = props => {
  const { items, intl, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.competency.field.competencies)}
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
                  primary={item.name}
                />
                <ListItemSecondaryAction>
                  {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse
                in={active === item.uid && isExpanded}
                className={props.classes.marginFar}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.competency.field.name)}
                  value={item.name}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  multiline
                  margin="dense"
                  label={intl.formatMessage(hrMessage.competency.field.description)}
                  value={item.description}
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

export const HrCompetencyClusterCategory = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrCompetencyClusterCategory);
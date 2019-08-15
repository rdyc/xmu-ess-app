import { IHrCompetencyCategoryDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
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
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data: IHrCompetencyCategoryDetail;
}

interface IOwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnState
  & IOwnProps
  & IOwnStateHandler
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const hrCompetencyCategoryLevel: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Category'})}
      />
      {
        data.levels.length === 0 ?
        <CardContent>
          <Typography>
            {props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'level'})}
          </Typography>
        </CardContent>
        :
        <List>
          {
            data.levels.map((level) => 
              <React.Fragment key={level.uid}>
                <Divider />
                <ListItem
                  button
                  selected={level.uid === active && isExpanded}
                  onClick={() => handleToggle(level.uid)}
                >
                  <ListItemText primary={level.level}/>
                  <ListItemSecondaryAction>
                    {active === level.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                  in={active === level.uid && isExpanded}
                  className={props.classes.marginFar}
                  timeout="auto"
                  unmountOnExit
                >
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'})}
                    value={level.level}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    multiline
                    margin="dense"
                    label={props.intl.formatMessage(hrMessage.competency.field.description)}
                    value={level.description}
                  />
                  {
                    level.indicators.map((indicator, indicatorIndex) => 
                      <TextField
                        {...GlobalStyle.TextField.ReadOnly}
                        key={indicator.uid || indicatorIndex}
                        multiline
                        margin="dense"
                        label={`${props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Indicator'})} - ${indicatorIndex + 1}`}
                        value={indicator.description}
                      />  
                    ) 
                  }
                </Collapse>
              </React.Fragment>  
            )
          }
        </List>
      }
    </Card>
  );

  return render;
};

export const HrCompetencyCategoryLevel = compose<AllProps,  IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrCompetencyCategoryLevel);
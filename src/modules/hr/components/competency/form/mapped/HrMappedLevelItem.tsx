import { IHrCompetencyClusterList, IHrCompetencyIndicatorList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography, withStyles, WithStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { IMappedFormValue } from './HrCompetencyMappedForm';

interface IOwnProps {
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
  data: IHrCompetencyClusterList[];
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false,
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  }),
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const hrMappedLevelItem: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, formikBag, data, handleToggle } = props;
  const findCluster = data.find(item => item.uid === formikBag.values.activeCluster);
  const findCategory = findCluster && findCluster.categories.find(item => item.uid === formikBag.values.activeCategory);

  const handleIndicators = (indicators: IHrCompetencyIndicatorList[]) => {
    const temp: string[] = [];
    indicators.map(item => {
      temp.push(`${item.description} \n`);
    });

    return temp.join('\n');
  };
  
  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Level'})}
      />
        <List>
          {
            findCluster &&
            findCategory &&
            findCategory.levels.map((level) =>
              <React.Fragment key={level.uid}>
                <Divider />
                <ListItem
                  button
                  selected={level.uid === active && isExpanded}
                  onClick={() => handleToggle(level.uid)}
                >
                  <ListItemText primary={`${level.level} - ${level.description}`}/>
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
                    label={props.intl.formatMessage(hrMessage.competency.field.level)}
                    value={level.level}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    multiline
                    margin="dense"
                    label={props.intl.formatMessage(hrMessage.competency.field.description)}
                    value={level.description}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    multiline
                    margin="dense"
                    label={props.intl.formatMessage(hrMessage.competency.field.indicator)}
                    value={handleIndicators(level.indicators)}
                  />
                </Collapse>
              </React.Fragment>
            )
          }
          {
            (!findCluster || !findCategory) &&
            <CardContent>
              <Typography>
                {props.intl.formatMessage(hrMessage.competency.field.type, {state: 'No category is picked'})}
              </Typography>
            </CardContent>
          }
        </List>
    </Card>
  );

  return render;
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidUpdate() {
    // 
  }
};

export const HrMappedLevelItem = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycleFunctions),
)(hrMappedLevelItem);
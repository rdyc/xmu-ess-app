import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { IMappedFormValue } from './HrCompetencyMappedForm';

interface IOwnOption {
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
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
  & IOwnOption
  & IOwnStateHandler
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

const hrCompetencyMappedSummary: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, handleToggle, intl, formikBag } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(hrMessage.competency.field.type, {state: 'Category Summary'})}
      />
      <List>
        {
          formikBag.values.categories.map((item) => 
            item.parentUid === '' &&
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
                timeout="auto"
                unmountOnExit
              >
                {
                  formikBag.values.categories.map((child) =>
                    child.parentUid === item.uid &&
                    child.isAccess &&
                      <ListItem
                        key={child.uid}
                        color="inherit"
                        className={props.classes.marginFarLeft}
                      >
                        <ListItemText
                            primary={child.name}
                            primaryTypographyProps={{
                              noWrap: true,
                              color: 'inherit'
                            }}
                        />
                      </ListItem>
                  )
                }
              </Collapse>
            </React.Fragment>
          )
        }
      </List>
    </Card>
  );

  return render;
};

export const HrCompetencyMappedSummary = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrCompetencyMappedSummary);
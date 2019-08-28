import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IMappedFormValue } from './HrCompetencyMappedForm';

interface IOwnProps {
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
}

interface IOwnHandler {
  // 
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  // 
};

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

const hrMappedCategoriesItem: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, formikBag} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Categories'})}
      />
        {
          formikBag.values.categories.length > 0 && (
            <List>
              <FieldArray 
                name="categories"
                render={(fields: FieldArrayRenderProps) => 
                  formikBag.values.categories.map((parent, idxParent) => (
                    <React.Fragment key ={idxParent}>
                      <Divider />
                      <ListItem
                        button
                        disableGutters
                        onClick={() => props.handleToggle(parent.uid)}
                        selected={parent.uid === active && isExpanded}
                      >
                        <Field 
                          name={`categories.${idxParent}.checked`}
                          className={props.classes.marginFarLeft}
                          render={({ field }: FieldProps<IMappedFormValue>) => (
                            <Checkbox 
                              {...field}
                              value={parent.uid}
                              checked={parent.checked}
                              disabled={props.formikBag.isSubmitting}
                              onChange={() => {
                                // set check
                                formikBag.setFieldValue(`categories.${idxParent}.checked`, !parent.checked);
                              }}
                              style={{
                                height: 10,
                                width: 10,
                                marginRight: 5,
                                marginLeft: 20,
                              }}
                            />
                          )}
                        />
                        <ListItemText primary={parent.name}/>
                        <ListItemSecondaryAction>
                          {active === parent.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItemSecondaryAction>
                      </ListItem>        
                      <Collapse
                        in={active === parent.uid && isExpanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        {
                          parent.child.map((child, idxChild) => 
                              <ListItem
                                key={idxChild}
                                color="inherit"
                                className={props.classes.marginWideLeft}
                              >
                                <ListItemText 
                                  style={{paddingLeft: '30px', paddingRight: '8px'}}
                                  primary={child.name} 
                                />
                                {/* <Badge color="primary" badgeContent={4}>
                                  <ListItemText 
                                    style={{paddingLeft: '30px', paddingRight: '8px'}}
                                    primary={child.name} 
                                  />
                                </Badge> */}
                                <ListItemSecondaryAction>
                                  {/* <IconButton aria-label="Delete">
                                    <MoreVertIcon />
                                  </IconButton> */}
                                  {/* <TextField
                                    label="Level"
                                    margin="normal"
                                    variant="outlined"
                                  /> */}
                                </ListItemSecondaryAction>
                              </ListItem>
                          )
                        }
                      </Collapse>
                    </React.Fragment>
                  ))
                }
              />
            </List>
          )
        }        
    </Card>
  );

  return render;
};

export const HrMappedCategoriesItem = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(hrMappedCategoriesItem);
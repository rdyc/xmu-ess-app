import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, Collapse, FormControlLabel, List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Field } from 'redux-form';
import { LookupRoleMenuFormProps } from './LookupRoleMenuForm';

export const LookupRoleMenuFormView: React.SFC<LookupRoleMenuFormProps> = props => {
  const { isLoading, response } = props.lookupMenuState.list;
  const { active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.role.section.roleMenuTitle)}
        subheader={props.intl.formatMessage(lookupMessage.role.section.roleMenuSubHeader)}
      />
      <CardContent>
        <List>
          {
            !isLoading &&
            response &&
            response.data &&
            response.data.map((parent, index) => {
              return (
                (!parent.parentUid) &&
                <div key={index}>
                  <ListItem
                    button
                    onClick={() => handleToggle(parent.uid)}
                  >
                    <FormControlLabel
                      label={parent.name}
                      control={
                        <Field
                          type="checkbox"
                          name={`[${index}].${parent.name}`}
                          component={
                            ({ input, meta }: any) => (
                              <Checkbox
                                {...input}
                                value={parent.uid}
                                disabled={meta.submitting}
                                onFocus={undefined}
                                onBlur={undefined}
                                style={{
                                  height: 10,
                                  width: 10,
                                  marginRight: 10,
                                  marginLeft: -10,
                                }}
                              />
                            )
                          }
                        />
                      }
                    />
                    <ListItemSecondaryAction>
                      {active === parent.uid && isExpanded ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse
                    in={active === parent.uid && isExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    {
                      !isLoading &&
                      response &&
                      response.data &&
                      response.data.map(child => (child.parentUid === parent.uid) &&
                        <ListItem
                          button
                          color={'inherit'}
                          className={props.classes.marginFarLeft}
                        >
                          <FormControlLabel
                            label={child.name}
                            control={
                              <Field
                                type="checkbox"
                                name={`[${index}].${child.name}`}
                                component={
                                  ({ input, meta }: any) => (
                                    <Checkbox
                                      {...input}
                                      value={child.uid}
                                      disabled={meta.submitting}
                                      onFocus={undefined}
                                      onBlur={undefined}
                                      style={{
                                        height: 10,
                                        width: 10,
                                        marginLeft: 10,
                                        marginRight: 10
                                      }}
                                    />
                                  )
                                }
                              />
                            }
                          />
                        </ListItem>
                      )
                    }
                  </Collapse>
                </div>
              );
            })
          }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};
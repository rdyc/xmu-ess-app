import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Field } from 'redux-form';
import { LookupRoleMenuFormProps } from './LookupRoleMenuForm';

export const LookupRoleMenuFormView: React.SFC<LookupRoleMenuFormProps> = props => {
  const { isLoading, response } = props.lookupMenuState.list;
  const { active, isExpanded, handleToggle, handleCheck, menus } = props;

  const isChecked = (uid: string) => {
    const _menus = new Set(menus);

    return _menus.has(uid);
  };

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.role.section.roleMenuTitle)}
      // subheader={props.intl.formatMessage(lookupMessage.role.section.roleMenuSubHeader)}
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
                    disableGutters
                    selected={parent.uid === active && isExpanded}
                  >
                    <Field
                      type="checkbox"
                      name={`menus[${index}].${parent.uid}`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox
                            {...input}
                            value={parent.uid}
                            onChange={() => handleCheck(parent.uid, undefined)}
                            checked={isChecked(parent.uid)}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                            style={{
                              height: 10,
                              width: 10,
                              marginRight: 5,
                              marginLeft: 5,
                            }}
                          />
                        )
                      }
                    />

                    <ListItemText
                      primary={parent.name}
                      onClick={() => handleToggle(parent.uid)}
                    />
                    <Divider />
                    <ListItemSecondaryAction>
                      {active === parent.uid && isExpanded ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
                    </ListItemSecondaryAction>

                  </ListItem>
                  <Divider />
                  <Collapse
                    in={active === parent.uid && isExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    {
                      !isLoading &&
                      response &&
                      response.data &&
                      response.data.map((child, index2) => (child.parentUid === parent.uid) &&
                        <div key={index2}>
                          <ListItem
                            color={'inherit'}
                            className={props.classes.marginFarLeft}
                            button
                            style={{
                              marginLeft: 0,
                              marginRight: 10
                            }}
                          >
                            <Field
                              type="checkbox"
                              name={`menus[${index2}].${child.uid}`}
                              component={
                                ({ input, meta }: any) => (
                                  <Checkbox
                                    {...input}
                                    value={child.uid}
                                    onChange={child.parentUid && (() => handleCheck(child.parentUid, child.uid))}
                                    checked={isChecked(child.uid)}
                                    disabled={meta.submitting}
                                    onFocus={undefined}
                                    onBlur={undefined}
                                    style={{
                                      height: 10,
                                      width: 10,
                                      marginLeft: 5,
                                      marginRight: 5
                                    }}
                                  />
                                )
                              }
                            />
                            <ListItemText
                              primary={child.name}
                            />
                          </ListItem>
                        </div>
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
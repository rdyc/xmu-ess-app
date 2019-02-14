import { IMenuList } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Field } from 'redux-form';
import { LookupRoleMenuFormProps } from './LookupRoleMenuForm';

export const LookupRoleMenuFormView: React.SFC<LookupRoleMenuFormProps> = props => {
  const { isLoading, response } = props.lookupMenuState.list;
  const { active, isExpanded, handleToggle, handleCheckParent, handleCheckChild, check } = props;

  const isChecked = (uid: string) => {
    const _check = new Set(check);
    return _check.has(uid);
  };

  const renderMenu = (data: IMenuList[]) => {
    return ( 
      data && data.map((parent, index) =>
        !parent.parentUid &&
        (
          <React.Fragment key={index}>
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
                      onChange={() => handleCheckParent(parent.uid)}
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
              <div onClick={() => handleToggle(parent.uid)}>
              <ListItemText primary={parent.name}/>
              <ListItemSecondaryAction>
                {active === parent.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemSecondaryAction>
              </div>
            </ListItem>
            <Divider />  
            <Collapse
              in={active === parent.uid && isExpanded}
              timeout="auto"
              unmountOnExit
            >
              {
                data.map((child, index2) => (child.parentUid === parent.uid) &&
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
                              onChange={() => handleCheckChild(child.uid, child.parentUid)}
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
                      <ListItemText primary={child.name}/>
                    </ListItem>
                  </div>
                )
              }
            {isExpanded && <Divider />}
            </Collapse>
          </React.Fragment>
        )
      ) 
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.role.section.roleMenuTitle)}
      />
      <CardContent>
        <List>
          {
            !isLoading &&
            response &&
            response.data &&
            renderMenu(response.data)
          }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};
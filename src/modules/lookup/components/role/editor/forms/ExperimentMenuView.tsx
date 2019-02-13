import { IMenuList } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import * as React from 'react';
import { ExperimentMenuProps } from './ExperimentMenu';

export const ExperimentMenuView: React.SFC<ExperimentMenuProps> = props => {
  const { active, isExpanded, handleToggle, handleCheckbox, check } = props;
  const { isLoading, response } = props.lookupMenuState.list;

  const isChecked = (uid: string) => {
    const _check = new Set(check);
    return _check.has(uid);
  };

  const renderMenu = (data: IMenuList[]) => {
    const len = data && data.length - 1;

    return (
      data && data.map((parent, idxParent) => 
        !parent.parentUid &&
        (
          <React.Fragment key={idxParent}>
          <ListItem
            disableGutters
            button
            selected={parent.uid === active && isExpanded}
          >
            <Checkbox 
              key={parent.uid}
              onChange={() => handleCheckbox(parent.uid, parent.parentUid)}
              checked={isChecked(parent.uid)}
              style={{
                height: 10
              }}
            />
            <div onClick={() => handleToggle(parent.uid)}>
              <ListItemText primary={parent.name}/>
              <ListItemSecondaryAction>
                {active === parent.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemSecondaryAction>
            </div>
          </ListItem>
          {len !== idxParent && <Divider />}                
          <Collapse
            in={active === parent.uid && isExpanded}
            timeout="auto"
            unmountOnExit
          >
            {
              data.map((child, idxChild) => 
                child.parentUid === parent.uid &&
                (
                  <div key={idxChild}>
                    <ListItem
                      color={'inherit'}
                      className={props.classes.marginFarLeft}
                      button
                      style={{
                        marginLeft: 0,
                        marginRight: 10
                      }}
                    >
                      <Checkbox 
                        key={child.uid}
                        onChange={() => handleCheckbox(child.uid, child.parentUid)}
                        checked={isChecked(child.uid)}
                        style={{
                          height: 10,
                          width: 10,
                          marginRight: 5,
                          marginLeft: 5,
                        }}
                      />
                      <ListItemText primary={child.name}/>
                    </ListItem>
                  </div>
                )
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
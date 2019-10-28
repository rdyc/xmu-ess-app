import AppMenu from '@constants/AppMenu';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { compose, HandleCreators, withHandlers } from 'recompose';

import { Forbidden } from '../base/Forbidden';

interface IOwnOption extends RouteProps {
  menu: AppMenu;
  subMenu: AppMenu;
}

interface IOwnHandler {
  onChecking: () => boolean;
}

type SecureMenuRouteProps
  = IOwnOption
  & IOwnHandler
  & WithUser;

const handlerCreators: HandleCreators<SecureMenuRouteProps, IOwnHandler> = {
  onChecking: (props: SecureMenuRouteProps) => () => {
    const { user } = props.userState;

    let result = false;
    
    if (user && user.menus) {
      const menu = user.menus.find(item => item.uid === props.menu);

      if (menu) {
        if (menu.uid === AppMenu.WebJob) {
          result = true;
        } else {
          if (menu.childs) {
            result = menu.childs.findIndex(item => item.uid === props.subMenu) > -1;
          }
        }
      }
    }

    return result;
  }
};

const SecureMenuRouteView: React.ComponentType<SecureMenuRouteProps> = props => (
  <Route {...props} component={props.onChecking() ? props.component : Forbidden} />
);

export const SecureMenuRoute = compose<SecureMenuRouteProps, IOwnOption>(
  withUser,
  withHandlers(handlerCreators)
)(SecureMenuRouteView);
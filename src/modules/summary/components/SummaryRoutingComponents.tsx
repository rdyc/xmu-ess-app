import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import { Billable } from '@summary/components/billable/Billable';
import { Effectiveness } from '@summary/components/effectiveness/Effectiveness';
import { Profitability } from '@summary/components/profitability/Profitability';
import { Progress } from '@summary/components/progress/Progress';
import { WinningRatio } from '@summary/components/winningRatio/WinningRatio';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { ResourceMapping } from './projectResourceMapping/ResourceMapping';

export const SummaryRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/billable`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportBillable} 
      component={Billable} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/effectiveness`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportEffectiveness} 
      component={Effectiveness} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/winningratio`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportWinningRatio} 
      component={WinningRatio} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/profitability`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportProfitability} 
      component={Profitability} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/progress`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportProgress} 
      component={Progress} 
    />
    <Route path={`${props.match.path}/resourcemapping`} component={ResourceMapping}  />
    {/* <SecureMenuRoute 
      path={`${props.match.path}/resourcemapping`}
      menu={AppMenu.Report} 
      subMenu={AppMenu.ReportWinningRatio} 
      component={ResourceMapping} 
    /> */}
  </Switch>
);

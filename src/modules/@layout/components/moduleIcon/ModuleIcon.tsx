import AppMenu from '@constants/AppMenu';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import HomeIcon from '@material-ui/icons/Home';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WeekendIcon from '@material-ui/icons/Weekend';
import * as React from 'react';

interface ModuleIconProps {
  module: AppMenu | string;
}

export const ModuleIcon: React.ComponentType<ModuleIconProps> = props => {
  switch (props.module) {
    case AppMenu.Home:
      return <HomeIcon/>;

    case AppMenu.Expense:
      return <LocalMallIcon/>;

    case AppMenu.Leave:
      return <WeekendIcon/>;

    case AppMenu.Mileage:
      return <DepartureBoardIcon/>;

    case AppMenu.Account:
      return <PersonPinIcon/>;

    case AppMenu.ProjectAssignment:
      return <AssignmentIcon/>;

    case AppMenu.ProjectRegistration:
      return <NextWeekIcon/>;

    case AppMenu.Report:
      return <ReceiptIcon/>;

    case AppMenu.Lookup:
      return <SettingsIcon/>;

    case AppMenu.Timesheet:
      return <AlarmOnIcon/>;

    case AppMenu.Travel:
      return <FlightTakeOffIcon/>;
    
    case AppMenu.Purchase:
      return <ShoppingCartIcon/>;

    case AppMenu.Finance:
      return <LocalAtmIcon/>;
  
    default:
      return <HomeIcon/>;
  }
};
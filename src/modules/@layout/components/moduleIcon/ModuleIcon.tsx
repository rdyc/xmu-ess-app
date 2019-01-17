import AppMenu from '@constants/AppMenu';
import { ModuleDefinition } from '@layout/helper/redirector';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
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
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import WeekendIcon from '@material-ui/icons/Weekend';
import * as React from 'react';

interface ModuleIconProps {
  module: AppMenu | ModuleDefinition | string;
  innerProps?: SvgIconProps;
}

export const ModuleIcon: React.ComponentType<ModuleIconProps> = props => {
  switch (props.module) {
    case AppMenu.Home:
      return <HomeIcon {...props.innerProps} />;

    case AppMenu.Expense:
    case ModuleDefinition.Expense:
      return <LocalMallIcon {...props.innerProps} />;

    case AppMenu.Leave:
    case ModuleDefinition.Leave:
      return <WeekendIcon {...props.innerProps} />;

    case AppMenu.Mileage:
    case ModuleDefinition.Mileage:
      return <DepartureBoardIcon {...props.innerProps} />;

    case AppMenu.Account:
      return <PersonPinIcon {...props.innerProps} />;

    case AppMenu.ProjectAssignment:
    case ModuleDefinition.ProjectAssignment:
      return <AssignmentIcon {...props.innerProps} />;

    case AppMenu.ProjectRegistration:
    case ModuleDefinition.ProjectRegistration:
      return <NextWeekIcon {...props.innerProps} />;

    case AppMenu.Report:
      return <ReceiptIcon {...props.innerProps} />;

    case AppMenu.Lookup:
      return <SettingsIcon {...props.innerProps} />;

    case AppMenu.Timesheet:
    case ModuleDefinition.Timesheet:
      return <AlarmOnIcon {...props.innerProps} />;

    case AppMenu.Travel:
    case ModuleDefinition.Travel:
    case ModuleDefinition.TravelSettlement:
      return <FlightTakeOffIcon {...props.innerProps} />;
    
    case AppMenu.Purchase:
    case ModuleDefinition.Purchase:
    case ModuleDefinition.PurchaseSettlement:
      return <ShoppingCartIcon {...props.innerProps} />;

    case AppMenu.Finance:
      return <LocalAtmIcon {...props.innerProps} />;
  
    default:
      return <TripOriginIcon {...props.innerProps} />;
  }
};
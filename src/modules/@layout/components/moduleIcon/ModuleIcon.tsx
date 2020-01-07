import AppMenu from '@constants/AppMenu';
import { ModuleDefinitionType } from '@layout/types';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import {
  AlarmOnOutlined,
  AssignmentOutlined,
  DepartureBoardOutlined,
  FindReplaceOutlined,
  FlightTakeoffOutlined,
  HomeOutlined,
  LocalAtmOutlined,
  LocalMallOutlined,
  NextWeekOutlined,
  PersonPinOutlined,
  ReceiptOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  SupervisedUserCircleOutlined,
  TripOriginOutlined,
  WeekendOutlined,
} from '@material-ui/icons';
import * as React from 'react';

interface ModuleIconProps {
  module: AppMenu | ModuleDefinitionType | string;
  innerProps?: SvgIconProps;
}

export const ModuleIcon: React.ComponentType<ModuleIconProps> = props => {
  switch (props.module) {
    case AppMenu.Home:
      return <HomeOutlined {...props.innerProps} />;

    case AppMenu.Expense:
    case ModuleDefinitionType.Expense:
      return <LocalMallOutlined {...props.innerProps} />;

    case AppMenu.Leave:
    case ModuleDefinitionType.Leave:
      return <WeekendOutlined {...props.innerProps} />;

    case AppMenu.Mileage:
    case ModuleDefinitionType.Mileage:
      return <DepartureBoardOutlined {...props.innerProps} />;

    case AppMenu.Account:
      return <PersonPinOutlined {...props.innerProps} />;

    case AppMenu.ProjectAssignment:
    case ModuleDefinitionType.ProjectAssignment:
      return <AssignmentOutlined {...props.innerProps} />;

    case AppMenu.ProjectRegistration:
    case ModuleDefinitionType.ProjectRegistration:
      return <NextWeekOutlined {...props.innerProps} />;

    case AppMenu.Report:
      return <ReceiptOutlined {...props.innerProps} />;

    case AppMenu.Lookup:
      return <SettingsOutlined {...props.innerProps} />;

    case AppMenu.Timesheet:
    case ModuleDefinitionType.Timesheet:
      return <AlarmOnOutlined {...props.innerProps} />;

    case AppMenu.Travel:
    case ModuleDefinitionType.Travel:
    case ModuleDefinitionType.TravelSettlement:
      return <FlightTakeoffOutlined {...props.innerProps} />;
    
    case AppMenu.Purchase:
    case ModuleDefinitionType.Purchase:
    case ModuleDefinitionType.PurchaseSettlement:
      return <ShoppingCartOutlined {...props.innerProps} />;

    case AppMenu.Finance:
      return <LocalAtmOutlined {...props.innerProps} />;
  
    case AppMenu.HumanResource:
    case ModuleDefinitionType.Assessment:
      return <SupervisedUserCircleOutlined {...props.innerProps} />;
      
    case AppMenu.WebJob:
      return <FindReplaceOutlined {...props.innerProps} />;

    default:
      return <TripOriginOutlined {...props.innerProps} />;
  }
};
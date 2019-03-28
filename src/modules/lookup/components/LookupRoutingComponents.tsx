import AppMenu from '@constants/AppMenu';
import COGSUploadEditor from '@infor/components/editor/COGSUploadEditor';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import { CurrencyDetail } from '@lookup/components/currency/detail/CurrencyDetail';
import { CurrencyEditor } from '@lookup/components/currency/editor/CurrencyEditor';
import { CurrencyList } from '@lookup/components/currency/list/CurrencyList';
import { LookupHolidayDetail } from '@lookup/components/holiday/detail/LookupHolidayDetail';
import { LookupLeaveDetail } from '@lookup/components/leave/detail/LookupLeaveDetail';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { AchievementEditor } from './achievement/AchievementEditor';
import { LookupCompanyDetail } from './company/detail/LookupCompanyDetail';
import LookupCompanyEditor from './company/editor/LookupCompanyEditor';
import { LookupCompanyList } from './company/list/LookupCompanyList';
import { LookupCustomerDetail } from './customer/detail/LookupCustomerDetail';
import LookupCustomerEditor from './customer/editor/LookupCustomerEditor';
import { LookupCustomerList } from './customer/list/LookupCustomerList';
import { LookupDiemDetail } from './diem/detail/LookupDiemDetail';
import LookupDiemEditor from './diem/editor/LookupDiemEditor';
import { LookupDiemList } from './diem/list/LookupDiemList';
import { AnnouncementEditor } from './gallery/announcement/AnnouncementEditor';
import GalleryEditor from './gallery/editor/GalleryEditor';
import { ImageGalleryList } from './gallery/list/ImageGalleryList';
import LookupHolidayEditor from './holiday/editor/LookupHolidayEditor';
import { LookupHolidayList } from './holiday/list/LookupHolidayList';
import { LeaveCalculationList } from './leave/calculation/LeaveCalculationList';
import LookupLeaveEditor from './leave/editor/LookupLeaveEditor';
import { LookupLeaveList } from './leave/list/LookupLeaveList';
import { LookupMileageExceptionDetail } from './mileageException/detail/LookupMileageExceptionDetail';
import MileageExceptionEditor from './mileageException/editor/MileageExceptionEditor';
import { LookupMileageExceptionList } from './mileageException/list/LookupMileageExceptionList';
import { PositionDetail } from './position/detail/PositionDetail';
import { PositionEditor } from './position/editor/PositionEditor';
import { PositionList } from './position/list/PositionList';
import { LookupRoleDetail } from './role/detail/LookupRoleDetail';
import LookupRoleEditor from './role/editor/LookupRoleEditor';
import { LookupRoleList } from './role/list/LookupRoleList';
import { LookupSystemLimitDetail } from './systemLimit/detail/LookupSystemLimitDetail';
// import { SystemLimitForm } from './systemLimit/form/LookupSystemLimitForm';
import LookupSystemLimitEditor from './systemLimit/editor/LookupSystemLimitEditor';
import { LookupSystemLimitList } from './systemLimit/list/LookupSystemLimitList';

const role = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupRoleEditor} />
    <Route path={`${props.match.path}/:roleUid`} component={LookupRoleDetail} />
    <Route path={`${props.match.path}`} component={LookupRoleList} />
  </Switch>
);

const company = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupCompanyEditor} />
    <Route path={`${props.match.path}/:companyUid`} component={LookupCompanyDetail} />
    <Route path={`${props.match.path}`} component={LookupCompanyList} />
  </Switch>
);
const currency = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={CurrencyEditor} />
    <Route path={`${props.match.path}/:currencyUid`} component={CurrencyDetail} />
    <Route path={`${props.match.path}`} component={CurrencyList} />
  </Switch>
);

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={MileageExceptionEditor} />
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={LookupMileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={LookupMileageExceptionList} />
  </Switch>
);

const holiday = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupHolidayEditor} />
    <Route path={`${props.match.path}/:holidayUid`} component={LookupHolidayDetail} />
    <Route path={`${props.match.path}`} component={LookupHolidayList} />
  </Switch>
);

const leave = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupLeaveEditor} />
    <Route path={`${props.match.path}/:leaveUid`} component={LookupLeaveDetail} />
    <Route path={`${props.match.path}`} component={LookupLeaveList} />
  </Switch>
);

const calculation = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={LeaveCalculationList} />
  </Switch>
);

const systemLimit = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupSystemLimitEditor} />
    <Route path={`${props.match.path}/:systemLimitUid`} component={LookupSystemLimitDetail} />
    <Route path={`${props.match.path}`} component={LookupSystemLimitList} />
  </Switch>
);

const position = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={PositionEditor} />
    <Route path={`${props.match.path}/:companyUid/:positionUid`} component={PositionDetail} />
    <Route path={`${props.match.path}`} component={PositionList} />
  </Switch>
);

const lookupCustomer = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupCustomerEditor} />
    <Route path={`${props.match.path}/:customerUid`} component={LookupCustomerDetail} />
    <Route path={`${props.match.path}/`} component={LookupCustomerList} />
  </Switch>
);

const diem = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupDiemEditor} />
    <Route path={`${props.match.path}/:diemUid`} component={LookupDiemDetail} />
    <Route path={`${props.match.path}`} component={LookupDiemList} />
  </Switch>
);

const achievement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AchievementEditor} />
  </Switch>
);

const cogsUpload = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={COGSUploadEditor} />
  </Switch>
);

const gallery = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/announcement`} component={AnnouncementEditor} />
    <Route path={`${props.match.path}/form`} component={GalleryEditor} />
    <Route path={`${props.match.path}`} component={ImageGalleryList} />
  </Switch>
);

const employeeLeave = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={LeaveCalculationList} />
  </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/company`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupCompany} 
      component={company} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/systemlimits`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupSystemLimit} 
      component={systemLimit} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/mileageexceptions`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupMileageException} 
      component={mileageException} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/currencies`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupCurrency} 
      component={currency} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/positions`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupPosition} 
      component={position} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/diemvalues`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupDiem} 
      component={diem} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/holidays`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupHoliday} 
      component={holiday} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/leaves`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupLeave} 
      component={leave} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/calculation`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupLeave} 
      component={calculation} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/roles`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupRole} 
      component={role} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/customers`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupCustomer} 
      component={lookupCustomer} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/achievementchart`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.AchievementChart} 
      component={achievement} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/cogsupload`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.COGSUpload} 
      component={cogsUpload} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/imagegalleries`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupGallery} 
      component={gallery} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/employeeleave`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployeeLeave} 
      component={employeeLeave} 
    />
  </Switch>
);
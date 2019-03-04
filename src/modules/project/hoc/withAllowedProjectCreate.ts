import { isMemberOfDirector } from '@account/helper/isMemberOfDirector';
import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { IAppState } from '@generic/interfaces';
import { connect } from 'react-redux';

export interface WithAllowedProjectCreate {
  isAllowedToCreateProject: boolean;
}

const mapStateToProps = ({ user }: IAppState) => {
  const userState = user;
  let isAllowedToCreateProject: boolean = false;

  if (userState.user) {
    const isSales = isMemberOfSales(userState.user.role.uid);
    const isDirector = isMemberOfDirector(userState.user.role.uid);

    if (isSales || isDirector) {
      isAllowedToCreateProject = true;
    }
  }

  return {
    isAllowedToCreateProject
  };
};

export const withAllowedProjectCreate = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
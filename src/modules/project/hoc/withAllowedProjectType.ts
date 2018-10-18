import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { ProjectType } from '@common/classes/types';
import { IAppState } from '@generic/interfaces';
import { connect } from 'react-redux';

export interface WithAllowedProjectType {
  allowedProjectTypes: string[] | undefined;
}

const mapStateToProps = ({ user }: IAppState) => {
  const userState = user;
  let projectTypes: string[] | undefined = undefined;

  if (userState.user) {
    if (isMemberOfSales(userState.user.role.uid)) {
      projectTypes = [
        // fill any project types depend on bussines process
        // at this time, sales only receive 'PS'
        ProjectType.PreSales
      ];
    }
  }

  return {
    allowedProjectTypes: projectTypes
  };
};

export const withAllowedProjectType = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
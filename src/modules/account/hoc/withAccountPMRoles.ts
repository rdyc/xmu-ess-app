import { roleOfPM } from '@account/helper/roleOfPM';
import { connect } from 'react-redux';

export interface WithAccountPMRoles {
  rolePmUids: string[] | undefined;
}

const mapStateToProps = () => {
  const pmRoleUids = roleOfPM();

  return {
    rolePmUids: pmRoleUids.length > 0 ? pmRoleUids : undefined
  };
};

export const withAccountPMRoles = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
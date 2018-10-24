import { roleOfPMO } from '@account/helper/roleOfPMO';
import { connect } from 'react-redux';

export interface WithAccountPMORoles {
  rolePmoUids: string[] | undefined;
}

const mapStateToProps = () => {
  const pmoRoleUids = roleOfPMO();

  return {
    rolePmoUids: pmoRoleUids.length > 0 ? pmoRoleUids : undefined
  };
};

export const withAccountPMORoles = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
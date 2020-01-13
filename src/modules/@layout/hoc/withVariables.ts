import { envHelper, IFieldEnvHelper } from '@utils/envHelper';
import { connect } from 'react-redux';

const hostname: string = document && document.location && document.location.hostname || process.env.REACT_APP_HOST_LOCAL || '';
const roleSales = envHelper(IFieldEnvHelper.RoleIdsSales, hostname);
const rolePMO = envHelper(IFieldEnvHelper.RoleIdsPmo, hostname);

export interface WithVariables {
  roleSalesUids: string[] | undefined;
  rolePMOUids: string[] | undefined;
}

const mapStateToProps = () => {
  // role sales
  let roleSalesUids: string[] | undefined = undefined;

  if (roleSales) {
    roleSalesUids = roleSales.split(' ');
  }

  // role pmo
  let rolePMOUids: string[] | undefined = undefined;

  if (rolePMO) {
    rolePMOUids = rolePMO.split(' ');
  }

  return {
    roleSalesUids,
    rolePMOUids
  };
};

export const withVariables = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
import { connect } from 'react-redux';

const roleSales = process.env.REACT_APP_ROLE_IDS_SALES;
const rolePMO = process.env.REACT_APP_ROLE_IDS_PMO;

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
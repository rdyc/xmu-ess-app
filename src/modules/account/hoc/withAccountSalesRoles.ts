import { roleOfSales } from '@account/helper/roleOfSales';
import { connect } from 'react-redux';

export interface WithAccountSalesRoles {
  roleSalesUids: string[] | undefined;
}

const mapStateToProps = () => {
  const salesRoleUids = roleOfSales();

  return {
    roleSalesUids: salesRoleUids.length > 0 ? salesRoleUids : undefined
  };
};

export const withAccountSalesRoles = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);
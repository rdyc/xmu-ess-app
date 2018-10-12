import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICompanyAllRequest,
        ICompanyByIdRequest,
        ICompanyListRequest,
        ICustomerAllRequest,
        ICustomerByIdRequest,
        ICustomerListRequest,
        IRoleAllRequest, 
        IRoleByIdRequest, 
        IRoleListRequest
      } from '@lookup/classes/queries';
import { ICompany,
        ICompanyDetail,
        ICompanyList,
        ICustomer,
        ICustomerDetail,
        ICustomerList,
        IRole,
        IRoleDetail,
        IRoleList
       } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  roleGetAll: IQueryCollectionState<IRoleAllRequest, IRole>;
  roleGetList: IQueryCollectionState<IRoleListRequest, IRoleList>;
  roleGetById: IQuerySingleState<IRoleByIdRequest, IRoleDetail>;
  companyGetAll: IQueryCollectionState<ICompanyAllRequest, ICompany>;
  companyGetList: IQueryCollectionState<ICompanyListRequest, ICompanyList>;
  companyGetById: IQuerySingleState<ICompanyByIdRequest, ICompanyDetail>;
}
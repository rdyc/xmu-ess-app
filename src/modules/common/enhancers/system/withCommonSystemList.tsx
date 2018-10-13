import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

export type WithCommonSystemList = {
  common: {
    activityListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    currencyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    documentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    documentPresalesListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    projectListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    siteListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  }
};

const mapStateToProps = ({ 
  commonActivityGetList, 
  commonCurrencyGetList, 
  commonDocumentGetList, 
  commonDocumentPresalesGetList, 
  commonProjectGetList,
  commonSiteGetList 
}: IAppState) => ({
  common: {
    activityListState: commonActivityGetList,
    currencyListState: commonCurrencyGetList,
    documentListState: commonDocumentGetList,
    documentPresalesListState: commonDocumentPresalesGetList,
    projectListState: commonProjectGetList,
    siteListState: commonSiteGetList,
  }
});

export default compose<WithCommonSystemList, {}>(
  setDisplayName('WithCommonSystemList'),
  connect(mapStateToProps)
);
import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

export type WithCommonSystemList = {
  common: {
    activityListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    currencyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
    projectListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  }
};

const mapStateToProps = ({ 
  commonActivityGetList, 
  commonCurrencyGetList, 
  commonProjectGetList 
}: IAppState) => ({
  common: {
    activityListState: commonActivityGetList,
    currencyListState: commonCurrencyGetList,
    projectListState: commonProjectGetList,
  }
});

export default compose<WithCommonSystemList, {}>(
  setDisplayName('WithCommonSystemList'),
  connect(mapStateToProps)
);
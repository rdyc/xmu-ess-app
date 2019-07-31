// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   setDisplayName,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
//   shallowEqual,
// } from 'recompose';
// import { HrCompetencyListView } from './HrCompetencyListView';
// import { ICollectionValue } from '@layout/classes/core';
// import { IHrCompetencyPart, IHrCompetencyField } from '@hr/classes/types';
// import { InjectedIntlProps } from 'react-intl';
// import { WithHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
// import { WithHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
// import { WithHrCompetencyLevel } from '@hr/hoc/withHrCompetencyLevel';
// import { WithHrCompetencyIndicator } from '@hr/hoc/withHrCompetencyIndicator';
// import { IBasePagingFilter } from '@generic/interfaces';

// interface IOwnOption {
  
// }

// interface IOwnState {
//   fields: ICollectionValue[];
//   listActive?: IHrCompetencyPart;
//   clusterUid?: string;
//   categoryUid?: string;
//   levelUid?: string;
//   indicatorUid?: string;
// }

// interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
//   setList: StateHandler<IOwnState>;
// }

// interface IOwnHandler {
//   handleShowList: (listActive: IHrCompetencyPart) => void;
//   handleLoadCluster: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
//   handleLoadCategory: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
//   handleLoadLevel: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
//   handleLoadIndicator: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
// }

// export type HrCompetencyListProps
//   = IOwnOption
//   & IOwnState
//   & IOwnStateUpdater
//   & IOwnHandler
//   & InjectedIntlProps
//   & WithHrCompetencyCategory
//   & WithHrCompetencyCluster
//   & WithHrCompetencyLevel
//   & WithHrCompetencyIndicator;

// const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => {
//   const state: IOwnState = {
//     fields: Object.keys(IHrCompetencyField).map(key => ({
//       value: key,
//       name: IHrCompetencyField[key]
//     }))
//   };

//   return state;
// }

// const stateUpdaters: StateUpdaters<HrCompetencyListProps, IOwnState, IOwnStateUpdater> = {
//   setList: (prevState: IOwnState) => (listActive: IHrCompetencyPart): Partial<IOwnState> => ({
//     listActive
//   })
// };

// const handlerCreators: HandleCreators<HrCompetencyListProps, IOwnHandler> = {
//   handleShowList: (props: HrCompetencyListProps) => (listActive: IHrCompetencyPart) => {
//     props.setList(listActive);
//   },
//   handleLoadCluster: (props: HrCompetencyListProps) => (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
//     const { loadAllRequest } = props.hrCompetencyClusterDispatch;
//     const { isExpired, isLoading, request } = props.hrCompetencyClusterState.all;

//     const shouldLoad = !shallowEqual()
//     if (isExpired ) {
      
//     }
//     if (props.clusterUid) {

//     }
//   },
//   handleLoadCategory: (props: HrCompetencyListProps) => (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {

//   },
//   handleLoadLevel: (props: HrCompetencyListProps) => (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {

//   },
//   handleLoadIndicator: (props: HrCompetencyListProps) => (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {

//   },
// };

// const lifeCycles: ReactLifeCycleFunctions<HrCompetencyListProps, IOwnState> = {
//   componentWillMount() {
//     console.log('component will mount');
//   },
//   componentWillReceiveProps() {
//     console.log('component will receive props');
//   },
//   componentDidMount() {
//     console.log('component did mount');
//   },
//   componentWillUpdate() {
//     console.log('component will update');
//   },
//   componentDidUpdate() {
//     console.log('component did update');
//   },
//   componentWillUnmount() {
//     console.log('component will unmount');
//   }
// };

// export const HrCompetencyList = compose<HrCompetencyListProps, IOwnOption>(
//   setDisplayName('HrCompetencyList'),
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifeCycles)
// )(HrCompetencyListView);
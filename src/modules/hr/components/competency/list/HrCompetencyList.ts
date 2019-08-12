import AppMenu from '@constants/AppMenu';
import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyCategoryGetAllFilter, IHrCompetencyClusterGetAllFilter, IHrCompetencyIndicatorGetAllFilter, IHrCompetencyLevelGetAllFilter, IHrCompetencyMappedGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyCategory, IHrCompetencyCluster, IHrCompetencyIndicator, IHrCompetencyLevel, IHrCompetencyMapped } from '@hr/classes/response';
import { IHrCompetencyField, IHrCompetencyPart } from '@hr/classes/types';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { WithHrCompetencyIndicator, withHrCompetencyIndicator } from '@hr/hoc/withHrCompetencyIndicator';
import { WithHrCompetencyLevel, withHrCompetencyLevel } from '@hr/hoc/withHrCompetencyLevel';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HrCompetencyListView } from './HrCompetencyListView';

interface IOwnOption {
  
}

interface IOwnState {
  fields: ICollectionValue[];
  listActive?: IHrCompetencyPart;
  clusterUid?: string;
  categoryUid?: string;
  levelUid?: string;
  indicatorUid?: string;
  mappedUid?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setList: StateHandler<IOwnState>;
  setClusterUid: StateHandler<IOwnState>;
  setCategoryUid: StateHandler<IOwnState>;
  setLevelUid: StateHandler<IOwnState>;
  setIndicatorUid: StateHandler<IOwnState>;
  setMappedUid: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleShowList: (listActive: IHrCompetencyPart) => void;
  handleLoadCluster: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleLoadCategory: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleLoadLevel: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleLoadIndicator: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleLoadMapped: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBindCluster: (item: IHrCompetencyCluster, index: number) => IDataBindResult;
  handleOnBindCategory: (item: IHrCompetencyCategory, index: number) => IDataBindResult;
  handleOnBindLevel: (item: IHrCompetencyLevel, index: number) => IDataBindResult;
  handleOnBindIndicator: (item: IHrCompetencyIndicator, index: number) => IDataBindResult;
  handleOnBindMapped: (item: IHrCompetencyMapped, index: number) => IDataBindResult;
  handleChangeUid: (item: IHrCompetencyPart, value: string) => void;
}

export type HrCompetencyListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithMasterPage
  & WithHrCompetencyCategory
  & WithHrCompetencyCluster
  & WithHrCompetencyLevel
  & WithHrCompetencyIndicator
  & WithHrCompetencyMapped;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    clusterUid: '',
    categoryUid: '',
    levelUid: ''
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyListProps, IOwnState, IOwnStateUpdater> = {
  setList: (prevState: IOwnState) => (listActive: IHrCompetencyPart): Partial<IOwnState> => ({
    listActive
  }),
  setClusterUid: (prevState: IOwnState) => (clusterUid: string): Partial<IOwnState> => ({
    clusterUid
  }),
  setCategoryUid: (prevState: IOwnState) => (categoryUid: string): Partial<IOwnState> => ({
    categoryUid
  }),
  setLevelUid: (prevState: IOwnState) => (levelUid: string): Partial<IOwnState> => ({
    levelUid
  }),
  setIndicatorUid: (prevState: IOwnState) => (indicatorUid: string): Partial<IOwnState> => ({
    indicatorUid
  }),
  setMappedUid: (prevState: IOwnState) => (mappedUid: string): Partial<IOwnState> => ({
    mappedUid
  }),
};

const handlerCreators: HandleCreators<HrCompetencyListProps, IOwnHandler> = {
  handleShowList: (props: HrCompetencyListProps) => (listActive: IHrCompetencyPart) => {
    props.setList(listActive);
  },
  handleChangeUid: (props: HrCompetencyListProps) => (item: IHrCompetencyPart, value: string) => {
    switch (item) {
      case IHrCompetencyPart.Cluster:
        props.setClusterUid(value);
        break;

      case IHrCompetencyPart.Category:
        props.setCategoryUid(value);
        break;

      case IHrCompetencyPart.Level:
        props.setLevelUid(value);
        break;

      case IHrCompetencyPart.Indicator:
        props.setIndicatorUid(value);
        break;

      case IHrCompetencyPart.Mapped:
        props.setClusterUid(value);
        break;

      default:
        break;
    }
  },
  handleLoadCluster: (props: HrCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyClusterDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyClusterState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyClusterGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleLoadCategory: (props: HrCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyCategoryDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyCategoryState.all;
    const { clusterUid } = props;

    if (props.userState.user && !isLoading && clusterUid) {
      const filter: IHrCompetencyCategoryGetAllFilter = {
        clusterUid,
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if ((isExpired || shouldLoad || isRetry) && clusterUid) {
        loadAllRequest({
          filter,
          clusterUid
        });
      }
    }
  },
  handleLoadLevel: (props: HrCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyLevelDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyLevelState.all;
    const { clusterUid, categoryUid } = props;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyLevelGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if ((isExpired || shouldLoad || isRetry) && clusterUid && categoryUid) {
        loadAllRequest({
          filter,
          clusterUid,
          categoryUid
        });
      }
    }
  },
  handleLoadIndicator: (props: HrCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyIndicatorDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyIndicatorState.all;
    const { clusterUid, categoryUid, levelUid } = props;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyIndicatorGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if ((isExpired || shouldLoad || isRetry) && clusterUid && categoryUid && levelUid) {
        loadAllRequest({
          filter,
          clusterUid,
          categoryUid,
          levelUid
        });
      }
    }
  },
  handleLoadMapped: (props: HrCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyMappedDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyMappedState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyMappedGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnBindCluster: (props: HrCompetencyListProps) => (item: IHrCompetencyCluster, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleOnBindCategory: (props: HrCompetencyListProps) => (item: IHrCompetencyCategory, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleOnBindLevel: (props: HrCompetencyListProps) => (item: IHrCompetencyLevel, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.level.toString(),
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleOnBindIndicator: (props: HrCompetencyListProps) => (item: IHrCompetencyIndicator, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.description,
    tertiary: '',
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleOnBindMapped: (props: HrCompetencyListProps) => (item: IHrCompetencyMapped, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.position && item.position.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: item.category.name,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifeCycles: ReactLifeCycleFunctions<HrCompetencyListProps, IOwnState> = {
  componentDidMount() {
    console.log('component did mount');
    const { intl } = this.props;
    
    this.props.masterPage.changePage({
      uid: AppMenu.LookupCompetencyCluster,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(hrMessage.shared.page.listTitle, {state: 'Competency'}),
      description : intl.formatMessage(hrMessage.shared.page.listSubHeader)
    });

  },
  componentWillUpdate(nextProps: HrCompetencyListProps) {
    // const { clusterUid: thisCluster, categoryUid: thisCategory, levelUid: thisLevel, indicatorUid: thisIndicator, mappedUid: thisMapped } = this.props;
    // const { clusterUid: nextCluster, categoryUid: nextCategory, levelUid: nextLevel, indicatorUid: nextIndicator, mappedUid: nextMapped } = nextProps;

    // if (thisCluster && nextCluster) {
    //   if (thisCluster !== nextCluster) {
    //     this.props.handleLoadCluster(undefined, true);
    //   }
    //   if (thisCategory && nextCategory) {
    //     if (thisCategory !== nextCategory) {
    //       this.props.handleLoadCategory(undefined, true);
    //     }

    //     if (thisLevel && nextLevel) {
    //       if (thisLevel !== nextLevel) {
    //         this.props.handleLoadLevel(undefined, true);
    //       }

    //       if (thisIndicator && nextIndicator) {
    //         if (thisIndicator !== nextIndicator) {
    //           this.props.handleLoadIndicator(undefined, true);
    //         }
    //       }
    //     }
    //   }
    // }
    // if (thisMapped && nextMapped) {
    //   if (thisMapped !== nextMapped) {
    //     this.props.handleLoadMapped(undefined, true);
    //   }
    // }
  },
  componentDidUpdate() {
    console.log('component did update');
  }
};

export const HrCompetencyList = compose<HrCompetencyListProps, IOwnOption>(
  setDisplayName('HrCompetencyList'),
  withUser,
  withRouter,
  withMasterPage,
  withHrCompetencyCluster,
  withHrCompetencyCategory,
  withHrCompetencyLevel,
  withHrCompetencyIndicator,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles),
  withStyles(styles)
)(HrCompetencyListView);
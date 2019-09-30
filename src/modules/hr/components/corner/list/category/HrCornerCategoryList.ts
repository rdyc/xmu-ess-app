import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCornerCategoryGetAllFilter } from '@hr/classes/filters';
import { IHrCornerCategory } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCornerCategory, withHrCornerCategory } from '@hr/hoc/withHrCornerCategory';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HrCornerCategoryListView } from './HrCornerCategoryListView';

interface IOwnOption {
  isOpen: boolean;
  onClose: () => void;
}

interface IOwnState {
  fields: ICollectionValue[];
  isDetailOpen: boolean;
  detailData?: IHrCornerCategory;
  isFormOpen: boolean;
  category?: IHrCornerCategory;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IHrCornerCategory, index: number) => IDataBindResult;
  handleOpenDetail: (isDetailOpen: boolean) => void;
  handleChangeDetail: (detailData: IHrCornerCategory) => void;
  handleOpenForm: () => void;
  handleCategory: (category: IHrCornerCategory) => void;
}

export type HrCornerCategoryListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCornerCategory;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    isDetailOpen: false,
    isFormOpen: false
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCornerCategoryListProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<HrCornerCategoryListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerCategoryListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCornerCategoryDispatch;
    const { isExpired, isLoading, request } = props.hrCornerCategoryState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCornerCategoryGetAllFilter = {
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
  handleOnLoadApiSearch: (props: HrCornerCategoryListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCornerCategoryState.all;
    const { loadAllRequest } = props.hrCornerCategoryDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: HrCornerCategoryListProps) => (item: IHrCornerCategory, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.slug,
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleOpenDetail: (props: HrCornerCategoryListProps) => (isDetailOpen: boolean) => {
    props.stateUpdate({
      isDetailOpen
    });
  },
  handleChangeDetail: (props: HrCornerCategoryListProps) => (detailData: IHrCornerCategory) => {
    props.stateUpdate({
      detailData
    });
  },
  handleOpenForm: (props: HrCornerCategoryListProps) => () => {
    props.stateUpdate({
      isFormOpen: !props.isFormOpen,
    });
  },
  handleCategory: (props: HrCornerCategoryListProps) => (category: IHrCornerCategory) => {
    props.stateUpdate({
      category
    });
  },
};

export const HrCornerCategoryList = compose<HrCornerCategoryListProps, IOwnOption>(
  setDisplayName('HrCornerCategoryList'),
  withUser,
  withRouter,
  withHrCornerCategory,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(HrCornerCategoryListView);
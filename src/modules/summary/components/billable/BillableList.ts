// import AppMenu from '@constants/AppMenu';
// import { SortDirection } from '@generic/types';
// import { WithLayout, withLayout } from '@layout/hoc/withLayout';
// import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { IListBarField } from '@layout/interfaces';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';
// import { WithSummaryRequest, withSummaryRequest } from '@summary/hoc/withSummary';

// interface OwnHandlers {
//   handleGoToNext: () => void;
//   handleGoToPrevious: () => void;
//   handleReloading: () => void;
//   handleChangeSize: (value: number) => void;
//   handleChangeOrder: (field: IListBarField) => void;
//   handleChangeSort: (direction: SortDirection) => void;
// }

// interface OwnOptions {
//   orderBy?: string | undefined;
//   direction?: string | undefined;
//   page?: number | undefined;
//   size?: number | undefined;
// }

// interface OwnState {
//   orderBy: string | undefined;
//   direction: string | undefined;
//   page: number;
//   size: number;
// }

// interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
//   stateNext: StateHandler<OwnState>;
//   statePrevious: StateHandler<OwnState>;
//   stateReloading: StateHandler<OwnState>;
//   stateOrdering: StateHandler<OwnState>;
//   stateSorting: StateHandler<OwnState>;
//   stateSizing: StateHandler<OwnState>;
// }

// export type MileageRequestListProps 
//   = WithSummaryRequest
//   & WithUser
//   & WithLayout
//   & WithNavBottom
//   & RouteComponentProps
//   & InjectedIntlProps
//   & OwnOptions
//   & OwnHandlers
//   & OwnState
//   & OwnStateUpdaters;

// const createProps: mapper<MileageRequestListProps, OwnState> = (props: MileageRequestListProps): OwnState => {
//   const { orderBy, direction, page, size } = props;
//   const { request } = props.mileageRequestState.all;

//   return { 
//     orderBy: request && request.filter && request.filter.orderBy || orderBy || 'uid',
//     direction: request && request.filter && request.filter.direction || direction || 'descending',
//     page: request && request.filter && request.filter.page || page || 1, 
//     size: request && request.filter && request.filter.size || size || 10,
//   };
// };

// const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
//   stateNext: (prevState: OwnState) => () => ({
//     page: prevState.page + 1,
//   }),
//   statePrevious: (prevState: OwnState) => () => ({
//     page: prevState.page - 1,
//   }),
//   stateReloading: (prevState: OwnState) => () => ({
//     page: 1,
//   }),
//   stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
//     orderBy: field.id,
//     page: 1,
//   }),
//   stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
//     direction,
//     page: 1,
//   }),
//   stateSizing: (prevState: OwnState) => (size: number) => ({
//     size,
//     page: 1,
//   }),
// };
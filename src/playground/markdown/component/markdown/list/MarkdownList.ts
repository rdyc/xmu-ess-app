// import { IBasePagingFilter } from '@generic/interfaces';
// import { ICollectionValue } from '@layout/classes/core';
// import { IDataBindResult } from '@layout/components/pages';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import * as moment from 'moment';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   setDisplayName,
//   shallowEqual,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';

// import { IMarkdown } from 'playground/markdown/classes/response';
// import { WithMarkdown } from 'playground/markdown/hoc/withMarkdown';
// import { MarkdownField } from 'playground/markdown/classes/types/MarkdownField';
// import { IMarkdownGetAllFilter } from 'playground/markdown/classes/filters';
// import { IMarkdownListFilterResult } from './MarkdownFilter';

// interface IOwnRouteParams {

// }

// interface IOwnState extends IMarkdownListFilterResult {
//   fields: ICollectionValue[];
// }

// interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
 
// }

// interface IOwnHandler {
//   handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
//   handleOnBind: (item: IMarkdown, index: number) => IDataBindResult;
// }

// export type MarkdownListProps 
//   = IOwnRouteParams
//   & IOwnState
//   & IOwnStateUpdater
//   & IOwnHandler
//   & WithUser
//   & WithMarkdown
//   & InjectedIntlProps
//   & RouteComponentProps<IOwnRouteParams>;

// const createProps: mapper<MarkdownListProps, IOwnState> = (props: MarkdownListProps): IOwnState => {  
//   // default state
//   const state: IOwnState = {
//     fields: Object.keys(MarkdownField).map(key => ({ 
//       value: key, 
//       name: MarkdownField[key] 
//     }))
//   };
  
//   return state;
// };

// const stateUpdaters: StateUpdaters<MarkdownListProps, IOwnState, IOwnStateUpdater> = {
  
// };

// const handlerCreators: HandleCreators<MarkdownListProps, IOwnHandler> = {
//   handleOnLoadApi: (props: MarkdownListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
//     const { isExpired, isLoading, request } = props.markdownState.all;
//     const { loadAllRequest } = props.markdownDispatch;

//     if (props.userState.user && !isLoading) {
//       // predefined filter
//       const filter: IMarkdownGetAllFilter = {
//         find: request && request.filter && request.filter.find,
//         findBy: request && request.filter && request.filter.findBy,
//         orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
//         direction: params && params.direction || request && request.filter && request.filter.direction,
//         page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
//         size: params && params.size || request && request.filter && request.filter.size,
//         // category: props.
//       };

//       // when request is defined, then compare the filter props
//       const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
//       // only load when request parameter are differents
//       if (isExpired || shouldLoad || isRetry) {
//         loadAllRequest({
//           filter,
//           employeeUid: props.match.params.employeeUid,
//         });
//       }
//     }
//   },
//   handleOnBind: (props: MarkdownListProps) => (item: IEmployeeEducation, index: number) => ({
//     key: index,
//     primary: item.uid,
//     secondary: item.institution,
//     tertiary: item.major,
//     quaternary: item.degree ? item.degree.value : 'N/A',
//     quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
//     senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
//   })
// };

// const lifecycles: ReactLifeCycleFunctions<MarkdownListProps, IOwnState> = {
//   componentDidMount() {
//     const { request } = this.props.accountEmployeeEducationState.all;
//     if (request && request.employeeUid !== this.props.match.params.employeeUid) {
//       this.props.handleOnLoadApi(undefined, true, true);
//     }
//   }
// };

// export const AccountEmployeeEducationList = compose(
//   setDisplayName('AccountEmployeeEducationList'),
//   withUser,
//   withAccountEmployeeEducation,
//   withRouter,
//   injectIntl,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifecycles)
// )(AccountEmployeeEducationListView);
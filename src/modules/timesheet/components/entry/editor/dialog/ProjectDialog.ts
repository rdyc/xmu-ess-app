// import { IResponseCollection } from '@generic/interfaces';
// import { withWidth } from '@material-ui/core';
// import { WithWidth } from '@material-ui/core/withWidth';
// import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
// import { IProjectList } from '@project/classes/response';
// import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
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

// import { ProjectDialogView } from './ProjectDialogView';

// interface OwnOptions {
//   value?: string | undefined;
//   filter?: IProjectRegistrationGetListFilter | undefined;
//   isOpen: boolean;
//   onSelected: (project: IProjectList) => void;
//   onClose: () => void;
// }

// interface OwnHandlers {
//   searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
//   filterProjects: (response: IResponseCollection<IProjectList> | undefined) => IProjectList[];
// }

// interface OwnState {
//   _value: string | undefined;
//   _filter: IProjectRegistrationGetListFilter;
//   _search: string;
// }

// interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
//   setStateValue: StateHandler<OwnState>;
//   setStateSearch: StateHandler<OwnState>;
//   clearStateSearch: StateHandler<OwnState>;
// }

// export type ProjectDialogProps
//   = WithProjectRegistration
//   & WithWidth
//   & InjectedIntlProps
//   & OwnOptions
//   & OwnHandlers
//   & OwnState
//   & OwnStateUpdaters;

// const createProps: mapper<OwnOptions, OwnState> = (props: OwnOptions): OwnState => {
//   const { value, filter } = props;

//   return {
//     _value: value,
//     _filter: {
//       customerUids: filter && filter.customerUids,
//       projectTypes: filter && filter.projectTypes,
//       statusTypes: filter && filter.statusTypes,
//       activeOnly: filter && filter.activeOnly || null,
//       assignmentStatus: filter && filter.assignmentStatus || null,
//       page: filter && filter.page,
//       find: filter && filter.find,
//       findBy: filter && filter.findBy,
//       orderBy: filter && filter.orderBy || 'name',
//       direction: filter && filter.direction || 'ascending',
//       size: filter && filter.size || undefined,
//     },
//     _search: '',
//   };
// };

// const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
//   setStateValue: (prevState: OwnState) => (uid: string) => ({
//     _value: uid
//   }),
//   setStateSearch: (prevState: OwnState) => (value: string) => ({
//     _search: value
//   }),
//   clearStateSearch: (prevState: OwnState) => () => ({
//     _search: ''
//   }),
// };

// const handlerCreators: HandleCreators<ProjectDialogProps, OwnHandlers> = {
//   filterProjects: (props: ProjectDialogProps) => (response: IResponseCollection<IProjectList> | undefined): IProjectList[] => {
//     const { _search } = props;

//     let result: IProjectList[] = [];

//     if (response && response.data) {
//       if (_search !== '') {
//         result = response.data.filter(item => 
//           item.name.toLowerCase().indexOf(_search || '') !== -1
//         );
//       } else {
//         result = response.data;
//       }
//     }

//     return result;
//   },
//   searchOnChange: (props: ProjectDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.currentTarget.value;
    
//     props.setStateSearch(value);
//   },
//   searchOnKeyUp: (props: ProjectDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
//     // delete pressed
//     if (event.keyCode === 46) {
//       props.clearStateSearch();
//     }
//   },
// };

// const lifecycles: ReactLifeCycleFunctions<ProjectDialogProps, OwnState> = {
//   componentDidMount() { 
//     const { _filter } = this.props;
//     const { isLoading, response  } = this.props.projectRegisterState.list;
//     const { loadListRequest } = this.props.projectRegisterDispatch;

//     // if (!isLoading && !response) {
//     //   loadListRequest({
//     //     filter: _filter
//     //   });
//     // }
//   }
// };

// export const ProjectDialog = compose<ProjectDialogProps, OwnOptions>(
//   withProjectRegistration,
//   withWidth(),
//   injectIntl,
//   withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
//   withHandlers<ProjectDialogProps, OwnHandlers>(handlerCreators),
//   lifecycle<ProjectDialogProps, OwnState>(lifecycles),
// )(ProjectDialogView);
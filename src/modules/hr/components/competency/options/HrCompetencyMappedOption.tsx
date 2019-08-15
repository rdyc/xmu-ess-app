// import { IHrCompetencyMappedGetListFilter } from '@hr/classes/filters/';
// import { IHrCompetencyMappedList } from '@hr/classes/response';
// import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
// import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
// import * as React from 'react';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   setDisplayName,
//   shallowEqual,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';

// interface IOwnOption {
//   filter?: IHrCompetencyMappedGetListFilter;
// }

// interface IOwnState {
//   isLoading: boolean;
//   options: ISelectFieldOption[];
// }

// interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
//   setLoading: StateHandler<IOwnState>;
//   setOptions: StateHandler<IOwnState>;
// }

// interface IOwnHandler {
//   handleOnLoadApi: () => void;
// }

// export type HrCompetencyMappedOptionProps
//   = WithHrCompetencyMapped
//   & IOwnOption
//   & IOwnState
//   & IOwnStateUpdater
//   & IOwnHandler;

// const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
//   isLoading: false,
//   options: [{ label: '', value: ''}]
// });

// const stateUpdaters: StateUpdaters<HrCompetencyMappedOptionProps, IOwnState, IOwnStateUpdater> = {
//   setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
//     isLoading: values
//   }),
//   setOptions: (state: IOwnState) => (values: IHrCompetencyMappedList[]): Partial<IOwnState> => {
//     const options: ISelectFieldOption[] = [
//       { label: '', value: ''}
//     ];
        
//     values.forEach(item => options.push({ 
//       value: item.uid, 
//       label: item.name 
//     }));

//     return {
//       options
//     };
//   }
// };

// const handlerCreators: HandleCreators<HrCompetencyMappedOptionProps, IOwnHandler> = {
//   handleOnLoadApi: (props: HrCompetencyMappedOptionProps) => () => {
//     const { isExpired, isLoading } = props.hrCompetencyMappedState.list;
//     const { loadListRequest } = props.hrCompetencyMappedDispatch;
//     const { filter } = props;

//     if (isExpired || !isLoading) {
//       loadListRequest({ 
//         filter
//       });
//     }
//   }
// };

// const lifeCycle: ReactLifeCycleFunctions<HrCompetencyMappedOptionProps, IOwnState> = {
//   componentDidMount() {
//     const { request, response } = this.props.hrCompetencyMappedState.list;
    
//     // 1st load only when request are empty
//     if (!request) {
//       this.props.handleOnLoadApi();
//     } else {
//       // 2nd load only when request filter are present
//       if (request.filter) {
//         // comparing some props
//         const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
//         // then should update the list?
//         if (shouldUpdate) {
//           this.props.handleOnLoadApi();
//         } else {
//           if (response && response.data) {
//             this.props.setOptions(response.data);
//           }
//         }
//       }
//     }
//   },
//   componentDidUpdate(prevProps: HrCompetencyMappedOptionProps) {
//     const { isLoading: thisIsLoading, response: thisResponse } = this.props.hrCompetencyMappedState.list;
//     const { isLoading: prevIsLoading, response: prevResponse } = prevProps.hrCompetencyMappedState.list;
    
//     if (thisIsLoading !== prevIsLoading) {
//       this.props.setLoading(thisIsLoading);
//     }

//     if (thisResponse !== prevResponse) {
//       if (thisResponse && thisResponse.data) {
//         this.props.setOptions(thisResponse.data);
//       }
//     }
//   }
// };

// const component: React.SFC<HrCompetencyMappedOptionProps> = props => {
//   const children = props.children as React.ReactElement<SelectFieldProps>;

//   if (children) {
//     return (
//       <React.Fragment>
//         {
//           React.cloneElement(children, { 
//             isLoading: props.isLoading,
//             options: props.options,
//             value: props.options.find(option => option.value === children.props.valueString)
//           })
//         }
//       </React.Fragment>
//     );
//   }

//   return <div></div>;
// };

// export const HrCompetencyMappedOption = compose<HrCompetencyMappedOptionProps, IOwnOption>(
//   setDisplayName('HrCompetencyMappedOption'),
//   withHrCompetencyMapped,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifeCycle)
// )(component);
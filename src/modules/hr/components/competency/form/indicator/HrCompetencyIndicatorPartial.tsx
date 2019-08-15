// import { FormMode } from '@generic/types';
// import { IHrCompetencyCategoryGetListFilter, IHrCompetencyClusterGetListFilter, IHrCompetencyLevelGetListFilter } from '@hr/classes/filters';
// import { hrMessage } from '@hr/locales/messages/hrMessage';
// import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
// import { layoutMessage } from '@layout/locales/messages';
// import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
// import { Field, FieldProps, FormikProps } from 'formik';
// import * as React from 'react';
// import { InjectedIntl } from 'react-intl';
// import { HrCompetencyCategoryOption } from '../../options/HrCompetencyCategoryOption';
// import { HrCompetencyClusterOption } from '../../options/HrCompetencyClusterOption';
// import { HrCompetencyLevelOption } from '../../options/HrCompetencyLevelOption';
// import { IIndicatorFormValue } from './HrCompetencyIndicatorForm';

// type HrCompetencyIndicatorPartialProps = {
//   formMode: FormMode; 
//   formikBag: FormikProps<IIndicatorFormValue>;
//   intl: InjectedIntl;
//   filterCluster?: IHrCompetencyClusterGetListFilter;
//   filterCategory?: IHrCompetencyCategoryGetListFilter;
//   filterLevel?: IHrCompetencyLevelGetListFilter;
// };

// const HrCompetencyIndicatorPartial: React.ComponentType<HrCompetencyIndicatorPartialProps> = props => (
//   <Card square>
//     <CardHeader 
//       title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Indicator'})}
//     />
//     <CardContent>
//       <Field 
//         name="uid"
//         render={({ field}: FieldProps<IIndicatorFormValue>) => (
//           <TextField 
//             {...field}
//             fullWidth
//             disabled
//             margin="normal"
//             label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'), {state: 'Indicator'})}
//             helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
//           />
//         )}
//       />

//       <Field
//         name="clusterUid"
//         render={({ field, form }: FieldProps<IIndicatorFormValue>) => (
//           <HrCompetencyClusterOption filter={props.filterCluster}>
//             <SelectField
//               isSearchable
//               menuPlacement="auto"
//               menuPosition="fixed"
//               isDisabled={props.formikBag.isSubmitting}
//               isClearable={field.value !== ''}
//               escapeClearsValue={true}
//               valueString={field.value}
//               textFieldProps={{
//                 label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}),
//                 required: true,
//                 helperText: form.touched.clusterUid && form.errors.clusterUid,
//                 error: form.touched.clusterUid && Boolean(form.errors.clusterUid)
//               }}
//               onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
//               onChange={(selected: ISelectFieldOption) => {
//                 props.formikBag.setFieldValue(field.name, selected && selected.value || '');
//                 props.formikBag.setFieldValue('categoryUid', '');                
//                 props.formikBag.setFieldValue('levelUid', '');                
//               }}
//             />
//           </HrCompetencyClusterOption>
//         )}
//       />

//       <Field
//         name="categoryUid"
//         render={({ field, form }: FieldProps<IIndicatorFormValue>) => (
//           <HrCompetencyCategoryOption filter={props.filterCategory} clusterUid={props.formikBag.values.clusterUid}>
//             <SelectField
//               isSearchable
//               menuPlacement="auto"
//               menuPosition="fixed"
//               isDisabled={props.formikBag.isSubmitting || props.formikBag.values.clusterUid === ''}
//               isClearable={field.value !== ''}
//               escapeClearsValue={true}
//               valueString={field.value}
//               textFieldProps={{
//                 label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'}),
//                 required: true,
//                 helperText: form.touched.categoryUid && form.errors.categoryUid,
//                 error: form.touched.categoryUid && Boolean(form.errors.categoryUid)
//               }}
//               onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
//               onChange={(selected: ISelectFieldOption) => {
//                 props.formikBag.setFieldValue(field.name, selected && selected.value || '');
//                 props.formikBag.setFieldValue('levelUid', '');                
//               }}
//             />
//           </HrCompetencyCategoryOption>
//         )}
//       />

//       <Field
//         name="levelUid"
//         render={({ field, form }: FieldProps<IIndicatorFormValue>) => (
//           <HrCompetencyLevelOption filter={props.filterLevel} categoryUid={props.formikBag.values.categoryUid} clusterUid={props.formikBag.values.clusterUid}>
//             <SelectField
//               isSearchable
//               menuPlacement="auto"
//               menuPosition="fixed"
//               isDisabled={props.formikBag.isSubmitting || props.formikBag.values.categoryUid === ''}
//               isClearable={field.value !== ''}
//               escapeClearsValue={true}
//               valueString={field.value}
//               textFieldProps={{
//                 label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'}),
//                 required: true,
//                 helperText: form.touched.levelUid && form.errors.levelUid,
//                 error: form.touched.levelUid && Boolean(form.errors.levelUid)
//               }}
//               onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
//               onChange={(selected: ISelectFieldOption) => {
//                 props.formikBag.setFieldValue(field.name, selected && selected.value || '');
//               }}
//             />
//           </HrCompetencyLevelOption>
//         )}
//       />

//       <Field
//         name="description"
//         render={({ field, form }: FieldProps<IIndicatorFormValue>) => (
//           <TextField
//             {...field}
//             fullWidth
//             required
//             disabled={form.isSubmitting}
//             margin="normal"
//             autoComplete="off"
//             label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
//             placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
//             helperText={form.touched.description && form.errors.description}
//             error={form.touched.description && Boolean(form.errors.description)}
//           />
//         )}
//       />
      
//     </CardContent>
//   </Card>
// );

// export default HrCompetencyIndicatorPartial;
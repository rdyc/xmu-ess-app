// import { ISystemList } from '@common/classes/response';
// import { ConnectedReduxProps, FormMode } from '@generic/types';
// import { FieldInputText } from '@layout/components/formFields';
// import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
// import { ILeaveDetail } from '@lookup/classes/response';
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Grid,
//   TextField,
//   WithStyles,
// } from '@material-ui/core';
// import { WithWidth } from '@material-ui/core/withWidth';
// import styles from '@styles';
// import * as classNames from 'classnames';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps } from 'react-intl';
// import { Field, InjectedFormProps, reduxForm } from 'redux-form';

// interface OwnProps {
//   mode: FormMode;
//   companyUid: string;
//   leaveUid: string;
// }

// type AllProps = InjectedFormProps<ILeaveDetail, OwnProps> & 
//                 ConnectedReduxProps &
//                 InjectedIntlProps &
//                 WithWidth &
//                 WithStyles<typeof styles>;

// const leaveFormComponent: React.SFC<AllProps & OwnProps> = props => { 
//   const renderDetail = () => (
//     <Card square>
//       <CardHeader 
//         title={<FormattedMessage id="leave.infoTitle"/>}
//         subheader={<FormattedMessage id="leave.infoSubTitle" />}
//       />
//       <CardContent>
//         <TextField
//           fullWidth
//           disabled
//           margin="normal"
//           label={<FormattedMessage id="leave.field.uid" />}
//           value={props.initialValues.uid}
//         />
//         <TextField
//           fullWidth
//           disabled
//           margin="normal"
//           label={<FormattedMessage id="leave.field.company" />}
//           value={props.initialValues.company ? props.initialValues.company.name : 'N/A'}
//         />
//         <Field
//           type="text"
//           name="year"
//           label={<FormattedMessage id="leave.field.year" />}
//           component={FieldInputText}
//         />
//         <Field
//           type="leave"
//           name="category"
//           label={<FormattedMessage id="leave.field.category" />}
//           component={FieldSelectSystem}
//           onChange={(event: any, newValue: ISystemList | undefined) => {
//             // props.change('categoryType', newValue ? newValue.type : '');
//           }}
//         />
//         <Field
//           type="text"
//           name="name"
//           label={<FormattedMessage id="leave.field.name" />}
//           component={FieldInputText}
//         />
//         <Field
//           type="text"
//           name="allocation"
//           label={<FormattedMessage id="leave.field.allocation" />}
//           component={FieldInputText}
//         />
//       </CardContent>
//     </Card>
//   );

//   return (
//     <form onSubmit={props.handleSubmit}>
//       <Grid container spacing={24}>
//         <Grid item xs={12} sm={12} md={4} xl={3}>
//           {renderDetail()}
//         </Grid>
//       </Grid>
//       <div className={classNames(props.classes.marginFarTop, props.classes.marginWideBottom, props.classes.forceRight)}>
//         <Button 
//           type="button"
//           color="default"
//           disabled={props.submitting}
//           onClick={props.reset}
//         >
//           <FormattedMessage id={'global.action.reset' } />
//         </Button>
//         <Button 
//           type="submit"
//           color="secondary"
//           disabled={!props.valid || props.submitting}
//         >
//           <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' } />
//         </Button>
//       </div>
//     </form>
//   );
// };

// export const LeaveFormComponent = reduxForm<ILeaveDetail, OwnProps>({
//   form: 'leaveForm'
// })(leaveFormComponent);
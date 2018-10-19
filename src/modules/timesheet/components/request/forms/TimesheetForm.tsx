// import { FormMode } from '@generic/types';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import {
//   Button,
//   Grid,
//   WithStyles,
//   withStyles,
// } from '@material-ui/core';
// import withWidth, { WithWidth } from '@material-ui/core/withWidth';
// import styles from '@styles';
// import { ITimesheetDetail } from '@timesheet/classes/response';
// import { InformationForm } from '@timesheet/components/request/forms/InformationForm';
// import * as classNames from 'classnames';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
// // import { connect } from 'react-redux';
// import { compose, setDisplayName } from 'recompose';
// import {
//   BaseFieldsProps,
//   Fields,
//   InjectedFormProps,
//   reduxForm,
// } from 'redux-form';

// const formName = 'TimesheetForm';

// interface OwnProps {
//   mode: FormMode;
// }

// interface FormValueProps {
//   formIsTimesheet: boolean | false;
// }

// type AllProps
//   = FormValueProps
//   & InjectedIntlProps
//   & WithUser
//   & WithWidth
//   & WithStyles;

// const requestForm: React.SFC<AllProps & InjectedFormProps<ITimesheetDetail, OwnProps> & OwnProps> = props => {
//   // const { formIsTimesheet, change } = props;

//   const renderInformation = (context: BaseFieldsProps) =>
//     <InformationForm
//       context={context}
//     />;

//   const informationFieldNames = [
//     'activityType', 'customerUid', 'projectUid', 'siteUid', 'date', 'start',
//     'end', 'notes'
//   ];

//   const renderForm = (
//     <form
//       onSubmit={props.handleSubmit}
//     >
//       <Grid
//         container
//         spacing={24}
//       >
//         <Grid
//           item
//           key="information"
//           xs={12}
//           md={4}
//         >
//           <Fields
//             names={informationFieldNames}
//             component={renderInformation}
//           />
//         </Grid>
//       </Grid>

//       <div
//         className={classNames(props.classes.marginFarTop, props.classes.marginWideBottom, props.classes.forceRight)}>
//         <Button
//           type="button"
//           color="default"
//           disabled={props.submitting}
//           onClick={props.reset}
//         >
//           <FormattedMessage id={'global.action.reset'} />
//         </Button>
//         <Button
//           type="submit"
//           color="secondary"
//           disabled={props.submitting}
//         >
//           <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit'} />
//         </Button>
//       </div>
//     </form>
//   );

//   return renderForm;
// };

// const enhance = compose<AllProps, InjectedFormProps<ITimesheetDetail, OwnProps> & OwnProps>(
//   setDisplayName(formName),
//   withUser,
//   withWidth(),
//   withStyles(styles),
//   injectIntl,
//   // connect(mapStateToProps),
// )(requestForm);

// export default reduxForm<ITimesheetDetail, OwnProps>({
//   form: formName, 
//   touchOnChange: true
// })(enhance);
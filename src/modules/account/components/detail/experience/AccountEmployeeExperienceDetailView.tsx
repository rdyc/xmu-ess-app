import { IEmployeeExperienceDetail } from '@account/classes/response/employeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { AccountEmployeeExperienceDetailProps } from './AccountEmployeeExperienceDetail';
import { AccountEmployeeExperienceInformation } from './AccountEmployeeExperienceInformation';
import { ExperienceCompetency } from './ExperienceCompetency';

export const AccountEmployeeExperienceDetailView: React.SFC<AccountEmployeeExperienceDetailProps> = props => {

  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        parentUrl: `/account/employee/${props.match.params.employeeUid}/experience`,
        title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
      }}
      state={props.accountEmployeeExperienceState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeExperienceDetail) => ([
        <AccountEmployeeExperienceInformation data={data} employeeUid={props.match.params.employeeUid}/>
      ])}
      secondary={(data: IEmployeeExperienceDetail) => ([
        <ExperienceCompetency 
          data={data.competencies}
          title={props.intl.formatMessage(accountMessage.shared.field.titleInformation, {state: 'Competency'})}
        />
      ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu 
          id="employee-experience-option"
          selectable={false}
          menuOptions={props.menuOptions} 
          onSelected={props.handleOnSelectedMenu} 
        />
      }
    >
      <Delete 
        action={props.action}
        isOpenDialog={props.dialogOpen}
        title={props.dialogTitle}
        content={props.dialogContent}
        labelCancel={props.dialogCancelLabel}
        labelConfirm={props.dialogConfirmLabel}
        handleDialogOpen={props.handleOnOpenDialog}
        handleDialogClose={props.handleOnCloseDialog}
        handleDialogConfirmed={props.handleOnConfirm}
        onSubmit={props.handleSubmit} 
        onSubmitSuccess={props.handleSubmitSuccess}
        onSubmitFail={props.handleSubmitFail}
      />
    </PreviewPage>
  );

  return render;
};
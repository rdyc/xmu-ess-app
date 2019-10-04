import { IEmployeeMy } from '@account/classes/response';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { MyProfileTabs } from '@profile/classes/types/MyProfileTabs';
import { myMessage } from '@profile/locales/messages/myMessage';
import * as React from 'react';
import { DetailProfile } from '../DetailProfile';
import { MyProfileDetailProps } from './MyProfileDetail';
import { MyProfileInformation } from './MyProfileInformation';

export const MyProfileDetailView: React.SFC<MyProfileDetailProps> = props => {

  const render = (
  <React.Fragment>
    <DetailProfile
      tab={MyProfileTabs.Detail}      
    >
      <PreviewPage
        info={{
          uid: AppMenu.MyProfile,
          parentUid: AppMenu.Account,
          // parentUrl: '/account/profile',
          title: props.intl.formatMessage(myMessage.shared.page.detailTitle, { state: 'Profile'}),
          description: props.intl.formatMessage(myMessage.shared.page.detailSubheader),
        }}
        state={props.accountEmployeeMyState.detail}
        onLoadApi={props.handleOnLoadApi}
        primary={(data: IEmployeeMy) => ([
          <MyProfileInformation data={data} />
        ])}
        // secondary={(data: IEmployeeMy) => ([
        //   <MyProfileContact data={data} />
        // ])}
        // tertiary={(data: IEmployeeMy) => ([
        //   <MyProfileBank data={data} />
        // ])}
        appBarComponent={
          props.menuOptions &&
          <PopupMenu 
            id="account-my-profile-option"
            selectable={false}
            menuOptions={props.menuOptions} 
            onSelected={props.handleOnSelectedMenu} 
          />
        }
      />
    </DetailProfile>
  </React.Fragment>
  );

  return render;
};
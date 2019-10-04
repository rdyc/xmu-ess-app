import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { MyProfileTabs } from '@profile/classes/types/MyProfileTabs';
import * as React from 'react';
import { DetailProfile } from '../DetailProfile';
import { MyCompetencyDetailProps } from './MyCompetencyDetail';
import { MyCompetencyTable } from './MyCompetencyTable';

export const MyCompetencyDetailView: React.SFC<MyCompetencyDetailProps> = props => {

  const render = (
  <React.Fragment>
    <DetailProfile
      tab={MyProfileTabs.Competency}      
    >
      {
        props.employeeFinalState.detail.isLoading &&
        <div className={props.classes.preloader}>
          <div className={props.classes.preloaderContent}>
            <CircularProgress 
              style={{margin: 'auto'}} 
              color="secondary"
            />

            <Typography
              className={props.classes.marginFarTop}
            >
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          </div>    
        </div>
      }
      {
        !props.employeeFinalState.detail.isLoading &&
        (
          props.userState && props.userState.user && props.userState.user.level &&
          props.employeeFinalState.detail.response && props.employeeFinalState.detail.response.data &&
          props.hrCompetencyMappedState.next.response && props.hrCompetencyMappedState.next.response.data ?
          <MyCompetencyTable 
            data={props.employeeFinalState.detail.response.data}
            next={props.hrCompetencyMappedState.next.response.data }
            level={props.userState.user.level}
          />
          :
          <Card>
            <CardContent>
              <Typography>
                Data Not Found
              </Typography>
            </CardContent>
          </Card>
        )
      }
    </DetailProfile>
  </React.Fragment>
  );

  return render;
};
// import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

import { ResourceMappingProps } from './ResourceMapping';
import { ResourceMappingChartView } from './ResourceMappingChartView';
import { ResourceMappingFilter } from './ResourceMappingFilter';

export const ResourceMappingView: React.SFC<ResourceMappingProps> = props => {
  const { isLoading, response } = props.summaryState.mapping;
  const { 
    handleChangeFilter, 
    handleReloadData,
    handleDialogDetail,
    handleDetail,
    handleChartData,
    isStartup,
    year
  } = props;

  const render = (
    <React.Fragment>
      <ResourceMappingFilter
        isAdmin={props.isAdmin}
        initialProps={{
          companyUid: props.companyUid,
          year: props.year,
        }}
        isLoading={isLoading}
        onClickSync={handleReloadData}
        onApply={handleChangeFilter}
        isStartup={isStartup}
      />
      <Paper square elevation={1}>
      {
          isLoading &&
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
          !isLoading &&
          response &&
          response.data &&
          <React.Fragment>
            {/* <ResourceMappingDetail
              uid={props.uid}
              type={props.type}
              isDetailOpen={props.isDetailOpen}
              handleDialogDetail={handleDialogDetail}
              data={response && response.data}
            /> */}
            <ResourceMappingChartView
              dataLength={response.data.length}
              data={response.data}
              year={year}
              handleDetail={handleDetail}
              handleDialogDetail={handleDialogDetail}
              handleChartData={handleChartData}
            />
          </React.Fragment>
        }
      </Paper>
    </React.Fragment>
  );

  return render;
};
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

import { EmployeeDetailPage } from './employeeDetail/EmployeeDetailPage';
import { ResourceMappingProps } from './ResourceMapping';
import { ResourceMappingChartView } from './ResourceMappingChartView';
import { ResourceMappingDetail } from './ResourceMappingDetail';
import { ResourceMappingFilter } from './ResourceMappingFilter';
import { ResourceMappingChartSummaryView } from './summary/ResourceMappingChartSummary';
import { ResourceMappingDetailSummary } from './summary/ResourceMappingDetailSummary';

export const ResourceMappingView: React.SFC<ResourceMappingProps> = props => {
  const { isLoading, response } = props.summaryState.mapping;
  const { 
    handleChangeFilter, 
    handleReloadData,
    handleOpenDetail,
    handleChartData,
    handleEmployeeData,
    handleOpenEmployee,
    isStartup,
    year,
    employeeData
  } = props;

  const render = (
    <React.Fragment>
      <ResourceMappingFilter
        isAdmin={props.isAdmin}
        initialProps={{
          companyUid: props.companyUid,
          year: props.year,
          summary: props.isSummary,
          competencyTypes: props.competencyTypes,
          professionTypes: props.professionTypes
        }}
        isLoading={isLoading}
        onClickSync={handleReloadData}
        onApply={handleChangeFilter}
        isStartup={isStartup}
        // isSummary={props.isSummary}
        // handleSummary={props.handleSummary}
        // setSummary={props.setSummary}
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
            <ResourceMappingDetail
              isDetailOpen={props.isDetailOpen}
              handleOpenDetail={handleOpenDetail}
              data={props.chartData}
            />
            <ResourceMappingDetailSummary 
              isDetailSumOpen={props.isDetailSumOpen}
              handleOpenDetailSum={props.handleOpenDetailSum}
              data={props.chartSummary}
            />
            <EmployeeDetailPage 
              employee={employeeData}
              companyUid={props.companyUid}
              handleOpenEmployee={handleOpenEmployee}
              isEmployeeOpen={props.isEmployeeOpen}
            />
            {
              props.isSummary ?
              <ResourceMappingChartSummaryView 
                dataLength={response.data.length}
                data={response.data}
                year={year}
                handleChartSummaryData={props.handleChartSummaryData}
                handleEmployeeData={handleEmployeeData}
              />
              :
              <ResourceMappingChartView
                dataLength={response.data.length}
                data={response.data}
                year={year}
                handleChartData={handleChartData}
                handleEmployeeData={handleEmployeeData}
              />
            }
          </React.Fragment>
        }
      </Paper>
    </React.Fragment>
  );

  return render;
};
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '@styles';
import { ISummaryMapping } from '@summary/classes/response/mapping';
import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, withStateHandlers } from 'recompose';

interface IOwnOption {
  dataLength: number;
  year?: number;
  data: ISummaryMapping[];
  handleChartSummaryData: (data: any) => void;
  handleEmployeeData: (data: any) => void;
}

interface IOwnState {
  dataWidth: number;
}

type ResourceMappingChartSummaryProps = IOwnState & IOwnOption & RouteComponentProps & WithStyles<typeof styles>;

const createProps: mapper<ResourceMappingChartSummaryProps, IOwnState> = (props: ResourceMappingChartSummaryProps): IOwnState => ({
  dataWidth: 55
});

const lifecycles: ReactLifeCycleFunctions<ResourceMappingChartSummaryProps, {}> = {
  componentDidMount() {
    const { data, year, handleEmployeeData, handleChartSummaryData } = this.props;

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 20;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    chart.dateFormatter.dateFormat = 'dd MMM yyyy';
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [];
    data.map((item) => {
      if (item.projectGroups && item.projectGroups.length > 0 && year) {
        item.projectGroups.map(sum => {
          if (Number(moment(sum.start).format('YYYY')) >= year ||
            Number(moment(sum.end).format('YYYY')) >= year) {
              chart.data.push({
                projects: sum.projects,
                name: (item.employee.fullName.toLowerCase()),
                start: moment(sum.start).format('YYYY') !== year.toString() ? moment()
                .startOf('year').format('YYYY-MM-DD') : moment(sum.start).format('YYYY-MM-DD'),
                end: moment(sum.end).format('YYYY-MM-DD'),
                color: '#f44336',
                employee: item.employee,
                totalProject: sum.totalProjects,
                totalMandays: sum.totalMandays,
                actualMandays: sum.totalActualMandays
              });
            }
        });
      } else {
        chart.data.push({
          name: (item.employee.fullName.toLowerCase()),
          employee: item.employee,
        }); 
      }
    });

    // for name *left value
    const nameAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    nameAxis.dataFields.category = 'name';
    nameAxis.clickable = true;
    nameAxis.renderer.inversed = true;

    nameAxis.renderer.labels.template.tooltipX = 100;
    nameAxis.renderer.labels.template.tooltipY = 30;
    nameAxis.renderer.labels.template.tooltipText = '{name}';

    if (nameAxis.tooltip) {
      nameAxis.tooltip.keepTargetHover = true;
    }
    if (nameAxis.renderer.labels.template.tooltip) {
      nameAxis.renderer.labels.template.tooltip.keepTargetHover = true;
      // nameAxis.renderer.labels.template.tooltip.pointerOrientation = 'vertical';
    }
    nameAxis.renderer.labels.template.events.on('hit', (e) => {
      // console.log(e.target.dataItem.dataContext);
      handleEmployeeData(e.target.dataItem.dataContext);
    });
    
    const dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.baseInterval = { count: 1, timeUnit: 'day' };
    // for date *top axis, just need to remove it for place the dateaxis in bottom
    dateAxis2.renderer.opposite = true;

    // for the value
    // When hovering
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.tooltipY = 3;
    series1.columns.template.tooltipHTML = 
      '<b>{openDateX} - {dateX}</b> </br> Total project: {totalProject} </br> Total mandays: {totalMandays} </br> Actual mandays: {actualMandays}';
    // series1.columns.template.tooltipText =
    //   '[bold]{openDateX}[/] - [bold]{dateX}[/]';

    series1.dataFields.openDateX = 'start';
    series1.dataFields.dateX = 'end';
    series1.dataFields.categoryY = 'name';

    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 0.5;

    // top scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // // Set up tooltips
    if (series1.tooltip) {
      series1.tooltip.label.interactionsEnabled = true;
      series1.tooltip.keepTargetHover = true;
      series1.tooltip.pointerOrientation = 'vertical';
    }
    series1.columns.template.events.on('hit', (e) => {
      const value = e.target.dataItem && e.target.dataItem.dataContext;
      handleChartSummaryData(value);
    });
  }
};

const resourceMappingChartSummaryView: React.SFC<ResourceMappingChartSummaryProps> = props => {
  const { dataLength, classes } = props;
  return <div id="chartdiv" className={classes.amChart} style={{height: `${50 * dataLength}px`}} />;
};

export const ResourceMappingChartSummaryView = compose<ResourceMappingChartSummaryProps, IOwnOption>(
  withRouter,
  withStyles(styles),
  withStateHandlers(createProps, {}),
  lifecycle(lifecycles)
)(resourceMappingChartSummaryView);

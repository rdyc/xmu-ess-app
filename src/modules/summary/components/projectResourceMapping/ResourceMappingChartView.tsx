import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '@styles';
import { ISummaryMapping } from '@summary/classes/response/mapping';
import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, withStateHandlers } from 'recompose';

const colorChart = [
  '#f44336', 
  '#4caf50',
  '#03a9f4',
  '#ffc107',
  '#795548'
];

interface IOwnOption {
  dataLength: number;
  year?: number;
  data: ISummaryMapping[];
  handleChartData: (data: any) => void;
  handleEmployeeData: (data: any) => void;
}

interface IOwnState {
  dataWidth: number;
}

type ResourceMappingChartProps = IOwnState & IOwnOption & RouteComponentProps & WithStyles<typeof styles>;

const createProps: mapper<ResourceMappingChartProps, IOwnState> = (props: ResourceMappingChartProps): IOwnState => ({
  dataWidth: 55
});

const lifecycles: ReactLifeCycleFunctions<ResourceMappingChartProps, {}> = {
  componentDidMount() {
    const { data, year, handleChartData, handleEmployeeData } = this.props;

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 20;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    chart.dateFormatter.dateFormat = 'dd MMM yyyy';
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [];
    let chartCounter: number = 0;
    data.map((item) => {
      const profs: string = item.professions && item.professions.join() || 'No Profession';

      if (item.projects && item.projects.length > 0 && year) {
        item.projects.map((project, index) => {
          if (Number(moment(project.start).format('YYYY')) >= year ||
            Number(moment(project.end).format('YYYY')) >= year) {
              chart.data.push({
                project,
                name: (item.employee.fullName.toLowerCase()),
                start: moment(project.start).format('YYYY') !== year.toString() ? 
                  moment(moment([year, 0])).startOf('month').format('YYYY-MM-DD') : 
                  moment(project.start).format('YYYY-MM-DD'),
                end: moment(project.end).format('YYYY') !== year.toString() ? 
                  moment(moment([year, 11])).endOf('month').format('YYYY-MM-DD') : 
                  moment(project.end).format('YYYY-MM-DD'),
                // color: colorSet.getIndex(0).brighten(Number(index % 3 === 1 ? 0 : (index % 3 === 2 ? 0.4 : 0.8 ))),
                color: colorChart[chartCounter % 5],
                projectName: project.name,
                employee: item.employee,
                professions: profs
              });
              chartCounter += 1;
            }
        });
      } else {
        chart.data.push({
          name: (item.employee.fullName.toLowerCase()),
          employee: item.employee,
          professions: profs
        }); 
        chartCounter += 1;
      }
    });

    // for name *left value
    const nameAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    nameAxis.dataFields.category = 'name';
    nameAxis.clickable = true;
    nameAxis.renderer.inversed = true;

    nameAxis.renderer.labels.template.tooltipX = 100;
    nameAxis.renderer.labels.template.tooltipY = 30;
    nameAxis.renderer.labels.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    // nameAxis.renderer.labels.template.tooltipHTML = '{professions}';

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
    dateAxis2.paddingRight = 40;
    // for date *top axis, just need to remove it for place the dateaxis in bottom
    dateAxis2.renderer.opposite = true;

    // for the value
    // When hovering
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(70);
    series1.columns.template.tooltipX = 0;
    series1.columns.template.tooltipY = 3;
    series1.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    series1.columns.template.tooltipText =
      '{projectName}: [bold]{openDateX}[/] - [bold]{dateX}[/]';

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
      handleChartData(value);
    });
  }
};

const resourceMappingChartView: React.SFC<ResourceMappingChartProps> = props => {
  const { dataLength, classes } = props;
  return <div id="chartdiv" className={classes.amChart} style={{height: `${100 + (48 * dataLength)}px`, minHeight: '100px'}} />;
};

export const ResourceMappingChartView = compose<ResourceMappingChartProps, IOwnOption>(
  withRouter,
  withStyles(styles),
  withStateHandlers(createProps, {}),
  lifecycle(lifecycles)
)(resourceMappingChartView);

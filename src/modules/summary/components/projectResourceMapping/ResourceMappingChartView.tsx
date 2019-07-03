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
  year: number;
  data: ISummaryMapping[];
  handleDialogDetail: () => void;
  handleDetail: (uid: string) => void;
  handleChartData: (data: any) => void;
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
    const { data, year, handleChartData } = this.props;

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 20;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    chart.dateFormatter.dateFormat = 'yyyy-MM-dd';
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [];
    data.map((item) => {
      if (item.projects && item.projects.length > 0) {
        item.projects.map((project, index) => {
          if (Number(moment(project.start).format('YYYY')) >= year ||
            Number(moment(project.end).format('YYYY')) >= year) {
              chart.data.push({
                project,
                name: (item.employee.fullName.charAt(0) + item.employee.fullName.slice(1).toLowerCase()),
                start: moment(project.start).format('YYYY') !== year.toString() ? moment()
                .startOf('year').format('YYYY-MM-DD') : moment(project.start).format('YYYY-MM-DD'),
                end: moment(project.end).format('YYYY-MM-DD'),
                color: colorSet.getIndex(0).brighten(Number(index % 3 === 1 ? 0 : (index % 3 === 2 ? 0.4 : 0.8 ))),
                projectName: project.name,
                employee: item.employee,
              });
          }
        });
      } else {
        chart.data.push({
          name: (item.employee.fullName.charAt(0) + item.employee.fullName.slice(1).toLowerCase()),
        }); 
      }
    });

    // for name *left value
    const nameAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    nameAxis.dataFields.category = 'name';
    nameAxis.clickable = true;
    // nameAxis.renderer.grid.template.location = 0;
    nameAxis.renderer.inversed = true;
    nameAxis.events.on('hit', (e) => {
      console.log('CATEGORY HIT');
    });

    // for date *bottom axis
    // const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.minGridDistance = 70;
    // dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    // dateAxis.renderer.tooltipLocation = 0;

    // for date *top axis
    const dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis2.renderer.minGridDistance = 70;
    dateAxis2.baseInterval = { count: 1, timeUnit: 'day' };
    // dateAxis2.renderer.tooltipLocation = 0;
    dateAxis2.renderer.opposite = true;

    // for the value
    // When hovering
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(100);
    series1.columns.template.tooltipText =
      '{projectName}: [bold]{openDateX}[/] - [bold]{dateX}[/]';

    series1.dataFields.openDateX = 'start';
    series1.dataFields.dateX = 'end';
    series1.dataFields.categoryY = 'name';

    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;

    // top scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarY = new am4core.Scrollbar();

    // // Set up tooltips
    if (series1.tooltip) {
      series1.tooltip.label.interactionsEnabled = true;
      series1.tooltip.keepTargetHover = true;
      series1.tooltip.pointerOrientation = 'vertical';
    }
    series1.columns.template.events.on('hit', (e) => {
      console.log('HIT ISI');
      const value = e.target.dataItem && e.target.dataItem.dataContext;
      handleChartData(value);
    });
    // series1.columns.template.clickable = true;
    // series1.columns.template.tooltipHTML =
    //   '<b>{category}</b><br><a href="https://en.wikipedia.org/wiki/{category.urlEncode()}">More info</a>';
  }
};

const resourceMappingChartView: React.SFC<ResourceMappingChartProps> = props => {
  const { dataLength, classes } = props;
  return <div id="chartdiv" className={classes.amChart} style={{height: `${50 * dataLength}px`}} />;
};

export const ResourceMappingChartView = compose<ResourceMappingChartProps, IOwnOption>(
  withRouter,
  withStyles(styles),
  withStateHandlers(createProps, {}),
  lifecycle(lifecycles)
)(resourceMappingChartView);

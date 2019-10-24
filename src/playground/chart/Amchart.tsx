import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

const amchart: React.SFC<AmchartProps> = props => {
  return <div id="chartdiv" style={{ width: '100%', height: `550px` }} />;
  // return (
  //   <React.Fragment>
  //     <Card>
  //       <CardHeader title={'Cobs'}/>
  //       <CardContent id="chartdiv" className={props.classes.amChart} />
  //     </Card>
  //   </React.Fragment>
  // );
};

interface IOwnState {
  data: [];
}

type AmchartProps = IOwnState & RouteComponentProps & WithStyles<typeof styles>;

const lifecycles: ReactLifeCycleFunctions<AmchartProps, {}> = {
  componentDidMount() {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    chart.dateFormatter.dateFormat = 'dd MMM yyyy';
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        category: 'Module #1',
        start: '2016-01-01',
        end: '2016-01-14',
        color: colorSet.getIndex(0).brighten(0),
        task: 'Gathering requirements'
      },
      {
        category: 'Module #1',
        start: '2016-01-16',
        end: '2016-01-27',
        color: colorSet.getIndex(0).brighten(0.4),
        task: 'Producing specifications'
      },
      {
        category: 'Module #1',
        start: '2016-02-05',
        end: '2016-04-18',
        color: colorSet.getIndex(0).brighten(0.8),
        task: 'Development'
      },
      {
        category: 'Module #1',
        start: '2016-04-18',
        end: '2016-04-30',
        color: colorSet.getIndex(0).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #2',
        start: '2016-01-08',
        end: '2016-01-10',
        color: colorSet.getIndex(2).brighten(0),
        task: 'Gathering requirements'
      },
      {
        category: 'Module #2',
        start: '2016-01-12',
        end: '2016-01-15',
        color: colorSet.getIndex(2).brighten(0.4),
        task: 'Producing specifications'
      },
      {
        category: 'Module #2',
        start: '2016-01-16',
        end: '2016-02-05',
        color: colorSet.getIndex(2).brighten(0.8),
        task: 'Development'
      },
      {
        category: 'Module #2',
        start: '2016-02-10',
        end: '2016-02-18',
        color: colorSet.getIndex(2).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #3',
        start: '2016-01-02',
        end: '2016-01-08',
        color: colorSet.getIndex(4).brighten(0),
        task: 'Gathering requirements'
      },
      {
        category: 'Module #3',
        start: '2016-01-08',
        end: '2016-01-16',
        color: colorSet.getIndex(4).brighten(0.4),
        task: 'Producing specifications'
      },
      {
        category: 'Module #3',
        start: '2016-01-19',
        end: '2016-03-01',
        color: colorSet.getIndex(4).brighten(0.8),
        task: 'Development'
      },
      {
        category: 'Module #3',
        start: '2016-03-12',
        end: '2016-04-05',
        color: colorSet.getIndex(4).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #4',
        start: '2016-01-01',
        end: '2016-01-19',
        color: colorSet.getIndex(6).brighten(0),
        task: 'Gathering requirements'
      },
      {
        category: 'Module #4',
        start: '2016-01-19',
        end: '2016-02-03',
        color: colorSet.getIndex(6).brighten(0.4),
        task: 'Producing specifications'
      },
      {
        category: 'Module #4',
        start: '2016-03-20',
        end: '2016-04-25',
        color: colorSet.getIndex(6).brighten(0.8),
        task: 'Development'
      },
      {
        category: 'Module #4',
        start: '2016-04-27',
        end: '2016-05-15',
        color: colorSet.getIndex(6).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #5',
        start: '2016-01-01',
        end: '2016-01-12',
        color: colorSet.getIndex(8).brighten(0),
        task: 'Gathering requirements'
      },
      {
        category: 'Module #5',
        start: '2016-01-12',
        end: '2016-01-19',
        color: colorSet.getIndex(8).brighten(0.4),
        task: 'Producing specifications'
      },
      {
        category: `WOI`,
        start: '2016-01-19',
        end: '2016-03-01',
        color: colorSet.getIndex(8).brighten(0.8),
        task: 'Development'
      },
      {
        category: 'Module #5',
        start: '2016-03-08',
        end: '2016-03-30',
        color: colorSet.getIndex(8).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #6',
        start: '2016-05-08',
        end: '2016-07-30',
        color: colorSet.getIndex(8).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #6',
        start: '2016-07-30',
        end: '2016-09-30',
        color: colorSet.getIndex(6).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #6',
        start: '2016-09-25',
        end: '2016-11-27',
        color: colorSet.getIndex(3).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #7',
        start: '2016-07-08',
        end: '2016-12-30',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #8',
        start: '2016-01-20',
        end: '2016-12-30',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #9',
        start: '2016-02-03',
        end: '2016-03-04',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Time Report',
        start: '2016-04-04',
        end: '2016-04-04',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #11',
        start: '2016-04-05',
        end: '2016-04-06',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Travel',
        start: '2016-06-07',
        end: '2016-07-08',
        color: colorSet.getIndex(10).brighten(1.2),
        task: 'Testing and QA'
      },
      {
        category: 'Module #13',
        // color: colorSet.getIndex(10).brighten(1.2),
        // task: 'Testing and QA'
      }
    ];

    // for category *left value
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.clickable = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.events.on('hit', () => {
      console.log('CATEGORY HIT');
    });
    categoryAxis.renderer.labels.template.tooltipText = '{category}';
    // categoryAxis.renderer.labels.template.tooltipX = 100;
    categoryAxis.renderer.labels.template.tooltipY = 30;
    categoryAxis.renderer.tooltipLocation = 0;

    if (categoryAxis.tooltip) {
      categoryAxis.tooltip.keepTargetHover = true;
      categoryAxis.tooltip.pointerOrientation = 'left';
    }
    if (categoryAxis.renderer.labels.template.tooltip) {
      categoryAxis.renderer.labels.template.tooltip.pointerOrientation = 'left';
    }

    // for date *bottom value
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    dateAxis.renderer.tooltipLocation = 0;

    // for the value
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(100);
    series1.columns.template.tooltipX = 0;
    series1.columns.template.tooltipY = 3;
    series1.columns.template.tooltipText =
      '{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]';

    series1.dataFields.openDateX = 'start';
    series1.dataFields.dateX = 'end';
    series1.dataFields.categoryY = 'category';

    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;

    // top scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // // Set up tooltips
    if (series1.tooltip) {
      // series1.tooltip.label.interactionsEnabled = true;
      series1.tooltip.keepTargetHover = true;
      // series1.tooltip.contentAlign = 'right';
      series1.tooltip.pointerOrientation = 'vertical';

    }
    series1.columns.template.clickable = true;
    series1.columns.template.events.on('hit', () => {
      console.log('HIT WOIII');
    });
    // series1.columns.template.tooltipHTML =
    //   '<b>{category}</b>';
  }
};

export const Amchart = compose<AmchartProps, {}>(
  withRouter,
  withStyles(styles),
  lifecycle(lifecycles)
)(amchart);

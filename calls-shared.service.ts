import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CommonUtilsService } from './common-utils.service'

@Injectable({ providedIn: 'root' })
export class CallsSharedService {
  public sdataQuestionType: object;
  public sdataTalkTime: object;
  public sdataTrend: any = null;
  public timePeriodVal;
  public result: any;
  public timePeriodValue;
  private providerKey: any;
  private readonly callsByCallsType = 'Calls by Call Type';
  private readonly talkTimeCallsType = 'Talk Time By Call Type';
  private readonly eligibilityAndBenefits = 'Eligibility and Benefits';
  private readonly priorAuthText = 'Prior Authorizations';
  private readonly months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };
  private readonly summaryError = {
    MetricID: 311,
    category: 'app-card',
    cards: null,
    hideFooter: false,
    timeperiod: '',
    title: 'Calls Summary',
    titleId: null,
    titleID: 261,
    status: 404,
    type: '',
  };
  constructor(
    private readonly common: CommonUtilsService,
  ) {}

  public issueResolution(
    statusTitleInfo: any,
    titleId: number,
    MetricID: string,
    data: any,
    toggle: boolean,
    besideData: any,
    timeperiod?: string | null
  ): any {
    const { status, title } = statusTitleInfo;
    const temp: any = {
      category: 'app-card',
      type: 'donutWithLabel',
      status: status,
      title: title,
      titleId: titleId,
      MetricID: MetricID,
      data: data,
      toggle: toggle,
      besideData: besideData,
      timeperiod: timeperiod,
    };
    return temp;
  }

  public getParameters(param) {
    let parameters = [];
    this.providerKey = this.common.providerKeyData();
    parameters = [this.providerKey, {}];
    return parameters;
  }

  public createCallsByCallType(totalCalls, timePeriodCalls) {
    try {
      const callsCounts = [
        totalCalls.BenefitsEligibility,
        totalCalls.Claims,
        totalCalls.PriorAuth,
        totalCalls.Others,
      ];
      const callsLabels = [
        this.eligibilityAndBenefits,
        'Claims',
        this.priorAuthText,
        'Others',
      ];

      return this.issueResolution(
        { status: null, title: 'Calls By Call Type' },
        163,
        '303',
        {
          graphValueName: [
            this.eligibilityAndBenefits,
            'Claims',
            this.priorAuthText,
            'Others',
          ],
          graphValues: [
            totalCalls.BenefitsEligibility,
            totalCalls.Claims,
            totalCalls.PriorAuth,
            totalCalls.Others,
          ],
          centerNumber:
            this.common.nondecimalFormatter(totalCalls.Total) < 1
              ? '< 1'
              : this.common.nondecimalFormatter(totalCalls.Total),
          color: ['#3381FF', '#80B0FF', '#003DA1', '#00B8CC'],
          gdata: ['card-inner', 'callsByCallType'],
          labels: [
            this.eligibilityAndBenefits,
            'Claims',
            this.priorAuthText,
            'Others',
          ],
          hover: true,
          // sdata: this.sdataTrend[0]
        },
        null,
        {
          labels: this.common.sideLabelWords(callsCounts, callsLabels),
          color: this.common.sideLabelColor(callsCounts),
        },
        timePeriodCalls
      );
    } catch (Error) {
      console.log('Error in Calls Page | Question Type By Call Type', Error);
      return this.issueResolution(
        { status: 404, title: this.callsByCallsType },
        163,
        null,
        null,
        null,
        null
      );
    }
  }

  public createCallTalkTimeByQuesType(totalTalkTime, timePeriodCalls) {
    try {
      const talkTimeCounts = [
        totalTalkTime.BenefitsEligibility,
        totalTalkTime.Claims,
        totalTalkTime.PriorAuth,
        totalTalkTime.Others,
      ];
      const talkTimeLabels = [
        this.eligibilityAndBenefits,
        'Claims',
        this.priorAuthText,
        'Others',
      ];
      return this.issueResolution(
        { status: null, title: this.talkTimeCallsType },
        164,
        '304',
        {
          graphValueName: [
            this.eligibilityAndBenefits,
            'Claims',
            this.priorAuthText,
            'Others',
          ],
          graphValues: [
            totalTalkTime.BenefitsEligibility,
            totalTalkTime.Claims,
            totalTalkTime.PriorAuth,
            totalTalkTime.Others,
          ],
          centerNumber:
            this.common.nondecimalFormatter(totalTalkTime.Total) < 1
              ? '< 1 Hrs'
              : this.common.nondecimalFormatter(totalTalkTime.Total) + ' Hrs',
          color: ['#3381FF', '#80B0FF', '#003DA1', '#00B8CC'],
          gdata: ['card-inner', 'talkTimeByCallType'],
          labels: [
            this.eligibilityAndBenefits,
            'Claims',
            this.priorAuthText,
            'Others',
          ],
          hover: true,
          // sdata: this.sdataTrend[1]
        },
        null,
        {
          labels: this.common.sideLabelWords(talkTimeCounts, talkTimeLabels),
          color: this.common.sideLabelColor(talkTimeCounts),
        },
        timePeriodCalls
      );
    } catch (Error) {
      console.log('Error in Calls Page | TalkTime By Call Type', Error);
      return this.issueResolution(
        { status: 404, title: this.talkTimeCallsType },
        164,
        null,
        null,
        null,
        null
      );
    }
  }

  getCardDetails(response) {
    const cards_Array = [
      {
        status: response.Data === null ? '404' : null,
        title: '',
        width: '',
        cardValues: {
          total: {
            value: response.Data.TotalCallVolume,
            autoUnits: true,
          },
        },
      },
      {
        status: !response ? '404' : null,
        title: '',
        width: '',
        cardValues: {
          total: {
            value: response.Data.TotalCallTime / 60,
            autoUnits: true,
          },
        },
      },
      {
        status: !response ? '404' : null,
        title: 'Avg. Time per call (mins)',
        width: '',
        cardValues: {
          total: {
            value: Number(
              this.common.roundingPercentage(response.Data.AverageTime)
            ),
            autoUnits: true,
          },
        },
      },
      {
        status: !response ? '404' : null,
        title: 'Transfer Rate',
        width: '',
        cardValues: {
          total: {
            value: response.Data.TransferRate * 100,
            autoUnits: true,
            postfix: true,
            units: '%',
          },
        },
      },
    ];
    return cards_Array;
  }

  modifyResponseForTrend(response: any, type: any) {
    const respObj = new Array();
    for (let i = 0; i < response?.length; i++) {
      respObj[i] = [];
      if (response[0]?.Data?.MonthSummary?.length > 0) {
        for (let j = 0; j < response[i].Data.MonthSummary.length; j++) {
          respObj[i].push({
            name: this.months[
              response[i]?.Data?.MonthSummary[j]?.CallDate.split('-')[1]
            ],
            value:
              type === 'Volume'
                ? response[i]?.Data?.MonthSummary[j]?.CallVolume
                : parseFloat(
                    (
                      response[i]?.Data?.MonthSummary[j]
                        ?.TotalCallTimeInMinutes / 60
                    ).toString()
                  ).toFixed(1),
            date: new Date(response[i]?.Data?.MonthSummary[j]?.CallDate),
          });
        }
      }
    }
    return respObj;
  }

  getCallTrendData(params, checkedList, radio?: any) {
    const parameters = this.getParameters(params);
    let tinStr = '';
    parameters[1].Tin.forEach((element) => {
      tinStr = tinStr + ',' + element.Tin;
    });
    checkedList.unshift({ checked: true, value: 'All', code: 'All' });
    const checkedListCopy = checkedList.map((v) => {
      v['parameters'] = JSON.parse(JSON.stringify(parameters[1]));
      v.parameters.Lob = v.code;
      return v;
    });

    const callsTree = [];
    checkedListCopy.forEach((checkVal) => {
      if (checkVal.checked) {
        const payload1 = {
          ProviderSysKey: parameters[0],
          TimeFilter: parameters[1].TimeFilter,
          TimeFilterText: parameters[1].TimeFilterText,
          CallType: radio.toLowerCase(),
          Lob: checkVal.code === 'All' ? undefined : checkVal.code,
          Tins:
            parameters[1].Tin[0].Tin === 'All' ? undefined : tinStr.slice(1),
        };
        callsTree.push(this.common.getCallsMonthDetails(payload1));
      }
    });
    return new Promise((resolve) => {
      forkJoin(callsTree).subscribe((responses: any) => {
        if (
          responses[0].Data.SumOfcallVolume === 0 &&
          responses[0].Data.SumOftotalCallTimeInMinutes === 0
        ) {
          CALLS_TREND_MOCK_DATA.trendStatus = 502;
          CALLS_TREND_MOCK_DATA.noFooter =
            CALLS_TREND_MOCK_DATA.trendStatus === 502;
          return resolve(CALLS_TREND_MOCK_DATA);
        } else {
          CALLS_TREND_MOCK_DATA.trendStatus = null;
          CALLS_TREND_MOCK_DATA.noFooter = false;
          let respObj = this.modifyResponseForTrend(responses, radio);
          respObj = this.fixResponseForTrends(respObj, radio);
          for (let i = 0, k = 0; i < checkedListCopy.length; i++) {
            if (checkedListCopy[i].checked) {
              responses[k]['Data']['type'] = checkedListCopy[i].code;
              responses[k]['Data']['SumOftotalCallTimeInMinutes'] =
                this.common.nFormatter(
                  responses[k]['Data']['SumOftotalCallTimeInMinutes'] / 60
                );
              k++;
            }
          }
          const legends = responses.map((v) =>
            this.getTrendCardDetails(v) ? this.getTrendCardDetails(v) : []
          );
          return resolve(
            this.getDatamanipulation(
              responses,
              checkedListCopy,
              radio,
              legends,
              respObj
            )
          );
        }
      });
    });
  }

  fixResponseForTrends(response, radio) {
    if (radio === 'Volume') {
      CALLS_TREND_MOCK_DATA.title = 'Call Volume by Month';
    } else {
      CALLS_TREND_MOCK_DATA.title = 'Talk Time by Month';
    }
    let maxLengthIndex = -1;
    let index = -1;
    for (let i = 0; i < response.length; i++) {
      if (response[i].length > maxLengthIndex) {
        maxLengthIndex = response[i].length;
        index = i;
      }
    }
    for (let i = 0; i < response.length; i++) {
      if (response[i].length < response[index].length) {
        for (let j = 0; j < response[index].length; j++) {
          if (
            response[i][j]?.date?.getTime() !==
            response[index][j]?.date?.getTime()
          ) {
            const obj = {
              name: response[index][j].name,
              value: 0,
              date: response[index][j].date,
            };
            response[i].splice(j, 0, obj);
          }
        }
      }
    }
    return response;
  }

  getIndValue(month: any) {
    const obj = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return obj[month];
  }

  getDatamanipulation(
    response: any,
    checklist: any,
    radioVal: any,
    legends: any,
    respObj: any
  ) {
    CALLS_TREND_MOCK_DATA.graphMultiLineObj.generalData = [];
    for (let i = 0; i < checklist.length; i++) {
      if (checklist[i].checked) {
        const color = this.getColorforgeneral(checklist[i].value);
        const obj = this.getTrendGeneralData(color, checklist[i].value);
        CALLS_TREND_MOCK_DATA.graphMultiLineObj.generalData.push(obj);
      }
    }
    CALLS_TREND_MOCK_DATA.legendObj.legendData = legends.map((v) => {
      const selectedObj = v.find((val) => val.code === radioVal);
      const selName = checklist.find((item) => item.code === selectedObj?.type);
      const { sortOrder, backColor } = this.getColorandSortData(selName);
      return this.getLegendVal(
        legends,
        selectedObj,
        selName,
        sortOrder,
        backColor,
        radioVal
      );
    });
    CALLS_TREND_MOCK_DATA.timeperiod =
      this.common.dateFormats(response[0]?.Data?.PeriodStart) +
      '-' +
      this.common.dateFormats(response[0]?.Data?.PeriodEnd);
    CALLS_TREND_MOCK_DATA.graphMultiLineObj.chartData = [];
    let year = '';
    let yearChanged = false;
    for (let i = 0; i < respObj.length; i++) {
      CALLS_TREND_MOCK_DATA.graphMultiLineObj.chartData[i] = [];
      for (let j = 0; j < respObj[i].length; j++) {
        yearChanged = year !== respObj[i][j].date.getFullYear();
        if (yearChanged) {
          CALLS_TREND_MOCK_DATA.graphMultiLineObj.chartData[i][j] = {
            name: respObj[i][j].name,
            value: respObj[i][j].value,
            ind: this.getIndValue(respObj[i][j].name.split(' ')[0]),
            year: respObj[i][j].date.getFullYear(),
          };
        } else {
          CALLS_TREND_MOCK_DATA.graphMultiLineObj.chartData[i][j] = {
            name: respObj[i][j].name,
            value: respObj[i][j].value,
            ind: this.getIndValue(respObj[i][j].name.split(' ')[0]),
          };
        }
        year = respObj[i][j].date.getFullYear();
      }
    }
    CALLS_TREND_MOCK_DATA.MetricID = '313';
    return CALLS_TREND_MOCK_DATA;
  }

  getLegendVal(legends, selectedObj, selName, sortOrder, backColor, radioVal) {
    let legendName;
    if (selectedObj?.type === 'All' && radioVal === 'Volume') {
      legendName = '';
    }
    if (selectedObj?.type === 'All' && radioVal === 'TalkTime') {
      legendName = '';
    }
    return {
      borderRight: legends.length > 1 && selectedObj?.type === 'All',
      name: selectedObj?.type === 'All' ? legendName : selName?.value,
      trendIndicator:
        selectedObj?.type === 'All' ? 'dotted-bar3' : '',
      value: selectedObj?.value,
      backgroundcolor: backColor,
      trend: { text: '' },
      sortOrder: sortOrder,
      status: selectedObj?.value ? null : 404,
    };
  }

  getColorandSortData(selection: any) {
    let backColor = '';
    let sortOrder = 0;
    if (selection?.value === 'All') {
      backColor = '#2D2D39';
      sortOrder = 0;
    }
    if (selection?.value === 'Commercial') {
      backColor = '#3381FF';
      sortOrder = 1;
    }
    if (selection?.value === 'Medicare') {
      backColor = '#80B0FF';
      sortOrder = 2;
    }
    if (selection?.value === 'Medicaid') {
      backColor = '#003DA1';
      sortOrder = 3;
    }
    return { sortOrder: sortOrder, backColor: backColor };
  }

  getColorforgeneral(value: any) {
    let ColorVal = '';
    if (value === 'All') {
      ColorVal = '#2D2D39';
    }
    if (value === 'Commercial') {
      ColorVal = '#3381FF';
    }
    if (value === 'Medicare') {
      ColorVal = '#80B0FF';
    }
    if (value === 'Medicaid') {
      ColorVal = '#003DA1';
    }
    return ColorVal;
  }

  getTrendGeneralData(color: any, lob: any) {
    return {
      backgroundColor: null,
      barColor: color,
      trendIndicator: lob === 'All' ? 'dotted-bar3' : '',
      label: lob,
      barGraphNumberSize: 18,
      hideYAxis: false,
      tooltipBoolean: true,
      width: 961,
      height: 270,
      yAxisUnits: '',
    };
  }
  getTrendCardDetails(response) {
    const layout_values = [
      { key: 'Volume', code: 'Volume' },
      { key: 'TalkTime', code: 'TalkTime' },
    ];
    const {
      SumOfcallVolume: volumeTotal,
      SumOftotalCallTimeInMinutes: timeTotal,
    } = response?.Data || [];

    return layout_values.map((item) => {
      const card_data = {
        status: null,
        title: '',
        type: response?.Data?.type,
        value: null,
        code: item.code,
        color: '',
      };
      card_data.status = null;
      card_data.title = item.key;
      card_data['autoUnits'] = true;
      if (item.key === 'Volume') {
        card_data.value = volumeTotal;
        card_data.status = !volumeTotal ? '404' : null;
      }
      if (item.key === 'TalkTime' && timeTotal !== '0') {
        card_data.value = timeTotal;
        card_data.status = !timeTotal ? '404' : null;
      }
      if (timeTotal === '0' && item.key === 'TalkTime') {
        card_data.value = null;
        card_data.status = '404';
      }
      return card_data;
    });
  }

  getCallTalkTimeDetails(callTime: any, response: any) {
    let timeData = [];
    if (callTime !== null && callTime.length > 0) {
      callTime.sort(
        (a, b) => b.TotalCallTimeInMinutes - a.TotalCallTimeInMinutes
      );
      const barScaleMax = callTime[0]?.TotalCallTimeInMinutes / 60;
      this.timePeriodValue =
        this.common.dateFormats(response['Data'].PeriodStart) +
        '-' +
        this.common.dateFormats(response['Data'].PeriodEnd);
      for (let i = 0; i < callTime.length; i++) {
        let timeType: string;
        let timeValue: number;
        let timeValue2: number;
        if (callTime[i]?.TotalCallTimeInMinutes <= 60) {
          timeType = ' mins';
          timeValue = callTime[i].TotalCallTimeInMinutes;
          timeValue2 = callTime[i].TotalCallTimeInMinutes / 60;
        } else {
          timeType = ' hrs';
          timeValue = callTime[i]?.TotalCallTimeInMinutes / 60;
          timeValue2 = Math.round(callTime[i].TotalCallTimeInMinutes / 60);
        }
        timeData.push({
          type: 'singleBarChart',
          title: '',
          titleId: 262,
          MetricID: '312',
          toggle: true,
          data: {
            type: timeType,
            barHeight: 48,
            barData: timeValue2,
            barValue: timeValue,
            barSummation: barScaleMax,
            barText: callTime[i]?.CallTypeDef,
            color: [
              {
                color1: '#3381FF',
              },
            ],
            gdata: ['card-inner-large', 'reasonBar' + i],
          },
          timeperiod: this.timePeriodValue,
        });
      }
    } else {
      timeData = [
        {
          category: '',
          type: 'donutWithLabel',
          status: 404,
          title: 'cardTitles.CallTypeByTalkTime',
          titleId: 262,
          MetricID: '312',
          toggle: true,
          data: null,
          besideData: null,
          timeperiod: null,
        },
      ];
    }
    return timeData;
  }
  getCallVolumeDetails(callVolume: any, response: any) {
    let volumedata = [];
    if (callVolume !== null && callVolume?.length > 0) {
      callVolume.sort((a, b) => b.CallVolume - a.CallVolume);
      const barScaleMax = callVolume[0]?.CallVolume;
      this.timePeriodValue =
        this.common.dateFormats(response['Data'].PeriodStart) +
        '-' +
        this.common.dateFormats(response['Data'].PeriodEnd);
      for (let i = 0; i < callVolume.length; i++) {
        volumedata.push({
          type: 'singleBarChart',
          title: 'cardTitles.CallTypeByVolume',
          titleId: 262,
          MetricID: '312',
          toggle: true,
          data: {
            barHeight: 48,
            barData: callVolume[i].CallVolume,
            barSummation: barScaleMax,
            barText: callVolume[i].CallTypeDef,
            color: [{ color1: '#3381FF' }],
            gdata: ['card-inner-large', 'reasonBar' + i],
          },
          timeperiod: this.timePeriodValue,
        });
      }
    } else {
      volumedata = [
        {
          category: 'cardType.LargeCard',
          type: 'donutWithLabel',
          status: 404,
          title: 'cardTitles.CallTypeByVolume',
          titleId: 262,
          MetricID: '312',
          toggle: true,
          data: null,
          besideData: null,
          timeperiod: null,
        },
      ];
    }
    return volumedata;
  }

  getCalltypedetailsData(type, parameters: any) {
    const { payloadVolume, payloadTime } = this.getDetailsSetResult(parameters);
    let volumedata = [];
    let timeData = [];
    return new Promise((resolve) => {
      this.common
        .getCallTypeData(payloadVolume)
        .subscribe((response: any) => {
          const callVolume = response?.Data?.CallsByTypes;
          volumedata = this.getCallVolumeDetails(callVolume, response);
          if (type === 'Volume') {
            resolve(volumedata);
          }
        });
      this.common
        .getCallTypeData(payloadTime)
        .subscribe((response: any) => {
          const callTime = response?.Data?.CallsByTypes;
          timeData = this.getCallTalkTimeDetails(callTime, response);
          if (type === 'TalkTime') {
            resolve(timeData);
          }
        });
    });
  }

  gettimeperiodCalls(param) {
    const timperiod = {
      Last12Months: 'Last 12 Months',
      Last6Months: 'Last 6 Months',
      Last3Months: 'Last 3 Months',
      Rolling3Months: 'Rolling 3 Months',
      Last30Days: 'Last 30 Days',
      YTD: 'Year To Date',
    };
    return timperiod[param.TimeFilter];
  }
  getSummaryparams(params) {
    let tinStr = '';
    params[1].Tin.forEach((element) => {
      tinStr = tinStr + ',' + element.Tin;
    });
    const param = {
      ProviderSysKey: params[0],
      TimeFilter: params[1].TimeFilter,
      TimeFilterText: params[1].TimeFilterText,
      Lob: params[1].Lob === 'All' ? undefined : params[1].Lob,
      Tins: params[1].Tin[0].Tin === 'All' ? undefined : tinStr.slice(1),
    };
    return param;
  }
  getCallsSummaryData(parameters) {
    const params = this.getParameters(parameters);
    const param = this.getSummaryparams(params);
    return new Promise((resolve) => {
      this.common.getCallsSummary(param).subscribe((response) => {
        if (response['Data'] !== null) {
          this.timePeriodVal =
            this.common.dateFormats(response['Data'].PeriodStart) +
            '-' +
            this.common.dateFormats(response['Data'].PeriodEnd);
          const summaryData = {
            MetricID: '311',
            category: 'app-card',
            cards: this.getCardDetails(response || {}),
            hideFooter: false,
            timeperiod: this.timePeriodVal,
            title: 'Calls Summary',
            titleID: 261,
            type: '',
          };
          return resolve(summaryData);
        }
        return resolve(this.summaryError);
      });
    });
  }

  getDetailsSetResult(parameters: any): any {
    const params = this.getParameters(parameters);
    let tinStr = '';
    params[1].Tin.forEach((element) => {
      tinStr = tinStr + ',' + element.Tin;
    });
    const payloadVolume = {
      ProviderSysKey: params[0],
      TimeFilter: params[1].TimeFilter,
      TimeFilterText: params[1].TimeFilterText,
      CallType: 'volume',
      Lob: params[1].Lob === 'All' ? undefined : params[1].Lob,
      Tins: params[1].Tin[0].Tin === 'All' ? undefined : tinStr.slice(1),
    };
    const payloadTime = {
      ProviderSysKey: params[0],
      TimeFilter: params[1].TimeFilter,
      TimeFilterText: params[1].TimeFilterText,
      CallType: 'talktime',
      Lob: params[1].Lob === 'All' ? undefined : params[1].Lob,
      Tins: params[1].Tin[0].Tin === 'All' ? undefined : tinStr.slice(1),
    };
    return { params, tinStr, payloadVolume, payloadTime };
  }
}

export const CALLS_TREND_MOCK_DATA = {
  titleID: 263,
  MetricID: null,
  data: {},
  status: null,
  timeperiod: '',
  title: 'Call Volume by Month',
  approach: 'default',
  trendStatus: null,
  noFooter: false,
  legendObj: {
    chartId: 'legends',
    compareLobs: true,
    filterType: 'LOB',
    legendData: [],
  },
  drawerContent: {
    title: 'Compare Lines of Business',
    IndividualText: 'Individual Lines of Business',
    mainCheckbox: {
      displayValue: 'All Lines of Business',
      value: '',
    },
    checkboxList: [
      {
        checked: true,
        value: 'Commercial',
        code: 'EI',
      },
      {
        checked: true,
        value: 'Medicare',
        code: 'MR',
      },
      {
        checked: true,
        value: 'Medicaid',
        code: 'CS',
      },
    ],
    disableClose: true,
    mode: 'over',
    position: 'end',
  },
  graphMultiLineObj: {
    chartId: 'appeals-graph',
    chartType: 'dynamicMultiline-graph',
    value: 0,
    generalData: [],
    generalData2: [{}],
    graphValues: [],
    titleData: [{}],
    chartData: [],
  },
};

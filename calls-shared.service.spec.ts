import { TestBed } from '@angular/core/testing';
import { CommonUtilsService } from './common-utils.service';
import { CallsSharedService } from './calls-shared.service';

describe('CallsSharedService', () => {
  let service: CallsSharedService;
  let commonUtilsService: CommonUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallsSharedService);
    commonUtilsService = TestBed.inject(CommonUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call function providerKeyData after invoking getParameters', () => {
    const spy = spyOn(commonUtilsService, 'providerKeyData');
    service.getParameters('test');
    expect(commonUtilsService.providerKeyData).toHaveBeenCalled();
  });

  it('should call service after invoking function', () => {
    expect(service.issueResolution('',
      1,
      '', 
      {},
      false,
      {},
      null)).toBeTruthy();
  });

  
  it('should call function providerKeyData after invoking getParameters', () => {
    const spy = spyOn(service, 'issueResolution');
    service.createCallsByCallType('test','test2');
    var code = 'My code without JSON';
    expect(service.createCallsByCallType('test','test2')).toThrow();
    expect(service.issueResolution).toHaveBeenCalled();
  });

  it('should call function providerKeyData after invoking getParameters', () => {
    const spy = spyOn(service, 'issueResolution');
    service.createCallTalkTimeByQuesType('test','test2');
    expect(service.issueResolution).toHaveBeenCalled();
  });
  
  it('should call function modifyResponseForTrend after return response object', () => {
    service.modifyResponseForTrend([{Data:{MonthSummary:[{name:'test user'}]}}], 'Volume');
    expect(service.modifyResponseForTrend).toBe([{name:'test user',value:1,date:new Date()}]);
  });

  
  it('should call function getCardDetails after return response object empty', () => {
    service.getCardDetails({});
    expect(service.getCardDetails({})).toBe([]);
  });

  
  it('should call function fixResponseForTrends return response object', () => {
    service.fixResponseForTrends([{0:[{name:'test2',value:0,date :new Date()}]},{1:[{name:'test3',value:0,date :new Date()}]}],'Volume');
    service.fixResponseForTrends([{0:[{name:'test2',value:0,date :new Date()}]},{1:[{name:'test3',value:0,date :new Date()}]}],'Volume2');
    expect(service.fixResponseForTrends([{0:[{name:'test2',value:0,date :new Date()}]},{1:[{name:'test3',value:0,date :new Date()}]}],'Volume2')).toBe([]);
  });

  
  it('should  call function getIndValue retrun zero  passing paramenter Jan', () => {
    expect(service.getIndValue('Jan')).toEqual(0);
  });

  
  it('should call function getDatamanipulation and return mapped response', () => {
    expect(service.getDatamanipulation([],[{checked:true,value:1}],{},[{legends:[{code:1}]}],'')).not.toBeUndefined(undefined);
  });

  
  it('should call function getColorandSortData return mapped responses', () => {
    expect(service.getColorandSortData({value:'All'})).toBe({ sortOrder: 0,backColor: '#2D2D39' });
    expect(service.getColorandSortData({value:'Commercial'})).toBe({ sortOrder: 1,backColor: '#3381FF' });
    expect(service.getColorandSortData({value:'Medicare'})).toBe({ sortOrder: 2,backColor: '#80B0FF' });
    expect(service.getColorandSortData({value:'Medicaid'})).toBe({ sortOrder: 3,backColor: '#003DA1' });
  });

  it('should call function getColorforgeneral return mapped responses', () => {
    expect(service.getColorforgeneral('All')).toBe('#2D2D39');
    expect(service.getColorforgeneral('Commercial')).toBe('#3381FF');
    expect(service.getColorforgeneral('Medicare')).toBe('#80B0FF');
    expect(service.getColorforgeneral('Medicaid')).toBe('#003DA1');
  });

  it('should call function getLegendVal return mapped responses', () => {
    expect(service.getLegendVal(null,{type:'All'},null,null,null,'Volume')).not.toBeUndefined();
  });
  it('should call function getLegendVal return mapped responses', () => {
    expect(service.getLegendVal(null,{type:'All'},null,null,null,'TalkTime')).not.toBeUndefined();
  });

  it('should call function getCallVolumeDetails return mapped responses', () => {
    expect(service.getCallVolumeDetails([{CallVolume:1}],{Data:{PeriodStart:'',PeriodEnd:''}})).not.toBeUndefined();
    expect(service.getCallVolumeDetails([],{Data:{PeriodStart:'',PeriodEnd:''}})).not.toBeUndefined();
  });
  
  it('should call function getTrendCardDetails return mapped responses', () => {
    expect(service.getTrendCardDetails({Data :{ type :''}})).not.toBeUndefined();
  });

  it('should call function getTrendCardDetails return mapped responses', () => {
    expect(service.getTrendCardDetails({Data :{ type :''}})).not.toBeUndefined();
  });
  
  it('should call function dateFormats after invoking getCallTalkTimeDetails', () => {
    const spy = spyOn(commonUtilsService, 'dateFormats');
    service.getCallTalkTimeDetails([{TotalCallTimeInMinutes:0}],{Data:{PeriodStart:'',PeriodEnd:''}});
    service.getCallTalkTimeDetails([{TotalCallTimeInMinutes:65}],{Data:{PeriodStart:'',PeriodEnd:''}});
    service.getCallTalkTimeDetails([],{Data:{PeriodStart:'',PeriodEnd:''}});
    expect(commonUtilsService.dateFormats).toHaveBeenCalled();
  });

  
  it('should call function getCalltypedetailsData after invoking getDetailsSetResult', async () => {
    const spy = spyOn(service, 'getCalltypedetailsData').and.returnValue(Promise.resolve({}));
    service.getCalltypedetailsData('Volume',[{TimeFilter :[],Lob:'All'},{Tin :[{Tin:'234'}],Lob:'All'}]);
    expect(await commonUtilsService.getCallTypeData).toHaveBeenCalled();
  });
  
  it('should call function getSummaryparams return mapped responses', () => {
    expect(service.getSummaryparams([{Tin :[],Lob:'All'},{Tin :[{}],Lob:'All'}])).not.toBeUndefined();
  });

  it('should call function getCallsSummaryData return mapped responses', () => {
    expect(service.getCallsSummaryData([{Tin :[],Lob:'All'},{Tin :[{}],Lob:'All'}])).not.toBeUndefined();
  });

  it('should call function getDetailsSetResult return mapped responses', () => {
    expect(service.getDetailsSetResult([{TimeFilter :[],Lob:'All'},{Tin :[{Tin:''}],Lob:'All'}])).not.toBeUndefined();
  });

  it('should call function gettimeperiodCalls return mapped responses', () => {
    expect(service.gettimeperiodCalls({Last12Months:'Last 12 Months'})).toBe('Last 12 Months');
  });

  it('should call function getCallTrendData return mapped responses', () => {
    const spy = spyOn(service, 'getParameters');
    service.getCallTrendData('Volume',{});
    expect(service.getParameters).toHaveBeenCalled();
  });
  
});

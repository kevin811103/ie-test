import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  ControllingPersonType,
  PersonPartyType,
  OrganisationPartyType,
  CorrectableAccountReportType,
  PaymentType,
  AddressType,
  TINType,
  OrganisationINType,
  NameOrganisationType,
  MiddleName,
  DocSpecType,
  FIAccountNumberType,
  AccountHolderType,
  MonAmntType,
  NamePersonType,
  FirstName,
  LastName,
  NamePrefix,
  AddressFixType,
  CountryCodeType,
  BirthInfo,
  CountryInfo,
  CrsBodyType,
  CorrectableOrganisationPartyType,
  ReportingGroup,
  MessageSpecType,
  CRSOECD,
  Cfi109wDto
} from '../share/dto/cfi109w.dto';

import { formatDate, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild('messageSpec', { static: false }) messageSpecElement: ElementRef;
  @ViewChild('reportingFi', { static: false }) reportingFiElement: ElementRef;
  @ViewChild('accountReport', { static: false }) accountReportElement: ElementRef;
  @ViewChild('controllingPerson', { static: false }) controllingPersonElement: ElementRef;
  @ViewChild('accountBalance', { static: false }) accountBalanceElement: ElementRef;
  noChinese = "^[A-Za-z0-9^%&',;=?$\x22 ]*$";
  public searchForm: FormGroup;
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  // public countries: CountryCode[];
  public lang: string;
  arIdex: number; // 目前具AccountReport索引
  controllingPersonArray: ControllingPersonType[] = [];
  personPartyArray: PersonPartyType[];
  organisationPartyArray: OrganisationPartyType[];
  accountReportArray: CorrectableAccountReportType[] = [];
  paymentArray: PaymentType[] = [];

  // 選取指標
  menuLocate = 0;
  messageSpec = 0;
  reportingFi = 0;
  accountReport = 0;
  accountHolder = 0;
  controllingPerson = 0;
  accountBalance = 0;
  payment = 0;

  messageSpecClass = 'show-large';
  reportingFiClass = 'show-small';
  accountReportClass = 'show-small';
  controllingPersonClass = 'show-small';
  accountBalanceClass = 'show-small';

  messageSpec_valid = true;
  rf_valid = true;
  ar_valid = true;
  con_valid = true;
  accountBalance_valid = true;

  validRuslet = [
    {
      errorName: '訊息規範', valid: this.messageSpec_valid
    },
    {
      errorName: '申報金融機構', valid: this.rf_valid
    },
    {
      errorName: '帳戶報告', valid: this.ar_valid
    },
    {
      errorName: '具控制權之人', valid: this.con_valid
    },
    {
      errorName: '帳戶餘額資訊', valid: this.accountBalance_valid
    }
  ];
  // 選單
  public nameTypeList: Array<any>;
  public legalAddressType: Array<any>;
  public docTypeIndic: Array<any>;
  public currcode: Array<any>; // 幣別

  constructor(
    protected builder: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private viewportScroller: ViewportScroller
  ) {
  }

  // 左側選單點了自動移至該區塊
  scrollTo(el: HTMLElement) {
    window.scrollTo(0, el.offsetTop - 50);
  }

  // 追蹤scroll event 左側選單動態放大
  // @HostListener('window:scroll', ['$event'])
  // scrollMe(event) {
  //   // 取的dom位置

  //   this.messageSpec = this.messageSpecElement.nativeElement.offsetTop;
  //   this.reportingFi = this.reportingFiElement.nativeElement.offsetTop;
  //   this.accountReport = this.accountReportElement.nativeElement.offsetTop;
  //   this.controllingPerson = this.controllingPersonElement.nativeElement.offsetTop;
  //   this.accountBalance = this.accountBalanceElement.nativeElement.offsetTop;

  //   const domLocation = [this.messageSpec, this.reportingFi, this.accountReport, this.controllingPerson, this.accountBalance];
  //   domLocation.forEach((location, index) => {
  //     //  +200 不然左側變換會太晚
  //     // if(document.documentElement.scrollTop){
  //     //   alert('ie');
  //     // }else{
  //     //   alert('chrome');
  //     // }
  //     const nowY = window.pageYOffset || document.documentElement.scrollTop;

  //     // alert('sss:'+document.documentElement.scrollTop);
  //     // alert(nowY)
  //     if (nowY + 200 > location) {
  //       this.menuLocate = index;
  //     }
  //   });

  //   // this.checkFormValidAll();
  //   this.changeMenuClass();
  // }

  changeMenuClass() {
    // console.log('dddd');
    switch (this.menuLocate) {
      case 0:
        // 訊息標題
        this.messageSpecClass = this.menuShowType('bg', this.messageSpec_valid);
        this.reportingFiClass = this.menuShowType('sm', this.rf_valid);
        this.accountReportClass = this.menuShowType('sm', this.ar_valid);
        this.controllingPersonClass = this.menuShowType('sm', this.con_valid);
        this.accountBalanceClass = this.menuShowType('sm', this.accountBalance_valid);
        break;
      case 1:
        // 申報金融機構資訊
        this.messageSpecClass = this.menuShowType('sm', this.messageSpec_valid);
        this.reportingFiClass = this.menuShowType('bg', this.rf_valid);
        this.accountReportClass = this.menuShowType('sm', this.ar_valid);
        this.controllingPersonClass = this.menuShowType('sm', this.con_valid);
        this.accountBalanceClass = this.menuShowType('sm', this.accountBalance_valid);
        break;
      case 2:
        // 帳戶詳細資訊
        this.messageSpecClass = this.menuShowType('sm', this.messageSpec_valid);
        this.reportingFiClass = this.menuShowType('sm', this.rf_valid);
        this.accountReportClass = this.menuShowType('bg', this.ar_valid);
        this.controllingPersonClass = this.menuShowType('sm', this.con_valid);
        this.accountBalanceClass = this.menuShowType('sm', this.accountBalance_valid);
        break;
      case 3:
        // 控制權人詳細資訊
        this.messageSpecClass = this.menuShowType('sm', this.messageSpec_valid);
        this.reportingFiClass = this.menuShowType('sm', this.rf_valid);
        this.accountReportClass = this.menuShowType('sm', this.ar_valid);
        this.controllingPersonClass = this.menuShowType('bg', this.con_valid);
        this.accountBalanceClass = this.menuShowType('sm', this.accountBalance_valid);
        break;
      case 4:
        // 帳戶餘額資訊
        this.messageSpecClass = this.menuShowType('sm', this.messageSpec_valid);
        this.reportingFiClass = this.menuShowType('sm', this.rf_valid);
        this.accountReportClass = this.menuShowType('sm', this.ar_valid);
        this.controllingPersonClass = this.menuShowType('sm', this.con_valid);
        this.accountBalanceClass = this.menuShowType('bg', this.accountBalance_valid);
        break;
    }
  }

  menuShowType(type: string, valid: boolean) {
    let reutrnClassType = '';
    switch (type) {
      case 'bg':
        valid ? reutrnClassType = 'show-large' : reutrnClassType = 'error-large';
        break;
      case 'sm':
        valid ? reutrnClassType = 'show-small' : reutrnClassType = 'error-small';
        break;
    }
    return reutrnClassType;
  }

  ngOnInit() {
    this.searchForm = this.builder.group({
      rf_resCountryCode_array: this.builder.array([this.create_rf_resCountryCode(null)]), // formArray
      ind_resCountryCode_array: this.builder.array([this.create_ind_resCountryCode(null)]), // formArray
      org_resCountryCode_array: this.builder.array([this.create_org_resCountryCode(null)]), // formArray
      ind_name_array: this.builder.array([this.create_ind_name()]), // formArray
      rf_name_array: this.builder.array([this.create_rf_name(null)]), // formArray
      org_name_array: this.builder.array([this.create_org_name(null)]), // formArray
      rf_in_array: this.builder.array([this.create_rf_in(null)]), // formArray
      org_in_array: this.builder.array([this.create_org_in(null)]), // formArray
      ind_in_array: this.builder.array([this.create_ind_in(null)]), // formArray
      rf_address_array: this.builder.array([this.create_rf_address(null, null)]), // formArray
      ind_address_array: this.builder.array([this.create_ind_address(null, null)]), // formArray
      org_address_array: this.builder.array([this.create_org_address(null, null)]), // formArray
      // 控制權人可以為0
      con_array: this.builder.array([this.create_con()]), // formArray
      // 支付可以為零
      // payment_array: this.builder.array([this.create_payment(null)]), // formArray
      payment_array: this.builder.array([]), // formArray
      corrMessageRefId_array: this.builder.array([this.create_corrMessageRefId(null)]), // formArray

      sendingCompanyIN: new FormControl('', Validators.required),
      // 限填申報金融機構統一編號「BAN」此元素為發送單位識別碼，即申報金融機構或代理機構(人)於金融機構申報平臺註冊之帳號
      transmittingCountry: new FormControl('TW'),
      receivingCountry: new FormControl('TW'),
      messageType: new FormControl('CRS'),
      warning: new FormControl('', Validators.maxLength(400)),
      contact: new FormControl('', Validators.maxLength(400)),
      messageRefId: new FormControl('', Validators.required),
      messageTypeIndic: new FormControl('', Validators.required),
      reportingPeriod: new FormControl('', Validators.required),
      timestamp: new FormControl(''),
      rf_docTypeIndic: new FormControl(''),
      rf_docRefId: new FormControl(''),
      rf_corrDocRefId: new FormControl(''),
      accountNumber: new FormControl('', Validators.required),
      attr_AcctNumberType: new FormControl(''),
      attr_UndocumentedAccount: new FormControl(''),
      attr_ClosedAccount: new FormControl(''),
      attr_DormantAccount: new FormControl(''),
      accountHolderType: new FormControl(''),
      ind_birthInfo_birthDate: new FormControl(''),
      ind_birthInfo_city: new FormControl('', Validators.pattern(this.noChinese)),
      ind_birthInfo_citySubentity: new FormControl('', Validators.pattern(this.noChinese)),
      ind_birthInfo_countryInfo_countryCode: new FormControl(''),
      ind_birthInfo_countryInfo_formerCountryName: new FormControl('', Validators.pattern(this.noChinese)),
      ind_address_suiteIdentifier: new FormControl(''),
      ind_address_districtName: new FormControl(''),
      acctHolderType: new FormControl(''),
      ar_docTypeIndic: new FormControl('', Validators.required),
      ar_docRefId: new FormControl('', Validators.required),
      ar_corrDocRefId: new FormControl(''),
      accountBalance: new FormControl('', Validators.required),
      accountBalance_attr_currCode: new FormControl('', Validators.required)
      // 控制權人 跟帳戶持有人 是不同區塊的東西 用不到accountType
      // accountType: new FormControl('')
    });


    this.nameTypeList = [
      { key: 'OECD_202', value: '個人' }, // indiv
      { key: 'OECD_203', value: '別名' }, // alias
      { key: 'OECD_204', value: '暱稱' }, // nick
      { key: 'OECD_205', value: '外文別名' }, // aka…..(also known as)
      { key: 'OECD_206', value: '商業化名' }, // dba…..(doing business as)
      { key: 'OECD_207', value: '法定的' }, // legal
      { key: 'OECD_208', value: '出生時取名' } // atbirth
    ];

    this.legalAddressType = [
      { key: 'OECD_301', value: '居住用或營業用' }, // (residentialOrBusiness)
      { key: 'OECD_302', value: '居住用' }, // (residential)
      { key: 'OECD_303', value: '營業用' }, // (business)
      { key: 'OECD_304', value: '總公司/註冊地' }, // (registeredOffice)
      { key: 'OECD_305', value: '不明' } // (unspecified)
    ];

    this.docTypeIndic = [
      { key: 'OECD_0', value: 'Resend Data' },
      { key: 'OECD_1', value: 'New Data' },
      { key: 'OECD_2', value: 'Corrected Data' },
      { key: 'OECD_3', value: 'Deletion of Data' },
      { key: 'OECD_10', value: 'Resend Test Data' },
      { key: 'OECD_11', value: 'New Test Data' },
      { key: 'OECD_12', value: 'Corrected Test Data' },
      { key: 'OECD_13', value: 'Deletion of Test Data' }
    ];

    this.currcode = [
      { key: 'AED', value: 'AED' },
      { key: 'AFN', value: 'AFN' },
      { key: 'ALL', value: 'ALL' },
      { key: 'AMD', value: 'AMD' },
      { key: 'ANG', value: 'ANG' },
      { key: 'AOA', value: 'AOA' },
      { key: 'ARS', value: 'ARS' },
      { key: 'AUD', value: 'AUD' },
      { key: 'AWG', value: 'AWG' },
      { key: 'AZN', value: 'AZN' },
      { key: 'BAM', value: 'BAM' },
      { key: 'BBD', value: 'BBD' },
      { key: 'BDT', value: 'BDT' },
      { key: 'BGN', value: 'BGN' },
      { key: 'BHD', value: 'BHD' },
      { key: 'BIF', value: 'BIF' },
      { key: 'BMD', value: 'BMD' },
      { key: 'BND', value: 'BND' },
      { key: 'BOB', value: 'BOB' },
      { key: 'BOV', value: 'BOV' },
      { key: 'BRL', value: 'BRL' },
      { key: 'BSD', value: 'BSD' },
      { key: 'BTN', value: 'BTN' },
      { key: 'BWP', value: 'BWP' },
      { key: 'BYR', value: 'BYR' },
      { key: 'BZD', value: 'BZD' },
      { key: 'CAD', value: 'CAD' },
      { key: 'CDF', value: 'CDF' },
      { key: 'CHE', value: 'CHE' },
      { key: 'CHF', value: 'CHF' },
      { key: 'CHW', value: 'CHW' },
      { key: 'CLF', value: 'CLF' },
      { key: 'CLP', value: 'CLP' },
      { key: 'CNY', value: 'CNY' },
      { key: 'COP', value: 'COP' },
      { key: 'COU', value: 'COU' },
      { key: 'CRC', value: 'CRC' },
      { key: 'CUC', value: 'CUC' },
      { key: 'CUP', value: 'CUP' },
      { key: 'CVE', value: 'CVE' },
      { key: 'CZK', value: 'CZK' },
      { key: 'DJF', value: 'DJF' },
      { key: 'DKK', value: 'DKK' },
      { key: 'DOP', value: 'DOP' },
      { key: 'DZD', value: 'DZD' },
      { key: 'EGP', value: 'EGP' },
      { key: 'ERN', value: 'ERN' },
      { key: 'ETB', value: 'ETB' },
      { key: 'EUR', value: 'EUR' },
      { key: 'FJD', value: 'FJD' },
      { key: 'FKP', value: 'FKP' },
      { key: 'GBP', value: 'GBP' },
      { key: 'GEL', value: 'GEL' },
      { key: 'GHS', value: 'GHS' },
      { key: 'GIP', value: 'GIP' },
      { key: 'GMD', value: 'GMD' },
      { key: 'GNF', value: 'GNF' },
      { key: 'GTQ', value: 'GTQ' },
      { key: 'GYD', value: 'GYD' },
      { key: 'HKD', value: 'HKD' },
      { key: 'HNL', value: 'HNL' },
      { key: 'HRK', value: 'HRK' },
      { key: 'HTG', value: 'HTG' },
      { key: 'HUF', value: 'HUF' },
      { key: 'IDR', value: 'IDR' },
      { key: 'ILS', value: 'ILS' },
      { key: 'INR', value: 'INR' },
      { key: 'IQD', value: 'IQD' },
      { key: 'IRR', value: 'IRR' },
      { key: 'ISK', value: 'ISK' },
      { key: 'JMD', value: 'JMD' },
      { key: 'JOD', value: 'JOD' },
      { key: 'JPY', value: 'JPY' },
      { key: 'KES', value: 'KES' },
      { key: 'KGS', value: 'KGS' },
      { key: 'KHR', value: 'KHR' },
      { key: 'KMF', value: 'KMF' },
      { key: 'KPW', value: 'KPW' },
      { key: 'KRW', value: 'KRW' },
      { key: 'KWD', value: 'KWD' },
      { key: 'KYD', value: 'KYD' },
      { key: 'KZT', value: 'KZT' },
      { key: 'LAK', value: 'LAK' },
      { key: 'LBP', value: 'LBP' },
      { key: 'LKR', value: 'LKR' },
      { key: 'LRD', value: 'LRD' },
      { key: 'LSL', value: 'LSL' },
      { key: 'LTL', value: 'LTL' },
      { key: 'LVL', value: 'LVL' },
      { key: 'LYD', value: 'LYD' },
      { key: 'MAD', value: 'MAD' },
      { key: 'MDL', value: 'MDL' },
      { key: 'MGA', value: 'MGA' },
      { key: 'MKD', value: 'MKD' },
      { key: 'MMK', value: 'MMK' },
      { key: 'MNT', value: 'MNT' },
      { key: 'MOP', value: 'MOP' },
      { key: 'MRO', value: 'MRO' },
      { key: 'MUR', value: 'MUR' },
      { key: 'MVR', value: 'MVR' },
      { key: 'MWK', value: 'MWK' },
      { key: 'MXN', value: 'MXN' },
      { key: 'MXV', value: 'MXV' },
      { key: 'MYR', value: 'MYR' },
      { key: 'MZN', value: 'MZN' },
      { key: 'NAD', value: 'NAD' },
      { key: 'NGN', value: 'NGN' },
      { key: 'NIO', value: 'NIO' },
      { key: 'NOK', value: 'NOK' },
      { key: 'NPR', value: 'NPR' },
      { key: 'NZD', value: 'NZD' },
      { key: 'OMR', value: 'OMR' },
      { key: 'PAB', value: 'PAB' },
      { key: 'PEN', value: 'PEN' },
      { key: 'PGK', value: 'PGK' },
      { key: 'PHP', value: 'PHP' },
      { key: 'PKR', value: 'PKR' },
      { key: 'PLN', value: 'PLN' },
      { key: 'PYG', value: 'PYG' },
      { key: 'QAR', value: 'QAR' },
      { key: 'RON', value: 'RON' },
      { key: 'RSD', value: 'RSD' },
      { key: 'RUB', value: 'RUB' },
      { key: 'RWF', value: 'RWF' },
      { key: 'SAR', value: 'SAR' },
      { key: 'SBD', value: 'SBD' },
      { key: 'SCR', value: 'SCR' },
      { key: 'SDG', value: 'SDG' },
      { key: 'SEK', value: 'SEK' },
      { key: 'SGD', value: 'SGD' },
      { key: 'SHP', value: 'SHP' },
      { key: 'SLL', value: 'SLL' },
      { key: 'SOS', value: 'SOS' },
      { key: 'SRD', value: 'SRD' },
      { key: 'SSP', value: 'SSP' },
      { key: 'STD', value: 'STD' },
      { key: 'SVC', value: 'SVC' },
      { key: 'SYP', value: 'SYP' },
      { key: 'SZL', value: 'SZL' },
      { key: 'THB', value: 'THB' },
      { key: 'TJS', value: 'TJS' },
      { key: 'TMT', value: 'TMT' },
      { key: 'TND', value: 'TND' },
      { key: 'TOP', value: 'TOP' },
      { key: 'TRY', value: 'TRY' },
      { key: 'TTD', value: 'TTD' },
      { key: 'TWD', value: 'TWD' },
      { key: 'TZS', value: 'TZS' },
      { key: 'UAH', value: 'UAH' },
      { key: 'UGX', value: 'UGX' },
      { key: 'USD', value: 'USD' },
      { key: 'USN', value: 'USN' },
      { key: 'USS', value: 'USS' },
      { key: 'UYI', value: 'UYI' },
      { key: 'UYU', value: 'UYU' },
      { key: 'UZS', value: 'UZS' },
      { key: 'VEF', value: 'VEF' },
      { key: 'VND', value: 'VND' },
      { key: 'VUV', value: 'VUV' },
      { key: 'WST', value: 'WST' },
      { key: 'XAF', value: 'XAF' },
      { key: 'XAG', value: 'XAG' },
      { key: 'XAU', value: 'XAU' },
      { key: 'XBA', value: 'XBA' },
      { key: 'XBB', value: 'XBB' },
      { key: 'XBC', value: 'XBC' },
      { key: 'XBD', value: 'XBD' },
      { key: 'XCD', value: 'XCD' },
      { key: 'XDR', value: 'XDR' },
      { key: 'XFU', value: 'XFU' },
      { key: 'XOF', value: 'XOF' },
      { key: 'XPD', value: 'XPD' },
      { key: 'XPF', value: 'XPF' },
      { key: 'XPT', value: 'XPT' },
      { key: 'XSU', value: 'XSU' },
      { key: 'XUA', value: 'XUA' },
      { key: 'XXX', value: 'XXX' },
      { key: 'YER', value: 'YER' },
      { key: 'ZAR', value: 'ZAR' },
      { key: 'ZMW', value: 'ZMW' },
      { key: 'ZWL', value: 'ZWL' }
    ];

    // this.onFormChanges();

    this.searchForm.patchValue({ attr_UndocumentedAccount: '1', checked: true });
    this.searchForm.patchValue({ attr_ClosedAccount: '1', checked: true });
    this.searchForm.patchValue({ attr_DormantAccount: '1', checked: true });

    this.searchForm.patchValue({ ind_addressType: '1', checked: true });
    this.searchForm.patchValue({ org_addressType: '1', checked: true });
    this.searchForm.patchValue({ con_addressType: '1', checked: true });
    this.searchForm.patchValue({ accountHolderType: '1', checked: true });
    this.searchForm.patchValue({ rf_addressType: '1', checked: true });
    // 控制權人 跟帳戶持有人 是不同區塊的東西 用不到accountType
    // this.searchForm.patchValue({ accountType: '1', checked: true });

    // this.countryService.findAllCountries().subscribe(
    //   res => {
    //     this.countries = res;
    //   },
    //   (res: HttpErrorResponse) => {
    //     this.onError('國籍代碼檔異常');
    //   }
    // );

    this.arIdex = -1;

    setInterval(function () {
      const nowY = window.pageYOffset || document.documentElement.scrollTop;
      console.log('卷軸', nowY);
      //     // alert('sss:'+document.documentElement.scrollTop);
    }, 1000);
  }

  // form 內資料變動監聽
  // onFormChanges(): void {
  //   this.searchForm.valueChanges.subscribe(val => {
  //     console.log('有資料變動');
  //     //   this.formattedMessage =
  //     //     `Hello,
  //     //
  //     // My name is ${val.name} and my email is ${val.email}.
  //     //
  //     // I would like to tell you that ${val.message}.`;
  //   });
  // }

  // =======================formArray start====================================
  create_corrMessageRefId(value: string) {
    return this.builder.group({
      corrMessageRefId: new FormControl(value)
    });
  }

  // 支付
  create_payment(payment: PaymentType) {
    if (payment) {
      return this.builder.group({
        payment_type: new FormControl(payment.type, Validators.required),
        paymentAmnt: new FormControl(payment.paymentAmnt.value, Validators.required),
        paymentAmnt_attr_currCode: new FormControl(payment.paymentAmnt.currCode, Validators.required)
      });
    }

    return this.builder.group({
      payment_type: new FormControl('', Validators.required),
      paymentAmnt: new FormControl('', Validators.required),
      paymentAmnt_attr_currCode: new FormControl('', Validators.required)
    });
  }

  create_con() {
    return this.builder.group({
      con_resCountryCode_array: this.builder.array([this.create_con_resCountryCode(null)]), // formArray

      con_name_array: this.builder.array([this.create_con_name()]), // formArray

      con_in_array: this.builder.array([this.create_con_in(null)]), // formArray

      con_address_array: this.builder.array([this.create_con_address(null, null)]), // formArray

      con_birthInfo_birthDate: new FormControl(''),
      con_birthInfo_city: new FormControl(''),
      con_birthInfo_citySubentity: new FormControl(''),
      con_birthInfo_countryInfo_countryCode: new FormControl(''),
      con_birthInfo_countryInfo_formerCountryName: new FormControl(''),
      con_ctrlgPersonType: new FormControl('')
    });
  }

  // 具控制權人 地址
  create_con_address(address: AddressType, type: string) {
    if (address) {
      if (type === '2') {
        return this.builder.group({
          con_addressType: new FormControl(type),
          con_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          con_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          con_addrFree: new FormControl(''),
          con_address_street: new FormControl(address.addressFixType.street),
          con_address_buildingIdentifier: new FormControl(address.addressFixType.buildingIdentifier),
          con_address_floorIdentifier: new FormControl(address.addressFixType.floorIdentifier),
          con_address_POB: new FormControl(address.addressFixType.pob),
          con_address_postCode: new FormControl(address.addressFixType.postCode),
          con_address_city: new FormControl(address.addressFixType.city, Validators.required),
          con_address_countrySubentity: new FormControl(address.addressFixType.countrySubentity),
          con_address_suiteIdentifier: new FormControl(address.addressFixType.suiteIdentifier),
          con_address_districtName: new FormControl(address.addressFixType.districtName)
        });
      } else {
        return this.builder.group({
          con_addressType: new FormControl(type),
          con_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          con_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          con_addrFree: new FormControl(address.addressFree),
          con_address_street: new FormControl(''),
          con_address_buildingIdentifier: new FormControl(''),
          con_address_floorIdentifier: new FormControl(''),
          con_address_POB: new FormControl(''),
          con_address_postCode: new FormControl(''),
          con_address_city: new FormControl('', Validators.required),
          con_address_countrySubentity: new FormControl(''),
          con_address_suiteIdentifier: new FormControl(''),
          con_address_districtName: new FormControl('')
        });
      }
    }

    return this.builder.group({
      con_addressType: new FormControl(''),
      con_address_attr_legalAddressType: new FormControl(''),
      con_address_countryCode: new FormControl('', Validators.required),
      con_addrFree: new FormControl(''),
      con_address_street: new FormControl(''),
      con_address_buildingIdentifier: new FormControl(''),
      con_address_floorIdentifier: new FormControl(''),
      con_address_POB: new FormControl(''),
      con_address_postCode: new FormControl(''),
      con_address_city: new FormControl('', Validators.required),
      con_address_countrySubentity: new FormControl(''),
      con_address_suiteIdentifier: new FormControl(''),
      con_address_districtName: new FormControl('')
    });
  }

  create_rf_address(address: AddressType, type: string) {
    if (address) {
      return this.builder.group({
        rf_addressType: new FormControl(type),
        rf_address_attr_legalAddressType: new FormControl(address.legalAddressType),
        rf_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
        rf_addrFree: new FormControl(address.addressFree, Validators.pattern(this.noChinese)),
        rf_address_street: new FormControl(address.addressFixType.street, Validators.pattern(this.noChinese)),
        rf_address_buildingIdentifier: new FormControl(address.addressFixType.buildingIdentifier, Validators.pattern(this.noChinese)),
        rf_address_floorIdentifier: new FormControl(address.addressFixType.floorIdentifier, Validators.pattern(this.noChinese)),
        rf_address_POB: new FormControl(address.addressFixType.pob, Validators.pattern(this.noChinese)),
        rf_address_postCode: new FormControl(address.addressFixType.postCode, Validators.pattern(this.noChinese)),
        rf_address_city: new FormControl(address.addressFixType.city, [Validators.required, Validators.pattern(this.noChinese)]),
        rf_address_countrySubentity: new FormControl(address.addressFixType.countrySubentity, Validators.pattern(this.noChinese)),
        rf_address_suiteIdentifier: new FormControl(address.addressFixType.suiteIdentifier, Validators.pattern(this.noChinese)),
        rf_address_districtName: new FormControl(address.addressFixType.districtName, Validators.pattern(this.noChinese))
      });
    }

    return this.builder.group({
      rf_addressType: new FormControl(''),
      rf_address_attr_legalAddressType: new FormControl(''),
      rf_address_countryCode: new FormControl('', Validators.required),
      rf_addrFree: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_street: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_buildingIdentifier: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_floorIdentifier: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_POB: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_postCode: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_city: new FormControl('', [Validators.required, Validators.pattern(this.noChinese)]),
      rf_address_countrySubentity: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_suiteIdentifier: new FormControl('', Validators.pattern(this.noChinese)),
      rf_address_districtName: new FormControl('', Validators.pattern(this.noChinese))
    });
  }

  // 組織地址
  create_org_address(address: AddressType, type: string) {
    if (address) {
      if (type === '2') {
        return this.builder.group({
          org_addressType: new FormControl(type),
          org_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          org_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          org_addrFree: new FormControl(''),
          org_address_street: new FormControl(address.addressFixType.street),
          org_address_buildingIdentifier: new FormControl(address.addressFixType.buildingIdentifier),
          org_address_floorIdentifier: new FormControl(address.addressFixType.floorIdentifier),
          org_address_POB: new FormControl(address.addressFixType.pob),
          org_address_postCode: new FormControl(address.addressFixType.postCode),
          org_address_city: new FormControl(address.addressFixType.city, Validators.required),
          org_address_countrySubentity: new FormControl(address.addressFixType.countrySubentity),
          org_address_suiteIdentifier: new FormControl(address.addressFixType.suiteIdentifier),
          org_address_districtName: new FormControl(address.addressFixType.districtName)
        });
      } else {
        return this.builder.group({
          org_addressType: new FormControl(type),
          org_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          org_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          org_addrFree: new FormControl(address.addressFree),
          org_address_street: new FormControl(''),
          org_address_buildingIdentifier: new FormControl(''),
          org_address_floorIdentifier: new FormControl(''),
          org_address_POB: new FormControl(''),
          org_address_postCode: new FormControl(''),
          org_address_city: new FormControl('', Validators.required),
          org_address_countrySubentity: new FormControl(''),
          org_address_suiteIdentifier: new FormControl(''),
          org_address_districtName: new FormControl('')
        });
      }
    }

    return this.builder.group({
      org_addressType: new FormControl(''),
      org_address_attr_legalAddressType: new FormControl(''),
      org_address_countryCode: new FormControl('', Validators.required),
      org_addrFree: new FormControl(''),
      org_address_street: new FormControl(''),
      org_address_buildingIdentifier: new FormControl(''),
      org_address_floorIdentifier: new FormControl(''),
      org_address_POB: new FormControl(''),
      org_address_postCode: new FormControl(''),
      org_address_city: new FormControl('', Validators.required),
      org_address_countrySubentity: new FormControl(''),
      org_address_suiteIdentifier: new FormControl(''),
      org_address_districtName: new FormControl('')
    });
  }

  create_ind_address(address: AddressType, type: string) {
    if (address) {
      if (type === '2') {
        return this.builder.group({
          ind_addressType: new FormControl(type),
          ind_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          ind_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          ind_addrFree: new FormControl(''),
          ind_address_street: new FormControl(address.addressFixType.street),
          ind_address_buildingIdentifier: new FormControl(address.addressFixType.buildingIdentifier),
          ind_address_floorIdentifier: new FormControl(address.addressFixType.floorIdentifier),
          ind_address_POB: new FormControl(address.addressFixType.pob),
          ind_address_postCode: new FormControl(address.addressFixType.postCode),
          ind_address_city: new FormControl(address.addressFixType.city, Validators.required),
          ind_address_countrySubentity: new FormControl(address.addressFixType.countrySubentity),
          ind_address_suiteIdentifier: new FormControl(address.addressFixType.suiteIdentifier),
          ind_address_districtName: new FormControl(address.addressFixType.districtName)
        });
      } else {
        return this.builder.group({
          ind_addressType: new FormControl(type),
          ind_address_attr_legalAddressType: new FormControl(address.legalAddressType),
          ind_address_countryCode: new FormControl(address.countryCodeType, Validators.required),
          ind_addrFree: new FormControl(address.addressFree),
          ind_address_street: new FormControl(''),
          ind_address_buildingIdentifier: new FormControl(''),
          ind_address_floorIdentifier: new FormControl(''),
          ind_address_POB: new FormControl(''),
          ind_address_postCode: new FormControl(''),
          ind_address_city: new FormControl('', Validators.required),
          ind_address_countrySubentity: new FormControl(''),
          ind_address_suiteIdentifier: new FormControl(''),
          ind_address_districtName: new FormControl('')
        });
      }
    }

    return this.builder.group({
      ind_addressType: new FormControl(''),
      ind_address_attr_legalAddressType: new FormControl(''),
      ind_address_countryCode: new FormControl('', Validators.required),
      ind_addrFree: new FormControl(''),
      ind_address_street: new FormControl(''),
      ind_address_buildingIdentifier: new FormControl(''),
      ind_address_floorIdentifier: new FormControl(''),
      ind_address_POB: new FormControl(''),
      ind_address_postCode: new FormControl(''),
      ind_address_city: new FormControl('', Validators.required),
      ind_address_countrySubentity: new FormControl(''),
      ind_address_suiteIdentifier: new FormControl(''),
      ind_address_districtName: new FormControl('')
    });
  }

  create_ind_in(tINType: TINType) {
    if (tINType) {
      return this.builder.group({
        ind_tin: new FormControl(tINType.value),
        ind_tin_attr_issuedBy: new FormControl(tINType.issuedBy)
      });
    }

    return this.builder.group({
      ind_tin: new FormControl(''),
      ind_tin_attr_issuedBy: new FormControl('')
    });
  }

  create_con_in(tINType: TINType) {
    if (tINType) {
      return this.builder.group({
        con_tin: new FormControl(tINType.value),
        con_tin_attr_issuedBy: new FormControl(tINType.issuedBy)
      });
    }

    return this.builder.group({
      con_tin: new FormControl(''),
      con_tin_attr_issuedBy: new FormControl('')
    });
  }

  create_org_in(organisationINType: OrganisationINType) {
    if (organisationINType) {
      return this.builder.group({
        org_in: new FormControl(organisationINType.value),
        org_tin_attr_issuedBy: new FormControl(organisationINType.CountryCodeType),
        org_tin_attr_INType: new FormControl(organisationINType.inType)
      });
    }

    return this.builder.group({
      org_in: new FormControl(''),
      org_tin_attr_issuedBy: new FormControl(''),
      org_tin_attr_INType: new FormControl('')
    });
  }

  create_rf_in(organisationINType: OrganisationINType) {
    if (organisationINType) {
      return this.builder.group({
        rf_in: new FormControl(organisationINType.value),
        rf_tin_attr_issuedBy: new FormControl(organisationINType.CountryCodeType),
        rf_tin_attr_INType: new FormControl(organisationINType.inType)
      });
    }

    return this.builder.group({
      rf_in: new FormControl(''),
      rf_tin_attr_issuedBy: new FormControl(''),
      rf_tin_attr_INType: new FormControl('')
    });
  }

  create_rf_name(nameOrganisationType: NameOrganisationType) {
    if (nameOrganisationType) {
      return this.builder.group({
        rf_name: new FormControl(nameOrganisationType.value, [Validators.required, Validators.pattern(this.noChinese)]),
        rf_name_attr_nameType: new FormControl(nameOrganisationType.nameType)
      });
    }

    return this.builder.group({
      rf_name: new FormControl('', [Validators.required, Validators.pattern(this.noChinese)]),
      rf_name_attr_nameType: new FormControl('')
    });
  }

  // 組織名稱創建
  create_org_name(nameOrganisationType: NameOrganisationType) {
    if (nameOrganisationType) {
      return this.builder.group({
        org_name: new FormControl(nameOrganisationType.value, [Validators.required, Validators.pattern(this.noChinese)]),
        org_name_attr_nameType: new FormControl(nameOrganisationType.nameType)
      });
    }

    return this.builder.group({
      org_name: new FormControl('', [Validators.required, Validators.pattern(this.noChinese)]),
      org_name_attr_nameType: new FormControl('')
    });
  }

  create_ind_name() {
    return this.builder.group({
      ind_name_suffix_array: this.builder.array([this.create_ind_name_suffix(null)]), // formArray
      ind_name_title_array: this.builder.array([this.create_ind_name_title(null)]), // formArray
      ind_name_middleName_array: this.builder.array([this.create_ind_name_middleName(null)]), // formArray
      ind_name_generationIdentifier_array: this.builder.array([this.create_ind_name_generationIdentifier(null)]), // formArray

      ind_name_attr_nameType: new FormControl(''),
      ind_name_precedingTitle: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_firstName: new FormControl('', [Validators.required, Validators.pattern(this.noChinese)]),
      ind_name_firstName_attr_xnlNameType: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_namePrefix: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_namePrefix_attr_xnlNameType: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_lastName: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_lastName_attr_xnlNameType: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_generalSuffix: new FormControl('', Validators.pattern(this.noChinese))
    });
  }

  // 具控制權之人姓名新增
  create_con_name() {
    return this.builder.group({
      con_name_suffix_array: this.builder.array([this.create_con_name_suffix(null)]), // formArray
      con_name_title_array: this.builder.array([this.create_con_name_title(null)]), // formArray
      con_name_middleName_array: this.builder.array([this.create_con_name_middleName(null)]), // formArray
      con_name_generationIdentifier_array: this.builder.array([this.create_con_name_generationIdentifier(null)]), // formArray

      con_name_attr_nameType: new FormControl(''),
      con_name_precedingTitle: new FormControl(''),
      con_name_firstName: new FormControl('', Validators.required),
      con_name_firstName_attr_xnlNameType: new FormControl(''),
      con_name_namePrefix: new FormControl(''),
      con_name_namePrefix_attr_xnlNameType: new FormControl(''),
      con_name_lastName: new FormControl('', Validators.required),
      con_name_lastName_attr_xnlNameType: new FormControl(''),
      con_name_generalSuffix: new FormControl('')
    });
  }

  create_ind_name_suffix(value: string) {
    return this.builder.group({
      ind_name_suffix: new FormControl(value, Validators.pattern(this.noChinese))
    });
  }

  // 個人稱謂
  create_ind_name_title(value: string) {
    return this.builder.group({
      ind_name_title: new FormControl(value, Validators.pattern(this.noChinese))
    });
  }

  create_ind_name_middleName(middleName: MiddleName) {
    if (middleName) {
      return this.builder.group({
        ind_name_middleName: new FormControl(middleName.value, Validators.pattern(this.noChinese)),
        ind_name_middleName_attr_xnlNameType: new FormControl(middleName.xnlNameType, Validators.pattern(this.noChinese))
      });
    }
    return this.builder.group({
      ind_name_middleName: new FormControl('', Validators.pattern(this.noChinese)),
      ind_name_middleName_attr_xnlNameType: new FormControl('', Validators.pattern(this.noChinese))
    });
  }

  create_ind_name_generationIdentifier(value: string) {
    return this.builder.group({
      ind_name_generationIdentifier: new FormControl(value, Validators.pattern(this.noChinese))
    });
  }

  create_con_name_suffix(value: string) {
    return this.builder.group({
      con_name_suffix: new FormControl(value)
    });
  }

  create_con_name_title(value: string) {
    return this.builder.group({
      con_name_title: new FormControl(value)
    });
  }

  create_con_name_middleName(middleName: MiddleName) {
    if (middleName) {
      return this.builder.group({
        con_name_middleName: new FormControl(middleName.value),
        con_name_middleName_attr_xnlNameType: new FormControl(middleName.xnlNameType)
      });
    }
    return this.builder.group({
      con_name_middleName: new FormControl(''),
      con_name_middleName_attr_xnlNameType: new FormControl('')
    });
  }

  create_con_name_generationIdentifier(value: string) {
    return this.builder.group({
      con_name_generationIdentifier: new FormControl(value)
    });
  }

  create_org_resCountryCode(value: CountryCodeType) {
    return this.builder.group({
      org_resCountryCode: new FormControl(value)
    });
  }

  create_rf_resCountryCode(value: string) {
    return this.builder.group({
      rf_resCountryCode: new FormControl(value)
    });
  }

  // 個人居住者國家代碼
  create_ind_resCountryCode(value: CountryCodeType) {
    return this.builder.group({
      ind_resCountryCode: new FormControl(value, Validators.required)
    });
  }

  // 具控制權之人 國家代碼
  create_con_resCountryCode(value: CountryCodeType) {
    return this.builder.group({
      con_resCountryCode: new FormControl(value, Validators.required)
    });
  }

  add(formArrayObj: FormArray, addArrayItemId: string) {
    console.log('aaaa:', this.searchForm.get('rf_address_array'));

    // formArrayObj.push(this.create_rf_in(null));

    if (addArrayItemId === 'ind_resCountryCode_array') {
      formArrayObj.push(this.create_ind_resCountryCode(null));
    } else if (addArrayItemId === 'rf_resCountryCode_array') {
      formArrayObj.push(this.create_rf_resCountryCode(null));
    } else if (addArrayItemId === 'org_resCountryCode_array') {
      formArrayObj.push(this.create_org_resCountryCode(null));
    } else if (addArrayItemId === 'ind_name_array') {
      formArrayObj.push(this.create_ind_name());
    } else if (addArrayItemId === 'org_name_array') {
      formArrayObj.push(this.create_org_name(null));
    } else if (addArrayItemId === 'rf_name_array') {
      formArrayObj.push(this.create_rf_name(null));
    } else if (addArrayItemId === 'rf_in_array') {
      formArrayObj.push(this.create_rf_in(null));
    } else if (addArrayItemId === 'org_in_array') {
      formArrayObj.push(this.create_org_in(null));
    } else if (addArrayItemId === 'ind_in_array') {
      formArrayObj.push(this.create_ind_in(null));
    } else if (addArrayItemId === 'ind_address_array') {
      formArrayObj.push(this.create_ind_address(null, null));
    } else if (addArrayItemId === 'org_address_array') {
      formArrayObj.push(this.create_org_address(null, null));
    } else if (addArrayItemId === 'rf_address_array') {
      formArrayObj.push(this.create_rf_address(null, null));
    } else if (addArrayItemId === 'ind_name_suffix_array') {
      formArrayObj.push(this.create_ind_name_suffix(null));
    } else if (addArrayItemId === 'ind_name_title_array') {
      formArrayObj.push(this.create_ind_name_title(null));
    } else if (addArrayItemId === 'ind_name_middleName_array') {
      formArrayObj.push(this.create_ind_name_middleName(null));
    } else if (addArrayItemId === 'ind_name_generationIdentifier_array') {
      formArrayObj.push(this.create_ind_name_generationIdentifier(null));
    } else if (addArrayItemId === 'con_resCountryCode_array') {
      formArrayObj.push(this.create_con_resCountryCode(null));
    } else if (addArrayItemId === 'con_name_array') {
      formArrayObj.push(this.create_con_name());
    } else if (addArrayItemId === 'con_in_array') {
      formArrayObj.push(this.create_con_in(null));
    } else if (addArrayItemId === 'con_address_array') {
      formArrayObj.push(this.create_con_address(null, null));
    } else if (addArrayItemId === 'con_name_suffix_array') {
      formArrayObj.push(this.create_con_name_suffix(null));
    } else if (addArrayItemId === 'con_name_title_array') {
      formArrayObj.push(this.create_con_name_title(null));
    } else if (addArrayItemId === 'con_name_middleName_array') {
      formArrayObj.push(this.create_con_name_middleName(null));
    } else if (addArrayItemId === 'con_name_generationIdentifier_array') {
      formArrayObj.push(this.create_con_name_generationIdentifier(null));
    } else if (addArrayItemId === 'con_array') {
      formArrayObj.push(this.create_con());
    } else if (addArrayItemId === 'payment_array') {
      formArrayObj.push(this.create_payment(null));
    } else if (addArrayItemId === 'corrMessageRefId_array') {
      formArrayObj.push(this.create_corrMessageRefId(null));
    }
  }

  remove(formArrayObj: FormArray, idx: number) {
    formArrayObj.removeAt(idx);
  }

  // 公用
  getFormArray(arrayId: string) {
    return this.searchForm.get(arrayId) as FormArray;
  }

  // =======================formArray end====================================

  saveAccountReport() {
    const accountReport = new CorrectableAccountReportType();
    const accountHolder = new AccountHolderType();
    const controllingPerson: ControllingPersonType[] = [];

    accountHolder.pacctHolderType = this.searchForm.get('acctHolderType').value;
    if (this.searchForm.get('accountHolderType').value === '1') {
      const individual = new PersonPartyType();

      /** 個人-姓名 **/
      const indName: NamePersonType[] = [];
      const indNameArray = this.getFormArray('ind_name_array').controls;
      for (let i = 0; i < indNameArray.length; i++) {
        const nameObj = new NamePersonType();
        nameObj.precedingTitle = indNameArray[i].get('ind_name_precedingTitle').value;
        const firstName = new FirstName();
        firstName.value = indNameArray[i].get('ind_name_firstName').value;
        firstName.xnlNameType = indNameArray[i].get('ind_name_firstName_attr_xnlNameType').value;
        nameObj.firstName = firstName;
        const lastName = new LastName();
        lastName.value = indNameArray[i].get('ind_name_lastName').value;
        lastName.xnlNameType = indNameArray[i].get('ind_name_lastName_attr_xnlNameType').value;
        nameObj.lastName = lastName;
        const namePrefix = new NamePrefix();
        namePrefix.value = indNameArray[i].get('ind_name_namePrefix').value;
        namePrefix.xnlNameType = indNameArray[i].get('ind_name_namePrefix_attr_xnlNameType').value;
        nameObj.namePrefix = namePrefix;
        nameObj.generalSuffix = indNameArray[i].get('ind_name_generalSuffix').value;
        nameObj.nameType = this.saveCheckNull(indNameArray[i].get('ind_name_attr_nameType').value);

        const title: string[] = [];
        const indNameTitleArray = (indNameArray[i].get('ind_name_title_array') as FormArray).controls;
        for (let j = 0; j < indNameTitleArray.length; j++) {
          title.push(indNameTitleArray[j].get('ind_name_title').value);
        }
        nameObj.title = title;

        const middleNameArray: MiddleName[] = [];
        const indNameMiddleNameArray = (indNameArray[i].get('ind_name_middleName_array') as FormArray).controls;
        for (let j = 0; j < indNameMiddleNameArray.length; j++) {
          const middleName = new MiddleName();
          middleName.value = indNameMiddleNameArray[j].get('ind_name_middleName').value;
          middleName.xnlNameType = indNameMiddleNameArray[j].get('ind_name_middleName_attr_xnlNameType').value;
          middleNameArray.push(middleName);
        }
        nameObj.middleName = middleNameArray;

        const generationIdentifier: string[] = [];
        const indNameGenerationIdentifierArray = (indNameArray[i].get('ind_name_generationIdentifier_array') as FormArray).controls;
        for (let j = 0; j < indNameGenerationIdentifierArray.length; j++) {
          generationIdentifier.push(indNameGenerationIdentifierArray[j].get('ind_name_generationIdentifier').value);
        }
        nameObj.generationIdentifier = generationIdentifier;

        const suffix: string[] = [];
        const indNameSuffixArray = (indNameArray[i].get('ind_name_suffix_array') as FormArray).controls;
        for (let j = 0; j < indNameSuffixArray.length; j++) {
          suffix.push(indNameSuffixArray[j].get('ind_name_suffix').value);
        }
        nameObj.suffix = suffix;

        indName.push(nameObj);
      }
      individual.name = indName;

      /** 個人-地址 **/
      const indAddress: AddressType[] = [];
      const indAddressArray = this.getFormArray('ind_address_array').controls;
      for (let i = 0; i < indAddressArray.length; i++) {
        const addressObj = new AddressType();
        addressObj.legalAddressType = this.saveCheckNull(indAddressArray[i].get('ind_address_attr_legalAddressType').value);
        addressObj.countryCodeType = this.saveCheckNull(indAddressArray[i].get('ind_address_countryCode').value);
        if (indAddressArray[i].get('ind_addressType').value === '1') {
          // 自由格式
          addressObj.addressFree = indAddressArray[i].get('ind_addrFree').value;
          addressObj.addressFixType = null;
        } else {
          const addressdFixType = new AddressFixType();
          addressdFixType.buildingIdentifier = indAddressArray[i].get('ind_address_buildingIdentifier').value;
          addressdFixType.city = indAddressArray[i].get('ind_address_city').value;
          addressdFixType.countrySubentity = indAddressArray[i].get('ind_address_countrySubentity').value;
          addressdFixType.districtName = indAddressArray[i].get('ind_address_districtName').value;
          addressdFixType.floorIdentifier = indAddressArray[i].get('ind_address_floorIdentifier').value;
          addressdFixType.pob = indAddressArray[i].get('ind_address_POB').value;
          addressdFixType.postCode = indAddressArray[i].get('ind_address_postCode').value;
          addressdFixType.street = indAddressArray[i].get('ind_address_street').value;
          addressdFixType.suiteIdentifier = indAddressArray[i].get('ind_address_suiteIdentifier').value;
          addressObj.addressFixType = addressdFixType;
          addressObj.addressFree = null;
        }

        indAddress.push(addressObj);
      }
      if (indAddress.length > 0) {
        individual.address = indAddress;
      } else {
        individual.address = null;
      }

      /** 識別碼 **/
      const indIn: TINType[] = [];
      const indInArray = this.getFormArray('ind_in_array').controls;
      for (let i = 0; i < indInArray.length; i++) {
        const inObj = new TINType();
        inObj.value = this.saveCheckNull(indInArray[i].get('ind_tin').value);
        inObj.issuedBy = this.saveCheckNull(indInArray[i].get('ind_tin_attr_issuedBy').value);

        indIn.push(inObj);
      }
      if (indIn.length > 0) {
        individual.tin = indIn;
      } else {
        individual.tin = null;
      }

      /** 居住國代碼 **/
      const indResCountryCode: CountryCodeType[] = [];
      const indResCountryCodeArray = this.getFormArray('ind_resCountryCode_array').controls;
      for (let i = 0; i < indResCountryCodeArray.length; i++) {
        indResCountryCode.push(indResCountryCodeArray[i].get('ind_resCountryCode').value);
      }
      individual.resCountryCode = indResCountryCode;

      /** 生日 **/
      const birthInfo = new BirthInfo();
      birthInfo.birthDate = this.searchForm.get(['ind_birthInfo_birthDate']).value;
      birthInfo.city = this.searchForm.get('ind_birthInfo_city').value;
      birthInfo.citySubentity = this.searchForm.get('ind_birthInfo_citySubentity').value;
      const countryInfo = new CountryInfo();
      countryInfo.countryCode = this.saveCheckNull(this.searchForm.get('ind_birthInfo_countryInfo_countryCode').value);
      countryInfo.formerCountryName = this.searchForm.get('ind_birthInfo_countryInfo_formerCountryName').value;
      birthInfo.countryInfo = countryInfo;

      if (this.searchForm.get('ind_birthInfo_birthDate').value === '') {
        individual.birthInfo = null;
      } else {
        individual.birthInfo = birthInfo;
      }

      accountHolder.individual = individual;
      accountHolder.organisation = null;
    } else {
      const organisation = new OrganisationPartyType();

      /** 組織-姓名 **/
      const orgName: NameOrganisationType[] = [];
      const orgNameArray = this.getFormArray('org_name_array').controls;
      for (let i = 0; i < orgNameArray.length; i++) {
        const nameObj = new NameOrganisationType();
        nameObj.nameType = this.saveCheckNull(orgNameArray[i].get('org_name_attr_nameType').value);
        nameObj.value = orgNameArray[i].get('org_name').value;
        orgName.push(nameObj);
      }
      organisation.name = orgName;

      /** 組織-地址 **/
      const orgAddress: AddressType[] = [];
      const orgAddressArray = this.getFormArray('org_address_array').controls;
      for (let i = 0; i < orgAddressArray.length; i++) {
        const addressObj = new AddressType();
        addressObj.legalAddressType = this.saveCheckNull(orgAddressArray[i].get('org_address_attr_legalAddressType').value);
        addressObj.countryCodeType = this.saveCheckNull(orgAddressArray[i].get('org_address_countryCode').value);
        if (orgAddressArray[i].get('org_addressType').value === '1') {
          // 自由格式
          addressObj.addressFree = orgAddressArray[i].get('org_addrFree').value;
          addressObj.addressFixType = null;
        } else {
          const addressdFixType = new AddressFixType();
          addressdFixType.buildingIdentifier = orgAddressArray[i].get('org_address_buildingIdentifier').value;
          addressdFixType.city = orgAddressArray[i].get('org_address_city').value;
          addressdFixType.countrySubentity = orgAddressArray[i].get('org_address_countrySubentity').value;
          addressdFixType.districtName = orgAddressArray[i].get('org_address_districtName').value;
          addressdFixType.floorIdentifier = orgAddressArray[i].get('org_address_floorIdentifier').value;
          addressdFixType.pob = orgAddressArray[i].get('org_address_POB').value;
          addressdFixType.postCode = orgAddressArray[i].get('org_address_postCode').value;
          addressdFixType.street = orgAddressArray[i].get('org_address_street').value;
          addressdFixType.suiteIdentifier = orgAddressArray[i].get('org_address_suiteIdentifier').value;
          addressObj.addressFixType = addressdFixType;
          addressObj.addressFree = null;
        }
        orgAddress.push(addressObj);
      }
      if (orgAddress.length > 0) {
        organisation.address = orgAddress;
      } else {
        organisation.address = null;
      }

      /** 組織-識別碼 **/
      const orgIn: OrganisationINType[] = [];
      const orgInArray = this.getFormArray('org_in_array').controls;
      for (let i = 0; i < orgInArray.length; i++) {
        const inObj = new OrganisationINType();
        inObj.CountryCodeType = this.saveCheckNull(orgInArray[i].get('org_tin_attr_issuedBy').value);
        inObj.inType = this.saveCheckNull(orgInArray[i].get('org_tin_attr_INType').value);
        inObj.value = orgInArray[i].get('org_in').value;
        orgIn.push(inObj);
      }
      if (orgIn.length > 0) {
        organisation.in = orgIn;
      } else {
        organisation.in = null;
      }

      /** 組織-居住國代碼 **/
      const orgResCountryCode: CountryCodeType[] = [];
      const orgResCountryCodeArray = this.getFormArray('org_resCountryCode_array').controls;
      for (let i = 0; i < orgResCountryCodeArray.length; i++) {
        orgResCountryCode.push(orgResCountryCodeArray[i].get('org_resCountryCode').value);
      }
      organisation.resCountryCode = orgResCountryCode;

      accountHolder.individual = null;
      accountHolder.organisation = organisation;
    }
    accountReport.accountHolder = accountHolder;

    /** 具控制權人 start **/
    const conPersonArray: ControllingPersonType[] = [];
    /** 具控制權人-姓名 **/
    const conArray = this.getFormArray('con_array').controls;
    for (let c = 0; c < conArray.length; c++) {
      const conPerson = new ControllingPersonType();
      const individual = new PersonPartyType();

      const conName: NamePersonType[] = [];

      const conNameArray = (conArray[c].get('con_name_array') as FormArray).controls;
      for (let i = 0; i < conNameArray.length; i++) {
        const nameObj = new NamePersonType();
        nameObj.precedingTitle = conNameArray[i].get('con_name_precedingTitle').value;
        const firstName = new FirstName();
        firstName.value = conNameArray[i].get('con_name_firstName').value;
        firstName.xnlNameType = conNameArray[i].get('con_name_firstName_attr_xnlNameType').value;
        nameObj.firstName = firstName;
        const lastName = new LastName();
        lastName.value = conNameArray[i].get('con_name_lastName').value;
        lastName.xnlNameType = conNameArray[i].get('con_name_lastName_attr_xnlNameType').value;
        nameObj.lastName = lastName;
        const namePrefix = new NamePrefix();
        namePrefix.value = conNameArray[i].get('con_name_namePrefix').value;
        namePrefix.xnlNameType = conNameArray[i].get('con_name_namePrefix_attr_xnlNameType').value;
        nameObj.namePrefix = namePrefix;
        nameObj.generalSuffix = conNameArray[i].get('con_name_generalSuffix').value;
        nameObj.nameType = this.saveCheckNull(conNameArray[i].get('con_name_attr_nameType').value);

        const title: string[] = [];
        const conNameTitleArray = (conNameArray[i].get('con_name_title_array') as FormArray).controls;
        for (let j = 0; j < conNameTitleArray.length; j++) {
          title.push(conNameTitleArray[j].get('con_name_title').value);
        }
        nameObj.title = title;

        const middleNameArray: MiddleName[] = [];
        const conNameMiddleNameArray = (conNameArray[i].get('con_name_middleName_array') as FormArray).controls;
        for (let j = 0; j < conNameMiddleNameArray.length; j++) {
          const middleName = new MiddleName();
          middleName.value = conNameMiddleNameArray[j].get('con_name_middleName').value;
          middleName.xnlNameType = conNameMiddleNameArray[j].get('con_name_middleName_attr_xnlNameType').value;
          middleNameArray.push(middleName);
        }
        nameObj.middleName = middleNameArray;

        const generationIdentifier: string[] = [];
        const conNameGenerationIdentifierArray = (conNameArray[i].get('con_name_generationIdentifier_array') as FormArray).controls;
        for (let j = 0; j < conNameGenerationIdentifierArray.length; j++) {
          generationIdentifier.push(conNameGenerationIdentifierArray[j].get('con_name_generationIdentifier').value);
        }
        nameObj.generationIdentifier = generationIdentifier;

        const suffix: string[] = [];
        const conNameSuffixArray = (conNameArray[i].get('con_name_suffix_array') as FormArray).controls;
        for (let j = 0; j < conNameSuffixArray.length; j++) {
          suffix.push(conNameSuffixArray[j].get('con_name_suffix').value);
        }
        nameObj.suffix = suffix;

        conName.push(nameObj);
      }
      individual.name = conName;

      /** 具控制權人-地址 **/
      const conAddress: AddressType[] = [];
      const conAddressArray = (conArray[c].get('con_address_array') as FormArray).controls;
      for (let i = 0; i < conAddressArray.length; i++) {
        const addressObj = new AddressType();
        addressObj.legalAddressType = this.saveCheckNull(conAddressArray[i].get('con_address_attr_legalAddressType').value);
        addressObj.countryCodeType = this.saveCheckNull(conAddressArray[i].get('con_address_countryCode').value);
        if (conAddressArray[i].get('con_addressType').value === '1') {
          // 自由格式
          addressObj.addressFree = conAddressArray[i].get('con_addrFree').value;
          addressObj.addressFixType = null;
        } else {
          const addressdFixType = new AddressFixType();
          addressdFixType.buildingIdentifier = conAddressArray[i].get('con_address_buildingIdentifier').value;
          addressdFixType.city = conAddressArray[i].get('con_address_city').value;
          addressdFixType.countrySubentity = conAddressArray[i].get('con_address_countrySubentity').value;
          addressdFixType.districtName = conAddressArray[i].get('con_address_districtName').value;
          addressdFixType.floorIdentifier = conAddressArray[i].get('con_address_floorIdentifier').value;
          addressdFixType.pob = conAddressArray[i].get('con_address_POB').value;
          addressdFixType.postCode = conAddressArray[i].get('con_address_postCode').value;
          addressdFixType.street = conAddressArray[i].get('con_address_street').value;
          addressdFixType.suiteIdentifier = conAddressArray[i].get('con_address_suiteIdentifier').value;
          addressObj.addressFixType = addressdFixType;
          addressObj.addressFree = null;
        }

        conAddress.push(addressObj);
      }
      if (conAddress.length > 0) {
        individual.address = conAddress;
      } else {
        individual.address = null;
      }

      /** 識別碼 **/
      const conIn: TINType[] = [];
      const conInArray = (conArray[c].get('con_in_array') as FormArray).controls;
      for (let i = 0; i < conInArray.length; i++) {
        const inObj = new TINType();
        inObj.value = this.saveCheckNull(conInArray[i].get('con_tin').value);
        inObj.issuedBy = this.saveCheckNull(conInArray[i].get('con_tin_attr_issuedBy').value);

        conIn.push(inObj);
      }
      if (conIn.length > 0) {
        individual.tin = conIn;
      } else {
        individual.tin = null;
      }

      /** 居住國代碼 **/
      const conResCountryCode: CountryCodeType[] = [];
      const conResCountryCodeArray = (conArray[c].get('con_resCountryCode_array') as FormArray).controls;
      for (let i = 0; i < conResCountryCodeArray.length; i++) {
        if (
          conResCountryCodeArray[i].get('con_resCountryCode').value !== '' &&
          conResCountryCodeArray[i].get('con_resCountryCode').value != null
        ) {
          conResCountryCode.push(conResCountryCodeArray[i].get('con_resCountryCode').value);
        }
      }
      if (conResCountryCode.length > 0) {
        individual.resCountryCode = conResCountryCode;
      } else {
        individual.resCountryCode = null;
      }

      /** 生日 **/
      const birthInfo = new BirthInfo();
      birthInfo.birthDate = conArray[c].get('con_birthInfo_birthDate').value;
      birthInfo.city = conArray[c].get('con_birthInfo_city').value;
      birthInfo.citySubentity = conArray[c].get('con_birthInfo_citySubentity').value;
      const countryInfo = new CountryInfo();
      countryInfo.countryCode = this.saveCheckNull(conArray[c].get('con_birthInfo_countryInfo_countryCode').value);
      countryInfo.formerCountryName = conArray[c].get('con_birthInfo_countryInfo_formerCountryName').value;
      birthInfo.countryInfo = countryInfo;

      if (conArray[c].get('con_birthInfo_birthDate').value === '') {
        individual.birthInfo = null;
      } else {
        individual.birthInfo = birthInfo;
      }

      conPerson.individual = individual;
      conPerson.ctrlgPersonType = this.saveCheckNull(conArray[c].get('con_ctrlgPersonType').value);

      if (conResCountryCode.length > 0) {
        /** 具控制權人連居住國家代碼都沒填, 視為沒資料 **/
        conPersonArray.push(conPerson);
      }
    }

    if (conPersonArray.length > 0) {
      accountReport.controllingPerson = conPersonArray;
    } else {
      accountReport.controllingPerson = null;
    }
    /** 具控制權人 end **/

    /** 帳戶報告文檔 **/
    const docSpecType = new DocSpecType();
    docSpecType.docTypeIndic = this.saveCheckNull(this.searchForm.get('ar_docTypeIndic').value);
    docSpecType.docRefID = this.searchForm.get('ar_docRefId').value;
    docSpecType.corrDocRefID = this.searchForm.get('ar_corrDocRefId').value;
    accountReport.docSpec = docSpecType;

    /** 帳戶號碼 **/
    const fIAccountNumberType = new FIAccountNumberType();
    fIAccountNumberType.value = this.searchForm.get('accountNumber').value;
    fIAccountNumberType.acctNumberType = this.saveCheckNull(this.searchForm.get('attr_AcctNumberType').value);
    if (this.searchForm.get('attr_UndocumentedAccount').value === '1') {
      fIAccountNumberType.undocumentedAccount = true;
    } else {
      fIAccountNumberType.undocumentedAccount = false;
    }
    if (this.searchForm.get('attr_ClosedAccount').value === '1') {
      fIAccountNumberType.closedAccount = true;
    } else {
      fIAccountNumberType.closedAccount = false;
    }
    if (this.searchForm.get('attr_DormantAccount').value === '1') {
      fIAccountNumberType.dormantAccount = true;
    } else {
      fIAccountNumberType.dormantAccount = false;
    }
    accountReport.accountNumber = fIAccountNumberType;

    /** 帳戶餘額 **/
    const monAmntType = new MonAmntType();
    monAmntType.value = this.searchForm.get('accountBalance').value;
    monAmntType.currCode = this.saveCheckNull(this.searchForm.get('accountBalance_attr_currCode').value);
    accountReport.accountBalance = monAmntType;

    /** 支付 **/
    const payment: PaymentType[] = [];
    const paymentArray = this.getFormArray('payment_array').controls;
    for (let i = 0; i < paymentArray.length; i++) {
      const paymentObj = new PaymentType();
      const paymentMon = new MonAmntType();
      paymentMon.value = paymentArray[i].get('paymentAmnt').value;
      paymentMon.currCode = this.saveCheckNull(paymentArray[i].get('paymentAmnt_attr_currCode').value);
      paymentObj.paymentAmnt = paymentMon;
      paymentObj.type = this.saveCheckNull(paymentArray[i].get('payment_type').value);

      payment.push(paymentObj);
    }
    if (payment.length > 0) {
      accountReport.payment = payment;
    } else {
      accountReport.payment = null;
    }

    if (this.arIdex === -1) {
      // 新增
      this.arIdex = this.accountReportArray.length;
    }
    this.accountReportArray[this.arIdex] = accountReport;
  }

  createAccountReport(isChangePage: boolean) {
    if (!isChangePage) {
      // 如果只是切換頁數不要把index重設
      this.arIdex = -1;
    }
    /** 個人 **/
    const indNameArray = this.getFormArray('ind_name_array');
    indNameArray.controls = [];
    indNameArray.push(this.create_ind_name());
    const indAddressArray = this.getFormArray('ind_address_array');
    indAddressArray.controls = [];
    indAddressArray.push(this.create_ind_address(null, null));
    const indInArray = this.getFormArray('ind_in_array');
    indInArray.controls = [];
    indInArray.push(this.create_ind_in(null));
    const indResCountryCodeArray = this.getFormArray('ind_resCountryCode_array');
    indResCountryCodeArray.controls = [];
    indResCountryCodeArray.push(this.create_ind_resCountryCode(null));
    this.searchForm.get('ind_birthInfo_birthDate').setValue('');
    this.searchForm.get('ind_birthInfo_city').setValue('');
    this.searchForm.get('ind_birthInfo_citySubentity').setValue('');
    this.searchForm.get('ind_birthInfo_countryInfo_countryCode').setValue('');
    this.searchForm.get('ind_birthInfo_countryInfo_formerCountryName').setValue('');

    /** 組織 **/
    const orgNameArray = this.getFormArray('org_name_array');
    orgNameArray.controls = [];
    orgNameArray.push(this.create_org_name(null));
    const orgAddressArray = this.getFormArray('org_address_array');
    orgAddressArray.controls = [];
    orgAddressArray.push(this.create_org_address(null, null));
    const orgInArray = this.getFormArray('org_in_array');
    orgInArray.controls = [];
    orgInArray.push(this.create_org_in(null));
    const orgResCountryCodeArray = this.getFormArray('org_resCountryCode_array');
    orgResCountryCodeArray.controls = [];
    orgResCountryCodeArray.push(this.create_org_resCountryCode(null));

    /** 帳戶報告文檔 **/
    this.searchForm.get('ar_docTypeIndic').setValue('');
    this.searchForm.get('ar_docRefId').setValue('');
    this.searchForm.get('ar_corrDocRefId').setValue('');

    /** 帳戶號碼 **/
    this.searchForm.get('accountNumber').setValue('');
    this.searchForm.get('attr_AcctNumberType').setValue('');
    this.searchForm.patchValue({ attr_UndocumentedAccount: '1', checked: true });
    this.searchForm.patchValue({ attr_ClosedAccount: '1', checked: true });
    this.searchForm.patchValue({ attr_DormantAccount: '1', checked: true });

    /** 帳戶餘額 **/
    this.searchForm.get('accountBalance').setValue('');
    this.searchForm.get('accountBalance_attr_currCode').setValue('');

    /** 支付 **/
    const paymentArray = this.getFormArray('payment_array');
    paymentArray.controls = [];
    paymentArray.push(this.create_payment(null));

    /** 具控制權人 **/
    const conArray = this.getFormArray('con_array');
    conArray.controls = [];
    conArray.push(this.create_con());

    /** 預設停在個人 **/
    // 控制權人 跟帳戶持有人 是不同區塊的東西 用不到accountType
    // this.searchForm.patchValue({ accountType: '1', checked: true });
    this.searchForm.patchValue({ accountHolderType: '1', checked: true });
  }

  // 最下方上下筆資料
  preOrNextAccountReport(toDo: number) {
    this.createAccountReport(true);
    if (toDo === 0) {
      if (this.arIdex === -1) {
        this.arIdex = this.accountReportArray.length - 1;
      } else {
        this.arIdex = this.arIdex - 1;
      }
    } else {
      this.arIdex = this.arIdex + 1;
    }

    const accountReport = this.accountReportArray[this.arIdex];
    const accountHolder = accountReport.accountHolder; // AccountHolderType
    const individual = accountHolder.individual; // PersonPartyType
    const organisation = accountHolder.organisation;

    if (individual) {
      // 控制權人 跟帳戶持有人 是不同區塊的東西 用不到accountType
      // this.searchForm.patchValue({ accountType: '1', checked: true });
      this.searchForm.patchValue({ accountHolderType: '1', checked: true });
    } else {
      // 控制權人 跟帳戶持有人 是不同區塊的東西 用不到accountType
      // this.searchForm.patchValue({ accountType: '1', checked: true });
      this.searchForm.patchValue({ accountHolderType: '2', checked: true });
    }

    if (individual) {
      /** 個人  **/
      const nameArray = individual.name; // NamePersonType[]
      for (let i = 0; i < nameArray.length; i++) {
        const elIndNameArray = this.getFormArray('ind_name_array'); // 取得姓名FormArray
        elIndNameArray.setControl(i, this.create_ind_name()); // 建立第i個姓名control
        const indTitleArray = nameArray[i].title; // string[]
        const elIndTitleArray = elIndNameArray.controls[i].get('ind_name_title_array') as FormArray;
        for (let j = 0; j < indTitleArray.length; j++) {
          elIndTitleArray.setControl(j, this.create_ind_name_title(indTitleArray[j]));
        }
        const indMiddleNameArray = nameArray[i].middleName;
        const elIndMiddleNameArray = elIndNameArray.controls[i].get('ind_name_middleName_array') as FormArray;
        for (let j = 0; j < indMiddleNameArray.length; j++) {
          elIndMiddleNameArray.setControl(j, this.create_ind_name_middleName(indMiddleNameArray[j]));
        }
        const indGenerationIdentifierArray = nameArray[i].generationIdentifier;
        const elindGenerationIdentifierArray = elIndNameArray.controls[i].get('ind_name_generationIdentifier_array') as FormArray;
        for (let j = 0; j < indGenerationIdentifierArray.length; j++) {
          elindGenerationIdentifierArray.setControl(j, this.create_ind_name_generationIdentifier(indGenerationIdentifierArray[j]));
        }
        const indSuffixArray = nameArray[i].suffix;
        const elindSuffixArray = elIndNameArray.controls[i].get('ind_name_suffix_array') as FormArray;
        for (let j = 0; j < indSuffixArray.length; j++) {
          elindSuffixArray.setControl(j, this.create_ind_name_suffix(indSuffixArray[j]));
        }
        const indPrecedingTitle = nameArray[i].precedingTitle;
        elIndNameArray.controls[i].get('ind_name_precedingTitle').setValue(indPrecedingTitle);
        const indFirstName = nameArray[i].firstName;
        elIndNameArray.controls[i].get('ind_name_firstName').setValue(indFirstName.value);
        elIndNameArray.controls[i].get('ind_name_firstName_attr_xnlNameType').setValue(indFirstName.xnlNameType);
        const indLastName = nameArray[i].lastName;
        elIndNameArray.controls[i].get('ind_name_lastName').setValue(indLastName.value);
        elIndNameArray.controls[i].get('ind_name_lastName_attr_xnlNameType').setValue(indLastName.xnlNameType);
        const indNamePrefix = nameArray[i].namePrefix;
        elIndNameArray.controls[i].get('ind_name_namePrefix').setValue(indNamePrefix.value);
        elIndNameArray.controls[i].get('ind_name_namePrefix_attr_xnlNameType').setValue(indNamePrefix.xnlNameType);

        elIndNameArray.controls[i].get('ind_name_generalSuffix').setValue(nameArray[i].generalSuffix);
        elIndNameArray.controls[i].get('ind_name_attr_nameType').setValue(nameArray[i].nameType);
      }

      /** 地址 **/
      const addressArray = individual.address; // AddressType[]
      for (let i = 0; i < addressArray.length; i++) {
        const elIndAddressArray = this.getFormArray('ind_address_array');
        if (addressArray[i].addressFixType) {
          elIndAddressArray.setControl(i, this.create_ind_address(addressArray[i], '2'));
        } else {
          elIndAddressArray.setControl(i, this.create_ind_address(addressArray[i], '1'));
        }
      }

      /** 識別碼 **/
      const inArray = individual.tin; // INType[]
      for (let i = 0; i < inArray.length; i++) {
        const elIndInArray = this.getFormArray('ind_in_array');
        elIndInArray.setControl(i, this.create_ind_in(inArray[i]));
      }

      /** 居住國家代碼 **/
      const resCountryCodeArray = individual.resCountryCode;
      for (let i = 0; i < resCountryCodeArray.length; i++) {
        const elIndResCountryCodeArray = this.getFormArray('ind_resCountryCode_array');
        elIndResCountryCodeArray.setControl(i, this.create_ind_resCountryCode(resCountryCodeArray[i]));
      }

      /** 生日 **/
      if (individual.birthInfo) {
        this.searchForm.get('ind_birthInfo_birthDate').setValue(individual.birthInfo.birthDate);
        this.searchForm.get('ind_birthInfo_city').setValue(individual.birthInfo.city);
        this.searchForm.get('ind_birthInfo_citySubentity').setValue(individual.birthInfo.citySubentity);
        if (individual.birthInfo.countryInfo) {
          this.searchForm.get('ind_birthInfo_countryInfo_countryCode').setValue(individual.birthInfo.countryInfo.countryCode);
          this.searchForm.get('ind_birthInfo_countryInfo_formerCountryName').setValue(individual.birthInfo.countryInfo.formerCountryName);
        }
      }
    } else {
      /** 組織 **/
      const nameArray = organisation.name;
      for (let i = 0; i < nameArray.length; i++) {
        const elOrgNameArray = this.getFormArray('org_name_array'); // 取得姓名FormArray
        elOrgNameArray.setControl(i, this.create_org_name(nameArray[i]));
      }
      /** 地址 **/
      const addressArray = organisation.address; // AddressType[]
      for (let i = 0; i < addressArray.length; i++) {
        const elOrgAddressArray = this.getFormArray('org_address_array');
        if (addressArray[i].addressFixType) {
          elOrgAddressArray.setControl(i, this.create_org_address(addressArray[i], '2'));
        } else {
          elOrgAddressArray.setControl(i, this.create_org_address(addressArray[i], '1'));
        }
      }
      /** 識別碼 **/
      const inArray = organisation.in; // INType[]
      for (let i = 0; i < inArray.length; i++) {
        const elOrgInArray = this.getFormArray('org_in_array');
        elOrgInArray.setControl(i, this.create_org_in(inArray[i]));
      }

      /** 居住國家代碼 **/
      const resCountryCodeArray = organisation.resCountryCode;
      for (let i = 0; i < resCountryCodeArray.length; i++) {
        const elOrgResCountryCodeArray = this.getFormArray('org_resCountryCode_array');
        elOrgResCountryCodeArray.setControl(i, this.create_org_resCountryCode(resCountryCodeArray[i]));
      }
    }
    // ===========================================================================
    /** 帳戶報告文檔 **/
    const docSpecType = accountReport.docSpec;
    if (docSpecType) {
      this.searchForm.get('ar_docTypeIndic').setValue(docSpecType.docTypeIndic);
      this.searchForm.get('ar_docRefId').setValue(docSpecType.docRefID);
      this.searchForm.get('ar_corrDocRefId').setValue(docSpecType.corrDocRefID);
    }

    /** 帳戶號碼 **/
    const fIAccountNumberType = accountReport.accountNumber;
    if (fIAccountNumberType) {
      this.searchForm.get('accountNumber').setValue(fIAccountNumberType.value);
      this.searchForm.get('attr_AcctNumberType').setValue(fIAccountNumberType.acctNumberType);
      if (fIAccountNumberType.undocumentedAccount) {
        this.searchForm.patchValue({ attr_UndocumentedAccount: '1', checked: true });
      } else {
        this.searchForm.patchValue({ attr_UndocumentedAccount: '2', checked: true });
      }
      if (fIAccountNumberType.closedAccount) {
        this.searchForm.patchValue({ attr_ClosedAccount: '1', checked: true });
      } else {
        this.searchForm.patchValue({ attr_ClosedAccount: '2', checked: true });
      }
      if (fIAccountNumberType.dormantAccount) {
        this.searchForm.patchValue({ attr_DormantAccount: '1', checked: true });
      } else {
        this.searchForm.patchValue({ attr_DormantAccount: '2', checked: true });
      }
    }

    /** 帳戶餘額 **/
    const monAmntType = accountReport.accountBalance;
    if (monAmntType) {
      this.searchForm.get('accountBalance').setValue(monAmntType.value);
      this.searchForm.get('accountBalance_attr_currCode').setValue(monAmntType.currCode);
    }

    /** 支付 **/
    const paymentArray = accountReport.payment;
    if (paymentArray) {
      for (let i = 0; i < paymentArray.length; i++) {
        const elPaymentArray = this.getFormArray('payment_array');
        elPaymentArray.setControl(i, this.create_payment(paymentArray[i]));
      }
    }

    const controllingPersonType = accountReport.controllingPerson; // ControllingPersonType[]
    if (controllingPersonType && controllingPersonType.length > 0) {
      for (let c = 0; c < controllingPersonType.length; c++) {
        if (controllingPersonType[c].individual) {
          const elConArray = this.getFormArray('con_array');
          elConArray.setControl(c, this.create_con());

          /** 具控制權人-名稱 **/
          const nameArray = controllingPersonType[c].individual.name; // NamePersonType[]
          for (let i = 0; i < nameArray.length; i++) {
            const elconNameArray = elConArray.controls[c].get('con_name_array') as FormArray; // 取得姓名FormArray
            elconNameArray.setControl(i, this.create_con_name()); // 建立第i個姓名control
            const conTitleArray = nameArray[i].title; // string[]
            const elconTitleArray = elconNameArray.controls[i].get('con_name_title_array') as FormArray;
            for (let j = 0; j < conTitleArray.length; j++) {
              elconTitleArray.setControl(j, this.create_con_name_title(conTitleArray[j]));
            }
            const conMiddleNameArray = nameArray[i].middleName;
            const elconMiddleNameArray = elconNameArray.controls[i].get('con_name_middleName_array') as FormArray;
            for (let j = 0; j < conMiddleNameArray.length; j++) {
              elconMiddleNameArray.setControl(j, this.create_con_name_middleName(conMiddleNameArray[j]));
            }
            const conGenerationIdentifierArray = nameArray[i].generationIdentifier;
            const elconGenerationIdentifierArray = elconNameArray.controls[i].get('con_name_generationIdentifier_array') as FormArray;
            for (let j = 0; j < conGenerationIdentifierArray.length; j++) {
              elconGenerationIdentifierArray.setControl(j, this.create_con_name_generationIdentifier(conGenerationIdentifierArray[j]));
            }
            const conSuffixArray = nameArray[i].suffix;
            const elconSuffixArray = elconNameArray.controls[i].get('con_name_suffix_array') as FormArray;
            for (let j = 0; j < conSuffixArray.length; j++) {
              elconSuffixArray.setControl(j, this.create_con_name_suffix(conSuffixArray[j]));
            }
            const conPrecedingTitle = nameArray[i].precedingTitle;
            elconNameArray.controls[i].get('con_name_precedingTitle').setValue(conPrecedingTitle);
            const conFirstName = nameArray[i].firstName;
            elconNameArray.controls[i].get('con_name_firstName').setValue(conFirstName.value);
            elconNameArray.controls[i].get('con_name_firstName_attr_xnlNameType').setValue(conFirstName.xnlNameType);
            const conLastName = nameArray[i].lastName;
            elconNameArray.controls[i].get('con_name_lastName').setValue(conLastName.value);
            elconNameArray.controls[i].get('con_name_lastName_attr_xnlNameType').setValue(conLastName.xnlNameType);
            const conNamePrefix = nameArray[i].namePrefix;
            elconNameArray.controls[i].get('con_name_namePrefix').setValue(conNamePrefix.value);
            elconNameArray.controls[i].get('con_name_namePrefix_attr_xnlNameType').setValue(conNamePrefix.xnlNameType);

            elconNameArray.controls[i].get('con_name_generalSuffix').setValue(nameArray[i].generalSuffix);
            elconNameArray.controls[i].get('con_name_attr_nameType').setValue(nameArray[i].nameType);
          }

          /** 地址 **/
          const addressArray = controllingPersonType[c].individual.address; // AddressType[]
          for (let i = 0; i < addressArray.length; i++) {
            const elconAddressArray = elConArray.controls[c].get('con_address_array') as FormArray;
            if (addressArray[i].addressFixType) {
              elconAddressArray.setControl(i, this.create_con_address(addressArray[i], '2'));
            } else {
              elconAddressArray.setControl(i, this.create_con_address(addressArray[i], '1'));
            }
          }

          /** 識別碼 **/
          const inArray = controllingPersonType[c].individual.tin; // INType[]
          for (let i = 0; i < inArray.length; i++) {
            const elconInArray = elConArray.controls[c].get('con_in_array') as FormArray;
            elconInArray.setControl(i, this.create_con_in(inArray[i]));
          }

          /** 居住國家代碼 **/
          const resCountryCodeArray = controllingPersonType[c].individual.resCountryCode;
          for (let i = 0; i < resCountryCodeArray.length; i++) {
            const elconResCountryCodeArray = elConArray.controls[c].get('con_resCountryCode_array') as FormArray;
            elconResCountryCodeArray.setControl(i, this.create_con_resCountryCode(resCountryCodeArray[i]));
          }

          /** 生日 **/
          if (controllingPersonType[c].individual.birthInfo) {
            elConArray.controls[c].get('con_birthInfo_birthDate').setValue(controllingPersonType[c].individual.birthInfo.birthDate);
            elConArray.controls[c].get('con_birthInfo_city').setValue(controllingPersonType[c].individual.birthInfo.city);
            elConArray.controls[c].get('con_birthInfo_citySubentity').setValue(controllingPersonType[c].individual.birthInfo.citySubentity);
            if (controllingPersonType[c].individual.birthInfo.countryInfo) {
              elConArray.controls[c]
                .get('con_birthInfo_countryInfo_countryCode')
                .setValue(controllingPersonType[c].individual.birthInfo.countryInfo.countryCode);
              elConArray.controls[c]
                .get('con_birthInfo_countryInfo_formerCountryName')
                .setValue(controllingPersonType[c].individual.birthInfo.countryInfo.formerCountryName);
            }
          }

          if (controllingPersonType[c].ctrlgPersonType) {
            elConArray.controls[c].get('con_ctrlgPersonType').setValue(controllingPersonType[c].ctrlgPersonType);
          }
        } // if (controllingPersonType[c].individual)
      }
    }
  }

  deleteAccountReport() {
    const toDoDeleteArIdex = this.arIdex;

    /** 陣列移轉 **/
    const accountReportArrayCopy: CorrectableAccountReportType[] = [];
    for (let i = 0; i < this.accountReportArray.length; i++) {
      if (i !== toDoDeleteArIdex) {
        accountReportArrayCopy.push(this.accountReportArray[i]);
      }
    }
    this.accountReportArray = [];
    if (accountReportArrayCopy.length > 0) {
      this.accountReportArray = accountReportArrayCopy;
    }

    if (toDoDeleteArIdex === 0) {
      this.createAccountReport(false);
    } else {
      this.arIdex = toDoDeleteArIdex;
      this.preOrNextAccountReport(0); // 移除後,顯示刪除前的前一筆資料
    }
  }

  setChangeAddressForArray(typeProfix: string, profix: string, arrayIndex: number) {
    this.getFormArray(typeProfix + 'address_array')
      .controls[arrayIndex].get(typeProfix + 'addressType')
      .valueChanges.subscribe(value => {
        if (value === '2') {
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(typeProfix + 'addrFree')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'street')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'buildingIdentifier')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'suiteIdentifier')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'floorIdentifier')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'districtName')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'city')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'POB')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'postCode')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'countrySubentity')
            .enable();
        } else {
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(typeProfix + 'addrFree')
            .enable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'street')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'buildingIdentifier')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'suiteIdentifier')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'floorIdentifier')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'districtName')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'city')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'POB')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'postCode')
            .disable();
          this.getFormArray(typeProfix + 'address_array')
            .controls[arrayIndex].get(profix + 'countrySubentity')
            .disable();
        }
      });
  }



  // 確保每個form都是驗證過關的


  checkMessageSpecValid() {
    // 訊息規範
    // console.log("sendingCompanyIN: ", this.searchForm.get('sendingCompanyIN'));
    // console.log("messageType: ", this.searchForm.get('messageType'));
    // console.log("transmittingCountry: ", this.searchForm.get('transmittingCountry'));
    // console.log("receivingCountry: ", this.searchForm.get('receivingCountry'));
    // console.log("messageTypeIndic: ", this.searchForm.get('messageTypeIndic'));
    // console.log("reportingPeriod: ", this.searchForm.get('reportingPeriod'));
    // console.log("corrMessageRefId_array: ", this.searchForm.get('corrMessageRefId_array'));
    // console.log("messageRefId: ", this.searchForm.get('messageRefId'));  目前用不到
    // console.log("contact: ", this.searchForm.get('contact'));
    // console.log("warning: ", this.searchForm.get('warning'));

    // invalid 驗證不過   valid 驗證有過
    // messageRefId 不使用

    const messageSpec_field_array = ['sendingCompanyIN', 'messageType', 'transmittingCountry', 'receivingCountry', 'messageTypeIndic',
      'reportingPeriod', 'corrMessageRefId_array', 'contact', 'warning'];
    messageSpec_field_array.forEach((name: string) => {
      // console.log("欄位內容名稱:", name);
      // console.log("欄位內容valid:", this.searchForm.get(name).valid);
      // alert("欄位內容名稱:" + name + "欄位內容valid:" + this.searchForm.get(name).valid);
      this.messageSpec_valid = this.messageSpec_valid && this.searchForm.get(name).valid;
    });
    console.log('=====================');
    console.log('訊息規範區塊是否通過驗證:', this.messageSpec_valid);
    console.log('=====================');
    // alert(this.messageSpec_valid ? 'true' : 'false');

  }

  checkRfValid() {
    // 申報金融機構
    // console.log("rf_resCountryCode_array:  ", this.searchForm.get('rf_resCountryCode_array:'));
    // console.log("rf_in_array: ", this.searchForm.get('rf_in_array'));
    // console.log("rf_name_array: ", this.searchForm.get('rf_name_array'));
    // console.log("rf_address_array: ", this.searchForm.get('rf_address_array'));


    const rf_field_Array = ['rf_resCountryCode_array', 'rf_in_array', 'rf_name_array', 'rf_address_array'];

    rf_field_Array.forEach((name: string) => {
      // console.log("欄位內容名稱:", name);
      // console.log("欄位內容valid:", this.searchForm.get(name).valid);
      this.rf_valid = this.rf_valid && this.searchForm.get(name).valid;
    });
    console.log('=====================');
    console.log('申報金融機構區塊是否通過驗證:', this.rf_valid);
    console.log('=====================');
  }

  checkArValid() {
    // 帳戶報告
    //  console.log("ar_docTypeIndic: ", this.searchForm.get('ar_docTypeIndic'));
    //  console.log("ar_docRefId: ", this.searchForm.get('ar_docRefId'));
    //  console.log("ar_corrDocRefId: ", this.searchForm.get('ar_corrDocRefId'));
    //  console.log("accountNumber: ", this.searchForm.get('accountNumber'));
    //  console.log("attr_AcctNumberType: ", this.searchForm.get('attr_AcctNumberType'));
    //  console.log("attr_ClosedAccount: ", this.searchForm.get('attr_ClosedAccount'));
    //  console.log("attr_DormantAccount: ", this.searchForm.get('attr_DormantAccount'));
    //  console.log("attr_UndocumentedAccount: ", this.searchForm.get('attr_UndocumentedAccount'));
    //  console.log("acctHolderType: ", this.searchForm.get('acctHolderType'));
    //  console.log("accountHolderType.value: ", this.searchForm.get('accountHolderType').value);


    const ar_field_Array = ['ar_docTypeIndic', 'ar_docRefId', 'ar_corrDocRefId', 'accountNumber', 'attr_AcctNumberType', 'attr_ClosedAccount', 'attr_DormantAccount', 'attr_UndocumentedAccount', 'acctHolderType', 'accountHolderType'];

    ar_field_Array.forEach((name: string) => {
      // console.log("欄位內容名稱:", name);
      // console.log("this.searchForm.get(name):", this.searchForm.get(name));
      // console.log("欄位內容valid:", this.searchForm.get(name).valid);
      this.ar_valid = this.ar_valid && this.searchForm.get(name).valid;
    });


    // 根據持有人 是實體和個人來判斷哪個驗證要參考
    switch (this.searchForm.get('accountHolderType').value) {
      case '1':
        console.log('accountHolderType:是個人 ');

        const ind_field_array = ['ind_address_array', 'ind_in_array', 'ind_name_array', 'ind_resCountryCode_array', 'ind_address_districtName', 'ind_address_suiteIdentifier', 'ind_birthInfo_birthDate', 'ind_birthInfo_city', 'ind_birthInfo_citySubentity', 'ind_birthInfo_countryInfo_countryCode', 'ind_birthInfo_countryInfo_formerCountryName'];
        ind_field_array.forEach((name: string) => {
          // console.log("欄位內容名稱:", name);
          // console.log("欄位內容valid:", this.searchForm.get(name).valid);
          this.ar_valid = this.ar_valid && this.searchForm.get(name).valid;
        });

        // console.log("ind_address_array: ", this.searchForm.get('ind_address_array'));
        // console.log("ind_in_array: ", this.searchForm.get('ind_in_array'));
        // console.log("ind_name_array: ", this.searchForm.get('ind_name_array'));
        // console.log("ind_resCountryCode_array: ", this.searchForm.get('ind_resCountryCode_array'));
        // console.log("ind_address_districtName: ", this.searchForm.get('ind_address_districtName'));
        // console.log("ind_address_suiteIdentifier: ", this.searchForm.get('ind_address_suiteIdentifier'));
        // console.log("ind_birthInfo_birthDate: ", this.searchForm.get('ind_birthInfo_birthDate'));
        // console.log("ind_birthInfo_city: ", this.searchForm.get('ind_birthInfo_city'));
        // console.log("ind_birthInfo_citySubentity: ", this.searchForm.get('ind_birthInfo_citySubentity'));
        // console.log("ind_birthInfo_countryInfo_countryCode: ", this.searchForm.get('ind_birthInfo_countryInfo_countryCode'));
        // console.log("ind_birthInfo_countryInfo_formerCountryName: ", this.searchForm.get('ind_birthInfo_countryInfo_formerCountryName'));
        break;
      case '2':

        const org_field_array = ['org_address_array', 'org_in_array', 'org_name_array', 'org_resCountryCode_array'];
        org_field_array.forEach((name: string) => {
          // console.log("欄位內容名稱:", name);
          // console.log("欄位內容valid:", this.searchForm.get(name).valid);
          this.ar_valid = this.ar_valid && this.searchForm.get(name).valid;
        });
        console.log('accountHolderType:是組織');
        // console.log("org_address_array: ", this.searchForm.get('org_address_array'));
        // console.log("org_in_array: ", this.searchForm.get('org_in_array'));
        // console.log("org_name_array: ", this.searchForm.get('org_name_array'));
        // console.log("org_resCountryCode_array: ", this.searchForm.get('org_resCountryCode_array'));
        break;

    }

    console.log('=====================');
    console.log('帳戶報告區塊是否通過驗證:', this.ar_valid);
    console.log('=====================');
  }

  checkConValid() {
    // 控制權人
    // console.log("con_array: ", this.searchForm.get('con_array'));
    this.searchForm.get('con_array').valid ? this.con_valid = true : this.con_valid = false;
    console.log('=====================');
    console.log('控制權人區塊是否通過驗證:', this.con_valid);
    console.log('=====================');
  }

  checkPaymentValid() {
    // 支付區塊
    // console.log("accountBalance: ", this.searchForm.get('accountBalance'));
    // console.log("accountBalance_attr_currCode: ", this.searchForm.get('accountBalance_attr_currCode'));
    // console.log("payment_array: ", this.searchForm.get('payment_array'));
    const payment_field_Array = ['accountBalance', 'accountBalance_attr_currCode', 'payment_array'];
    payment_field_Array.forEach((name: string) => {
      // console.log("欄位內容名稱:", name);
      // console.log("this.searchForm.get(name):", this.searchForm.get(name));
      // console.log("欄位內容valid:", this.searchForm.get(name).valid);
      this.accountBalance_valid = this.accountBalance_valid && this.searchForm.get(name).valid;
    });

    console.log('=====================');
    console.log('支付區塊是否通過驗證:', this.accountBalance_valid);
    console.log('=====================');
  }

  checkFormValidAll() {

    // 訊息規範
    this.checkMessageSpecValid();
    // 申報金融機構
    this.checkRfValid();
    // 帳戶報告
    this.checkArValid();
    // 控制權人
    this.checkConValid();
    // 支付
    this.checkPaymentValid();

    this.syncAllValidRuslet();
  }

  syncAllValidRuslet() {
    this.validRuslet[0].valid = this.messageSpec_valid;
    this.validRuslet[1].valid = this.rf_valid;
    this.validRuslet[2].valid = this.ar_valid;
    this.validRuslet[3].valid = this.con_valid;
    this.validRuslet[4].valid = this.accountBalance_valid;
  }

  buttonValid() {
    this.checkFormValidAll();
    this.changeMenuClass();
    // let test=this.validRuslet.every((valid) =>{
    //     return valid.valid
    //   });
    const test = this.validRuslet.every((valid) => {
      return valid.valid;
    });
    // alert("test:" + test);
    return true;

    // 送出前檢查是否都填對了
  }

  // 匯出XML
  export() {
    if (this.buttonValid()) {


      const crsBodyType = new CrsBodyType();

      const reportingGroupArray: ReportingGroup[] = [];
      const reportingGroup = new ReportingGroup();
      console.log('accountReportArray:', this.accountReportArray);
      // 含有帳戶資料及 控制權人  個人or 組織  資料
      reportingGroup.accountReport = this.accountReportArray;

      reportingGroupArray.push(reportingGroup);
      crsBodyType.reportingGroup = reportingGroupArray;

      reportingGroupArray.forEach(data => {
        console.log('data', data);
      });
      const reportingFI = new CorrectableOrganisationPartyType();
      const rfName: NameOrganisationType[] = [];
      const rfNameArray = this.getFormArray('rf_name_array').controls;
      for (let i = 0; i < rfNameArray.length; i++) {
        const nameObj = new NameOrganisationType();
        nameObj.nameType = this.saveCheckNull(rfNameArray[i].get('rf_name_attr_nameType').value);
        nameObj.value = rfNameArray[i].get('rf_name').value;
        rfName.push(nameObj);
      }
      reportingFI.name = rfName;

      const rfAddress: AddressType[] = [];
      const rfAddressArray = this.getFormArray('rf_address_array').controls;
      for (let i = 0; i < rfAddressArray.length; i++) {
        const addressObj = new AddressType();
        addressObj.legalAddressType = this.saveCheckNull(rfAddressArray[i].get('rf_address_attr_legalAddressType').value);
        addressObj.countryCodeType = this.saveCheckNull(rfAddressArray[i].get('rf_address_countryCode').value);
        if (rfAddressArray[i].get('rf_addressType').value === '1') {
          // 自由格式
          addressObj.addressFree = rfAddressArray[i].get('rf_addrFree').value;
          addressObj.addressFixType = null;
        } else {
          const addressdFixType = new AddressFixType();
          addressdFixType.buildingIdentifier = rfAddressArray[i].get('rf_address_buildingIdentifier').value;
          addressdFixType.city = rfAddressArray[i].get('rf_address_city').value;
          addressdFixType.countrySubentity = rfAddressArray[i].get('rf_address_countrySubentity').value;
          addressdFixType.districtName = rfAddressArray[i].get('rf_address_districtName').value;
          addressdFixType.floorIdentifier = rfAddressArray[i].get('rf_address_floorIdentifier').value;
          addressdFixType.pob = rfAddressArray[i].get('rf_address_POB').value;
          addressdFixType.postCode = rfAddressArray[i].get('rf_address_postCode').value;
          addressdFixType.street = rfAddressArray[i].get('rf_address_street').value;
          addressdFixType.suiteIdentifier = rfAddressArray[i].get('rf_address_suiteIdentifier').value;
          addressObj.addressFixType = addressdFixType;
          addressObj.addressFree = null;
        }
        rfAddress.push(addressObj);
      }
      reportingFI.address = rfAddress;

      const rfResCountryCode: CountryCodeType[] = [];
      const rfResCountryCodeArray = this.getFormArray('rf_resCountryCode_array').controls;
      for (let i = 0; i < rfResCountryCodeArray.length; i++) {
        if (rfResCountryCodeArray[i].get('rf_resCountryCode').value !== '') {
          rfResCountryCode.push(rfResCountryCodeArray[i].get('rf_resCountryCode').value);
        }
      }
      if (rfResCountryCode.length > 0) {
        reportingFI.resCountryCode = rfResCountryCode;
      } else {
        reportingFI.resCountryCode = null;
      }

      const rfIn: OrganisationINType[] = [];
      const rfInArray = this.getFormArray('rf_in_array').controls;
      for (let i = 0; i < rfInArray.length; i++) {
        const inObj = new OrganisationINType();
        inObj.CountryCodeType = this.saveCheckNull(rfInArray[i].get('rf_tin_attr_issuedBy').value);
        inObj.inType = this.saveCheckNull(rfInArray[i].get('rf_tin_attr_INType').value);
        inObj.value = rfInArray[i].get('rf_in').value;
        rfIn.push(inObj);
      }
      reportingFI.in = rfIn;

      const docSpecType = new DocSpecType();
      docSpecType.docTypeIndic = this.saveCheckNull(this.searchForm.get('ar_docTypeIndic').value);
      docSpecType.docRefID = this.searchForm.get('ar_docRefId').value;
      docSpecType.corrDocRefID = this.searchForm.get('ar_corrDocRefId').value;
      console.log('1:', docSpecType.docTypeIndic);
      console.log('2:', docSpecType.docRefID);
      console.log('3:', docSpecType.corrDocRefID);

      reportingFI.docSpec = docSpecType;

      crsBodyType.reportingFI = reportingFI;

      const messageSpecType = new MessageSpecType();
      messageSpecType.contact = this.searchForm.get('contact').value;
      messageSpecType.messageRefId = this.getMessageRefId();
      messageSpecType.messageType = this.saveCheckNull(this.searchForm.get('messageType').value);
      messageSpecType.messageTypeIndic = this.saveCheckNull(this.searchForm.get('messageTypeIndic').value);
      messageSpecType.receivingCountry = this.searchForm.get('receivingCountry').value;
      messageSpecType.reportingPeriod = this.searchForm.get('reportingPeriod').value;
      messageSpecType.sendingCompanyIN = this.searchForm.get('sendingCompanyIN').value;
      messageSpecType.timestamp = this.getTimestamp();
      messageSpecType.transmittingCountry = this.searchForm.get('transmittingCountry').value;
      messageSpecType.warning = this.searchForm.get('warning').value;
      const corrMessageRefId: string[] = [];
      const corrMessageRefIdArray = this.getFormArray('corrMessageRefId_array').controls;
      for (let i = 0; i < corrMessageRefIdArray.length; i++) {
        corrMessageRefId.push(corrMessageRefIdArray[i].get('corrMessageRefId').value);
      }
      messageSpecType.corrMessageRefId = corrMessageRefId;

      const crsoecd = new CRSOECD();
      const crsBodyTypeArray: CrsBodyType[] = [];
      crsBodyTypeArray.push(crsBodyType);
      crsoecd.crsBody = crsBodyTypeArray;
      crsoecd.messageSpec = messageSpecType;
      crsoecd.version = '1.0';
    }
  }

  /** 選單使用 **/
  saveCheckNull(value: any): any {
    if (value === '') {
      return null;
    } else {
      return value;
    }
  }

  currentPage(): number {
    if (this.arIdex === -1) {
      return this.accountReportArray.length + 1;
    }

    return this.arIdex + 1;
  }

  getTimestamp(): string {
    const sysdate = new Date();
    return formatDate(sysdate, 'yyyy-MM-dd', 'en') + 'T' + formatDate(sysdate, 'hh:mm:ss', 'en');
  }

  getMessageRefId(): string {
    const sendingCompanyIN = this.searchForm.get('sendingCompanyIN');
    if (sendingCompanyIN.value !== '') {
      const sysdate = new Date();
      return (
        'TW' +
        formatDate(sysdate, 'yyyy', 'en') +
        'TW-' +
        sendingCompanyIN.value +
        '-' +
        formatDate(sysdate, 'yyyy-MM-dd', 'en') +
        '-T' +
        formatDate(sysdate, 'hh:mm:ss', 'en')
      );
    }

    return '';
  }
}

export class Cfi109wDto {
  xml: string;
}

export class CRSOECD {
  messageSpec: MessageSpecType;
  crsBody: CrsBodyType[];
  version: string;
}

export class MessageSpecType {
  sendingCompanyIN: string;
  transmittingCountry: string; // CountryCodeType?
  receivingCountry: string; // CountryCodeType?
  messageType: string; // Enum
  warning: string;
  contact: string;
  messageRefId: string;
  messageTypeIndic: string; // Enum
  corrMessageRefId: string[]; // string[]?
  reportingPeriod: string;
  timestamp: string;
}

export class CrsBodyType {
  reportingFI: CorrectableOrganisationPartyType;
  reportingGroup: ReportingGroup[];
}

export class ReportingGroup {
  accountReport: CorrectableAccountReportType[];
}

export class CorrectableAccountReportType {
  docSpec: DocSpecType;
  accountNumber: FIAccountNumberType;
  accountHolder: AccountHolderType;
  controllingPerson: ControllingPersonType[];
  accountBalance: MonAmntType;
  payment: PaymentType[];
}

export class FIAccountNumberType {
  value: string;
  acctNumberType: AcctNumberTypeEnumType;
  undocumentedAccount: boolean;
  closedAccount: boolean;
  dormantAccount: boolean;
}

export class AccountHolderType {
  individual: PersonPartyType;
  organisation: OrganisationPartyType;
  pacctHolderType: CrsAcctHolderTypeEnumType;
}

export class OrganisationPartyType {
  resCountryCode: CountryCodeType[];
  in: OrganisationINType[];
  name: NameOrganisationType[];
  address: AddressType[];
}

export class NameOrganisationType {
  value: string;
  nameType: OECDNameTypeEnumType;
}

export class PersonPartyType {
  resCountryCode: CountryCodeType[]; // CountryCodeType[]
  tin: TINType[];
  name: NamePersonType[];
  address: AddressType[];
  birthInfo: BirthInfo;
}

export class CorrectableOrganisationPartyType extends OrganisationPartyType {
  docSpec: DocSpecType;
}

export class DocSpecType {
  docTypeIndic: string; // Enum OECDDocTypeIndicEnumType
  docRefID: string;
  corrDocRefID: string;
}

export class OrganisationINType {
  value: string;
  CountryCodeType: string;
  inType: string;
}

export class ControllingPersonType {
  individual: PersonPartyType;
  ctrlgPersonType: CrsCtrlgPersonTypeEnumType;
}

export class PaymentType {
  type: CrsPaymentTypeEnumType;
  paymentAmnt: MonAmntType;
}

export class MonAmntType {
  value: number;
  currCode: CurrCodeType;
}

export class TINType {
  value: string;
  issuedBy: CountryCodeType;
}

export class NamePersonType {
  precedingTitle: string;
  title: string[];
  firstName: FirstName; // NamePersonType.FirstName
  middleName: MiddleName[]; // List<NamePersonType.MiddleName>
  namePrefix: NamePrefix; // NamePersonType.NamePrefix
  lastName: LastName; // NamePersonType.LastName
  generationIdentifier: string[];
  suffix: string[];
  generalSuffix: string;
  nameType: OECDNameTypeEnumType;
}

export class FirstName {
  value: string;
  xnlNameType: string;
}

export class MiddleName {
  value: string;
  xnlNameType: string;
}

export class LastName {
  value: string;
  xnlNameType: string;
}

export class NamePrefix {
  value: string;
  xnlNameType: string;
}

export class AddressType {
  legalAddressType: OECDLegalAddressTypeEnumType;
  countryCodeType: CountryCodeType;
  addressFree: string;
  addressFixType: AddressFixType;
}

export class AddressFixType {
  street: string;
  buildingIdentifier: string;
  suiteIdentifier: string;
  floorIdentifier: string;
  districtName: string;
  pob: string;
  postCode: string;
  city: string;
  countrySubentity: string;
}

export class BirthInfo {
  birthDate: string;
  city: string;
  citySubentity: string;
  countryInfo: CountryInfo;
}

export class CountryInfo {
  countryCode: CountryCodeType;
  formerCountryName: string;
}

// ====Enum==========================================
export enum CountryCodeType {
  AD,
  AE,
  AF,
  AG,
  AI,
  AL,
  AM,
  AN,
  AO,
  AQ,
  AR,
  AS,
  AT,
  AU,
  AW,
  AZ,
  BA,
  BB,
  BD,
  BE,
  BF,
  BG,
  BH,
  BI,
  BJ,
  BM,
  BN,
  BO,
  BR,
  BS,
  BT,
  BV,
  BW,
  BY,
  BZ,
  CA,
  CC,
  CD,
  CF,
  CG,
  CH,
  CI,
  CK,
  CL,
  CM,
  CN,
  CO,
  CR,
  CU,
  CV,
  CX,
  CY,
  CZ,
  DE,
  DJ,
  DK,
  DM,
  DO,
  DZ,
  EC,
  EE,
  EG,
  EH,
  ER,
  ES,
  ET,
  FI,
  FJ,
  FK,
  FM,
  FO,
  FR,
  FX,
  GA,
  GB,
  GD,
  GE,
  GF,
  GH,
  GI,
  GL,
  GM,
  GN,
  GP,
  GQ,
  GR,
  GS,
  GT,
  GU,
  GW,
  GY,
  HK,
  HM,
  HN,
  HR,
  HT,
  HU,
  ID,
  IE,
  IL,
  IN,
  IO,
  IQ,
  IR,
  IS,
  IT,
  JM,
  JO,
  JP,
  KE,
  KG,
  KH,
  KI,
  KM,
  KN,
  KP,
  KR,
  KW,
  KY,
  KZ,
  LA,
  LB,
  LC,
  LI,
  LK,
  LR,
  LS,
  LT,
  LU,
  LV,
  LY,
  MA,
  MC,
  MD,
  MG,
  MH,
  MK,
  ML,
  MM,
  MN,
  MO,
  MP,
  MQ,
  MR,
  MS,
  MT,
  MU,
  MV,
  MW,
  MX,
  MY,
  MZ,
  NA,
  NC,
  NE,
  NF,
  NG,
  NI,
  NL,
  NO,
  NP,
  NR,
  NU,
  NZ,
  OM,
  PA,
  PE,
  PF,
  PG,
  PH,
  PK,
  PL,
  PM,
  PN,
  PR,
  PT,
  PW,
  PY,
  QA,
  RE,
  RO,
  RU,
  RW,
  SA,
  SB,
  SC,
  SD,
  SE,
  SG,
  SH,
  SI,
  SJ,
  SK,
  SL,
  SM,
  SN,
  SO,
  SR,
  ST,
  SV,
  SY,
  SZ,
  TC,
  TD,
  TF,
  TG,
  TH,
  TJ,
  TK,
  TM,
  TN,
  TO,
  TP,
  TR,
  TT,
  TV,
  TW,
  TZ,
  UA,
  UG,
  UM,
  US,
  UY,
  UZ,
  VA,
  VC,
  VE,
  VG,
  VI,
  VN,
  VU,
  WF,
  WS,
  XA,
  XB,
  XC,
  YE,
  YT,
  YU,
  ZA,
  ZM,
  ZW,
  ZZ
}

export enum AcctNumberTypeEnumType {
  OECD_601 = 'OECD601',
  OECD_602 = 'OECD602',
  OECD_603 = 'OECD603',
  OECD_604 = 'OECD604',
  OECD_605 = 'OECD605'
}

export enum CrsAcctHolderTypeEnumType {
  CRS_981 = 'CRS981',
  CRS_982 = 'CRS982',
  CRS_983 = 'CRS983',
  CRS_984 = 'CRS984'
}

export enum OECDNameTypeEnumType {
  OECD_201 = 'OECD201',
  OECD_202 = 'OECD202',
  OECD_203 = 'OECD203',
  OECD_204 = 'OECD204',
  OECD_205 = 'OECD205',
  OECD_206 = 'OECD206',
  OECD_207 = 'OECD207',
  OECD_208 = 'OECD208'
}

export enum OECDLegalAddressTypeEnumType {
  OECD_301 = 'OECD301',
  OECD_302 = 'OECD302',
  OECD_303 = 'OECD303',
  OECD_304 = 'OECD304',
  OECD_305 = 'OECD305'
}

export enum CrsPaymentTypeEnumType {
  CRS_501 = 'CRS501',
  CRS_502 = 'CRS502',
  CRS_503 = 'CRS503',
  CRS_504 = 'CRS504'
}

export enum CurrCodeType {
  /**
   * UAE Dirham: UNITED ARAB EMIRATES
   *
   */
  AED,

  /**
   * Afghani: AFGHANISTAN
   *
   */
  AFN,

  /**
   * Lek: ALBANIA
   *
   */
  ALL,

  /**
   * Armenian Dram: ARMENIA
   *
   */
  AMD,

  /**
   * Netherlands Antillean Guilder: CURACAO; SINT MAARTEN (DUTCH PART)
   *
   */
  ANG,

  /**
   * Kwanza: ANGOLA
   *
   */
  AOA,

  /**
   * Argentine Peso: ARGENTINA
   *
   */
  ARS,

  /**
   * Australian Dollar: AUSTRALIA; CHRISTMAS ISLAND; COCOS (KEELING) ISLANDS; HEARD ISLAND AND McDONALD ISLANDS; KIRIBATI; NAURU; NORFOLK ISLAND; TUVALU
   *
   */
  AUD,

  /**
   * Aruban Florin: ARUBA
   *
   */
  AWG,

  /**
   * Azerbaijanian Manat: AZERBAIJAN
   *
   */
  AZN,

  /**
   * Convertible Mark: BOSNIA AND HERZEGOVINA
   *
   */
  BAM,

  /**
   * Barbados Dollar: BARBADOS
   *
   */
  BBD,

  /**
   * Taka: BANGLADESH
   *
   */
  BDT,

  /**
   * Bulgarian Lev: BULGARIA
   *
   */
  BGN,

  /**
   * Bahraini Dinar: BAHRAIN
   *
   */
  BHD,

  /**
   * Burundi Franc: BURUNDI
   *
   */
  BIF,

  /**
   * Bermudian Dollar: BERMUDA
   *
   */
  BMD,

  /**
   * Brunei Dollar: BRUNEI DARUSSALAM
   *
   */
  BND,

  /**
   * Boliviano: BOLIVIA, PLURINATIONAL STATE OF
   *
   */
  BOB,

  /**
   * Mvdol: BOLIVIA, PLURINATIONAL STATE OF
   *
   */
  BOV,

  /**
   * Brazilian Real: BRAZIL
   *
   */
  BRL,

  /**
   * Bahamian Dollar: BAHAMAS
   *
   */
  BSD,

  /**
   * Ngultrum: BHUTAN
   *
   */
  BTN,

  /**
   * Pula: BOTSWANA
   *
   */
  BWP,

  /**
   * Belarussian Ruble: BELARUS
   *
   */
  BYR,

  /**
   * Belize Dollar: BELIZE
   *
   */
  BZD,

  /**
   * Canadian Dollar: CANADA
   *
   */
  CAD,

  /**
   * Congolese Franc: CONGO, THE DEMOCRATIC REPUBLIC OF
   *
   */
  CDF,

  /**
   * WIR Euro: SWITZERLAND
   *
   */
  CHE,

  /**
   * Swiss Franc: LIECHTENSTEIN; SWITZERLAND
   *
   */
  CHF,

  /**
   * WIR Franc: SWITZERLAND
   *
   */
  CHW,

  /**
   * Unidades de fomento: CHILE
   *
   */
  CLF,

  /**
   * Chilean Peso: CHILE
   *
   */
  CLP,

  /**
   * Yuan Renminbi: CHINA
   *
   */
  CNY,

  /**
   * Colombian Peso: COLOMBIA
   *
   */
  COP,

  /**
   * Unidad de Valor Real: COLOMBIA
   *
   */
  COU,

  /**
   * Costa Rican Colon: COSTA RICA
   *
   */
  CRC,

  /**
   * Peso Convertible: CUBA
   *
   */
  CUC,

  /**
   * Cuban Peso: CUBA
   *
   */
  CUP,

  /**
   * Cape Verde Escudo: CAPE VERDE
   *
   */
  CVE,

  /**
   * Czech Koruna: CZECH REPUBLIC
   *
   */
  CZK,

  /**
   * Djibouti Franc: DJIBOUTI
   *
   */
  DJF,

  /**
   * Danish Krone: DENMARK; FAROE ISLANDS; GREENLAND
   *
   */
  DKK,

  /**
   * Dominican Peso: DOMINICAN REPUBLIC
   *
   */
  DOP,

  /**
   * Algerian Dinar: ALGERIA
   *
   */
  DZD,

  /**
   * Egyptian Pound: EGYPT
   *
   */
  EGP,

  /**
   * Nakfa: ERITREA
   *
   */
  ERN,

  /**
   * Ethiopian Birr: ETHIOPIA
   *
   */
  ETB,

  /**
   * Euro: ALAND ISLANDS; ANDORRA; AUSTRIA; BELGIUM; CYPRUS; ESTONIA; EUROPEAN UNION; FINLAND; FRANCE; FRENCH GUIANA; FRENCH SOUTHERN TERRITORIES; GERMANY; GREECE; GUADELOUPE; HOLY SEE (VATICAN CITY STATE); IRELAND; ITALY; LUXEMBOURG; MALTA; MARTINIQUE; MAYOTTE; MONACO; MONTENEGRO; NETHERLANDS; PORTUGAL; REUNION; SAINT BARTHELEMY; SAINT MARTIN (FRENCH PART); SAINT PIERRE AND MIQUELON; SAN MARINO; SLOVAKIA; SLOVENIA; SPAIN; Vatican City State (HOLY SEE)
   *
   */
  EUR,

  /**
   * Fiji Dollar: FIJI
   *
   */
  FJD,

  /**
   * Falkland Islands Pound: FALKLAND ISLANDS (MALVINAS)
   *
   */
  FKP,

  /**
   * Pound Sterling: GUERNSEY; ISLE OF MAN; JERSEY; UNITED KINGDOM
   *
   */
  GBP,

  /**
   * Lari: GEORGIA
   *
   */
  GEL,

  /**
   * Ghana Cedi: GHANA
   *
   */
  GHS,

  /**
   * Gibraltar Pound: GIBRALTAR
   *
   */
  GIP,

  /**
   * Dalasi: GAMBIA
   *
   */
  GMD,

  /**
   * Guinea Franc: GUINEA
   *
   */
  GNF,

  /**
   * Quetzal: GUATEMALA
   *
   */
  GTQ,

  /**
   * Guyana Dollar: GUYANA
   *
   */
  GYD,

  /**
   * Hong Kong Dollar: HONG KONG
   *
   */
  HKD,

  /**
   * Lempira: HONDURAS
   *
   */
  HNL,

  /**
   * Croatian Kuna: CROATIA
   *
   */
  HRK,

  /**
   * Gourde: HAITI
   *
   */
  HTG,

  /**
   * Forint: HUNGARY
   *
   */
  HUF,

  /**
   * Rupiah: INDONESIA
   *
   */
  IDR,

  /**
   * New Israeli Sheqel: ISRAEL
   *
   */
  ILS,

  /**
   * Indian Rupee: BHUTAN; INDIA
   *
   */
  INR,

  /**
   * Iraqi Dinar: IRAQ
   *
   */
  IQD,

  /**
   * Iranian Rial: IRAN, ISLAMIC REPUBLIC OF
   *
   */
  IRR,

  /**
   * Iceland Krona: ICELAND
   *
   */
  ISK,

  /**
   * Jamaican Dollar: JAMAICA
   *
   */
  JMD,

  /**
   * Jordanian Dinar: JORDAN
   *
   */
  JOD,

  /**
   * Yen: JAPAN
   *
   */
  JPY,

  /**
   * Kenyan Shilling: KENYA
   *
   */
  KES,

  /**
   * Som: KYRGYZSTAN
   *
   */
  KGS,

  /**
   * Riel: CAMBODIA
   *
   */
  KHR,

  /**
   * Comoro Franc: COMOROS
   *
   */
  KMF,

  /**
   * North Korean Won: KOREA, DEMOCRATIC PEOPLE’S REPUBLIC OF
   *
   */
  KPW,

  /**
   * Won: KOREA, REPUBLIC OF
   *
   */
  KRW,

  /**
   * Kuwaiti Dinar: KUWAIT
   *
   */
  KWD,

  /**
   * Cayman Islands Dollar: CAYMAN ISLANDS
   *
   */
  KYD,

  /**
   * Tenge: KAZAKHSTAN
   *
   */
  KZT,

  /**
   * Kip: LAO PEOPLE’S DEMOCRATIC REPUBLIC
   *
   */
  LAK,

  /**
   * Lebanese Pound: LEBANON
   *
   */
  LBP,

  /**
   * Sri Lanka Rupee: SRI LANKA
   *
   */
  LKR,

  /**
   * Liberian Dollar: LIBERIA
   *
   */
  LRD,

  /**
   * Loti: LESOTHO
   *
   */
  LSL,

  /**
   * Lithuanian Litas: LITHUANIA
   *
   */
  LTL,

  /**
   * Latvian Lats: LATVIA
   *
   */
  LVL,

  /**
   * Libyan Dinar: LIBYA
   *
   */
  LYD,

  /**
   * Moroccan Dirham: MOROCCO; WESTERN SAHARA
   *
   */
  MAD,

  /**
   * Moldovan Leu: MOLDOVA, REPUBLIC OF
   *
   */
  MDL,

  /**
   * Malagasy Ariary: MADAGASCAR
   *
   */
  MGA,

  /**
   * Denar: MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF
   *
   */
  MKD,

  /**
   * Kyat: MYANMAR
   *
   */
  MMK,

  /**
   * Tugrik: MONGOLIA
   *
   */
  MNT,

  /**
   * Pataca: MACAO
   *
   */
  MOP,

  /**
   * Ouguiya: MAURITANIA
   *
   */
  MRO,

  /**
   * Mauritius Rupee: MAURITIUS
   *
   */
  MUR,

  /**
   * Rufiyaa: MALDIVES
   *
   */
  MVR,

  /**
   * Kwacha: MALAWI
   *
   */
  MWK,

  /**
   * Mexican Peso: MEXICO
   *
   */
  MXN,

  /**
   * Mexican Unidad de Inversion (UDI): MEXICO
   *
   */
  MXV,

  /**
   * Malaysian Ringgit: MALAYSIA
   *
   */
  MYR,

  /**
   * Mozambique Metical: MOZAMBIQUE
   *
   */
  MZN,

  /**
   * Namibia Dollar: NAMIBIA
   *
   */
  NAD,

  /**
   * Naira: NIGERIA
   *
   */
  NGN,

  /**
   * Cordoba Oro: NICARAGUA
   *
   */
  NIO,

  /**
   * Norwegian Krone: BOUVET ISLAND; NORWAY; SVALBARD AND JAN MAYEN
   *
   */
  NOK,

  /**
   * Nepalese Rupee: NEPAL
   *
   */
  NPR,

  /**
   * New Zealand Dollar: COOK ISLANDS; NEW ZEALAND; NIUE; PITCAIRN; TOKELAU
   *
   */
  NZD,

  /**
   * Rial Omani: OMAN
   *
   */
  OMR,

  /**
   * Balboa: PANAMA
   *
   */
  PAB,

  /**
   * Nuevo Sol: PERU
   *
   */
  PEN,

  /**
   * Kina: PAPUA NEW GUINEA
   *
   */
  PGK,

  /**
   * Philippine Peso: PHILIPPINES
   *
   */
  PHP,

  /**
   * Pakistan Rupee: PAKISTAN
   *
   */
  PKR,

  /**
   * Zloty: POLAND
   *
   */
  PLN,

  /**
   * Guarani: PARAGUAY
   *
   */
  PYG,

  /**
   * Qatari Rial: QATAR
   *
   */
  QAR,

  /**
   * New Romanian Leu: ROMANIA
   *
   */
  RON,

  /**
   * Serbian Dinar: SERBIA
   *
   */
  RSD,

  /**
   * Russian Ruble: RUSSIAN FEDERATION
   *
   */
  RUB,

  /**
   * Rwanda Franc: RWANDA
   *
   */
  RWF,

  /**
   * Saudi Riyal: SAUDI ARABIA
   *
   */
  SAR,

  /**
   * Solomon Islands Dollar: SOLOMON ISLANDS
   *
   */
  SBD,

  /**
   * Seychelles Rupee: SEYCHELLES
   *
   */
  SCR,

  /**
   * Sudanese Pound: SUDAN
   *
   */
  SDG,

  /**
   * Swedish Krona: SWEDEN
   *
   */
  SEK,

  /**
   * Singapore Dollar: SINGAPORE
   *
   */
  SGD,

  /**
   * Saint Helena Pound: SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA
   *
   */
  SHP,

  /**
   * Leone: SIERRA LEONE
   *
   */
  SLL,

  /**
   * Somali Shilling: SOMALIA
   *
   */
  SOS,

  /**
   * Surinam Dollar: SURINAME
   *
   */
  SRD,

  /**
   * South Sudanese Pound: SOUTH SUDAN
   *
   */
  SSP,

  /**
   * Dobra: SAO TOME AND PRINCIPE
   *
   */
  STD,

  /**
   * El Salvador Colon: EL SALVADOR
   *
   */
  SVC,

  /**
   * Syrian Pound: SYRIAN ARAB REPUBLIC
   *
   */
  SYP,

  /**
   * Lilangeni: SWAZILAND
   *
   */
  SZL,

  /**
   * Baht: THAILAND
   *
   */
  THB,

  /**
   * Somoni: TAJIKISTAN
   *
   */
  TJS,

  /**
   * Turkmenistan New Manat: TURKMENISTAN
   *
   */
  TMT,

  /**
   * Tunisian Dinar: TUNISIA
   *
   */
  TND,

  /**
   * Pa’anga: TONGA
   *
   */
  TOP,

  /**
   * Turkish Lira: TURKEY
   *
   */
  TRY,

  /**
   * Trinidad and Tobago Dollar: TRINIDAD AND TOBAGO
   *
   */
  TTD,

  /**
   * New Taiwan Dollar: TAIWAN, PROVINCE OF CHINA
   *
   */
  TWD,

  /**
   * Tanzanian Shilling: TANZANIA, UNITED REPUBLIC OF
   *
   */
  TZS,

  /**
   * Hryvnia: UKRAINE
   *
   */
  UAH,

  /**
   * Uganda Shilling: UGANDA
   *
   */
  UGX,

  /**
   * US Dollar: AMERICAN SAMOA; BONAIRE; SINT EUSTATIUS AND SABA; BRITISH INDIAN OCEAN TERRITORY; ECUADOR; EL SALVADOR; GUAM; HAITI; MARSHALL ISLANDS; MICRONESIA, FEDERATED STATES OF; NORTHERN MARIANA ISLANDS; PALAU; PANAMA; PUERTO RICO; TIMOR-LESTE; TURKS AND CAICOS ISLANDS, UNITED STATES; UNITED STATES MINOR OUTLYING ISLANDS; VIRGIN ISLANDS (BRITISH); VIRGIN ISLANDS (US)
   *
   */
  USD,

  /**
   * US Dollar (Next day): UNITED STATES
   *
   */
  USN,

  /**
   *  US Dollar (Same day): UNITED STATES
   *
   */
  USS,

  /**
   * Uruguay Peso en Unidades Indexadas (URUIURUI): URUGUAY
   *
   */
  UYI,

  /**
   * Peso Uruguayo: URUGUAY
   *
   */
  UYU,

  /**
   * Uzbekistan Sum: UZBEKISTAN
   *
   */
  UZS,

  /**
   * Bolivar: VENEZUELA, BOLIVARIAN REPUBLIC OF
   *
   */
  VEF,

  /**
   * Dong: VIET NAM
   *
   */
  VND,

  /**
   * Vatu: VANUATU
   *
   */
  VUV,

  /**
   * Tala: SAMOA
   *
   */
  WST,

  /**
   * CFA Franc BEAC: CAMEROON; CENTRAL AFRICAN REPUBLIC; CHAD; CONGO; EQUATORIAL GUINEA; GABON
   *
   */
  XAF,

  /**
   * Silver: ZZ11_Silver
   *
   */
  XAG,

  /**
   * Gold: ZZ08_Gold
   *
   */
  XAU,

  /**
   * Bond Markets Unit European Composite Unit (EURCO):  ZZ01_Bond Markets Unit European_EURCO
   *
   */
  XBA,

  /**
   * Bond Markets Unit European Monetary Unit (E.M.U.-6): ZZ02_Bond Markets Unit European_EMU-6
   *
   */
  XBB,

  /**
   * Bond Markets Unit European Unit of Account 9 (E.U.A.-9): ZZ03_Bond Markets Unit European_EUA-9
   *
   */
  XBC,

  /**
   * Bond Markets Unit European Unit of Account 17 (E.U.A.-17): ZZ04_Bond Markets Unit European_EUA-17
   *
   */
  XBD,

  /**
   * East Caribbean Dollar: ANGUILLA; ANTIGUA AND BARBUDA; DOMINICA; GRENADA; MONTSERRAT; SAINT KITTS AND NEVIS; SAINT LUCIA; SAINT VINCENT AND THE GRENADINES
   *
   */
  XCD,

  /**
   * SDR (Special Drawing Right): INTERNATIONAL MONETARY FUND (IMF)
   *
   */
  XDR,

  /**
   * UIC-Franc: ZZ05_UIC-Franc
   *
   */
  XFU,

  /**
   * CFA Franc BCEAO: BENIN; BURKINA FASO; COTE D'IVOIRE; GUINEA-BISSAU; MALI; NIGER; SENEGAL; TOGO
   *
   */
  XOF,

  /**
   * Palladium: ZZ09_Palladium
   *
   */
  XPD,

  /**
   * CFP Franc: FRENCH POLYNESIA; NEW CALEDONIA; WALLIS AND FUTUNA
   *
   */
  XPF,

  /**
   * Platinum: ZZ10_Platinum
   *
   */
  XPT,

  /**
   * Sucre: SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS "SUCRE"
   *
   */
  XSU,

  /**
   * ADB Unit of Account: MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP
   *
   */
  XUA,

  /**
   * The codes assigned for transactions where no currency is involved: ZZ07_No_Currency
   *
   */
  XXX,

  /**
   * Yemeni Rial: YEMEN
   *
   */
  YER,

  /**
   * Rand: LESOTHO; NAMIBIA; SOUTH AFRICA
   *
   */
  ZAR,

  /**
   * Zambian Kwacha: ZAMBIA
   *
   */
  ZMW,

  /**
   * Zimbabwe Dollar: ZIMBABWE
   *
   */
  ZWL
}

export enum CrsCtrlgPersonTypeEnumType {
  CRS_801 = 'CRS801',
  CRS_802 = 'CRS802',
  CRS_803 = 'CRS803',
  CRS_804 = 'CRS804',
  CRS_805 = 'CRS805',
  CRS_806 = 'CRS806',
  CRS_807 = 'CRS807',
  CRS_808 = 'CRS808',
  CRS_809 = 'CRS809',
  CRS_810 = 'CRS810',
  CRS_811 = 'CRS811',
  CRS_812 = 'CRS812'
}

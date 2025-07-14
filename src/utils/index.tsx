import {
  ApiData,
  CommentData,
  FundamentalsItem,
  IAlphaMap,
  IComments,
} from "@/interface/comment";
import { jsPDF } from "jspdf";

export function capitalizeFirstLetter(letter: string): string {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}
export function toCamelCaseWithSpaces(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(utcDate: string): string {
  const date = new Date(utcDate || "2025-03-07T23:40:33.987571Z");
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2025"
    month: "long", // "August"
    day: "numeric", // "31"
    hour: "2-digit", // "01"
    minute: "2-digit", // "45"
    second: "2-digit", // "30"
    hour12: true, // AM/PM format
  }).format(date);
};
export const getStockLabel = (key: string): string => {
  const formattedKey = key.toLowerCase();

  const labelMap: Record<string, string> = {
    fulltimeemployees: "Full Time Employees",
    ipodate: "IPO Date",
    exchangefullname: "Exchange Full Name",
    companyname: "Company Name",
    averagevolume: "Average Volume",
    changepercentage: "Change Percentage",
    marketcap: "Market Cap",
    lastdividend: "Last Dividend",
    ayearhigh: "52 Week High",
    ayearlow: "52 Week Low",
    adaylow: "Day Low",
    adayhigh: "Day High",
    priceavg50: "50 Day Avg",
    priceavg200: "200 Day Avg",
    previousclose: "Previous Close",
    returnonasset: "Return on Assets",
    returnonequity: "Return on Equity",
    freecashflowyield: "Free Cash Flow Yield",
    enterprisevalue: "Enterprise Value",
    evtosales: "EV/Sales",
    evtosales5yrs: "EV/Sales 5yrs",
    evtofcf: "EV/FCF",
    ev5years: "EV 5yrs",
    revenuepershare: "Revenue per Share",
    evtofcf5yrs: "EV/FCF 5yrs",
    psratiofive5yrs: "P/S Ratio 5yrs",
    grossprofitmargin: "Gross Profit Margin",
    dividendsyieldttm: "Dividends Yield (TTM)",
    ptoeratio: "P/E Ratio",
    psratio: "P/S Ratio",
    ptoeratiottm: "P/E (TTM)",
    avgfcf5yrs: "Avg FCF (5 yr)",
    freecashflow: "Free Cash Flow (FCF) (TTM)",
    fcfttmtoequityttm: "FCF/Equity (TTM)",
    ptoeratiofive5yrs: "P/E Ratio 5yrs",
    fiveyearavgfreecashflowyield: "5 yrs Avg FCF Yield",
    returnoninvestedcapitalttm: "Return on Invested Capital (TTM)",
    avgroic5yrs: "Avg ROIC (5 yrs)",
    pricetofcfttm: "Price/FCF (TTM)",
    neticomettm5year: "Avg Net Income (5 yr)",
    revenuettm: "Revenue (TTM)",
    neticomettm: "Net Income (TTM)",
    evtonet: "EV/Net income",
    dividendspaidttm: "Dividends Paid (TTM)",
    ptoeavgnetincomefive5yrs: "P/E Avg Net Income (5 yr)",
    psratiottm: "P/S (TTM)",
    avgprofitmargin5yrs: "Avg Profit Margin (5 yr)",
    profitmarginttm: "Profit Margin (TTM)",
    grossprofitmarginttm: "Gross Profit Margin (TTM)",
    comprevgrowth3yrs: "3 yr Compound Revenue Growth",
    comprevgrowth5yrs: "5 yr Compound Revenue Growth",
    comprevgrowth10yrs: "10 yr Compound Revenue Growth",
    pricetobookratio: "Price-to-Book Ratio",
  };

  return labelMap[formattedKey] ?? toCamelCaseWithSpaces(key);
};
export const mapApiToComment = (apiData: any): CommentData => {
  let comment = apiData.message;
  let commentImgUrl = "";

  if (apiData.messageType === "ImgText") {
    const parts = apiData.message.split("|||IMG|||");
    if (parts.length > 1) {
      comment = parts[0];
      commentImgUrl = parts[1] || "";
    } else if (parts[0].includes("http:")) {
      commentImgUrl = parts[0];
    }
  }

  return {
    commentId: apiData.id,
    commentDate: new Date(apiData.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    userImgUrl: apiData.sentByImgUrl,
    name: apiData.senderName,
    isLiked: apiData.isLiked,
    IsUnliked: apiData.isUnLiked,
    isSaved: apiData.isSaved,
    messageType: apiData.messageType,
    commentImgUrl,
    comment,
  };
};
export const mapApiToCommentReply = (apiData: any): IComments => {
  return {
    commentId: apiData.id,
    commentDate: new Date(apiData.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    userImgUrl: apiData.sentByImgUrl,
    name: apiData.senderName,
    isLiked: apiData.isLiked,
    IsUnliked: apiData.isUnLiked,
    isSaved: apiData.isSaved,
    replyContent: apiData.message,
  };
};

export const mapApiToCommentSignalR = (apiData: any): CommentData => {
  let comment = apiData.message;
  let commentImgUrl = "";

  if (apiData.messageType === "ImgText") {
    const parts = apiData.message.split("|||IMG|||");
    if (parts.length > 1) {
      comment = parts[0];
      commentImgUrl = parts[1] || "";
    } else if (parts[0].includes("http:")) {
      commentImgUrl = parts[0];
    }
  }

  return {
    commentId: apiData.id,
    commentDate: new Date(apiData.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    userImgUrl: apiData.sentByImgUrl,
    name: apiData.senderName,
    isLiked: apiData.isLiked,
    IsUnliked: apiData.isUnLiked,
    isSaved: apiData.isSaved,
    messageType: apiData.messageType,
    commentImgUrl,
    comment,
  };
};
export function getFontWeightByTitle(title?: string): number | undefined {
  if (!title) return undefined;

  const lowerTitle = title.toLowerCase();

  const boldTitles = [
    "revenue",
    "net income",
    "net interest income",
    "gross profit",
    "research and development expenses",
    "selling general and administrative expenses",
    "operating expenses",
    "operating income",
    "pre-tax income",
    "inventories",
    "goodwill & intangible assets",
    "other total stockholders equity",
    "depreciation and amortization",
    "net cash provided by investing activities",
    "free cash flow",
    "capital expenditure",
    "total liabilities",
    "total current liabilities",
    "cash & short term investments",
  ];

  return boldTitles.includes(lowerTitle) ? 800 : 600;
}
export const downloadPaymentPDF = (data: any) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Payment Details", 20, 20);

  let y = 30;
  for (const [key, value] of Object.entries(data)) {
    doc.text(`${key}: ${value}`, 20, y);
    y += 10;
  }

  doc.save("payment-details.pdf");
};

export function generateFundamentalsList(apiData: ApiData): FundamentalsItem[] {
  const formatCurrency = (numStr: string | number) => {
    const num = parseFloat(String(numStr));
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (val: string | number) => {
    const num = parseFloat(String(val));
    return isNaN(num) ? "-" : `${num.toFixed(2)}%`;
  };

  const formatLargeNumber = (numStr: string | number) => {
    const num = parseFloat(String(numStr));
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toFixed(2);
  };

  const parseNumber = (val: string) => {
    if (!val) return NaN;
    let numStr = val.replace(/[%$]/g, "").trim();
    let multiplier = 1;

    if (numStr.endsWith("T")) {
      multiplier = 1e12;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith("B")) {
      multiplier = 1e9;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith("M")) {
      multiplier = 1e6;
      numStr = numStr.slice(0, -1);
    }
    const num = parseFloat(numStr);
    return isNaN(num) ? NaN : num * multiplier;
  };

  const periodMap: Record<string, string> = {
    first: "1Y",
    fifth: "5Y",
    ten: "10Y",
  };

  const fundamentals: FundamentalsItem[] = [];

  // Definitions of the 8-pillar indicators
  const rules: {
    key: keyof ApiData;
    period: keyof ApiData["averageShareOutstanding"];
    condition: (val: number) => boolean;
    label: string;
    description: string;
    // Explicitly define the expected format for clarity
    displayFormat: "currency" | "percentage" | "number_with_suffix" | "number";
  }[] = [
    {
      key: "netIcome",
      period: "fifth",
      condition: (v) => v < 10e9,
      label: "Net Income",
      description: "< 10B",
      displayFormat: "currency",
    },
    {
      key: "roic",
      period: "fifth",
      condition: (v) => v < 20,
      label: "ROIC",
      description: "< 20%",
      displayFormat: "percentage",
    },
    {
      key: "averageShareOutstanding",
      period: "fifth",
      condition: (v) => v > 1.75e9,
      label: "Avg Share Outstanding",
      description: "> 1.75B",
      displayFormat: "number_with_suffix", // Corrected: This is a count, not a percentage or currency
    },
    {
      key: "freeCashFlowMargin",
      period: "fifth",
      condition: (v) => v < 22,
      label: "Free Cash Flow Margin",
      description: "< 22%",
      displayFormat: "percentage",
    },
    {
      key: "revGrowth", // Revenue Growth
      period: "fifth",
      condition: (v) => v > 5,
      label: "Revenue Growth",
      description: "> 5%",
      displayFormat: "percentage", // Corrected: Revenue Growth is a percentage
    },
    {
      key: "pfcf",
      period: "first",
      condition: (v) => v < 200,
      label: "P/FCF",
      description: "< 200",
      displayFormat: "number", // P/FCF is a multiple, no unit
    },
    {
      key: "peRatio",
      period: "first",
      condition: (v) => v > 22,
      label: "P/E Ratio",
      description: "> 22",
      displayFormat: "number", // P/E Ratio is a multiple, no unit
    },
    {
      key: "profitMargin",
      period: "fifth",
      condition: (v) => v > 20,
      label: "Profit Margin",
      description: "> 20%",
      displayFormat: "percentage",
    },
  ];

  for (const rule of rules) {
    const raw =
      typeof apiData[rule.key] === "object" && apiData[rule.key] !== null
        ? (apiData[rule.key] as Record<string, string | null>)[rule.period]
        : (apiData[rule.key] as string | null); // Added direct access for keys not objects (e.g., marketCap)

    if (raw === null || raw === undefined) continue;

    let valueNum: number = parseNumber(String(raw));
    let amount: string;

    // If parsing for condition failed, it means the raw value might be something like "N/A"
    if (isNaN(valueNum)) {
      amount = "-"; // Or whatever default representation you prefer for non-numeric data
    } else {
      switch (rule.displayFormat) {
        case "currency":
          amount = formatCurrency(valueNum);
          break;
        case "percentage":
          amount = formatPercentage(valueNum);
          break;
        case "number_with_suffix":
          amount = formatLargeNumber(valueNum); // For shares outstanding
          break;
        case "number":
          amount = valueNum.toFixed(2); // For P/E, P/FCF, etc.
          break;
        default:
          amount = String(valueNum); // Fallback
      }
    }

    // Only apply condition check if valueNum is a valid number
    const isActive = isNaN(valueNum) ? false : rule.condition(valueNum);

    fundamentals.push({
      header: `${rule.label} (${periodMap[rule.period]}) ${rule.description}`,
      amount,
      isActive,
    });
  }

  return fundamentals;
}

interface AlphaPreference {
  pillerName: string;
  comparison: ">" | "<";
  format: "%" | "$" | ""; // Represents the desired display format for the result ("" means default for the metric)
  value: string; // The threshold value
}

const KEY_LABEL_MAP: Record<string, string> = {
  profitMargin: "Profit Margin",
  netIcome: "Net Income", // Corrected typo for consistency
  freeCashFlowMargin: "Free Cash Flow Margin",
  marketCap: "Market Cap",
  revGrowth: "Revenue Growth",
  averageShareOutstanding: "Avg Share Outstanding",
  peRatio: "P/E Ratio",
  pfcf: "P/FCF",
  roic: "ROIC",
};

// Define default formats for keys if the user preference format is empty ("")
const DEFAULT_KEY_FORMAT: Record<
  string,
  "%" | "$" | "number_with_suffix" | "number"
> = {
  profitMargin: "%",
  netIcome: "$",
  freeCashFlowMargin: "%",
  marketCap: "$", // Market cap is currency
  revGrowth: "%", // Revenue Growth is a percentage
  averageShareOutstanding: "number_with_suffix", // Shares outstanding is a count
  peRatio: "number",
  pfcf: "number",
  roic: "%",
};

export function generateFundamentalsList2(
  apiData: ApiData,
  userAlphaPreferences: AlphaPreference[]
): FundamentalsItem[] {
  const formatCurrency = (numStr: string | number) => {
    const num = parseFloat(String(numStr));
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (val: string | number) => {
    const num = parseFloat(String(val));
    return isNaN(num) ? "-" : `${num.toFixed(2)}%`;
  };

  const formatLargeNumber = (numStr: string | number) => {
    const num = parseFloat(String(numStr));
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toFixed(2);
  };

  // Improved parseNumber to handle %, $, T, B, M suffixes
  const parseNumber = (val: string) => {
    if (!val) return NaN;
    let numStr = val.replace(/[%$]/g, "").trim();
    let multiplier = 1;

    if (numStr.endsWith("T")) {
      multiplier = 1e12;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith("B")) {
      multiplier = 1e9;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith("M")) {
      multiplier = 1e6;
      numStr = numStr.slice(0, -1);
    }
    const num = parseFloat(numStr);
    return isNaN(num) ? NaN : num * multiplier;
  };

  const periodMap: Record<string, string> = {
    first: "1Y",
    fifth: "5Y",
    ten: "10Y",
  };

  const fundamentals: FundamentalsItem[] = [];

  for (const pref of userAlphaPreferences) {
    const [keyPart, periodPart] = pref.pillerName.split(" ");
    const valKey = keyPart as keyof ApiData;
    const valPeriod = periodPart as keyof ApiData["averageShareOutstanding"];

    const rawValue =
      typeof apiData[valKey] === "object" && apiData[valKey] !== null
        ? (apiData[valKey] as Record<string, string | null>)[valPeriod]
        : (apiData[valKey] as string | null);

    if (rawValue === null || rawValue === undefined) continue;

    const valueNum = parseNumber(String(rawValue));
    const threshold = parseNumber(pref.value);
    let isActive = false;

    if (isNaN(valueNum) || isNaN(threshold)) {
      // If parsing fails for either value, the condition cannot be met
      isActive = false;
    } else if (pref.comparison === ">") {
      isActive = valueNum > threshold;
    } else if (pref.comparison === "<") {
      isActive = valueNum < threshold;
    }

    // Determine the format to use for display
    // Prioritize user preference, otherwise use default
    const effectiveFormat =
      pref.format === "" ? DEFAULT_KEY_FORMAT[keyPart] : pref.format;

    let formattedValue: string;
    switch (effectiveFormat) {
      case "$":
        formattedValue = formatCurrency(rawValue);
        break;
      case "%":
        formattedValue = formatPercentage(rawValue);
        break;
      case "number_with_suffix":
        formattedValue = formatLargeNumber(rawValue);
        break;
      case "number":
        const numVal = parseFloat(String(rawValue));
        formattedValue = isNaN(numVal) ? "-" : numVal.toFixed(2);
        break;
      default:
        formattedValue = String(rawValue); // Fallback
        break;
    }

    let formattedThreshold: string;
    switch (effectiveFormat) {
      case "$":
        formattedThreshold = formatCurrency(pref.value);
        break;
      case "%":
        formattedThreshold = formatPercentage(pref.value);
        break;
      case "number_with_suffix":
        formattedThreshold = formatLargeNumber(pref.value);
        break;
      case "number":
        const numThresh = parseFloat(String(pref.value));
        formattedThreshold = isNaN(numThresh) ? "" : numThresh.toFixed(2);
        break;
      default:
        formattedThreshold = String(pref.value); // Fallback
        break;
    }

    const keyLabel = KEY_LABEL_MAP[keyPart] ?? keyPart;

    const periodLabel =
      keyPart === "marketCap" || !periodPart
        ? ""
        : ` (${periodMap[periodPart] ?? periodPart})`; // Use periodPart if periodMap doesn't have it

    const label = `${keyLabel}${periodLabel} ${pref.comparison} ${formattedThreshold}`;

    fundamentals.push({
      header: label,
      amount: formattedValue,
      isActive,
    });
  }

  return fundamentals;
}

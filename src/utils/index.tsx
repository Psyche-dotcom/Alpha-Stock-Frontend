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
    fcfttmtoequityttm: "FCF/Equity (TTM)",
    ptoeratiofive5yrs: "P/E Ratio 5yrs",
    fiveyearavgfreecashflowyield: "5 yrs Avg FCF Yield",
    returnoninvestedcapitalttm: "Return on Invested Capital (TTM)",
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
  const formatCurrency = (numStr: string) => {
    const num = parseFloat(numStr);
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? "-" : `${num.toFixed(2)}%`;
  };

  const parseNumber = (val: string) => parseFloat(val.replace("%", ""));

  const periodMap: Record<string, string> = {
    first: "1Y",
    fifth: "5Y",
    ten: "10Y",
  };

  const fundamentals: FundamentalsItem[] = [];

  // Add Market Cap
  // if (apiData.marketCap) {
  //   fundamentals.push({
  //     header: "Market Cap",
  //     amount: formatCurrency(apiData.marketCap),
  //     isActive: true,
  //   });
  // }

  // Definitions of the 8-pillar indicators
  const rules: {
    key: keyof ApiData;
    period: keyof ApiData["averageShareOutstanding"];
    condition: (val: number) => boolean;
    label: string;
    description: string;
    format: "currency" | "percentage";
  }[] = [
    {
      key: "netIcome",
      period: "fifth",
      condition: (v) => v < 10e9,
      label: "Net Income",
      description: "< 10B",
      format: "currency",
    },
    {
      key: "roic",
      period: "fifth",
      condition: (v) => v < 20,
      label: "ROIC",
      description: "< 20%",
      format: "percentage",
    },
    {
      key: "averageShareOutstanding",
      period: "fifth",
      condition: (v) => v > 1.75e9,
      label: "Avg Share Outstanding",
      description: "> 1.75B",
      format: "currency",
    },
    {
      key: "freeCashFlowMargin",
      period: "fifth",
      condition: (v) => v < 22,
      label: "Free Cash Flow Margin",
      description: "< 22%",
      format: "percentage",
    },
    {
      key: "revGrowth",
      period: "fifth",
      condition: (v) => v > 5,
      label: "Revenue Growth",
      description: "> 5%",
      format: "percentage",
    },
    {
      key: "pfcf",
      period: "first",
      condition: (v) => v < 200,
      label: "P/FCF",
      description: "< 200",
      format: "currency",
    },
    {
      key: "peRatio",
      period: "first",
      condition: (v) => v > 22,
      label: "P/E Ratio",
      description: "> 22",
      format: "currency",
    },
    {
      key: "profitMargin",
      period: "fifth",
      condition: (v) => v > 20,
      label: "Profit Margin",
      description: "> 20%",
      format: "percentage",
    },
  ];

  for (const rule of rules) {
    const raw =
      typeof apiData[rule.key] === "object" && apiData[rule.key] !== null
        ? (apiData[rule.key] as Record<string, string | null>)[rule.period]
        : null;
    if (!raw) continue;

    const valueNum = parseNumber(raw);
    const amount =
      rule.key == "peRatio" || rule.key == "pfcf"
        ? raw
        : rule.format === "currency"
        ? formatCurrency(raw)
        : formatPercentage(raw);
    const isActive = rule.condition(valueNum);

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
  format: "%" | "$" | "";
  value: string;
}

const KEY_LABEL_MAP: Record<string, string> = {
  profitMargin: "Profit Margin",
  netIcome: "Net Icome",
  freeCashFlowMargin: "Free CashFlow Margin",
  marketCap: "Market Cap",
  revGrowth: "Revenue Growth",
  averageShareOutstanding: "Avg Share Outstanding",
  peRatio: "P/E Ratio", // If applicable
  pfcf: "P/FCF",
  roic: "ROIC", // If you meant this too
};

export function generateFundamentalsList2(
  apiData: ApiData,
  userAlphaPreferences: AlphaPreference[]
): FundamentalsItem[] {
  const formatCurrency = (numStr: string) => {
    const num = parseFloat(numStr);
    if (isNaN(num)) return "-";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? "-" : `${num.toFixed(2)}%`;
  };

  const parseNumber = (val: string) => parseFloat(val.replace(/[%$]/g, ""));

  const periodMap: Record<string, string> = {
    first: "1Y",
    fifth: "5Y",
    ten: "10Y",
  };

  const fundamentals: FundamentalsItem[] = [];

  for (const pref of userAlphaPreferences) {
    const [key, period] = pref.pillerName.split(" ");
    const valKey = key as keyof ApiData;
    const valPeriod = period as keyof ApiData["averageShareOutstanding"];

    const raw =
      typeof apiData[valKey] === "object" && apiData[valKey] !== null
        ? (apiData[valKey] as Record<string, string | null>)[valPeriod]
        : (apiData[valKey] as string | null);

    if (!raw) continue;

    const valueNum = parseNumber(raw);
    const threshold = parseFloat(pref.value);
    let isActive = false;

    if (pref.comparison === ">") {
      isActive = valueNum > threshold;
    } else if (pref.comparison === "<") {
      isActive = valueNum < threshold;
    }

    const formattedValue =
      pref.format === "$"
        ? formatCurrency(raw)
        : pref.format === "%"
        ? formatPercentage(raw)
        : key == "netIcome"
        ? formatCurrency(raw)
        : key == "averageShareOutstanding"
        ? formatCurrency(raw)
        : raw;

    const keyLabel = KEY_LABEL_MAP[key] ?? key;

    const periodLabel =
      key === "marketCap" ? "" : ` (${periodMap[period] ?? ""})`;

    const formattedThreshold =
      pref.format === "$"
        ? formatCurrency(pref.value)
        : pref.format === "%"
        ? formatPercentage(pref.value)
        : key == "netIcome"
        ? formatCurrency(pref.value)
        : key == "averageShareOutstanding"
        ? formatCurrency(pref.value)
        : pref.value;

    const label = `${keyLabel}${periodLabel} ${pref.comparison} ${formattedThreshold}`;

    fundamentals.push({
      header: label,
      amount: formattedValue,
      isActive,
    });
  }

  return fundamentals;
}

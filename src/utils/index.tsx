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
    fiveyearavgfreecashflowyield: "5 Year Avg Free Cash Flow Yield",
    returnoninvestedcapitalttm: "Return on Invested Capital (TTM)",
  };

  return labelMap[formattedKey] ?? toCamelCaseWithSpaces(key);
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

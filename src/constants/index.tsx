import {
  AnalyticsIcon,
  BlogIcon,
  MessageIcon,
  PlanIcon,
  ProfileIcon,
  ReportIcon,
  StockIcon,
  UserIcon,
} from "@/utils/icons";
import { ROUTES } from "./routes";
import { ISidebar } from "@/interface/sidebar";

export const navbarList = [
  {
    title: "Home",
    path: ROUTES.HOME,
  },
  {
    title: "Blog",
    path: ROUTES.BLOG,
  },
];

export const userNavbarList = [
  { title: "Home", path: ROUTES.USER.HOME },
  { title: "Market Kit", path: "#" },
  {
    title: "Subscriptions",
    path: ROUTES.USER.SUBSCRIPTION,
  },
  { title: "Community", path: ROUTES.USER.COMMUNITY },
  { title: "Blogs", path: ROUTES.USER.BLOGS },
  { title: "Watchlist", path: ROUTES.USER.WATCHLIST },
];

export const searchTab = [
  {
    title: "Company Info",
    value: "company-info",
  },
  {
    title: "Metrics",
    value: "metrics",
  },
  {
    title: "Financials",
    value: "financials",
  },
  {
    title: "Fundamentals",
    value: "fundamentals",
  },
  {
    title: "Stock Analyser",
    value: "stock-analyser",
  },
];

export const trendingList = [
  {
    id: "1",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "2",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "3",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "4",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
];

export const marketList = [
  {
    id: "1",
    title: "Top 5 Value Stocks On the Market",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "2",
    title: "Right Now! 3 Stocks To Buy Right Now Before Sales End",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "3",
    title: "Right Now! 3 Stocks To Buy Right Now Before Sales End",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "4",
    title: "Top 5 Value Stocks On the Market",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
];

export const stockList = [
  {
    title: "S&P 500",
    total: "5,998.74",
    value: 22.8,
    percent: 0.38,
    isProgressive: false,
  },
  {
    title: "DOW 30",
    total: "44,772.06",
    value: 137.8,
    percent: 0.32,
    isProgressive: false,
  },
  {
    title: "NASDAQ",
    total: "19,072.06",
    value: 114.01,
    percent: 0.6,
    isProgressive: false,
  },
  {
    title: "RUSSELL",
    total: "5,998.74",
    value: 22.8,
    percent: 0.38,
    isProgressive: true,
  },
];

export const marketMoveFilterList = [
  {
    id: 1,
    text: "Top Traded",
    value: "MostTraded",
  },
  {
    id: 2,
    text: "Top Gainers",
    value: "MostGainer",
  },
  {
    id: 3,
    text: "Top Losers",
    value: "MostLoser",
  },
];

export const trendingLists = [
  {
    id: "1",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
  {
    id: "2",
    title: "What do members of congress know about these stocks that we don’t?",
    publishedDate: "August 2, 2024",
    blogThumbnailUrl: "/assets/images/card-image.png",
  },
];

export const commentList = [
  {
    commentId: "1",
    comment: "Has anyone had any challenge with the premium sub plan?",
    commentDate: "August 2, 2024",
    userImgUrl: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
];

export const communityList = [
  {
    commentId: "1",
    comment: "Has anyone had any challenge with the premium sub plan?",
    commentDate: "August 2, 2024",
    userImgUrl: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
  {
    commentId: "2",
    comment: "Has anyone had any challenge with the premium sub plan?",
    commentDate: "August 2, 2024",
    userImgUrl: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
];

export const communityMenuList = [
  {
    id: 1,
    text: "# Announcements",
    count: 8,
  },
  {
    id: 2,
    text: "# General Chats",
    count: 6,
  },
  { id: 3, text: "# Guidelines" },
  {
    id: 4,
    text: "# Intelligent Investors",
  },
];

export const planList = [
  {
    name: "Free",
    amount: 0,
    id: "1",
  },
  {
    name: "Regular",
    amount: 90,
    id: "2",
  },
  {
    name: "Premium",
    amount: 180,
    id: "3",
  },
];

export const sidebarList: ISidebar[] = [
  {
    title: "User",
    path: ROUTES.ADMIN.USERS,
    icon: <UserIcon />,
  },
  // {
  //   title: "Stocks",
  //   path: ROUTES.ADMIN.STOCKS,
  //   icon: <StockIcon />,
  // },
  {
    title: "Subscriptions",
    path: ROUTES.ADMIN.SUBSCRIPTIONS,
    icon: <PlanIcon />,
  },
  {
    title: "Accounting",
    path: ROUTES.ADMIN.ACCOUNTING,
    icon: <AnalyticsIcon />,
  },
  {
    title: "Forum",
    path: ROUTES.ADMIN.FORUM,
    icon: <MessageIcon />,
  },
  {
    title: "Reports",
    path: ROUTES.ADMIN.REPORTSANDFEEDBACKS,
    icon: <ReportIcon />,
  },
  {
    title: "Blog",
    path: ROUTES.ADMIN.BLOGMANAGER,
    icon: <BlogIcon />,
  },
  {
    title: "Profile",
    path: ROUTES.ADMIN.PROFILE,
    icon: <ProfileIcon />,
  },
];

export const stockManagerFilterList = [
  {
    id: 1,
    text: "Top Traded",
    value: "MostTraded",
  },
  {
    id: 2,
    text: "Top Gainers",
    value: "MostGainer",
  },
  {
    id: 3,
    text: "Top Losers",
    value: "MostLoser",
  },
  {
    id: 4,
    text: "Blacklisted",
    value: "BlackListed",
  },
];
export const dataSources = [
  {
    id: 1,
    title: "Revenue",
    row1: 230.0,
    row2: 120.1,
    row3: 10.51,
    row4: 50.31,
    row5: 12.1,
  },
  {
    id: 2,
    title: "Net Profit",
    row1: 145.0,
    row2: 98.3,
    row3: 15.75,
    row4: 72.56,
    row5: 12.1,
  },
  {
    id: 3,
    title: "Earnings Per Share",
    row1: 8.3,
    row2: 7.2,
    row3: 1.1,
    row4: 4.3,
    row5: 12.1,
  },
  {
    id: 4,
    title: "Market Cap",
    row1: 520.5,
    row2: 310.2,
    row3: 45.8,
    row4: 88.7,
    row5: 12.1,
  },
  {
    id: 5,
    title: "Operating Margin",
    row1: 25.0,
    row2: 30.3,
    row3: 5.1,
    row4: 10.2,
    row5: 12.1,
  },
  {
    id: 6,
    title: "P/E Ratio",
    row1: 15.4,
    row2: 18.7,
    row3: 3.6,
    row4: 8.9,
    row5: 12.1,
  },
  {
    id: 7,
    title: "Dividend Yield",
    row1: 2.5,
    row2: 3.2,
    row3: 0.8,
    row4: 1.5,
    row5: 12.1,
  },
  {
    id: 8,
    title: "Free Cash Flow",
    row1: 120.3,
    row2: 80.5,
    row3: 18.7,
    row4: 55.6,
    row5: 1.32,
  },
  {
    id: 9,
    title: "Debt to Equity Ratio",
    row1: 0.5,
    row2: 0.7,
    row3: 0.3,
    row4: 0.9,
    row5: 12.1,
  },
  {
    id: 10,
    title: "Gross Profit Margin",
    row1: 55.2,
    row2: 65.1,
    row3: 10.4,
    row4: 20.6,
    row5: 12.1,
  },
  {
    id: 11,
    title: "Beta",
    row1: 1.2,
    row2: 1.5,
    row3: 0.8,
    row4: 1.1,
    row5: 12.1,
  },
  {
    id: 12,
    title: "Operating Expenses",
    row1: 78.6,
    row2: 60.9,
    row3: 12.3,
    row4: 34.7,
    row5: 12.1,
  },
  {
    id: 13,
    title: "Net Asset Value",
    row1: 410.2,
    row2: 250.8,
    row3: 35.9,
    row4: 75.1,
    row5: 12.1,
  },
  {
    id: 14,
    title: "Return on Equity",
    row1: 18.5,
    row2: 20.3,
    row3: 5.9,
    row4: 10.4,
    row5: 12.1,
  },
  {
    id: 15,
    title: "Book Value Per Share",
    row1: 32.7,
    row2: 28.4,
    row3: 6.7,
    row4: 12.3,
    row5: 1.32,
  },
  {
    id: 16,
    title: "Quick Ratio",
    row1: 1.4,
    row2: 1.3,
    row3: 0.9,
    row4: 1.1,
    row5: 12.1,
  },
  {
    id: 17,
    title: "Current Ratio",
    row1: 2.1,
    row2: 1.9,
    row3: 1.0,
    row4: 1.6,
    row5: 1.32,
  },
  {
    id: 18,
    title: "EBITDA",
    row1: 340.2,
    row2: 190.4,
    row3: 40.5,
    row4: 95.8,
    row5: 1.21,
  },
  {
    id: 19,
    title: "Price to Book Ratio",
    row1: 3.8,
    row2: 4.2,
    row3: 1.5,
    row4: 2.7,
    row5: 12.1,
  },
  {
    id: 20,
    title: "Inventory Turnover",
    row1: 4.5,
    row2: 3.9,
    row3: 1.8,
    row4: 2.2,
    row5: 12.1,
  },
];
export const CompanyAnalysisList = [
  {
    id: 1,
    count: "+16.20",
    isProgressive: true,
    value: 6.2,
    isOpen: false,
  },
  {
    id: 2,
    count: "+16.20",
    isProgressive: false,
    value: 4.2,
    isOpen: true,
  },
];

export const CompanyStockList = [
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: true,
  },
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: false,
  },
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: false,
  },
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: true,
  },
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: true,
  },
  {
    name: "META",
    amount: 500.0,
    value: 3.98,
    isProgressive: true,
  },
];

export const metricsList = [
  {
    title: "Market Cap",
    text: "$12.69M",
  },
  {
    title: "Revenue",
    text: "$8.34M",
  },
  {
    title: "Profit Margin",
    text: "24.7%",
  },
  {
    title: "Active Users",
    text: "1.2M",
  },
  {
    title: "New Signups",
    text: "45,600",
  },
  {
    title: "Daily Transactions",
    text: "230K",
  },
  {
    title: "Customer Retention",
    text: "87%",
  },
  {
    title: "Employee Count",
    text: "1,500",
  },
  {
    title: "Funding",
    text: "$5M",
  },
  {
    title: "Growth Rate",
    text: "12% QoQ",
  },
  {
    title: "Churn Rate",
    text: "3.2%",
  },
];

export const FundamentalsList = [
  {
    header: "Market Cap",
    amount: "$12.69M",
    isActive: true,
  },
  {
    header: "1Yr P/E Ratio < 5000000000.00",
    amount: "$8.45M",
    isActive: true,
  },
  {
    header: "Quarterly Growth",
    amount: "15%",
    isActive: false,
  },
  {
    header: "Net Income",
    amount: "$3.2M",
    isActive: true,
  },
  {
    header: "Dividend Yield",
    amount: "4.5%",
    isActive: false,
  },
  {
    header: "Debt to Equity Ratio",
    amount: 0.87,
    isActive: true,
  },
  {
    header: "Total Revenue",
    amount: "$28.3M",
    isActive: true,
  },
  {
    header: "EPS (Earnings Per Share)",
    amount: "$1.23",
    isActive: false,
  },
  {
    header: "Cash Flow",
    amount: "$5.67M",
    isActive: true,
  },
  {
    header: "ROE (Return on Equity)",
    amount: "13%",
    isActive: true,
  },
  {
    header: "Operating Margin",
    amount: "9.5%",
    isActive: false,
  },
  {
    header: "Shares Outstanding",
    amount: "50M",
    isActive: true,
  },
];

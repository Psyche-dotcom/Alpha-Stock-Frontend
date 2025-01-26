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
    title: "Community",
    path: ROUTES.USER.COMMUNITY,
  },
  {
    title: "Blog",
    path: ROUTES.BLOG,
  },
  {
    title: "Plans",
    path: ROUTES.USER.PLAN,
  },
];

export const userNavbarList = [
  {
    title: "Company Info",
    path: ROUTES.USER.COMPANYINFO,
  },
  {
    title: "Metrics",
    path: ROUTES.USER.METRICS,
  },
  {
    title: "Financials",
    path: ROUTES.USER.FINANCIALS,
  },
  {
    title: "Fundamentals",
    path: ROUTES.USER.FUNDAMENTALS,
  },
  {
    title: "Stock Analyser",
    path: ROUTES.USER.STOCKANALYSERS,
  },
];

export const trendingList = [
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
];

export const marketList = [
  {
    title: "Top 5 Value Stocks On the Market",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "Right Now! 3 Stocks To Buy Right Now Before Sales End",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "Right Now! 3 Stocks To Buy Right Now Before Sales End",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "Top 5 Value Stocks On the Market",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
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
    text: "Top Searches",
    value: "search",
  },
  {
    id: 2,
    text: "Top Gainers",
    value: "gains",
  },
  {
    id: 3,
    text: "Top Losers",
    value: "losses",
  },
];

export const trendingLists = [
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
  {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  },
];

export const commentList = [
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
];

export const communityList = [
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
    image: "/assets/images/card-image.png",
  },
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
  },
  {
    content: "Has anyone had any challenge with the premium sub plan?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
    name: "Micheal Angelo",
    image: "/assets/images/card-image.png",
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
    header: "Free",
    price: "$0.00",
    isSelected: true,
  },
  {
    header: "Regular",
    price: "$70.00 Monthly",
    isSelected: false,
  },
  {
    header: "Premium",
    price: "$190.00 Monthly",
    isSelected: false,
  },
];

export const sidebarList: ISidebar[] = [
  {
    title: "User",
    path: ROUTES.ADMIN.USERS,
    icon: <UserIcon />,
  },
  {
    title: "Stocks",
    path: ROUTES.ADMIN.STOCKS,
    icon: <StockIcon />,
  },
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
    text: "Top Searches",
    value: "search",
  },
  {
    id: 2,
    text: "Top Gainers",
    value: "gains",
  },
  {
    id: 3,
    text: "Top Losers",
    value: "losses",
  },
  {
    id: 4,
    text: "Blacklisted",
    value: "blacklisted",
  },
];

export const CompanyAnalysisList = [
  {
    id: 1,
    count: "+16.20",
    isProgressive: true,
    value: 6.2,
  },
  {
    id: 2,
    count: "+16.20",
    isProgressive: false,
    value: 4.2,
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

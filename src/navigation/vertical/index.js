import {
  Home,
  Book,
  FileText,
  CreditCard,
  MessageCircle,
  Table,
  Circle,
} from "react-feather";

export default [
  {
    id: "courses",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "courses",
    title: "دوره‌ها",
    icon: <Home size={20} />,
    badge: "light-primary",
    badgeText: "2",
    children: [
      {
        id: "list",
        title: "لیست دوره‌ها",
        icon: <Circle size={12} />,
        navLink: "/course-management",
      },
      {
        id: "comments",
        title: "مدیریت کامنت‌ها",
        icon: <Circle size={12} />,
        navLink: "/courses-comments",
      },
    ],
  },
  {
    id: "news",
    title: "مدیریت بلاگ‌ها",
    icon: <FileText size={20} />,
    navLink: "/news",
  },
  {
    id: "technologies",
    title: "مدیریت درس‌ها",
    icon: <Book size={20} />,
    navLink: "/techs-management",
  },
];

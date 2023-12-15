import { Home, Book, BookOpen, MessageCircle, FileText, CreditCard } from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "news",
    title: "مدیریت بلاگ‌ها",
    icon: <FileText size={20} />,
    navLink: "/news",
  },
  {
    id:"technologies",
    title:"مدیریت درس‌ها",
    icon: <Book size={20} />,
    navLink: "/techs-management",
  },
  {
    id: "courses",
    title: "مدیریت دوره‌ها",
    icon: <CreditCard size={20} />,
    navLink: "/course-management",
  },
];

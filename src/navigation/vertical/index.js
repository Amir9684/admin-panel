import { Home, Book, BookOpen, MessageCircle, FileText } from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "news",
    title: "بلاگ‌ها",
    icon: <FileText size={20} />,
    navLink: "/news",
  },
  {
    id: "courses",
    title: "دوره‌ها",
    icon: <Book size={20} />,
    navLink: "/courses",
  },
];

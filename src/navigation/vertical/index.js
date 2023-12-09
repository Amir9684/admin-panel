import {
  Mail,
  Home,
  Airplay,
  Circle,
  Book,
  Layers,
  BookOpen,
  MessageCircle,
} from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "courses",
    title: "دوره‌ها",
    icon: <Book size={20} />,
    badge: "light-warning",
    badgeText: "2",
    children: [
      {
        id: "courseManagement",
        title: "مدیریت دوره‌ها",
        icon: <BookOpen size={20} />,
        navLink: "/course-management",
      },
      {
        id: "courseComments",
        title: "مدیریت کامنت‌ها",
        icon: <MessageCircle size={20} />,
        navLink: "/course-comments-management",
      },
    ],
  },
  {
    id: "news",
    title: "بلاگ‌ها",
    icon: <Book size={20} />,
    badge: "light-warning",
    badgeText: "2",
    children: [
      {
        id: "courseManagement",
        title: "مدیریت بلاگ‌ها",
        icon: <BookOpen size={20} />,
        navLink: "/course-management",
      },
      {
        id: "courseComments",
        title: "مدیریت کامنت‌ها",
        icon: <MessageCircle size={20} />,
        navLink: "/course-comments-management",
      },
    ],
  },
];

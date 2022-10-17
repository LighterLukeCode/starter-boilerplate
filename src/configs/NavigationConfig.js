import { DashboardOutlined, PlusCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const extraNavTree = [
  {
    key: "extra",
    path: `${APP_PREFIX_PATH}/pages`,
    title: "sidenav.pages",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "extra-pages",
        path: `${APP_PREFIX_PATH}/pages`,
        title: "sidenav.pages",
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "extra-pages-profile",
            path: `${APP_PREFIX_PATH}/pages/profile`,
            title: "sidenav.pages.profile",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree, ...extraNavTree];

export default navigationConfig;

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
    path: `${APP_PREFIX_PATH}/clients`,
    title: "sidenav.clients",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "extra-pages",
        path: `${APP_PREFIX_PATH}/clients`,
        title: "sidenav.clients",
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "extra-pages-profile",
            path: `${APP_PREFIX_PATH}/clients/clients-list`,
            title: "sidenav.clients.clientslist",
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

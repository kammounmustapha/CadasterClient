/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import work from "@material-ui/icons/Work";
import UserIcon from "@material-ui/icons/People";
import Company from "@material-ui/icons/Store";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Companies from "views/Companies/Companies";
import Users from "views/Users/Users";
import LicenseRequests from "views/LicenseRequests/LicenseRequests";
import LicenseRequestsEdit from "views/LicenseRequests/LicenseRequestsEdit";
import LicenseRequestsNew from "views/LicenseRequests/LicenseRequestsNew";
import PermitApplications from "views/PermitApplications/PermitApplications";
import PermitApplicationsNew from "views/PermitApplications/PermitApplicationsNew";
import PermitApplicationsEdit from "views/PermitApplications/PermitApplicationsEdit";
// core components/views for RTL layout
function getRoutes() {
  //const authService = new AuthService();
  // console.log(authService.getProfile().role);
  var dashboardRoutes = [];
  {
    dashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
      },
      {
        path: "/users",
        name: "Users",
        icon: UserIcon,
        component: Users,
        layout: "/admin"
      },
      {
        path: "/companies",
        name: "Companies",
        icon: Company,
        component: Companies,
        layout: "/admin"
      },
      {
        path: "/lincenseApplications",
        name: "License Applications",
        icon: work,
        component: LicenseRequests,
        layout: "/admin"
      },
      {
        path: "/permitApplications",
        name: "Permit Applications",
        icon: work,
        component: PermitApplications,
        layout: "/admin"
      },
      {
        path: "/lincenseApplicationsNew",
        layout: "/admin",
        component: LicenseRequestsNew,
        icon: work,
        name: "Apply for a license"
      },
      {
        path: "/LicenseApplicationsEdit",
        layout: "/admin",
        component: LicenseRequestsEdit,
        icon: work,
        name: "Edit License Application"
      },
      {
        path: "/PermitApplicationsNew",
        layout: "/admin",
        component: PermitApplicationsNew,
        icon: work,
        name: "Apply for a new permit"
      },
      {
        path: "/PermitApplicationsEdit",
        layout: "/admin",
        component: PermitApplicationsEdit,
        icon: work,
        name: "Edit permit Application"
      },
      {
        path: "/user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/admin"
      }
    ];
  }
  return dashboardRoutes;
}
const dashboardRoutes = getRoutes();
export default dashboardRoutes;

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import gavel from "@material-ui/icons/Gavel";
import work from "@material-ui/icons/Work";
import UserIcon from "@material-ui/icons/People";
import Company from "@material-ui/icons/Store";
import Layers from "@material-ui/icons/Layers";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Companies from "views/Companies/Companies";
import Users from "views/Users/Users";
import LicenseRequests from "views/LicenseRequests/LicenseRequests";
import LicenseRequestsEdit from "views/LicenseRequests/LicenseRequestsEdit";
import LicenseRequestsNew from "views/LicenseRequests/LicenseRequestsNew";
import PermitApplications from "views/PermitApplications/PermitApplications";
import PermitApplicationsNew from "views/PermitApplications/PermitApplicationsNew";
import PermitApplicationsEdit from "views/PermitApplications/PermitApplicationsEdit";
import LicensesEdit from "views/Licenses/LicensesEdit";
import Licenses from "views/Licenses/Licenses";
import Map from "views/Maps/Map";
// core components/views for RTL layout
function getRoutes() {
  var dashboardRoutes = [];
  {
    dashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
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
        path: "/Map",
        name: "Cadastre Map",
        icon: Layers,
        component: Map,
        layout: "/admin "
      },
      {
        path: "/Parties",
        name: "Parties",
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
        path: "/LicenseEdit",
        layout: "/admin",
        component: LicensesEdit,
        icon: gavel,
        name: "License Info"
      },
      {
        path: "/Licenses",
        layout: "/admin",
        component: Licenses,
        icon: gavel,
        name: "Licenses"
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

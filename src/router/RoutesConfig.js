import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import RegisterForm from "../pages/RegisterForm";

/*
  Routes config must be ordered the same way you'd 
  do inside a `<Switch>`. The last route object is 
  a "fallback" route, to catch 404 errors.
*/

const RoutesConfig = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/register",
    component: RegisterForm,
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

export default RoutesConfig;

import FormPage from "./Components/Login/Login";
import {Switch , Route , Redirect,BrowserRouter} from "react-router-dom";
import "../node_modules/bootstrap-css-only/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./Components/Home/Home";
import Signin from "./Components/Login/Signin";
import Logout from "./Components/Login/Logout";
import Error from "./Components/Home/Error";
import User from "./Components/Home/User";
import Input from "./Components/Home/Input";
import ParticluarBook from "./Components/Home/BookInfo/ParticluarBook";
import ForgetPassword from "./Components/Login/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={FormPage} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/user" component={User} />
        <Route exact path="/input" component={Input} />
        <Route exact path="/particular/:id" component={ParticluarBook} />
        <Route exact path="/forget_password" component={ForgetPassword} />
        <Route component={Error} />
        <Redirect to="/" component={Home} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;

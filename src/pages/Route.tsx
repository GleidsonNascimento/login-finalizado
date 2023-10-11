import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndLogin from "./LoginAndRegister";
import ForgotPassword from "./forgotPassword";
import HomeScreen from "./home";

function PasswordLoginWithFirebase(){
    return(
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<RegisterAndLogin/>} />
                    <Route path="/home" element={<HomeScreen/>} />
                    <Route path="/reset" element={<ForgotPassword/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default PasswordLoginWithFirebase;
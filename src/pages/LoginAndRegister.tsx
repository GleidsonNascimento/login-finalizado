import  { useState } from "react";
import { database } from "./firebaseConfig";
import "./naosei.css"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    if (type === "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          const user = data.user;
          return updateProfile(user, {
            displayName: name,
          });
        })
        .then(() => {
          const user = auth.currentUser;
          console.log("Nome do usuário salvo:", user.displayName);
          history("/home");
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            alert("O endereço de e-mail já está em uso.");
          } else if (err.code === "auth/invalid-email") {
            alert("O endereço de e-mail é inválido.");
          } else {
            alert("cadastro feito com sucesso");
          }
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleReset = ()=>{
    history("/reset");
  }

  return (
    <div className="App">
     <div className="container-login">
     <div className="row">
     <div
  className={`Color ${login === true ? "activeColor" : "pointer"}`}
  onClick={() => setLogin(true)}
>
  <h4>Login</h4>
</div>
     <div
  className={`Color ${login === false ? "activeColor" : "pointer"}`}
  onClick={() => setLogin(false)}
>
  <h4>Inscreva-se</h4>
</div>
      </div>
     <div className="container-form">
     <h1>{login ? "Login" : "Cadastra-se"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        {login === false && ( 
          <>
            <input name="name" placeholder="Nome" />
            <br />
          </>
        )}
        <p className="password" onClick={handleReset}>Esqueceu a senha?</p>
        <br />
        <button className="button-login">{login ? "Login" : "Cadastrar"}</button>
      </form>
     </div>
     </div>
    </div>
  );
}

export default RegisterAndLogin;

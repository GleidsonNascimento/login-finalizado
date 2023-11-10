import { useState } from "react";
import { database } from "./firebaseConfig";
import "./naosei.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | undefined;

    try {
      if (type === "signup") {
        const userCredential = await createUserWithEmailAndPassword(
          database,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        console.log("Nome do usuário salvo:", user.displayName);
        history("/home");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          database,
          email,
          password
        );
        console.log(userCredential, "authData");
        history("/home");
      }
    } catch (err: any) {
      if (err?.code) {
        const errCode = err.code;
        switch (errCode) {
          case "auth/email-already-in-use":
            alert("O endereço de e-mail já está em uso.");
            break;
          case "auth/invalid-email":
            alert("O endereço de e-mail é inválido.");
            break;
          default:
            alert(`Erro durante o cadastro: ${errCode}`);
        }
      } else {
        alert("Houve um erro durante o cadastro.");
      }

      setLogin(true);
    }
  };

  const handleReset = () => {
    history("/reset");
  };

  const user = database.currentUser;

  if (user) {
    console.log("O usuário está autenticado:", user.displayName);
  } else {
    console.log("O usuário não está autenticado.");
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
            <p className="password" onClick={handleReset}>
              Esqueceu a senha?
            </p>
            <br />
            <button className="button-login">
              {login ? "Login" : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterAndLogin;

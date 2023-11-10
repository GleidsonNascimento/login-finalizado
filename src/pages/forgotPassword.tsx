import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.querySelector('[name="email"]') as HTMLInputElement)
      .value;
    try {
      await sendPasswordResetEmail(database, email);
      alert("Verifique seu e-mail");
      history("/");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="App">
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" />
        <br />
        <br />
        <button>Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

import { useEffect, useState } from "react";
import { database, signOut } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { imagemDb } from "./firebaseConfig";
import "./home.css";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function HomeScreen() {
  const user = database.currentUser;
  const uid = user ? user.uid : null;
  const displayName = user ? user.displayName : null;
  const history = useNavigate();
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  const LogoutClick = () => {
    signOut(database).then(() => {
      history("/");
    });
  };

  const handleClick = async () => {
    if (img !== null) {
      const imgRef = ref(imagemDb, `files/${uid}/${v4()}`);
      await uploadBytes(imgRef, img);
      const url = await getDownloadURL(imgRef);
      setImgUrl([...imgUrl, url]); // Adicionando a nova URL ao array existente
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await listAll(ref(imagemDb, `files/${uid}`));
      const urls = await Promise.all(
        imgs.items.map(async (val) => {
          const url = await getDownloadURL(val);
          return url;
        })
      );
      setImgUrl(urls);
    };

    fetchImages();
  }, [uid]);

  return (
    <div className="gradient">
      <button className="button-logout" onClick={LogoutClick}>
        Logout
      </button>
      <div className="container-home">
        <label htmlFor="upload-input" className="upload-label">
          <div className="upload-container">
            <input
              type="file"
              id="upload-input"
              onChange={(e) => setImg(e.target.files![0])}
              className="upload-button"
            />

            {imgUrl.length > 0 && (
              <div className="profile">
                <img
                  className="profile-img"
                  src={imgUrl[imgUrl.length - 1]}
                  alt="uploaded"
                />
                <br />
              </div>
            )}
          </div>
        </label>
        <h1>Bem-vindo, {displayName}!</h1>
      </div>
      {img && (
        <button className="button-img" onClick={handleClick}>
          Enviar Imagem
        </button>
      )}
    </div>
  );
}

export default HomeScreen;

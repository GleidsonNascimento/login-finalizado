import { useEffect, useState } from "react";
import { database, signOut } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { imagemDb } from "./firebaseConfig";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function HomeScreen() {
  const user = database.currentUser;
  const displayName = user ? user.displayName : null;
  const history = useNavigate();

  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const LogoutClick = () => {
    signOut(database).then((val) => {
      console.log(val, "val");
      history("/");
    });
  };

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imagemDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await listAll(ref(imagemDb, "files"));
      const urls = await Promise.all(
        imgs.items.map(async (val) => {
          const url = await getDownloadURL(val);
          return url;
        })
      );
      setImgUrl(urls);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {displayName}!</h1>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}> upload</button>
      {imgUrl.map((dataVal) => (
        <div key={dataVal}>
          <img src={dataVal} height="200px" width="200px" alt="uploaded" />
          <br />
        </div>
      ))}
      <button onClick={LogoutClick}>Logout</button>
    </div>
  );
}

export default HomeScreen;

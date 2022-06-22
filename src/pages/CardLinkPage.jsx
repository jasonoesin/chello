import CardDetail from "../components/CardDetail";
import { useEffect } from "react";
import { useState } from "react";
import { getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams, useLocation, Link } from "react-router-dom";

const CardLinkPage = () => {
  const [curr, setCurr] = useState(null);
  const location = useLocation();
  const params = useParams();
  const q = doc(db, "card", params.id);

  useEffect(() => {
    const snaps = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setCurr({ ...snapshot.data(), id: snapshot.id });
      } else {
        setCurr(null);
      }
    });

    return snaps;
  }, [location]);

  const handleClickCard = (id, card) => {
    curr.current = card;
  };

  return (
    <div className="w-screen ">
      <div className="overflow-y-hidden h-screen object-cover">
        <img
          className=""
          src="https://wallpaperaccess.com/full/2029165.jpg"
          alt=""
        />
      </div>

      {curr ? (
        <CardDetail current={curr} hidden="false" handle={handleClickCard} />
      ) : null}
    </div>
  );
};

export default CardLinkPage;

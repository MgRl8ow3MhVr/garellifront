import "./FindTeenage.css";
import searchIcon from "../../assets/icons/research.png";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { appStore } from "../../store/store";

const teen1 = [
  { first_name: "tes", last_name: "lastname1", date: "18/23/2000" },
  { first_name: "prenomlong", last_name: "lastname2", date: "18/23/2000" },
  {
    first_name: "prenom-tres-long",
    last_name: "lastname3",
    date: "18/23/2000",
  },
];
const teen2 = [
  { first_name: "one result", last_name: "result11", date: "18/23/2000" },
];
const FindTeenage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exitAll, setExitAll] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  const apiFetchTeenages = appStore((state) => state.apiFetchTeenages);

  useEffect(() => {
    const teens = searchTerm === "s" ? teen1 : searchTerm === "ss" ? teen2 : [];

    const search = async () => {
      apiFetchTeenages({ p1: "tata" });
    };

    // setExitAll(true);
    // setTimeout(() => {
    //   setSuggestionList(teens);
    //   setExitAll(false);
    // }, 200);
  }, [searchTerm]);

  return (
    <div className="findTeenContainer">
      <div className="findTeenInput">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="rechercher un jeune"
        />
        <img src={searchIcon} />
      </div>
      <div className="findTeenListContainer">
        {suggestionList.map((s, i) => (
          <Suggestion key={`${i}${s.first_name}`} s={s} i={i} exit={exitAll} />
        ))}
      </div>
    </div>
  );
};

export default FindTeenage;

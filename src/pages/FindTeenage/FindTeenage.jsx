import "./FindTeenage.css";
import searchIcon from "../../assets/icons/research.png";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { appStore } from "../../store/store";

const FindTeenage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exitAll, setExitAll] = useState(false);
  const [allTeenages, setAllTeenages] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  const apiFetchTeenages = appStore((state) => state.apiFetchTeenages);
  const userName = appStore((state) => state.user?.name);

  useEffect(() => {
    const search = async () => {
      const data = await apiFetchTeenages();
      setAllTeenages(data);
      setSuggestionList(data);
    };
    search();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setExitAll(true);
      setTimeout(() => {
        setSuggestionList(
          allTeenages.filter((t) => t.first_name.includes(searchTerm))
        );
        setExitAll(false);
      }, 250);
    }
  }, [searchTerm]);

  return (
    <div className="findTeenContainer">
      <div className="findTeenInput">
        <div>BIENVENUE {userName}</div>
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
          <Suggestion key={`${s.first_name}`} s={s} i={i} exit={exitAll} />
        ))}
      </div>
    </div>
  );
};

export default FindTeenage;

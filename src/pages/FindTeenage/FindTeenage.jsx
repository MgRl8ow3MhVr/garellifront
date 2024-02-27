import "./FindTeenage.css";
import ResearchIcon from "../../assets/icons/ResearchIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { appStore } from "../../store/store";
import { colors } from "../../config";

const FindTeenage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exitAll, setExitAll] = useState(false);
  const [allTeenages, setAllTeenages] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  const apiFetchTeenages = appStore((state) => state.apiFetchTeenages);
  const userName = appStore((state) => state.user?.username);

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
      <div className="findTeenUser">
        <UserIcon color={colors.typo} size="2rem" />
        {userName}
      </div>
      <div className="findTeenTitle">BIENVENUE {userName}</div>
      <div className="findTeenInput">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="rechercher un jeune"
        />
        <div className="findTeenSearchIcon">
          <ResearchIcon color={colors.grey2} size="1.5rem" />
        </div>
        <div className="findTeenListContainer">
          {suggestionList.map((s, i) => (
            <Suggestion key={`${s.first_name}`} s={s} i={i} exit={exitAll} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTeenage;

import "./FindTeenage.css";
import ResearchIcon from "../../assets/icons/ResearchIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { appStore } from "../../store/store";
import { colors } from "../../config";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

const FindTeenage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTeenages, setAllTeenages] = useState([]);
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
    setSuggestionList(
      allTeenages.filter((t) =>
        (t.first_name + t.last_name)
          .toUpperCase()
          .includes(searchTerm.toUpperCase())
      )
    );
  }, [searchTerm]);

  if (!allTeenages.length) return <LoadingWheel />;

  return (
    <div className="findTeenContainer">
      <div className="findTeenUser">
        <UserIcon color={colors.typo} size="2rem" />
        {userName}
      </div>
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
      </div>
      <div className="findTeenListContainer">
        {suggestionList.map((s, i) => (
          <Suggestion key={`${s.first_name}`} s={s} i={i} />
        ))}
      </div>
    </div>
  );
};

export default FindTeenage;

import React, { useRef, useState } from "react";
import { useModifiers } from "../../../hooks/useModifiers";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setAreReposFetched, setMyRepos, setSelectedRepo } from "../../../redux/slice";
import { getSearchResultForRepos } from "../../../apiCalls/getSearchResultForRepos";

import styles from "./SearchRepo.module.css";

const SearchRepo: React.FC = () => {
  const dispatch = useAppDispatch();
  const areReposFetched = useAppSelector((state) => state.appState.areReposFetched);
  const repositories = useAppSelector((state) => state.appState.myRepos);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const mods = useModifiers(
    "searchResult",
    {
      hide: !focused || loading || (!loading && searchResult.length === 0),
    },
    styles,
    true
  );

  const handleFocus = async () => {
    if (!areReposFetched) {
      setLoading(true);
      const repositoriesData = await getSearchResultForRepos();
      dispatch(setMyRepos(repositoriesData));
      setSearchResult(repositoriesData);
      setLoading(false);
      dispatch(setAreReposFetched(true));
    } else {
      setSearchResult(repositories);
    }
    setFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setFocused(false), 500);
  };

  const getRepositories = (input: string) => {
    if (!areReposFetched && input.length > 0) {
      setLoading(true);
      return;
    }
    if (input.length > 0) {
      const filteredRepos = repositories.filter((repo) =>
        repo.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResult(filteredRepos);
    } else {
      setSearchResult(repositories);
    }
  };

  const handleClick = (repo: string) => {
    if (inputRef.current) {
      inputRef.current.value = repo;
      dispatch(setSelectedRepo(repo));
      setSearchResult([]);
    }
  }

  return (
    <div className={styles.searchRepo}>
      <input
        className={styles.searchBox}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        onChange={(event) => getRepositories(event.target.value)}
        type="text"
        placeholder="Search for a repository..."
      />
      <div className={mods}>
        {loading && focused ? (
          <div>loader</div>
        ) : (
          searchResult.map((repo, index) => (
            <div key={index} className={styles.singleResult} onClick={() => handleClick(repo)}>
              {repo}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchRepo;

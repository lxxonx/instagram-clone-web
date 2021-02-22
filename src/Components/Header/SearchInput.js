import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../Hooks/useInput";
import SearchMenu from "./SearchMenu";
import { Menu } from "./Styles";

const SEARCH = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      username
      avatar
      fullname
    }
  }
`;
const SearchBoxCover = styled.div`
  ${(props) => props.theme.whiteBox}
  background-color: ${(props) => props.theme.bgColor};
  height: 28px;
  width: 215px;
  margin: auto;
  flex: 0 1 auto;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: text;
`;
const SearchText = styled.div`
  width: 170px;
  display: ${(props) => {
    return props.showing ? `block` : `none`;
  }};
`;
const SearchBox = styled.input`
  border: 0;
  background-color: ${(props) => props.theme.bgColor};
  height: 25px;
  width: 170px;
  margin: auto;
  display: ${(props) => {
    return props.showing ? `block` : `none`;
  }};
  position: absolute;
  font-size: 12px;
  z-index: 3;
`;
const CancelSearch = styled.button`
  display: ${(props) => {
    return props.showing ? `flex` : `none`;
  }};
  z-index: 3;
`;
function SearchInput() {
  const searchInput = useInput("");
  const searchInputRef = useRef();
  const [search, setSearch] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchUsers, { data, loading }] = useLazyQuery(SEARCH, {
    variables: {
      query: searchInput.value,
    },
  });
  const HandleOnChange = (e) => {
    if (e.target.value === "") {
      setSearchMenu(false);
    } else if (search) {
      setSearchMenu(true);
      searchUsers();
    }
    searchInput.onChange(e);
  };
  useEffect(() => {
    const handleClickAway = (e) => {
      if (!searchInputRef.current.contains(e.target)) {
        setSearch(false);
        setSearchMenu(false);
      }
    };
    const hadleLoad = () => {
      searchInput.setValue("");
    };
    if (search) window.addEventListener("click", handleClickAway);
    if (searchInput.value) window.addEventListener("popstate", hadleLoad);
    return () => {
      if (search) window.removeEventListener("click", handleClickAway);
      if (searchInput.value) window.removeEventListener("popstate", hadleLoad);
    };
  }, [search, searchInput]);
  return (
    <SearchBoxCover
      onClick={() => {
        setSearch(true);
        if (searchInput.value !== "") {
          setSearchMenu(true);
        }
      }}
    >
      <SearchText showing={!search}>
        {searchInput.value === "" ? "SEARCH" : `${searchInput.value}`}
      </SearchText>
      <SearchBox
        ref={searchInputRef}
        showing={search}
        placeholder="search"
        value={searchInput.value}
        onChange={HandleOnChange}
      />
      <CancelSearch
        showing={search}
        onClick={() => {
          setSearch(false);
        }}
      >
        x
      </CancelSearch>
      <Menu showing={searchMenu}>
        {data && !loading && <SearchMenu users={data.searchUsers} />}
      </Menu>
    </SearchBoxCover>
  );
}

export default SearchInput;

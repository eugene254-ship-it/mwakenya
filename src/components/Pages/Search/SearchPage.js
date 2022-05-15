import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SearchPageStyles from "./SearchPageStyles";
import SearchList from "./SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../../Navbar/useSearch";
import { Avatar, Chip } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SchoolIcon from "@mui/icons-material/School";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import {
  TYPE_CLUB,
  TYPE_POST,
  TYPE_UNI,
  TYPE_USER,
} from "../../Contexts/Paths";
const SearchPage = () => {
  const navigate=useNavigate()
  const TYPE_ALL =
    TYPE_USER + "," + TYPE_UNI + "," + TYPE_CLUB + "," + TYPE_POST;
  const classes = SearchPageStyles();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState("");
  const [text, setText] = useState("");
  function useQuery() {
    // ? ile parametreleri alabiliyoruz
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    setFilters(query.get("filters"));
    setText(query.get("text"));
  }, [query]);

  console.log("filters:", filters);
  console.log("text:", text);
  const [pageNumber] = useState(0);
  useSearch(text, filters, pageNumber, setResults);
  console.log("results:", results);

  const handleFilterClick = (filter) => {
    // setFilters(filter);
    navigate("/search?filters="+filter+"&text="+text)
  };
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}></Grid>
      <Grid item className={classes.Center}>
        <div className={classes.notAreaWrapper}>
          <div className={classes.filterTitle}>Filters</div>
          <div className={classes.filtersWrapper}>
            <Chip
              onClick={() => handleFilterClick(TYPE_ALL)}
              variant={filters === TYPE_ALL ? "filled" : "outlined"}
              icon={<ClearAllIcon />}
              label="All"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_USER)}
              variant={filters === TYPE_USER ? "filled" : "outlined"}
              label="User"
              className={classes.filter}
              icon={<SupervisedUserCircleIcon />}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_UNI)}
              variant={filters === TYPE_UNI ? "filled" : "outlined"}
              icon={<SchoolIcon />}
              label="University"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_CLUB)}
              variant={filters === TYPE_CLUB ? "filled" : "outlined"}
              icon={<GroupWorkIcon />}
              label="Club"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_POST)}
              variant={filters === TYPE_POST ? "filled" : "outlined"}
              icon={<ScreenShareIcon />}
              label="Post"
              className={classes.filter}
              color="success"
            />
          </div>

          <div className={classes.title}>Results</div>
          <SearchList results={results} />
        </div>
      </Grid>
      <Grid item className={classes.RightSide}></Grid>
    </Grid>
  );
};

export default SearchPage;

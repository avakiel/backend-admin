import React, { useState } from "react";
import axios, { CancelTokenSource } from "axios";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (cancelToken) {
      cancelToken.cancel("Operation canceled by the user.");
    }

    setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      const cancelTokenSource = axios.CancelToken.source();
      setCancelToken(cancelTokenSource);

      const response = await axios.get(`/api/products?query=${query}`, {
        cancelToken: cancelTokenSource.token,
      });

      setSearchResults(response.data);
      setError(null);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError("Error fetching search results. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="search"
                onClick={() => fetchSearchResults(searchQuery)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loading && <CircularProgress />}
      {error && <div>{error}</div>}
      <List>
        {searchResults.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem button>
              <ListItemText primary={result.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
    const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if(keyword === ""){
        navigate(`/products/${keyword}`)
    }
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } 
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;

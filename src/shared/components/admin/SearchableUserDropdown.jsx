
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";

function SearchableUserDropdown({ value, onChange, placeholder = "Search instructor...", label = "Lead Instructor" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handler = setTimeout(() => {
      setLoading(true);
      axiosInstance
        .get("/admin/users", {
          params: { search: query, limit: 10 }
        })
        .then(res => setResults(res.data?.data || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div>
      <input
        className="mt-2 w-full border rounded px-3 py-2"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading && <div className="text-xs mt-1">Loading...</div>}
      {results.length > 0 && (
        <ul className="border rounded mt-1 bg-white max-h-40 overflow-y-auto">
          {results.map(user => (
            <li
              key={user._id}
              className={`px-3 py-2 cursor-pointer hover:bg-primary/10 ${value === user._id ? "bg-primary/20" : ""}`}
              onClick={() => {
                onChange(user._id);
                setQuery(`${user.firstName} ${user.lastName} (@${user.username})`);
                setResults([]);
              }}
            >
              {user.firstName} {user.lastName} (@{user.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default SearchableUserDropdown;
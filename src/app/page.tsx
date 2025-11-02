"use client";

import { useCallback, useEffect, useState } from "react";
import { Advocate } from "./types";
import AdvocateResults from "./components/advocate-results";
import { debounce } from "./utils/debounce";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  // Call the search API
  const fetchSearchResults = async (query: string) => {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: query }),
    });

    const jsonResponse = await response.json();
    return jsonResponse.data;
  };

  // const debouncedSearch = useCallback(() => {
  //   const debounced = debounce(async (query: string) => {
  //     const filteredAdvocates = await fetchSearchResults(query);
  //     setFilteredAdvocates(filteredAdvocates);
  //   }, 300);

  //   return debounced;
  // }, []);

  // Wrap the call to debounce in useCallback so that we only create the debounced function once -
  // otherwise we lose the closure of our stored "timeout" to clear timeouts on subsequent calls.
  // Not sure about the warning, when wrapped in an inline function we lose the debounced function somehow?
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      const filteredAdvocates = await fetchSearchResults(query);
      setFilteredAdvocates(filteredAdvocates);
    }, 300),
    []
  );

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;

      // TODO - add back searching by years of experience?
      // const filteredAdvocates = advocates.filter((advocate) => {
      //   return (
      //     advocate.firstName.includes(searchTerm) ||
      //     advocate.lastName.includes(searchTerm) ||
      //     advocate.city.includes(searchTerm) ||
      //     advocate.degree.includes(searchTerm) ||
      //     advocate.specialties.includes(searchTerm)
      //   );
      // });
      setCurrentSearchTerm(searchTerm);
      await debouncedSearch(searchTerm);
    },
    [debouncedSearch]
  );

  const resetSearch = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setCurrentSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <input
          className="flex-grow outline-none bg-transparent px-2"
          style={{ border: "1px solid black" }}
          onChange={onChange}
          placeholder="Type here to search ... "
          value={currentSearchTerm}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={resetSearch}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <AdvocateResults advocates={filteredAdvocates} />
    </main>
  );
}

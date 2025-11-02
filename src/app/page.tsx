"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    // TODO - this is not the way, and we should prbably deounce as well
    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
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

interface AdvocateRowProps {
  advocate: Advocate;
}

interface AdvocateResultsProps {
  advocates: Advocate[];
}

function AdvocateResults({ advocates }: AdvocateResultsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {advocates.map((advocate) => (
        <AdvocateRow key={advocate.id} advocate={advocate}></AdvocateRow>
      ))}
    </div>
  );
}

function AdvocateRow({ advocate }: AdvocateRowProps) {
  // Generic card styles copied from tailwind documentation
  // https://tailwindcss.com/docs/styling-with-utility-classes
  // Could use a lot of work! But wanted to just get started with something in place of the html table
  return (
    <div className="flex gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
      <AdvocateIcon />
      <div className="space-y-2 text-center sm:text-left">
        <AdvocateName advocate={advocate} />
        <div className="space-y-0.5">
          <p className="font-medium text-gray-500">{advocate.city}</p>
          <span className="font-medium text-gray-500">
            In the industry for {advocate.yearsOfExperience} years
          </span>
          <AdvocatePhoneNumber advocate={advocate} />
        </div>
        <AdvocateSpecialties advocate={advocate} />
        <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
          Message (Or other call to action)
        </button>
      </div>
    </div>
  );
}

function AdvocateIcon() {
  // TODO - thought a placeholder svg would be fun, but I was getting strange sizing on the page.
  // Left as a stretch goal, if we wanted to try and render something here.
  // <svg className="w-6 h-6 text-gray-500"
  //   fill="none"
  //   stroke="currentColor"
  //   viewBox="0 0 24 24"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //     stroke-width="2"
  //     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //   ></path>
  // </svg>
  return null;
}

function AdvocateName({ advocate }: { advocate: Advocate }) {
  return (
    <>
      <p className="text-lg font-semibold text-black">
        {advocate.firstName} {advocate.lastName},
        <span className="font-medium text-gray-500"> {advocate.degree}</span>
      </p>
    </>
  );
}

function AdvocatePhoneNumber({ advocate }: { advocate: Advocate }) {
  return <p className="font-medium text-gray-500">{advocate.phoneNumber}</p>;
}

function AdvocateSpecialties({ advocate }: { advocate: Advocate }) {
  // TODO - different effort to re-work specialities
  // return (
  //   <div>
  //     <p className="font-medium text-gray-700">Specialties:</p>
  //     <div className="flex">
  //       {advocate.specialties.map((specialty, index) => (
  //         <span
  //           key={index}
  //           className="my-2 inline-block rounded-full bg-neutral-200 px-6 pb-2 pt-2.5 text-xs font-small leading-normal  shadow-md transition duration-150 ease-in-out hover:bg-neutral-300 hover:shadow-lg focus:bg-neutral-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-400 active:shadow-lg dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-500 dark:focus:bg-neutral-500 dark:active:bg-neutral-400"
  //         >
  //           {specialty}
  //         </span>
  //       ))}
  //     </div>
  //   </div>

  return (
    <span className="text-xs text-gray-700">
      Specialties: {advocate.specialties.join(", ")}
    </span>
  );
}

import React, { useState, useEffect } from "react";
import Loader from "./helpers/Loader";
import axios from "axios";
import DropComp from "./DropComp";


function sortByDate(a, b) {
  if (a.release_date < b.release_date) {
    return 1;
  }
  if (a.release_date > b.release_date) {
    return -1;
  }
  return 0;
}


const MainDrop = () => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();

  async function getData() {
    try {
      setLoading(true);
      const response = await axios.get("https://swapi.dev/api/films/");
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getData().then((response) =>
      setList(response.data.results.sort(sortByDate))
    );

  }, []);

  return (
    <div className="w-[100%]">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <DropComp list={list} />
                 </div>
      )}
    </div>
  );
};

export default MainDrop;

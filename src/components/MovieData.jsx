import React, { useState} from "react";
import Loader from "./helpers/Loader";
import male from "../resources/images/male.png";
import female from "../resources/images/female.png";
import hermaphrodite from "../resources/images/hermaphrodite.png";
import character from "../resources/images/char.png";


// this component receives an array (charList) from parent component dropComponent, which is the result of an array of api calls, then displays it in tabular form

const MovieData = ({ charList, loading }) => {
  const [reverse, setReverse] = useState(false);
  const [sortValue, setSortValue] = useState("name");
  const [filterValue, setFilterValue] = useState("default");

//   this part is the sorting logic, reallly took me time to compute, now this part checks for is the state is reverse then reverse the sort, basicallu i couldn't keep up with the DRY principple here that i have been maintaing from onset, do to the natue of the sort tecnique i am using 

  const sorted =
    sortValue === "name"
      ? reverse === false
        ? charList.sort((a, b) => (a.data.name > b.data.name ? 1 : -1))
        : charList.sort((a, b) => (a.data.name > b.data.name ? -1 : 1))
      : "gender"
      ? reverse === false
        ? charList.sort((a, b) => (a.data.gender > b.data.gender ? 1 : -1))
        : charList.sort((a, b) => (a.data.gender > b.data.gender ? -1 : 1))
      : reverse === false
      ? charList.sort(
          (a, b) => parseInt(a.data.height) - parseInt(b.data.height)
        )
      : charList.sort(
          (a, b) => parseInt(b.data.height) - parseInt(a.data.height)
        );


        // i couldn't use th eondoubleclick default from javascript cause it disables the onclick function ... so i hd to implemenet a logic for it 

        
  const handleClick = (e, value) => {
    switch (e.detail) {
      case 1:
        setSortValue(value);
        break;
      case 2:
        setSortValue(value);
        setReverse(!reverse);
        break;
    default:
        console.log("Click again");
    
    }
  };

  var charCount = 0;
  var heightCount = 0;

  function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  return (
    <div className="text-white">
      <div className="flex gap-5 p-5">
        <button
          onClick={() => setFilterValue("male")}
          className="px-[2rem] py-[5px] bg-gray-600 rounded"
        >
          <img className="w-[25px]" src={male} alt="" />
        </button>
        <button
          onClick={() => setFilterValue("female")}
          className="px-[2rem] py-[5px] bg-gray-600 rounded"
        >
          <img className="w-[25px]" src={female} alt="" />
        </button>
        <button
          onClick={() => setFilterValue("default")}
          className="px-[2rem] py-[5px] bg-gray-600 rounded"
        >
          Reset
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b ">
            <th>
              <button onClick={(e) => handleClick(e, "name")} className="pb-3">
                Name
              </button>
            </th>
            <th>
              <button
                onClick={(e) => handleClick(e, "gender")}
                className="pb-3"
              >
                Gender{" "}
              </button>
            </th>
            <th>
              <button
                onClick={(e) => handleClick(e, "height")}
                className="pb-3"
              >
                Height:{" "}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading === true ? (
            <tr>
              <div className="flex w-full flex flex-col items-center p-5">
                <Loader />
              </div>
            </tr>
          ) : (
            sorted
              .filter(function (char) {
                return filterValue === "default"
                  ? char?.data.gender !== filterValue
                  : char?.data.gender === filterValue;
              })
              .map(function (char, index) {
                charCount += 1;
                heightCount += parseInt(char?.data?.height);
                return (
                  <tr key={index}>
                    <td>{char?.data?.name}</td>
                    <td>
                      <img
                        className="w-[15px]"
                        src={
                          char?.data?.gender === "male"
                            ? male
                            : "female"
                            ? female
                            : "n/a"
                            ? character
                            : hermaphrodite
                        }
                        alt={char?.data?.gender}
                      />
                    </td>
                    <td>{char?.data?.height}</td>
                  </tr>
                );
              })

            // charList?.map((char, index) => {

            // })
          )}
        </tbody>

        <tfoot>
          <tr className="text-left border-t">
            <th>Total Characters: {charCount}</th>
            <th></th>
            <th>
              Total Height: <br /> {heightCount}cm <br /> (
              {roundUp(heightCount / 30.48, 2)}
              ft/{roundUp(heightCount / 2.54, 2)}in)
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default MovieData;

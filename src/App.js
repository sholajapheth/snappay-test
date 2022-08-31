import React from "react";
import MainDrop from "./components/MainDrop";


const App = () => {
  return (
    <div className=" flex items-center justify-center h-full p ">
      <div className="lg:w-[50%] md:w-[75%] w-[90%] pt-[2rem] ">
        <MainDrop />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import logo from "../resources/images/star_wars_logo.png";
import MovieData from "./MovieData";
import axios from "axios";


const DropComp = (props) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState();
  const [charList, setCharList] = useState();

  const setTitle = (item) => {
    setLoading(true);
    setCharList([]);
    setSelection(item);

    axios.all(item.characters.map((l) => axios.get(l))).then(
      axios.spread(function (...res) {
        setCharList(res);
        setLoading(false);
      })
    );

    handleClick();
  };
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-400 rounded-xl p-[1rem] px-[1.5rem] flex flex-col gap-[1.5rem]  ">
        <button
          onClick={handleClick}
          className="flex justify-between items-center w-full"
        >
          <div>
            {!selection ? (
              <img className="w-[7rem] " src={logo} alt="" />
            ) : (
              <p className="text-[25px] font-[500]">{selection.title}</p>
            )}
          </div>
          <span className="text-[20px]">👇</span>
        </button>

        {show && (
          <div className="text-[18px] font-[500] bg-gray-600 p-4 flex flex-col gap-2">
            {!props.list ? (
              <p className="text-center">No List </p>
            ) : (
              props.list.map((item, index) => (
                <DropCompListItem
                  key={index}
                  clickEvent={setTitle}
                  item={item}
                />
              ))
            )}
          </div>
        )}
      </div>
      {selection && (
        <div>
          <OpeningCrawl item={selection} />
          <MovieData charList={charList} loading={loading} />
        </div>
      )}
    </div>
  );
};


// the drop componentlist item
const DropCompListItem = (props) => {
  return (
    <button
      onClick={() => props.clickEvent(props.item)}
      className="p-2 px-[1.5rem] bg-[#fda50f]"
    >
      <p>{props.item.title}</p>
    </button>
  );
};


// just a marque for the openning crawl

const OpeningCrawl = (props) => {
  return (
    <div>
      <marquee className="text-[18px]">{props.item.opening_crawl}</marquee>
    </div>
  );
};

export default DropComp;

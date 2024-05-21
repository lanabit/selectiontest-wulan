"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const APICall = async () => {
  const res = await axios.get(
    "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain"
  );
  return res.data;
};

export default function Home() {
  const [data, setData] = useState(null);

  const dataSetting = async () => {
    const data = await APICall();
    const store = {};
    const temp = data.split("");
    for (let x of temp) {
      if (store[x] !== undefined) {
        store[x] += 1;
      } else {
        store[x] = 1;
      }
    }
    const toArr = Object.entries(store).sort();
    toArr.shift();
    setData(toArr);
    console.log(data);
  };

  useEffect(() => {
    dataSetting();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-xl font-medium">Alphabet Counter</div>
      {data.map((x, i) => (
        <div className="font-medium" key={i}>
          {x[0]} : {x[1]}
        </div>
      ))}
    </div>
  );
}

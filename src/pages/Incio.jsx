import React, { useState, useEffect, useRef } from "react";
import { products_db } from "@/json/products_db";
import Buttons from "@/components/Buttons";

const Inicio = () => {
  const [products, setProducts] = useState(products_db);
  const [render, setRender] = useState(true);

  useEffect(() => {
    console.log(products);
  }, [products]);

  let book = {
    id: products.length + 1,
    title: "War in the last 1984",
    cant: 10,
    read: true,
  };

  const addItem = (toAdd) => {
    setProducts((prevState) => [...prevState, toAdd]);
  };

  const deleteItem = (toDelete) => {
    const newItems = products.filter((item) => item.id !== toDelete);
    setProducts(newItems);
  };

  const checkItem = (toFind) => {
    if (products.find((item) => item.id == toFind)) {
      console.log("existe");
    } else {
      console.log("NO existe");
    }
  };

  const updateItem = (toUpdate) => {
    if (products.find((item) => item.id == 3)) {
      const updatedItems = products;
      const objIndex = updatedItems.findIndex((item) => item.id == 3);
      updatedItems[objIndex].cant += 1;
      setProducts(updatedItems);
      setRender(!render);
    } else {
      console.log("NO existe");
    }
  };

  return (
    <div className=" flex min-h-screen flex-col justify-center items-center">
      <div
        key={render}
        className=" text-lg gap-10 flex flex-wrap justify-center max-w-[750px]"
      >
        {products.map((item) => (
          <div key={item.id} className=" border px-6 py-2 text-center">
            {item.title} <br />
            <strong className=" mt-4">{item.cant}</strong>
          </div>
        ))}
      </div>
      <div className=" flex gap-10">
        <Buttons name={"Add"} action={addItem} modifier={book} />
        <Buttons
          name={"Delete"}
          action={deleteItem}
          modifier={products.length}
        />
        <Buttons name={"Check"} action={checkItem} modifier={3} />
        <Buttons name={"Update"} action={updateItem} modifier={"Jane Doe"} />
      </div>
    </div>
  );
};

export default Inicio;

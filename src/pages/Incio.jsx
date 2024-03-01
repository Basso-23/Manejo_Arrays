import React, { useState, useEffect, useRef } from "react";
import { products_db } from "@/json/products_db";
import Buttons from "@/components/Buttons";

const Inicio = () => {
  const [orginal, setOriginal] = useState(products_db);
  const [products, setProducts] = useState(products_db);
  const [cart, setCart] = useState([]);
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
    //Filtra el JSON dejando todos los objetos excepto el que objeto que dentro de "item.id" posee el mismo valor que recibe de "toDelete"
    const newItems = products.filter((item) => item.id !== toDelete);
    //Actualiza el JSON
    setProducts(newItems);
  };

  const checkItem = (toFind) => {
    //Busca en "item.id" si el valor que recibe de "toFind" existe en el JSON
    if (products.find((item) => item.id == toFind)) {
      console.log("existe");
    } else {
      console.log("NO existe");
    }
  };

  const plusQty = (toFind) => {
    //Busca en "item.id" si el valor que recibe de "toFind" existe en el JSON
    if (products.find((item) => item.id == toFind)) {
      const updatedItems = products;
      //Encuentra el index del valor a cambiar
      const objIndex = products.findIndex((item) => item.id == toFind);
      //Aqui se modifica el valor
      updatedItems[objIndex].cant += 1;
      //Actualiza el JSON
      setProducts(updatedItems);
      //Rerender al JSON
      setRender(!render);
    } else {
      console.log("NO existe");
    }
  };
  const minusQty = (toFind) => {
    //Busca en "item.id" si el valor que recibe de "toFind" existe en el JSON
    if (products.find((item) => item.id == toFind)) {
      const updatedItems = products;
      //Encuentra el index del valor a cambiar
      const objIndex = products.findIndex((item) => item.id == toFind);
      //Controla que la cantidad no pueda ser negativa
      if (updatedItems[objIndex].cant !== 1) {
        //Aqui se modifica el valor
        updatedItems[objIndex].cant -= 1;
        //Actualiza el JSON
        setProducts(updatedItems);
        //Rerender al JSON
        setRender(!render);
      } else {
        console.log("La cantidad es CERO");
      }
    } else {
      console.log("NO existe");
    }
  };

  return (
    <div className=" flex min-h-screen flex-col justify-center items-center">
      <div
        key={render}
        className=" text-lg gap-10 flex flex-wrap max-w-[1750px] justify-center"
      >
        {products.map((item) => (
          <div
            key={item.key}
            className={`flex justify-center items-center flex-col`}
          >
            <div
              style={{ backgroundImage: `url(${item.cover})` }}
              className="aspect-[10/14.8] w-[250px] bg-cover bg-no-repeat"
            ></div>
            <Buttons name={"Add"} action={addItem} data={book} />
          </div>
        ))}
      </div>
      <div className=" flex gap-10 flex-wrap">
        <Buttons name={"Add"} action={addItem} data={book} />
        <Buttons name={"Delete"} action={deleteItem} data={products.length} />
        <Buttons name={"Check"} action={checkItem} data={2} />
        <Buttons name={"+"} action={plusQty} data={2} />
        <Buttons name={"-"} action={minusQty} data={2} />
      </div>
    </div>
  );
};

export default Inicio;

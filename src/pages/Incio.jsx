import React, { useState, useEffect, useRef } from "react";
import { products_db } from "@/json/products_db";
import Buttons from "@/components/Buttons";

const Inicio = () => {
  const [products, setProducts] = useState(products_db);
  const [cart, setCart] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const addItem = (toAdd, id) => {
    //Busca en "item.id" si el valor que recibe de "toFind" existe en el JSON
    if (cart.find((item) => item.key == id)) {
      plusQty(id);
    } else {
      setCart((prevState) => [...prevState, toAdd]);
    }
  };

  const deleteItem = (toDelete, id) => {
    //Filtra el JSON dejando todos los objetos excepto el que objeto que dentro de "item.id" posee el mismo valor que recibe de "toDelete"
    const newItems = cart.filter((item) => item.key !== toDelete);
    //Actualiza el JSON
    setCart(newItems);
  };

  const checkItem = (toFind, id) => {
    //Busca en "item.id" si el valor que recibe de "toFind" existe en el JSON
    if (products.find((item) => item.id == toFind)) {
      console.log("existe");
    } else {
      console.log("NO existe");
    }
  };

  const plusQty = (toFind, id) => {
    //Busca en "item.key" si el valor que recibe de "toFind" existe en el JSON
    if (cart.find((item) => item.key == toFind)) {
      const updatedItems = cart;
      //Encuentra el index del valor a cambiar
      const objIndex = cart.findIndex((item) => item.key == toFind);
      //Aqui se modifica el valor
      updatedItems[objIndex].qty += 1;
      //Actualiza el JSON
      setCart(updatedItems);
      console.log(cart);
      //Rerender al JSON
      setRender(!render);
    } else {
      console.log("NO existe");
    }
  };

  const minusQty = (toFind, id) => {
    //Busca en "item.key" si el valor que recibe de "toFind" existe en el JSON
    if (cart.find((item) => item.key == toFind)) {
      const updatedItems = cart;
      //Encuentra el index del valor a cambiar
      const objIndex = cart.findIndex((item) => item.key == toFind);
      //Controla que la cantidad no pueda ser negativa
      if (updatedItems[objIndex].qty !== 1) {
        //Aqui se modifica el valor
        updatedItems[objIndex].qty -= 1;
        //Actualiza el JSON
        setCart(updatedItems);
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
            className="flex justify-center items-center flex-col"
          >
            <div
              style={{ backgroundImage: `url(${item.cover})` }}
              className="aspect-[10/14.8] w-[250px] bg-cover bg-no-repeat mb-2"
            ></div>
            <Buttons
              name={"Add"}
              action={addItem}
              data={{
                key: item.key,
                title: item.title,
                qty: item.qty,
                cover: item.cover,
              }}
              id={item.key}
            />
          </div>
        ))}
      </div>
      <div className=" fixed w-full h-[300px] bg-black bottom-0 flex overflow-x-auto gap-10">
        {cart.map((item) => (
          <div className=" relative">
            <div key={item.key} className="flex">
              <div
                style={{ backgroundImage: `url(${item.cover})` }}
                className="aspect-[10/14.8] w-[200px] bg-cover bg-no-repeat"
              ></div>
              <div>
                <div className=" text-white text-center mt-4">{item.qty}</div>
                <div className="flex gap-6 max-h-10 w-24 mt-4">
                  <Buttons name={"+"} action={plusQty} data={item.key} />
                  <Buttons name={"-"} action={minusQty} data={item.key} />
                </div>
                <div className=" w-full mt-4">
                  <Buttons
                    name={"Delete"}
                    action={deleteItem}
                    data={item.key}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex gap-10 flex-wrap">
        <Buttons name={"Check"} action={checkItem} data={2} id={false} />
      </div>
    </div>
  );
};

export default Inicio;

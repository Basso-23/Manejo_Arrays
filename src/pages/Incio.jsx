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

  //Importante: Valor unico del JSON: key
  //JSON que esta cambiando: cart
  //Cambiar estas dos cosas de ser necesario
  const addItem = (toAdd, id) => {
    //Busca en "item.key" si el valor que recibe de "id" existe en el JSON del carrito
    if (cart.find((item) => item.key == id)) {
      //Aumenta la qty del producto si ya esta en el carrito
      plusQty(id);
    } else {
      //Añade producto al carrito
      setCart((prevState) => [...prevState, toAdd]);
    }
  };

  const deleteItem = (toDelete) => {
    //Filtra el JSON dejando todos los objetos excepto el que objeto que dentro de "item.key" posee el mismo valor que recibe de "toDelete"
    const newItems = cart.filter((item) => item.key !== toDelete);
    //Actualiza la info del carrito
    setCart(newItems);
  };

  const plusQty = (toFind) => {
    //Busca en "item.key" si el valor que recibe de "toFind" existe en el JSON del carrito
    if (cart.find((item) => item.key == toFind)) {
      const updatedItems = cart;
      //Encuentra el index del valor a cambiar
      const objIndex = cart.findIndex((item) => item.key == toFind);
      //Aumenta la qty del producto
      updatedItems[objIndex].qty += 1;
      //Actualiza la info del carrito
      setCart(updatedItems);
      console.log(cart);
      //Importante: Rerender al JSON
      setRender(!render);
    } else {
      console.log("NO existe");
    }
  };

  const minusQty = (toFind, id) => {
    //Busca en "item.key" si el valor que recibe de "toFind" existe en el JSON del carrito
    if (cart.find((item) => item.key == toFind)) {
      const updatedItems = cart;
      //Encuentra el index del valor a cambiar
      const objIndex = cart.findIndex((item) => item.key == toFind);
      //Controla que la cantidad no pueda ser cero o negativa
      if (updatedItems[objIndex].qty !== 1) {
        //Disminuye la qty del producto
        updatedItems[objIndex].qty -= 1;
        //Actualiza la info del carrito
        setCart(updatedItems);
        //Importante: Rerender al JSON
        setRender(!render);
      } else {
        console.log("La cantidad no puede ser CERO");
      }
    } else {
      console.log("NO existe");
    }
  };

  return (
    <main className=" flex min-h-screen justify-center ">
      {/* Products---------------------------------------------------------------------------------------------- */}
      <section
        key={render}
        className="flex justify-center gap-4 h-fit flex-wrap"
      >
        {products.map((item) => (
          <div key={item.key} className="mt-10">
            {/* Image */}
            <div
              style={{ backgroundImage: `url(${item.cover})` }}
              className="aspect-[10/14.8] w-[300px] bg-cover bg-no-repeat mb-2"
            ></div>
            {/* Add to cart */}
            <Buttons
              name={"Add"}
              action={addItem}
              id={item.key}
              data={{
                key: item.key,
                title: item.title,
                qty: item.qty,
                cover: item.cover,
              }}
            />
          </div>
        ))}
      </section>
      {/* Carrito---------------------------------------------------------------------------------------------- */}
      <section className=" fixed w-full h-[300px] bg-black bottom-0 flex overflow-x-auto gap-10">
        {cart.map((item) => (
          <div key={item.key}>
            <div className="flex">
              {/* Image */}
              <div
                style={{ backgroundImage: `url(${item.cover})` }}
                className="aspect-[10/14.8] w-[200px] bg-cover bg-no-repeat"
              ></div>

              <div>
                {/* Qty */}
                <div className=" text-white text-center mt-4">{item.qty}</div>
                <div className="flex gap-6 max-h-10 w-24 mt-4">
                  {/* Aumentar qty */}
                  <Buttons name={"+"} action={plusQty} data={item.key} />
                  {/* Disminuir qty */}
                  <Buttons name={"-"} action={minusQty} data={item.key} />
                </div>
                <div className=" w-full mt-4">
                  {/* Delete from cart */}
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
      </section>
    </main>
  );
};

export default Inicio;

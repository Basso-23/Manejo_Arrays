const Buttons = ({ name, action, modifier }) => {
  return (
    <div
      onClick={() => {
        {
          action(modifier);
        }
      }}
      className=" bg-sky-600 w-fit px-6 py-2 cursor-pointer mt-20 text-white"
    >
      {name}
    </div>
  );
};

export default Buttons;

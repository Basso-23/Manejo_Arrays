const Buttons = ({ name, action, data, id }) => {
  return (
    <div
      onClick={() => {
        {
          action(data, id);
        }
      }}
      className=" text-center bg-orange-500 text-white uppercase py-2 text-sm font-medium cursor-pointer w-full"
    >
      {name}
    </div>
  );
};

export default Buttons;

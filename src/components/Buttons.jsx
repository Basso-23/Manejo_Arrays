const Buttons = ({ name, action, data }) => {
  return (
    <div
      onClick={() => {
        {
          action(data);
        }
      }}
      className=" text-center bg-orange-500 text-white uppercase py-2 mt-2 text-sm font-medium cursor-pointer w-full"
    >
      {name}
    </div>
  );
};

export default Buttons;

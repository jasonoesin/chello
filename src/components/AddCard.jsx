const AddCard = () => {
  return (
    <div className="">
      <div className="!NEWCARD  bg-white rounded-md border drop-shadow-md">
        <div className="p-2">
          <textarea
            className="focus:outline-none resize-none w-full overflow-y-hidden "
            type="text"
            placeholder="Enter a title for this card "
          />
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <button className="rounded-md text-white bg-blue-500 px-4 py-2">
          Add Card
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 ml-2 stroke-slate-500 hover:stroke-slate-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="!ADD CARD p-2 text-gray-500 flex cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>

        <p className="ml-1">Add a Card</p>
      </div>
    </div>
  );
};

export default AddCard;

const AddWorkSpace = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-10 rounded w-1/2 h-3/4 absolute space-y-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 right-5 absolute cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          onClick={() => {
            props.onClose();
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <p className="font-bold">Let's build a Workspace</p>
        <p>
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <form action="">
          <div className="space-y-6">
            <div className="">
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Workspace's Name
              </label>
              <input
                name="wsName"
                type="text"
                className="w-1/2 p-2 border border-gray-300 rounded mt-1"
              />
              <label
                htmlFor=""
                className="text-sm font-light text-gray-400 block"
              >
                This is the name of your new Workspace.
              </label>
            </div>
            <div className="h-28">
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Workspace's Description
              </label>
              <textarea
                name="wsName"
                type="text"
                className="w-1/2 p-2 border border-gray-300 rounded mt-1 h-full resize-none"
              />
              <label
                htmlFor=""
                className="text-sm font-light text-gray-400 block"
              >
                Get your members on board with a few words about your Workspace.
              </label>
            </div>
          </div>

          <div>
            <button
              className="mt-24 w-full flex justify-center 
            hover:bg-blue-600
            bg-blue-500 p-2 rounded text-white"
            >
              Create Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkSpace;

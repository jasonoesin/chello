const InviteWorkspace = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-10 rounded w-1/3 h-1/10 absolute space-y-3 ">
        <div className="text-xl relative">
          <div className="relative">Invite to workspace</div>

          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 top-1 right-0 absolute cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                props.onClose();
              }}
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <input
          className="w-full h-1/2 border-gray-300 border rounded-sm border-2 p-2"
          type="text"
          placeholder="Email address or name"
        />
        <div className="">
          <p>Share this workspace with a link</p>
          <a className="cursor-pointer text-sm underline underline-offset-2 text-gray-400">
            Create link
          </a>
        </div>
      </div>
    </div>
  );
};

export default InviteWorkspace;

const Settings = () => {
  return (
    <div className="mt-24 w-screen h-fit">
      <div className="px-16 flex justify-center ">
        <div className="flex flex-col justify-center w-2/5 space-y-5 relative">
          <div className="">Profile and visibility</div>
          <div className="">
            Manage your personal information, and control which information
            other people see and apps may access.
          </div>
          <div className="font-bold">Profile Photo</div>
          <div className="absolute w-full h-1/4 !mt-20 top-20">
            <div className="bg-purple-300 rounded w-full h-full "></div>
            <div className="bg-white rounded w-full h-full border"></div>
          </div>

          <div className="flex flex-row justify-around p-10 relative">
            <div className="">
              <img
                className="w-2/3 rounded-full border border-white"
                src="https://i.picsum.photos/id/66/200/200.jpg?hmac=gaKXe-rWmo5fSEm79TTkW_yFJLECw3FdRCh6Dm7jp4g"
                alt=""
              />
            </div>
            <div className="flex items-center !mb-10">Display picture</div>
          </div>
          <div className="!mt-16">Change current password</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

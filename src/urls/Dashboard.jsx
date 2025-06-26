import TopBar from "./Topbar";
import CardDetails from "./CardDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createUrl, fetchUrls } from "../slice/urlApi";
import { useForm } from "react-hook-form";

function Dashboard() {
  const dispatch = useDispatch();

  const { allUrls, isUrlCreated } = useSelector((state) => state.url);

  useEffect(() => {
    if (isUrlCreated) {
      reset({ fullUrl: "", shortUrl: "" });
      dispatch(fetchUrls());
    }
  }, [isUrlCreated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchUrls());
  }, []);

  const createNewUrl = (data) => {
    dispatch(createUrl(data));
  };

  return (
    <>
      <TopBar />
      <div className="mx-auto p-4 max-w-[1200px]">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded">
          <h1 className="text-lg font-bold uppercase">Shorten URLs</h1>
        </div>

        {/* New URL Form */}
        <div className="bg-white shadow rounded p-4 mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full URL *</label>
            <textarea
              {...register("fullUrl", { required: "Full url is required" })}
              className="w-full border border-gray-300 rounded p-2 h-20"
              placeholder="Enter original URL here"
            ></textarea>

            {errors.fullUrl && (
              <span className="error w-full max-w-[380px] ml-5 text-red-500 font-normal">
                {errors.fullUrl.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Custom Shorten URL
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">{`https://example.com/`}</span>
              <input
                type="text"
                {...register("shortUrl")}
                className="border border-gray-300 rounded p-2 flex-grow"
                placeholder="Shorten URL"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSubmit(createNewUrl)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Shorten New URL
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: If you do not wish to enter a custom URL, we will generate one
            for you!
          </p>
        </div>
      </div>

      {allUrls.map((url) => (
        <CardDetails url={url} />
      ))}
    </>
  );
}

export default Dashboard;

import { useDispatch } from "react-redux";
import { deleteUrl, fetchUrls, updateUrl } from "../slice/urlApi";
import { toast } from "react-toastify";
import { useState } from "react";
import useClippy from "use-clippy";

export default function CardDetails({ url }) {
  const dispatch = useDispatch();
  const [clipboard, setClipboard] = useClippy();
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [shortUrl, setShortUrl] = useState(url.shortUrl);

  const editUrl = async () => {
    if (editModeEnabled) {
      // api call to save edit content, then disable edit mode
      await dispatch(updateUrl({ id: url._id, shortUrl })).unwrap();
        toast("URL Updated successfully.", { type: "success", theme: "colored" });
      setEditModeEnabled(false);
    } else {
      setEditModeEnabled(true);
    }
  };

  return (
    <div className="mb-3 max-w-[1200px] mx-auto">
      <div className="border rounded-md p-4 bg-white shadow-sm">
        {/* Full URL Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
          <div className="w-full md:w-1/6 font-bold">Full URL:</div>
          <div className="w-full md:w-4/6 break-words">
            <p>{url.fullUrl}</p>
          </div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button
              type="button"
              onClick={async () => {
                await dispatch(deleteUrl(url._id)).unwrap();
                toast("URL deleted successfully.", { type: "success" });
                dispatch(fetchUrls());
              }}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Shorten URL Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-1/6 font-bold">Shorten URL:</div>
          <div className="w-full md:w-4/6 flex items-center space-x-2">
            {!editModeEnabled && (
              <a
                href={"http://localhost:8000/" + url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {shortUrl}
              </a>
            )}

            {editModeEnabled && (
              <input
                className="border border-gray-500 rounded-sm"
                type="text"
                placeholder="Enter short url"
                value={shortUrl}
                onChange={(e) => {
                  setShortUrl(e.target.value);
                }}
              />
            )}
            {/* {errors.shortUrl && (
              <p className="text-red-500">{errors.shortUrl.message}</p>
            )} */}
            {!editModeEnabled && (
              <button
                type="button"
                onClick={() => {
                  setClipboard(`http://localhost:8000/${url.shortUrl}`);
                  toast("Short url copied to clipboard.", {
                    theme: "colored",
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Copy to clipboard"
              >
                <i className="far fa-copy"></i>
              </button>
            )}
          </div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button
              type="button"
              onClick={editUrl}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
            >
              {editModeEnabled ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
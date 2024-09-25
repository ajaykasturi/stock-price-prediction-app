import React from "react";

function Profile() {
  return (
    <div className="px-8 flex justify-center">
      <form className="md:w-2/4">
        <div className="space-y-10">
          <div className="border-b border-gray-900/10 pb-5 pt-3">
            <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
              Profile
            </h2>
          </div>
          <div className="border-b border-gray-900/10 pb-12 w-full">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10 w-full">
              <div className="sm:col-span-5 w-full">
                <label
                  for="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={window.localStorage.getItem("firstName") || ""}
                    autocomplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-5">
                <label
                  for="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={window.localStorage.getItem("lastName") || ""}
                    autocomplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-10">
                <label
                  for="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    id="email"
                    name="email"
                    type="email"
                    value={window.localStorage.getItem("email") || ""}
                    autocomplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;

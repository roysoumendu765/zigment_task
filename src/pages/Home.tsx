import React, { useState, useEffect } from "react";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const HomePage: React.FC = () => {
  const [schema, setSchema] = useState<any | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);

    if (!isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 w-full p-4">
        <span className="mr-2 text-sm text-gray-800 dark:text-gray-200">Light</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="sr-only"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-300 dark:bg-gray-600 dark:border-gray-500 transition-all">
            <div
              className={`${
                isDark ? "translate-x-5 bg-gray-400" : "translate-x-0 bg-gray-100"
              } w-5 h-5 rounded-full shadow-md transition-all`}
            ></div>
          </div>
        </label>
        <span className="ml-2 text-sm text-gray-800 dark:text-gray-200">Dark</span>
      </div>

      <div className={`flex flex-col md:flex-row h-auto md:h-screen ${isDark ? 'dark' : 'light'}`}>
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            JSON Editor
          </h2>
          <LeftSide onSchemaChange={setSchema} toggleVal={isDark} />
        </div>
        <div className="w-full md:w-1/2 p-4 dark:bg-gray-0">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Form Preview
          </h2>
          {schema ? (
            <RightSide schema={schema} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              <b>Enter a valid JSON schema to preview</b>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

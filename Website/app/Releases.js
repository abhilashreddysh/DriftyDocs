"use client";

import { useEffect, useMemo, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

function downloadLatestRelease(OSName, applicationType) {
  if (applicationType === "CLI") {
    if (OSName === "Windows exe") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-CLI.exe",
      );
    } else if (OSName === "Linux") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-CLI_linux",
      );
    } else if (OSName === "MacOS") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-CLI_macos",
      );
    } else if (OSName === "MacOS Apple Silicon") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-CLI_macos_aarch64",
      );
    } else if (OSName === "MacOS Intel") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-CLI_macos_x86_64",
      );
    }
  } else {
    if (OSName === "Windows exe") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI.exe",
      );
    } else if (OSName === "Windows msi") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI.msi",
      );
    } else if (OSName === "Linux") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI_linux",
      );
    } else if (OSName === "MacOS") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI.pkg",
      );
    } else if (OSName === "MacOS Apple Silicon") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI_aarch64.pkg",
      );
    } else if (OSName === "MacOS Intel") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/latest/download/Drifty-GUI_x86_64.pkg",
      );
    }
  }
}

function downloadOlderReleases(OSName, applicationType, version) {
  if (applicationType === "CLI") {
    if (OSName === "Windows exe") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-CLI.exe",
      );
    } else if (OSName === "Linux") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-CLI_linux",
      );
    } else if (OSName === "MacOS") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-CLI_macos",
      );
    } else if (OSName === "MacOS Apple Silicon") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-CLI_macos_aarch64",
      );
    } else if (OSName === "MacOS Intel") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-CLI_macos_x86_64",
      );
    }
  } else {
    if (OSName === "Windows exe") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI.exe",
      );
    } else if (OSName === "Windows msi") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI.msi",
      );
    } else if (OSName === "Linux") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI_linux",
      );
    } else if (OSName === "MacOS") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI.pkg",
      );
    } else if (OSName === "MacOS Apple Silicon") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI_aarch64.pkg",
      );
    } else if (OSName === "MacOS Intel") {
      window.open(
        "https://github.com/SaptarshiSarkar12/Drifty/releases/download/" +
          version +
          "/Drifty-GUI_x86_64.pkg",
      );
    }
  }
}

export default function Releases({ props }) {
  const [buttonStates, setButtonStates] = useState({});
  const [content, setContent] = useState([]);
  const [applicationType, setApplicationType] = useState("GUI");
  const maxReleasesToDisplay = 3;
  let latestVersion = useMemo(() => {
    let v = "";
    let counter = 1;
    props.release.find((item) => {
      if (item.prerelease === false && counter === 1) {
        v = item.tag_name;
        counter++;
      }
    });
    return v;
  }, [props.release]);
  const filteredPreReleases = useMemo(() => {
    const releases = [];

    // Get the latest stable version
    const sortedReleases = [...props.release].sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at),
    );
    let latestStableVersion = sortedReleases.find(
      (item) => !item.prerelease,
    )?.tag_name;

    props.release.forEach((item) => {
      // Skip the pre-release if a stable version with the same base version exists
      const baseVersion = item.tag_name.match(/^v?\d+\.\d+\.\d+/)?.[0]; // Match semantic versioning pattern

      if (
        item.prerelease &&
        latestStableVersion &&
        baseVersion === latestStableVersion // Compare base versions
      ) {
        return; // Skip pre-releases if a stable version with the same base exists
      }

      if (item.prerelease && releases.length < 1) {
        releases.push(item); // Only add one pre-release
      }
    });
    return releases;
  }, [props.release]);
  const filteredReleases = useMemo(() => {
    // Starting from v2.0.0, separate executables for windows, linux and macOS are available. So, we need three buttons (in total) in that case.
    const releases = [];
    props.release.map((item) => {
      if (
        !item.tag_name.startsWith("v1") &&
        item.prerelease === false &&
        item.latest === false &&
        releases.length <= maxReleasesToDisplay
      ) {
        releases.push(item);
      }
    });
    return releases;
  }, [props.release]);
  const filterOlderReleases = useMemo(() => {
    const releases = [];
    let noOfReleases = filteredReleases.length;
    props.release.map((item, index) => {
      if (
        releases.length <= maxReleasesToDisplay &&
        noOfReleases < maxReleasesToDisplay &&
        index !== 0
      ) {
        if (item.tag_name.startsWith("v1") && item.prerelease === false) {
          releases.push(item);
          noOfReleases++;
        }
      }
    });
    return releases;
  }, [filteredReleases.length, props.release]);

  const handleButtonClick = (index) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const markerToHtml = async (itemBody, itemTagName, i) => {
    const maxLines = window.innerWidth < 768 ? 7 : 15;
    if (itemBody.split("\n").length > maxLines) {
      itemBody = itemBody.split("\n").slice(0, maxLines).join("\n");
      itemBody +=
        "\n\n...[Read More](https://github.com/SaptarshiSarkar12/Drifty/releases/tag/" +
        itemTagName +
        ")";
    }
    const cont = await remark().use(html).process(itemBody);
    setContent((prev) => {
      prev[i] = cont.toString();
      return prev;
    });
  };
  useEffect(() => {
    filteredPreReleases.forEach(async (item, index) => {
      await markerToHtml(item.body, item.tag_name, index);
    });
    filteredReleases.forEach(async (item, index) => {
      await markerToHtml(
        item.body,
        item.tag_name,
        index + filteredPreReleases.length,
      );
    });
    filterOlderReleases.forEach(async (item, index) => {
      await markerToHtml(
        item.body,
        item.tag_name,
        index + filteredPreReleases.length + filteredReleases.length,
      );
    });
  }, [filteredPreReleases, filteredReleases, filterOlderReleases]);

  const handleApplicationTypeChange = (applicationType) => {
    setApplicationType(applicationType.target.value);
  };

  return (
    <div
      id="download"
      className="bg-gradient-to-b from-top from-8% via-cyan-300 to-bottom to-12% -mt-2"
    >
      <h2 className="select-none text-5xl text-center sm:text-4xl font-bold md:mt-2 sm:pt-10 sm:mb-10 xs:p-5">
        Download Drifty
      </h2>

      {/* Application Type Selection */}
      <div className="select-none grid-cols-1 justify-items-center">
        <h2 className="text-center block text-xl font-medium leading-6 text-gray-900">
          Select Application Type
        </h2>
        <div className="grid grid-cols-1 justify-items-center pb-2">
          <select
            id="listbox"
            name="Select Application Type"
            className="block w-80 px-4 py-2 mt-1 text-base text-gray-900 bg-white border-2 border-gray-300 select-none rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-700 focus:border-2 sm:text-sm"
            value={applicationType}
            onChange={handleApplicationTypeChange}
          >
            <option value="GUI">GUI</option>
            <option value="CLI">CLI</option>
          </select>
        </div>
      </div>

      <h1 className="select-none text-center font-bold text-2xl pt-10">
        Latest Release
      </h1>
      {/* Download Buttons */}
      <div className="flex flex-col items-center md:flex-row md:items-start justify-center space-y-4 md:space-y-0 gap-5 pt-10">
        {/* First Download Now Button */}
        <div className="xs:mr-0 xs:mb-4">
          <div className="">
            <div className="text-center">
              <button
                className="xs:w-80 xs:py-5 bg-gradient-to-r from-blue-600 to-green-500 text-white xs:text-3xl font-semibold md:text-3xl rounded-full hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:from-pink-500 hover:to-yellow-500 hover:drop-shadow-lg focus:shadow-lg focus:outline-none active:bg-blue-400 active:shadow-lg transition"
                onClick={() =>
                  downloadLatestRelease("Windows exe", applicationType)
                }
              >
                Download Now <i className="fab fa-brands fa-windows"></i>
                <div className="text-lg md:text-sm text-gray-700 font-semibold">
                  {latestVersion}
                </div>
              </button>
              {applicationType === "GUI" && (
                <div className="text-center">
                  <button
                    className="text-lg select-none text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
                    onClick={() => downloadLatestRelease("Windows msi")}
                  >
                    Prefer the msi?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Download Now Button */}
        <div className="md:ml-4 xs:ml-0">
          <button
            className="xs:w-80 xs:py-5 bg-gradient-to-r from-blue-600 to-green-500 text-white xs:text-3xl font-semibold md:text-3xl rounded-full hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:from-pink-500 hover:to-yellow-500 hover:drop-shadow-lg focus:shadow-lg focus:outline-none active:bg-blue-400 active:shadow-lg transition"
            onClick={() => downloadLatestRelease("Linux", applicationType)}
          >
            Download Now <i className="fab fa-brands fa-linux"></i>
            <div className="text-lg md:text-sm text-gray-700 font-semibold">
              {latestVersion}
            </div>
          </button>
        </div>

        {/* Third Download Now Button */}
        <div className="md:ml-4 xs:ml-0">
          <button
            className="xs:w-80 xs:py-5 bg-gradient-to-r from-blue-600 to-green-500 text-white xs:text-3xl font-semibold md:text-3xl rounded-full hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:from-pink-500 hover:to-yellow-500 hover:drop-shadow-lg focus:shadow-lg focus:outline-none active:bg-blue-400 active:shadow-lg transition"
            onClick={() =>
              downloadLatestRelease("MacOS Apple Silicon", applicationType)
            }
          >
            Download Now <i className="fab fa-brands fa-apple"></i>
            <div className="text-lg md:text-sm text-gray-700 font-semibold">
              {latestVersion}
            </div>
          </button>
          <div className={"text-center"}>
            <button
              className="text-lg select-none text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
              onClick={() =>
                downloadLatestRelease("MacOS Intel", applicationType)
              }
            >
              Download for macOS (Intel)
            </button>
          </div>
        </div>
      </div>

      <div>
        {filteredPreReleases.length !== 0 && (
          <>
            <h1 className="select-none text-center font-bold text-2xl pt-10">
              {filteredPreReleases.map((item) => {
                if (item.tag_name.includes("alpha")) {
                  return "Alpha Release";
                } else if (item.tag_name.includes("beta")) {
                  return "Beta Release";
                } else if (item.tag_name.includes("rc")) {
                  return "RC (Release Candidate) Release";
                }
              })}
            </h1>
            <p className="text-center text-base pt-1 font-semibold text-gray-700 pl-2 pr-2">
              {filteredPreReleases.map((item) => {
                if (item.tag_name.includes("alpha")) {
                  return "Try out the features in the initial phase of development";
                } else if (item.tag_name.includes("beta")) {
                  return "Try out the features in the final phase of development";
                } else if (item.tag_name.includes("rc")) {
                  return "Try out the latest features before the final release";
                }
              })}
            </p>
          </>
        )}
        {filteredPreReleases.map((item, index) => {
          if (filteredPreReleases.length !== 0) {
            return (
              <div
                key={index}
                className="text-center p-5 text-base font-normal"
              >
                <span className="font-bold">{item.tag_name} </span>
                <p>
                  {new Date(item.published_at).toString()} with{" "}
                  {item.assets?.reduce(
                    (sum, asset) => sum + (asset.download_count || 0),
                    0,
                  )}{" "}
                  Downloads
                </p>
                <button
                  onClick={() => handleButtonClick(index)}
                  className="text-slate-800/50"
                >
                  {buttonStates[index] ? "Hide" : "Learn More"}
                </button>
                {buttonStates[index] && (
                  <div
                    className="md:p-5 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: content[index] }}
                  ></div>
                )}

                <div className="grid md:grid-flow-col  md:gap-16 xs:gap-3 justify-center text-white mt-3 font-semibold">
                  <div className={"text-center"}>
                    <button
                      className="select-none pl-3 pr-3 w-auto h-auto text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                      onClick={() =>
                        downloadOlderReleases(
                          "Windows exe",
                          applicationType,
                          item.tag_name,
                        )
                      }
                    >
                      Download <i className="fab fa-brands fa-windows"></i>
                    </button>
                    {applicationType === "GUI" && (
                      <div className={"text-center"}>
                        <button
                          className={
                            "text-sm text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
                          }
                          onClick={() =>
                            downloadOlderReleases(
                              "Windows msi",
                              applicationType,
                              item.tag_name,
                            )
                          }
                        >
                          Prefer the msi?
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    className="select-none pl-3 pr-3 w-auto h-min text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                    onClick={() =>
                      downloadOlderReleases(
                        "Linux",
                        applicationType,
                        item.tag_name,
                      )
                    }
                  >
                    Download <i className="fab fa-brands fa-linux"></i>
                  </button>
                  <div className={"grid grid-cols-1 justify-items-center"}>
                    <button
                      className="select-none pl-3 pr-3 w-auto h-min text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                      onClick={() =>
                        downloadOlderReleases(
                          "MacOS Apple Silicon",
                          applicationType,
                          item.tag_name,
                        )
                      }
                    >
                      Download <i className="fab fa-brands fa-apple"></i>
                    </button>
                    <button
                      className={
                        "text-sm text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
                      }
                      onClick={() =>
                        downloadOlderReleases(
                          "MacOS Intel",
                          applicationType,
                          item.tag_name,
                        )
                      }
                    >
                      Download for macOS (Intel)
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <h1 className="select-none text-center font-bold text-2xl pt-10">
          Past Releases
        </h1>
        <p className="text-center text-base pt-1 font-semibold text-gray-700">
          Download older releases of Drifty
        </p>
        {filteredReleases.map((item, index) => {
          index = index + filteredPreReleases.length;
          return (
            <div key={index} className="text-center p-5 text-base font-normal">
              <span className="font-bold">{item.tag_name} </span>
              <p>
                {new Date(item.published_at).toString()} with{" "}
                {item.tag_name >= "v2.1.0"
                  ? item.assets[0].download_count +
                    item.assets[1].download_count +
                    item.assets[2].download_count +
                    item.assets[3].download_count +
                    item.assets[4].download_count +
                    item.assets[5].download_count +
                    item.assets[6].download_count +
                    item.assets[7].download_count +
                    item.assets[8].download_count
                  : item.assets[0].download_count +
                    item.assets[1].download_count +
                    item.assets[2].download_count +
                    item.assets[3].download_count +
                    item.assets[4].download_count +
                    item.assets[5].download_count +
                    item.assets[6].download_count}{" "}
                Downloads
              </p>
              <button
                onClick={() => handleButtonClick(index)}
                className="text-slate-800/50"
              >
                {buttonStates[index] ? "Hide" : "Learn More"}
              </button>
              {buttonStates[index] && (
                <div
                  className="md:p-5 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: content[index] }}
                ></div>
              )}

              <div className="grid md:grid-flow-col  md:gap-16 xs:gap-3 justify-center text-white mt-3 font-semibold">
                <div className={"grid grid-cols-1 justify-items-center"}>
                  <button
                    className="select-none pl-3 pr-3 w-auto h-auto text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                    onClick={() =>
                      downloadOlderReleases(
                        "Windows exe",
                        applicationType,
                        item.tag_name,
                      )
                    }
                  >
                    Download <i className="fab fa-brands fa-windows"></i>
                  </button>
                  {applicationType === "GUI" && (
                    <button
                      className={
                        "text-sm text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
                      }
                      onClick={() =>
                        downloadOlderReleases(
                          "Windows msi",
                          applicationType,
                          item.tag_name,
                        )
                      }
                    >
                      Prefer the msi?
                    </button>
                  )}
                </div>
                <button
                  className="select-none pl-3 pr-3 w-auto h-min text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                  onClick={() =>
                    downloadOlderReleases(
                      "Linux",
                      applicationType,
                      item.tag_name,
                    )
                  }
                >
                  Download <i className="fab fa-brands fa-linux"></i>
                </button>
                <div className={"grid grid-cols-1 justify-items-center"}>
                  <button
                    className="select-none pl-3 pr-3 w-auto h-min text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                    onClick={() =>
                      downloadOlderReleases(
                        item.tag_name >= "v2.1.0"
                          ? "MacOS Apple Silicon"
                          : "MacOS",
                        applicationType,
                        item.tag_name,
                      )
                    }
                  >
                    Download <i className="fab fa-brands fa-apple"></i>
                  </button>
                  {item.tag_name >= "v2.1.0" && ( // If the version of the past release is greater than or equal to v2.1.0, then show the download button for macOS (Intel)
                    <button
                      className={
                        "text-sm text-violet-900 font-semibold hover:underline hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-0.5 hover:scale-110"
                      }
                      onClick={() =>
                        downloadOlderReleases(
                          "MacOS Intel",
                          applicationType,
                          item.tag_name,
                        )
                      }
                    >
                      Download for macOS (Intel)
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filterOlderReleases.map((item, index) => {
          index = index + filteredPreReleases.length + filteredReleases.length;
          if (filterOlderReleases.length !== 0) {
            return (
              <div
                key={index}
                className="text-center p-5 text-base font-normal"
              >
                <span className="font-bold">{item.tag_name} </span>
                <p>
                  {new Date(item.published_at).toString()} with{" "}
                  {item.assets[0].download_count +
                    item.assets[1].download_count}{" "}
                  Downloads
                </p>
                <button
                  onClick={() => handleButtonClick(index)}
                  className="text-slate-800/50"
                >
                  {buttonStates[index] ? "Hide" : "Learn More"}
                </button>
                {buttonStates[index] && (
                  <div
                    className=" md:p-5 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: content[index] }}
                  ></div>
                )}
                <div className="grid md:grid-flow-col md:gap-52 xs:gap-8 justify-center text-white mt-3 font-semibold">
                  <button
                    className="select-none pl-3 pr-3 w-auto h-auto text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                    onClick={() =>
                      window.open(item.assets[1].browser_download_url)
                    }
                  >
                    Download <i className="fab fa-brands fa-windows"></i>
                  </button>
                  <button
                    className="select-none pl-3 pr-3 w-auto h-auto text-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-full p-1 shadow-none hover:transition ease-in-out duration-300 delay-80 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-2xl"
                    onClick={() =>
                      window.open(item.assets[0].browser_download_url)
                    }
                  >
                    Download <i className="fab fa-brands fa-apple"></i>{" "}
                    <i className="fab fa-brands fa-linux"></i>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={"grid grid-cols-1 justify-items-center"}>
        <h2 className={"text-center text-sm font-bold"}>
          Looking for more releases?
        </h2>
        <a
          target={"_blank"}
          href={"https://github.com/SaptarshiSarkar12/Drifty/releases"}
          className={"text-center text-sm font-bold text-blue-500"}
        >
          View all releases
        </a>
      </div>
    </div>
  );
}

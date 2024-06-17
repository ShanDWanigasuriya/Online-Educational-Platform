import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  const [checkedVideos, setCheckedVideos] = useState<{
    [key: number]: boolean;
  }>({});

  // Find unique video sections from the provided data
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  // Function to toggle visibility of a video section
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  // Calculate overall progress percentage based on checked videos
  const totalVideoCount = props.data.length;
  const watchedVideoCount = Object.values(checkedVideos).filter(
    (isChecked) => isChecked
  ).length;
  const overallProgress = (watchedVideoCount / totalVideoCount) * 100;

  return (
    <div
      className={`mt-[15px] w-full ${
        !props.isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {/* Overall Progress Chart */}
      {!props.isDemo && (
        <>
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-black dark:text-white mb-2">
              Overall Progress: {overallProgress.toFixed(2)}%
            </h2>
            <br />
            <div style={{ width: 100 }}>
              <CircularProgressbar
                value={overallProgress}
                text={`${overallProgress.toFixed(2)}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: `'#1cdada', ${overallProgress / 100})`,
                  textColor: `'#1cdada', ${overallProgress / 100})`, // Match text color with progress color
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
          <br />
          <br />
        </>
      )}

      {/* Render each video section */}
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos by the current section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; // Number of videos in the current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos

        const sectionContentHours: number = sectionVideoLength / 60;
        // Function to handle checkbox change
        const handleCheckboxChange = (videoIndex: number) => {
          setCheckedVideos((prevCheckedVideos) => ({
            ...prevCheckedVideos,
            [videoIndex]: !prevCheckedVideos[videoIndex],
          }));
        };

        return (
          <div
            className={`${
              !props.isDemo &&
              "border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2"
            }`}
            key={section}
          >
            <div className="w-full flex justify-between items-center">
              {/* Render video section title and toggle button */}
              <h2 className="text-[22px] text-black dark:text-white">
                {section}
              </h2>
              <button
                className="mr-4 cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>
            {/* Display lesson count and total duration of videos in the section */}
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {/* Render individual videos if the section is visible */}
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index; // Calculate the video index within the overall list
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props?.setActiveVideo(videoIndex)
                      }
                    >
                      {/* Display video icon, title, and checkbox */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                          <h1 className="text-[18px] break-words text-black dark:text-white">
                            {item.title}
                          </h1>
                        </div>
                        {/* Checkbox for marking video progress */}
                        {!props.isDemo && (
                          <input
                            type="checkbox"
                            checked={checkedVideos[videoIndex] || false}
                            onChange={() => handleCheckboxChange(videoIndex)}
                          />
                        )}
                      </div>
                      {/* Display video length */}
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;

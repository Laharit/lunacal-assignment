import React, { useState, useCallback } from "react";
import { FaThLarge, FaPlus } from "react-icons/fa";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useDropzone } from "react-dropzone";
import { FaQuestionCircle } from "react-icons/fa";
const App = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [gallery, setGallery] = useState([
    "https://picsum.photos/300/200?random=1",
    "https://picsum.photos/300/200?random=2",
    "https://picsum.photos/300/200?random=3",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track visible gallery index

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle image addition (random image)
  const handleAddImage = () => {
    const randomImage = `https://picsum.photos/300/200?random=${Math.floor(
      Math.random() * 1000
    )}`;
    setGallery((prevGallery) => {
      const newGallery = [...prevGallery, randomImage];
      setCurrentIndex(newGallery.length - 3 >= 0 ? newGallery.length - 3 : 0); // Update index to show the last image added
      return newGallery;
    });
  };

  // Handle next/previous gallery navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length); // Cycle through the gallery
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  // Handle image drop
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setGallery((prevGallery) => {
          const newGallery = [...prevGallery, reader.result];
          setCurrentIndex(
            newGallery.length - 3 >= 0 ? newGallery.length - 3 : 0
          ); // Update index after drop to show the new image
          return newGallery;
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Set the number of images visible in the carousel at a time
  const visibleImages = gallery.slice(currentIndex, currentIndex + 3); // Showing 3 images at a time

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Empty side for larger screens */}
      <div className="hidden lg:block lg:w-1/2"></div>

      {/* Main content */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col space-y-8">
        {/* Tabbed content section */}

        <div className="bg-[#4A4E54] relative rounded-2xl shadow-md p-4 sm:p-6 transition-all duration-300 ease-in-out">
          {/* Top-left corner question mark icon */}
          <div className="absolute top-2 left-2 ">
            <FaQuestionCircle className="text-gray-500" />
          </div>
          {/* Slider */}
          <div className="absolute right-0 top-2/4 transform -translate-y-2/4 bg-gray-500 w-1 h-14 rounded-full m-2"></div>

          <div className="bg-[#1E1E1E] flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-between mb-6 p-2 rounded-2xl">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === "about"
                  ? "bg-[#292a2a] text-white"
                  : "text-gray-300 hover:bg-gray-500 hover:text-white"
              }`}
              onClick={() => handleTabChange("about")}
            >
              About Me
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === "experiences"
                  ? "bg-[#292a2a] text-white"
                  : "text-gray-300 hover:bg-gray-500"
              }`}
              onClick={() => handleTabChange("experiences")}
            >
              Experiences
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === "recommended"
                  ? "bg-[#292a2a] text-white"
                  : "text-gray-300 hover:bg-gray-500"
              }`}
              onClick={() => handleTabChange("recommended")}
            >
              Recommended
            </button>
          </div>

          {/* Tab content */}
          <div className="transition-opacity duration-300 ease-in-out">
            {activeTab === "about" && (
              <div>
                <p className="text-gray-400">
                  Hello! I’m Dave, your sales rep here from Salesforce. I’ve
                  been working at this awesome company for 3 years now.
                  <br />
                  <br />I was born and raised in Albany, NY & have been living
                  in Santa Carla for the past 10 years with my wife Tiffany and
                  my 4-year-old twin daughters Emma and Ella. Both of them just
                  starting school , so my calender is usually blocked between
                  9-10 AM. This is a...
                </p>
              </div>
            )}
            {activeTab === "experiences" && (
              <div>
                <p className="text-gray-400">
                  During my time at Salesforce, I’ve worked with a diverse range
                  of clients, helping them leverage our platform to streamline
                  their processes and achieve their goals. My expertise lies in
                  understanding client needs and providing tailored solutions
                  that drive business success. I’ve developed a strong
                  foundation in CRM strategies and am always up to date on the
                  latest product innovations, which I love sharing with my
                  clients.
                </p>
              </div>
            )}
            {activeTab === "recommended" && (
              <div>
                <p className="text-gray-400">
                  I take great pride in fostering strong relationships, ensuring
                  that each client feels supported throughout their Salesforce
                  journey. From initial consultations to successful
                  implementations, I’m here to guide you every step of the way.
                  Looking forward to helping you maximize the potential of
                  Salesforce for your business!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Gallery section */}
        <div className="bg-[#4A4E54] relative rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 ease-in-out">
          <div className="absolute top-2 left-2 ">
            <FaQuestionCircle className="text-gray-500" />
          </div>
          {/* Left-side centered grid icon */}
          <div className="absolute left-0 top-2/4 transform -translate-y-2/4 p-2">
            <FaThLarge className="text-gray-500" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-semibold">
              Gallery
            </h3>
            <div className="flex items-center space-x-4 ">
              <button
                className="bg-gray-500 hover:bg-black text-white text-xs px-1 md:text-sm py-2 md:px-4 ml-2 rounded-full shadow-xl transition-shadow duration-200 hover:shadow-full"
                onClick={handleAddImage}
              >
                + ADD IMAGE
              </button>

              <button
                className="bg-[#343535] hover:bg-gray-500 text-gray-200 p-2 rounded-full shadow-[rgba(197,197,197,0.5)_0px_0px_10px_2px]"
                onClick={handlePrev}
              >
                <GoArrowLeft />
              </button>
              <button
                className="bg-[#343535] hover:bg-gray-500 text-gray-200 p-2 rounded-full shadow-[rgba(197,197,197,0.5)_0px_0px_10px_2px]"
                onClick={handleNext}
              >
                <GoArrowRight />
              </button>
            </div>
          </div>

          {/* Carousel gallery images */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-1">
            {visibleImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-32 sm:h-40 object-cover rounded-md shadow-sm transition-transform duration-200 hover:scale-105"
              />
            ))}
          </div>

          {/* Dropzone for adding new images */}
          <div
            {...getRootProps()}
            className={`w-full border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive
                ? "border-green-500 bg-gray-50"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <input {...getInputProps()} />
            <FaPlus className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-300">
              {isDragActive
                ? "Drop the files here"
                : "Drag and drop images here, or click to select files"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

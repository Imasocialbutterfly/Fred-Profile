import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl mb-8">
          Welcome To Frederick's Profile, Unknown User
        </h1>
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 relative">
            <Image
              src="/DSC03892.jpg"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              alt="PR picture"
            />
          </div>
        </div>
        <p className="text-lg">Choose your path...</p>
      </div>
    </div>
  );
};

export default Home;

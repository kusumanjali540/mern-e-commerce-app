import React from "react";

// Only works when width is known, not apply for height. Unexpected behavior when working with iterating over collections. Noted: pass the width seperated into the props
const ResponsiveSquare = ({
  src,
  width,
  alt,
  onLoad = () => {},
  className = "",
}) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: width,
        position: "relative",
        paddingBottom: width, // This creates a responsive square
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: `url(${src})`,
          zIndex: 1, // Ensures the blurred image stays behind the actual image
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full z-10 shadow-lg ${className}`}
        onLoad={onLoad}
      />
    </div>
  );
};

export default ResponsiveSquare;

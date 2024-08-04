import React, { useEffect } from "react";
import ResponsiveSquare from "../components/shared/ResponsiveSquare";

// const Test = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/product/products"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   return <div>Test</div>;
// };

// https://soundpeatsvietnam.com/wp-content/uploads/2021/09/tai-nghe-soundpeats-air3-1-600x600-1.jpg
// https://cdn.thewirecutter.com/wp-content/media/2022/11/wirelessearbuds-2048px-8831.jpg
const Test = () => {
  return (
    <>
      <ResponsiveSquare
        width="50%"
        picture="https://cdn.thewirecutter.com/wp-content/media/2022/11/wirelessearbuds-2048px-8831.jpg"
        alt="Fit"
      />
      <ResponsiveSquare
        width="100px"
        picture="https://cdn.thewirecutter.com/wp-content/media/2022/11/wirelessearbuds-2048px-8831.jpg"
        alt="Fit"
      />
    </>
  );
};

export default Test;

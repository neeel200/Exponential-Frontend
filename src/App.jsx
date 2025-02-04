import { useEffect, useState } from "react";
import ClickButton from "./components/ClickButton";
import { getUserData, clickButton } from "./services/api";
import "./app.css";
import { useLocalStorage } from "./hooks/userLocalStorage";

const App = () => {
  // const userId = "test_user";
  const [userId, setUserId] = useLocalStorage("userID", "");
  const [data, setData] = useState({ counter: 0, points: 0, prizes: 0 });
  const [points, setPoints] = useState(0);

  const [showPrizeMessage, setShowPrizeMessage] = useState(false);

  const [showExtraPointsMessage, setShowExtraPointsMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(userId);
      setData(userData);
      setUserId(userData._id)
    };
    fetchData();
  }, [userId, setUserId]);

  const handleClick = async () => {
    const response = await clickButton(userId);
    if (response.success) {
      setUserId(response.data._id)
      if (response.data.prizes > data.prizes) {
        setShowPrizeMessage(true);
        setTimeout(() => setShowPrizeMessage(false), 2000); // Hide after 2 seconds
      }
      if (response.data.points - points === 10) {
        setShowExtraPointsMessage(true);
        setTimeout(() => setShowExtraPointsMessage(false), 800); // Hide after .5 seconds
      }
      setPoints(response.data.points);
      setData(response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

      <h1 className="text-5xl font-semibold font-mono">Cookie-Clicker</h1>
      <ClickButton onClick={handleClick} counter={data.counter} />
      <div className="text-center mt-6 bg-white shadow-md rounded-lg p-4 w-[50vw]">
        <p className="text-lg font-medium text-gray-700">
          Points: <span className="text-blue-500 font-bold">{data.points}</span>{" "}
          {showExtraPointsMessage && (
            <span className=" font-bold rounded-md shadow-md ml-3 text-xl">
            <span className="text-gray-600"> 10</span> <span className="text-yellow-400">+</span>
            </span>
          )}
        </p>

        <p className="text-lg font-medium text-gray-700">
          Prizes Won:{" "}
          <span className="text-green-500 font-bold">{data.prizes}</span>
        </p>

        {showPrizeMessage && (
          <div className="mt-4 p-3 bg-yellow-200 border border-yellow-400 text-yellow-800 font-bold rounded-md shadow-md">
            🎉 Congratulations! You won a new prize! 🎁
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

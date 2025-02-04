const ClickButton = ({ onClick, counter }) => (
  <div className="text-center mt-12 bg-white shadow-lg rounded-lg p-6 w-[70vw] h-[30vh] ">
    <h1 className="sm:text-3xl text-xl font-semibold text-gray-800">
      Counter: <span className="text-blue-600">{counter}</span>
    </h1>
    <button 
      onClick={onClick} 
      className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-medium py-4  px-7 rounded-lg shadow-md transition duration-300 ease-in-out text-xl"
    >
      Click Me!
    </button>
  </div>
);

export default ClickButton;

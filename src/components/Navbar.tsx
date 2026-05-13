import { useNavigate } from "react-router-dom";

const Navbar = () => {
      const navigate = useNavigate();

      return (
            <div className="border-b border-black/30 h-16 flex items-center px-8 justify-between bg-white sticky top-0 z-40">
                  <button
                        onClick={() => navigate("/")}
                        className="font-bold text-2xl cursor-pointer hover:text-indigo-600 transition-colors duration-300"
                  >
                        Dearly
                  </button>
                  <div className="flex items-center gap-5">
                        <button
                              onClick={() => navigate("/create-wish")}
                              className="bg-indigo-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-indigo-500 transition-all duration-300 font-semibold shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
                        >
                              Create Wish
                        </button>
                  </div>
            </div>
      );
};

export default Navbar;

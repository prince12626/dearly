import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateWish from "./pages/CreateWish";
import WishPage from "./pages/Wish";

const App = () => {
      return (
            <div className="min-h-screen bg-white w-screen">
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-wish" element={<CreateWish />} />
                        <Route path="/wish" element={<WishPage />} />
                  </Routes>
            </div>
      );
};

export default App;

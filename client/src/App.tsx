import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import { AddHotel } from "./pages/AddHotel";
import { EditHotel } from "./pages/EditHotel";
import MyHotels from "./pages/MyHotels";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      ></Route>
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      ></Route>
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      ></Route>
      <Route path="/details/:hotelId" element={<Layout><HotelDetails /></Layout>}></Route>
      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          ></Route>
          <Route
            path="/my-hotels/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          ></Route>
        </>
      )}
      <Route
        path="/"
        element={
          <Layout>
            <span>Home Page</span>
          </Layout>
        }
      ></Route>
    </Routes>
  );
}

export default App;

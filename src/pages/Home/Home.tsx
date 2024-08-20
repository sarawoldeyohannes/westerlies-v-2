import { useState, useEffect, useRef } from "react";
import { Head } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
//import { items } from "./controller.home";
import "./Home.css";
import "./mobile.home.css";
import "../../components/LocationSearchInput/LocationSearchInput.css";
import MapComponent from "../../components/Map/MapComponent";
import FilterNavbar from "../../components/FilterNavbar/FilterNavbar";
import SignUpPopUp from "../../components/SignUpPopUp/SignUpPopUp";
import splash from "../../assets/homePage.jpg";
import { getItems } from "./controller.home";

import { useNavigate } from "react-router-dom";
import LocationSearchAutoComplete from "../../components/LocationSearchAutoComplete/LocationSearchAutoComplete";
const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const navigation = useNavigate();

  const handleToggle = () => {
    setShowMap(!showMap);
  };

  // only show showSignUp on first visit
  useEffect(() => {
    if (localStorage.getItem("visited")) {
      setShowSignUp(false);
    } else {
      localStorage.setItem("visited", "true");
    }
  }, []);

  useEffect(() => {
    async function getItemsState() {
      let itemsList = (await getItems()) as any;
      setItems(itemsList);
    }
    getItemsState();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [footerRef]);
  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };
  return (
    <>
      <Head
        headerClassName="head-instance"
        type="About"
        searchResult={setItems}
        cityId={""} setCityId={function (cityId: string): void {
          throw new Error("Function not implemented.");
        } } selectedTags={[]} setSelectedTags={function (selectedTags: string): void {
          throw new Error("Function not implemented.");
        } }      />
      <div className="home-container">
        {/* <FilterNavbar /> */}
        <div className="splash">
          <div className="splash-text-container">
            <div className="s-container">
              <div className="splash-text-wrapper">
                Find and Support Independent Shops + Makers
              </div>
              <div className="splash-text-wrapper2">
                Discover locally owned shops and makers around the corner or
                across the world
              </div>
              <LocationSearchAutoComplete
                locationSelected={(placeId: string) => {
                  navigation("/search/?cityId=" + placeId);
                }}
              />
            </div>
          </div>
          <div className="splash-image-container">
            <img src={splash} />
          </div>
        </div>
        {showSignUp && <SignUpPopUp onClose={handleCloseSignUp} />}
        {showMap ? (
          <div className="map-container">
            <MapComponent lat={0} lng={0} />
          </div>
        ) : (
          <div className="items-container">
            {items.length > 0 &&
              items?.map((item: any) => (
                <Card
                  key={item.storeId}
                  name={item.name}
                  description={""}
                  storePicture={item.storePicture}
                  storeId={item.storeId}
                  primaryTag2={item?.primaryTag2}
                />
              ))}
          </div>
        )}
        {!isFooterVisible && (
          <button className="toggle-button" onClick={handleToggle}>
            {showMap ? "Show Items" : "Show Map"}
          </button>
        )}
      </div>
      <Footer type="Home" ref={footerRef} />
    </>
  );
};

export default Home;

import { useState, useEffect, useRef } from "react";
import { Head } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import { items } from "./controller.home";
import "./Home.css";
import "./mobile.home.css";
import MapComponent from "../../components/Map/MapComponent";
import FilterNavbar from "../../components/FilterNavbar/FilterNavbar";
import SignUpPopUp from "../../components/SignUpPopUp/SignUpPopUp";
import splash from "../../assets/homePage.jpg";
const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);

  const handleToggle = () => {
    setShowMap(!showMap);
  };

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
      <Head headerClassName="head-instance" />
      <div className="home-container">
        <FilterNavbar />
        <div className="splash">
          <div className="splash-text-container">
            <div className="s-container">
              <div className="text-wrapper">
                Find and Support Independent Shops + Makers
              </div>
              <div className="text-wrapper2">
                Discover local made around the corner or across the world
              </div>
              <div className="splash-input">
                <input
                  className="Location-input"
                  type="text"
                  placeholder="Type a location"
                />
              </div>
            </div>
          </div>
          <div className="splash-image-container">
            <img src={splash} />
          </div>
        </div>
        {showSignUp && <SignUpPopUp onClose={handleCloseSignUp} />}
        {showMap ? (
          <div className="map-container">
            <MapComponent />
          </div>
        ) : (
          <div className="items-container">
            {items.map((item) => (
              <Card key={item.id} {...item} />
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

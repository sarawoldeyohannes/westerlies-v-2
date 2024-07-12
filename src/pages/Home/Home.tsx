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
import { SearchLocation, getCityDetail, getItems, searchitems } from "./controller.home";
import { RiUserLocationFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate, useNavigation } from "react-router-dom";
import LocationSearchInputOnly from "../../components/LocationSearchInput/LocationSearchInputOnly";
const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [locationList, setLocationList] = useState<any[]>([]);
  const navigation = useNavigate();

  const handleToggle = () => {
    setShowMap(!showMap);
  };


  useEffect(() => {
    async function getItemsState(){
      let itemsList= await getItems() as any;
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
      <Head headerClassName="head-instance" type="About" />
      <div className="home-container">
        <FilterNavbar />
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
              <div className="splash-input">
                <input

                  onChange={async(e) => {
                     let locationExists = await SearchLocation(e.target.value);

                     if(locationExists.length > 0){
                      setLocationList(locationExists)
                     }else{
                      setLocationList([])
                      let searchedItemList = await searchitems(e.target.value);
                      setItems(searchedItemList);
                     }
                    
                  }}
                  className="Location-input"
                  type="text"
                  placeholder="Search a city"
                />
                {locationList.length > 0 &&
                <div className="selectLocation">
                  { locationList.map((location) => (
                    <div 
                      onClick={async()=>{
                        let placeId = location.place_id;
                        
                        // navigate to /search?cityId=cityDetail.id
                        navigation("/search/?cityId="+placeId);
                      }}
                    className="location-item">
                      <FaLocationDot style={{margin: 10}} />
                      {location.description}</div>
                  ))
                  }
                </div>
                }
                {/* <LocationSearchInputOnly /> */}
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
            {  items?.map((item:any) => (
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

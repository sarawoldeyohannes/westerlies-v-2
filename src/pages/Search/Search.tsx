import { useEffect, useRef, useState } from "react";
import { Head } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FilterNavbar from "../../components/FilterNavbar/FilterNavbar";
import MapComponent, { Location } from "../../components/Map/MapComponent";
import { getStores_around_city } from "./controller.search";
import Card from "../../components/Card/Card";
import "./Search.css";
import "./mobile.search.css";
import { getCityDetail } from "../Home/controller.home";

const ITEMS_PER_PAGE = 8;
const Search = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchitems,setSearchItems] = useState<any[]>([]);
  const [cityDetail,setCityDetail] = useState<Location>();
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  useEffect(()=>{
    async function getCityDetailSearchPage(placeId: string){
      let cityDetail = await getCityDetail(placeId) as Location;
      let store_list = await getStores_around_city(placeId);
      console.log("City Detail",cityDetail);
      setSearchItems(store_list);
      setCityDetail(cityDetail);
    }
    const params = new URLSearchParams(window.location.search);

    let cityId: string = params.get("cityId")?.toString() as string;
    getCityDetailSearchPage(cityId);
  },[])

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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = searchitems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(searchitems.length / ITEMS_PER_PAGE);
  const [isMapView, setIsMapView] = useState(false);

  const toggleView = () => {
    setIsMapView(!isMapView);
  };
  return (
    <>
      <Head headerClassName="head-instance" searchResult={setSearchItems} />
      <div className="search-container">
        <FilterNavbar />

        <div className="map-and-items">
          <div className="items-pagination">
            <div className="items-container">
              {selectedItems.map((item) => (
                <Card name={"test"} storePicture={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyo4kPjPIxHwfpRwck9He7a7eHuJ3_1Tzhyg&s"} key={item.id} {...item} />
              ))}

              {selectedItems.length == 0 &&
                <div style={{width:'100%',height:500,display: 'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <h1>Not Found</h1>
                    
                  </div>
              }
            </div>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className={`${isMapView ? "map-mobile" : "map-container"}`}>
          {cityDetail &&
            <MapComponent lat={cityDetail?.lat || 0} lng={cityDetail?.lng || 0} to_be_marked={selectedItems}  />
          }
            </div>
        </div>
        {!isFooterVisible && (
          <button className="view-toggle" onClick={toggleView}>
            {isMapView ? "Show Items" : "Show Map"}
          </button>
        )}
      </div>
      <Footer ref={footerRef} type="Search" />
    </>
  );
};

export default Search;

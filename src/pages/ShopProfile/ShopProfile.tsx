import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { Head } from "../../components/Header/Header";
import img from "../../assets/mockimg.png";
import "./ShopProfile.css";
import "./mobile.shopProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faPinterest,
  faTiktok,
  faWeibo,
  faWeixin,
  faWhatsapp,
  faXTwitter,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";
import { faBroadcastTower, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import MapComponent from "../../components/Map/MapComponent";
import { getNearbayStores, getStoreBY_id, insta, items } from "./controller.shopProfile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { faWebflow } from "@fortawesome/free-brands-svg-icons/faWebflow";
import { Button } from "react-bootstrap";
const ShopProfile = () => {
  const params = useParams();
  const [storeDetailInfo, setStoreDetailInfo] = useState<any>();
  const [loadMap, setLoadMap] = useState<boolean>(false);
  const [nearByStoreList, setNearByStoreList] = useState<any[]>([]);
  const [locationIndex, setLocationIndex] = useState<number>(0);
  const [searchItems, setSearchItems] = useState<string>();
  const [cityId, setCityId] = useState<string>("");
  const [sortedLink, setSortedLink] = useState<any[]>([]);
  const [locationUpdated, setLocationUpdated] = useState<any>();
  const [tags,setTags] = useState([]);
  const [selectedTagList,setSelectedTags] = useState<any>();
  const [completeDays,setCompleteDays] = useState<any>();

  const [dayId, setDayId] = useState<any>({
    "1": "MONDAY",
    "2": "TUESDAY",
    "3": "WEDNESDAY",
    "4": "THURSDAY",
    "5": "FRIDAY",
    "6": "SATURDAY",
    "7": "SUNDAY"
  });
  const [tagInfo] = useState<any>({
    "102": "B Corporation",
    "103": "BIPOC-owned",
    "104": "Community-owned",
    "105": "Eco-Friendly",
    "106": "Fair Trade",
    "107": "Handmade",
    "108": "LGBTQIA+-owned",
    "109": "Made Here",
    "110": "Refill / Zero Waste",
    "111": "Slow Fashion",
    "112": "Traditional Handicraft",
    "113": "Woman-owned",
    "114": "Veteran-owned",
    "115": "Vegan Products",
    "116": "Vintage",
    "118": "Independent Designer",
    "119": "Community Involvement",
    "121": "1% for the Planet",
}
);

  useEffect(() => {
    async function getLocationDetail({ lng, lat }: any) {
      let newPosition = { lng, lat };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
          console.log("XXXXXXXXXX: ", results)
        if (status === "OK" && results && results[0].address_components) {
          const addressComponents = results[0].address_components;
          let city = "";
          let country = "";
          let state = "";
          let zipCode = "";
          let street = "";

          for (let component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              zipCode = component.long_name;
            }
            if (
              
              component.types.includes("street_number")
            ) {
              street = component.long_name;
            }
          }
          // alert("tttttttt: " + JSON.stringify({
          //   lat,
          //   lng,
          //   address: results[0].formatted_address,
          //   city,
          //   country,
          //   state,
          //   zipCode,
          //   street,
          // }))
          setLocationUpdated({
            lat,
            lng,
            address: results[0].formatted_address,
            city,
            country,
            state,
            zipCode,
            street,
          });
        }
      });
    }
    async function getStoreDetail(storeId: string) {



      let storeDetail = await getStoreBY_id(storeId);
      let nearByStore = await getNearbayStores(parseInt(storeId));
      getLocationDetail({ lat: parseFloat(storeDetail[0].StoreOpeningDaysAndLocation[locationIndex].fineLocation.lattitude), lng: parseFloat(storeDetail[0].StoreOpeningDaysAndLocation[locationIndex].fineLocation.longtiude) });
      // storeDetail[0].StoreOpeningDaysAndLocation.name = "test";
      // loop through and arrange the dates based on date id 
      const updatedStoreDetailInfo = { ...storeDetail[0] };
      console.log("UpdatedStore: ", updatedStoreDetailInfo)
      const dayOrders = [7,1,2,3,4,5,6]
      const sortedDays = [...updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays]
        .sort((a, b) => dayOrders.indexOf(a.dayId) - dayOrders.indexOf(b.dayId));

      updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays = sortedDays;
      const desiredOrder = [7, 8, 6, 2, 1, 3];

      const sortedLinks = updatedStoreDetailInfo.storeLinks.sort((a: any, b: any) => {
        return desiredOrder.indexOf(a.linkType) - desiredOrder.indexOf(b.linkType);
      });
      setSortedLink(sortedLinks);
      const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

      let completeDays = dayNames.map((day, index) => {
        const dayId = (index + 1) % 7 + 1; // This will wrap around day IDs from 1 to 7
        const matchingDay = updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays.find((item: any) => item.dayId === dayId);
      
        return matchingDay ? matchingDay : { dayId: dayId, openTime: null, closeTime: null };
      });
      completeDays = completeDays.sort((a: any, b: any) => a.dayId - b.dayId);
      // i want the 7th day to be the first day
      const lastDay = completeDays.pop();
      completeDays.unshift(lastDay);
      setCompleteDays(completeDays);
      setStoreDetailInfo(updatedStoreDetailInfo);

      // limit nearby stores to 3
      nearByStore = nearByStore.slice(0, 5);

      nearByStore =  nearByStore.filter((item: any) => item.storeId != storeId);
      setNearByStoreList(nearByStore);
      console.log("Store Detail", storeDetail);
    }

  

    let storeId = params.storeId as string;
    getStoreDetail(storeId);



  }, []);

  useEffect(() => {

    async function getLocationDetail({ lng, lat }: any) {
      let newPosition = { lng, lat };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0].address_components) {
          console.log("XXXXXXXXXX: ", results)
          const addressComponents = results[0].address_components;
          let city = "";
          let country = "";
          let state = "";
          let zipCode = "";
          let street = "";

          for (let component of addressComponents) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (component.types.includes("postal_code")) {
              zipCode = component.long_name;
            }
            if (
            
              component.types.includes("street_number")
            ) {
              street = component.long_name;
            }
          }
          setLocationUpdated({
            lat,
            lng,
            address: results[0].formatted_address,
            city,
            country,
            state,
            zipCode,
            street,
          });
        }
      });
    }
    if (storeDetailInfo) {

      getLocationDetail({ lat: parseFloat(storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.lattitude), lng: parseFloat(storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.longtiude) })
    }
  }, [locationIndex])


  useEffect(() => {
    console.log("ACTIVE: ", searchItems);
    if(cityId){
      window.open("/search/?cityId=" + `${cityId}`, "_blank");

    }

  }, [searchItems]);


  useEffect(() => {
    async function getLocationIndex (storeId: string,cityName: string) {
      let storeDetail = await getStoreBY_id(storeId);
      let locationIndexLocal = storeDetail[0].StoreOpeningDaysAndLocation.findIndex((item: any) => item.fineLocation.city == cityName);
      
      if(locationIndexLocal == -1 && locationIndex == 0){
        locationIndexLocal = 0;
      }
      setLocationIndex(locationIndex);
    }

    let storeId = params.storeId as string;
    let cityName = params.cityName as string;
    if(cityName){

      getLocationIndex(storeId,cityName);
    }

    setLoadMap(true);
  }, [storeDetailInfo])

  useEffect(() => {
    if (storeDetailInfo) {
      const updatedStoreDetailInfo = { ...storeDetailInfo };
      console.log("UpdatedStore: ", updatedStoreDetailInfo)
      // const sortedDays = [...updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays]
      //   .sort((a, b) => b.dayId - a.dayId);

      // updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays = sortedDays;
      const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

      let completeDays = dayNames.map((day, index) => {
        const dayId = (index + 1) % 7 + 1; // This will wrap around day IDs from 1 to 7
        const matchingDay = updatedStoreDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays.find((item: any) => item.dayId === dayId);
      
        return matchingDay ? matchingDay : { dayId: dayId, openTime: null, closeTime: null };
      });
      completeDays = completeDays.sort((a: any, b: any) => a.dayId - b.dayId);
      const lastDay = completeDays.pop();
      completeDays.unshift(lastDay);
      setCompleteDays(completeDays);
      setStoreDetailInfo(updatedStoreDetailInfo);
    }
  }, [locationIndex]);

  function convertToAmPm(time24: string) {
    if (time24 && !time24.includes("AM") && !time24.includes("PM")) {
      console.log("time:: ", time24);
      const [hours, minutes] = time24.split(':').map(Number);

      const amPm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12; // Converts 0 to 12 for midnight (12:00 AM)

      return `${hour12}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    } else if (!time24) {
      return "Closed";
    } else {
      return time24;
    }
  }

  if (storeDetailInfo === undefined) {
    return (
      <>
      </>
    );
  } else {
    return (
      <>
        <Head headerClassName={'shope'} searchResult={setSearchItems} setCityId={setCityId} cityId={"" + cityId} page={"shopProfile"} selectedTags={tags} setSelectedTags={setSelectedTags} />
        <div className="shop-profile">
          <div className="section1">
            <div className="section1-part1">
              <img className="images-2" alt="Images" src={storeDetailInfo.storePicture?.replace("http://", "https://").replace("api.westerlies.io", "apibeta.westerlies.com").replace("/api/", "/images/").replace("/https://","https://")} />
              <span style={{fontSize: 14}}> This picture belongs to {storeDetailInfo.name}.  </span>

            </div>
            <div className="section-part-2">
              <div className="frame-7">
                <div className="text-wrapper-8">{storeDetailInfo.name}</div>
              </div>
              <div className="store-description-wrapper">
                <p className="store-description">
                  {storeDetailInfo.description}
                </p>
              </div>
              {storeDetailInfo?.storeLinks.length > 0 &&
                <div className="frame-8">
                  <div className="text-wrapper-9">SOCIAL</div>
                  <div className="frame-9-links">

                    {
                      sortedLink.map((item: any) => {
                        console.log("Item: ", item);
                        if (item.linkType == 17 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faGlobe} />
                            </a>
                          )
                        } else if (item.linkType == 2 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                          )
                        } else if (item.linkType == 6 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faInstagram} />
                            </a>
                          )
                        } else if (item.linkType == 1 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faWeibo} />
                            </a>
                          )
                        } else if (item.linkType == 3 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faWeixin} />
                            </a>
                          )
                        } else if (item.linkType == 9 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faPinterest} />
                            </a>
                          )
                        } else if (item.linkType == 10 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                          )
                        } else if (item.linkType == 8 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faTiktok} />
                            </a>
                          )
                        } else if (item.linkType == 7 && item.link != "" && item.link != null) {
                          return (
                            <a className="icon-links" target="_blank" href={item.link}>
                              <FontAwesomeIcon icon={faGlobe} />
                            </a>
                          )
                        }

                      })

                    }



                    {/* <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faTiktok} />
                </a> */}
                  </div>
                </div>
              }
                <div className="frame-8">
                  <div style={{display: 'flex', flexDirection: 'row', width: '80%', alignSelf: 'center', flexWrap: 'wrap', gap: 10 }}>
                  { storeDetailInfo?.storeTags.map((tagItem: any) => (
                    tagInfo[tagItem.tagId] &&
                 <span style={{background: '#ebebeb',padding: 7,borderRadius: 10}}>
                      {tagInfo[tagItem.tagId]}
                  </span>
                  ))
                  }
                    </div>
                  </div>
                  </div>
            
          </div>

          {



            (
              <div className="section-2">
                <div className="frame-10">
                  <div className="frame-stop-by">

                    <div className="text-wrapper-8">STOP BY</div>

                    <div className="frame-11">
                      <div className="frame-12">
                        {/* {
                          storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays.map((item: any) => (
                            <div className="frame-days">
                              <div className="days">{dayId[item.dayId]}</div>
                              {convertToAmPm(item.openTime) == "Closed" ?
                                <>
                                  <div className="time">{convertToAmPm(item.openTime)}</div>

                                </>
                                :
                                <>
                                  <div className="time">{convertToAmPm(item.openTime)}</div>
                                  <p> | </p>
                                  <div className="time">{convertToAmPm(item.closeTime)}</div>
                                </>
                              }


                            </div>
                          ))
                        } */}
                            {/* {
                          storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.storeOpeningDays.map((item: any) => (
                            <div className="frame-days">
                              <div className="days">{dayId[item.dayId]}</div>
                              {convertToAmPm(item.openTime) == "Closed" ?
                                <>
                                  <div className="time">{convertToAmPm(item.openTime)}</div>

                                </>
                                :
                                <>
                                  <div className="time">{convertToAmPm(item.openTime)}</div>
                                  <p> | </p>
                                  <div className="time">{convertToAmPm(item.closeTime)}</div>
                                </>
                              }


                            </div>
                          ))
                        } */}
                            {completeDays?.map((item: any) => (
                        <div key={item.dayId} className="frame-days">
                          <div className="days">{dayId[item.dayId]}</div>
                          {!item.openTime ?
                            <div className="time">Closed</div>
                            :
                            <>
                              <div className="time">{convertToAmPm(item.openTime)}</div>
                              <p> | </p>
                              <div className="time">{convertToAmPm(item.closeTime)}</div>
                            </>
                          }
                        </div>
                        ))}

                        
                      </div>
                      <div className="frame-13">
                        <div className="frame-address">
                          {/* <div className="address">
                      {  storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.city || "NA"} 
                      </div> */}
                        </div>
                        {/* {
            lat,
            lng,
            address: results[0].formatted_address,
            city,
            country,
            state,
            zipCode,
            street,
          } */}
                        <div className="frame-address">
                          <div className="address">
                            {locationUpdated?.address.split(",")[0]}
                          </div>
                        </div>
                        <div className="frame-address">
                          <div className="address">{locationUpdated?.address.split(",")[1] + ", " + locationUpdated?.address.split(",")[2]}</div>
                        </div>
                        <div className="frame-address">
                          <div className="address">{locationUpdated?.country}</div>
                        </div>
                        <div className="frame-address">
                          <div className="address">{""}</div>
                        </div>
                        
                        <div className="frame-address">
                          <div className="address">{storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.phoneNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="map-wrapper">
                  {loadMap &&

                    <MapComponent lat={parseFloat(storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.lattitude)} lng={parseFloat(storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex].fineLocation.longtiude)} to_be_marked={storeDetailInfo.StoreOpeningDaysAndLocation} shopeProfile={true} />

                  }
                </div>
              </div>
            )


          }

          {storeDetailInfo.StoreOpeningDaysAndLocation.length > 1 &&
            <div style={{ display: 'flex', flexDirection: 'column', width: '90%', alignSelf: 'center', flexWrap: 'wrap' }}>
              <span style={{ margin: 15 }}>More locations in:</span>

              <div style={{ display: 'flex', flexDirection: 'row', width: '97.5%', alignSelf: 'center', flexWrap: 'wrap', gap: 10 }}>

                {


                  storeDetailInfo.StoreOpeningDaysAndLocation.map((StoreOpeningDaysAndLocation: any, index: number) => {


                    return (
                      <button
                        onClick={() => {
                          setLocationIndex(index);
                        }}
                        style={{ padding: 5, borderRadius: 5, marginRight: 10, border: 'none',  backgroundColor: index == locationIndex ? 'gray' : 'lightgray' }}>
                        {StoreOpeningDaysAndLocation.fineLocation.city}
                      </button>
                    )
                  })
                }

              </div>
            </div>
          }
          <div className="frame-14">
          {storeDetailInfo.instagramPhotos.length > 0 &&

            <div className="frame-9">
              <div className="text-wrapper-8">GALLERY</div>
             
            </div>
          }
            <div className="frame-15">
              {storeDetailInfo.instagramPhotos.map((item: any) => (
             
                <iframe
                  title="Instagram Post"
                  style={{height: 570, width: 400}}
                  src={
                    item.li +
                    "embed/captioned/?cr=1&v=14&wp=583&rd=https%3A%2F%google.com&rp=%2Fembed%3Furl%3Dhttps%253A%252F%252Fwww.instagram.com%252Fp%252FC1sw3fEJJ9W%252F%253Fhl%253Den%26id%3Dmntl-sc-block_1-0-9-iframe%26options%3De30%253D%26docId%3D8422682#%7B%22ci%22%3A0%2C%22os%22%3A1948.5%2C%22ls%22%3A430.90000000037253%2C%22le%22%3A1514.800000000745%7D"
                  }
                ></iframe>
              
              ))}
            </div>
          </div>
          {storeDetailInfo.yelpReviewUrl &&
          <div className="frame-14">
            <div className="frame-9">
              <div className="text-wrapper-8">STORE REVIEWS</div>
            </div>
            <div className="frame-16">
              <div className="read-button-btn">
                <p className="read">
                  <a href={storeDetailInfo.yelpReviewUrl} target="_blank"   className="span">
                    Read reviews on yelp
                  </a>
                </p>
              </div>
            </div>
          </div>   
        }
          <div className="frame-14">
            <div className="frame-9">
              <p className="text-wrapper-8">Others Stores You May Love</p>
            </div>
            <div className="frame-15">
              {nearByStoreList.map((item: any, index: number) => {

                return (
                  <Card name={item.name} storePicture={""} storeId={0} key={item.id} {...item} />
                )

              }
              )}
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
};

export default ShopProfile;
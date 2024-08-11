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
  faWhatsapp,
  faXTwitter,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import MapComponent from "../../components/Map/MapComponent";
import {
  getNearbayStores,
  getStoreBY_id,
  insta,
  items,
} from "./controller.shopProfile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const ShopProfile = () => {
  const params = useParams();
  const [storeDetailInfo, setStoreDetailInfo] = useState<any>();
  const [nearByStoreList, setNearByStoreList] = useState<any[]>([]);
  const [locationIndex, setLocationIndex] = useState<number>(0);
  const [dayId, setDayId] = useState<any>({
    "1": "MONDAY",
    "2": "TUESDAY",
    "3": "WEDNESDAY",
    "4": "THURSDAY",
    "5": "FRIDAY",
    "6": "SATURDAY",
    "7": "SUNDAY",
  });

  useEffect(() => {
    async function getStoreDetail(storeId: string) {
      let storeDetail = await getStoreBY_id(storeId);
      let nearByStore = await getNearbayStores(parseInt(storeId));
      setStoreDetailInfo(storeDetail[0]);
      // limit nearby stores to 3
      nearByStore = nearByStore.slice(0, 3);
      setNearByStoreList(nearByStore);
      console.log("Store Detail", storeDetail);
    }

    let storeId = params.storeId as string;
    getStoreDetail(storeId);
  }, []);

  if (storeDetailInfo === undefined) {
    return <></>;
  } else {
    return (
      <>
        <Head
          headerClassName={undefined}
          searchResult={function (searchedItemList: any): void {
            throw new Error("Function not implemented.");
          }}
          cityId={""}
        />
        <div className="shop-profile">
          <div className="section1">
            <div className="section1-part1">
              <img
                className="images-2"
                alt="Images"
                src={storeDetailInfo.storePicture
                  ?.replace("http://", "https://")
                  .replace("api.westerlies.io", "apibeta.westerlies.com")
                  .replace("/api/", "/images/")}
              />
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
              {storeDetailInfo?.storeLinks.length > 0 && (
                <div className="frame-8">
                  <div className="text-wrapper-9">SOCIAL</div>
                  <div className="frame-9-links">
                    {storeDetailInfo.storeLinks.map((item: any) => {
                      if (
                        item.linkType == 17 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faGlobe} />
                          </a>
                        );
                      } else if (
                        item.linkType == 8 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                        );
                      } else if (
                        item.linkType == 1 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        );
                      } else if (
                        item.linkType == 15 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faYelp} />
                          </a>
                        );
                      } else if (
                        item.linkType == 14 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faXTwitter} />
                          </a>
                        );
                      } else if (
                        item.linkType == 9 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faPinterest} />
                          </a>
                        );
                      } else if (
                        item.linkType == 10 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </a>
                        );
                      } else if (
                        item.linkType == 16 &&
                        item.link != "" &&
                        item.link != null
                      ) {
                        return (
                          <a
                            className="icon-links"
                            target="_blank"
                            href={item.link}
                          >
                            <FontAwesomeIcon icon={faTiktok} />
                          </a>
                        );
                      }
                    })}

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
              )}
              {/* <div className="frame-8">
              <div className="text-wrapper-10">JOIN IN</div>
              <div className="frame-9-links">
                <div className="text-wrapper-10">
                  https://www.pistachiosonline.com/pages/events
                </div>
              </div>
            </div> */}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignSelf: "center",
            }}
          >
            {storeDetailInfo.StoreOpeningDaysAndLocation.map(
              (StoreOpeningDaysAndLocation: any, index: number) => {
                return (
                  <button
                    onClick={() => {
                      setLocationIndex(index);
                    }}
                    style={{ padding: 5, borderRadius: 5, marginRight: 10 }}
                  >
                    {StoreOpeningDaysAndLocation.fineLocation.city}
                  </button>
                );
              }
            )}
          </div>
          {
            <div className="section-2">
              <div className="frame-10">
                <div className="frame-stop-by">
                  <div className="text-wrapper-8">STOP BY</div>

                  <div className="frame-11">
                    <div className="frame-12">
                      {storeDetailInfo.StoreOpeningDaysAndLocation[
                        locationIndex
                      ].fineLocation.storeOpeningDays.map((item: any) => (
                        <div className="frame-days">
                          <div className="days">{dayId[item.dayId]}</div>
                          <div className="time">{item.openTime}</div>
                          <p> | </p>
                          <div className="time">{item.closeTime}</div>
                        </div>
                      ))}
                    </div>
                    <div className="frame-13">
                      <div className="frame-address">
                        <div className="address">
                          {storeDetailInfo.StoreOpeningDaysAndLocation[
                            locationIndex
                          ].fineLocation.city || "NA"}
                        </div>
                      </div>
                      <div className="frame-address">
                        <div className="address">
                          {
                            storeDetailInfo.StoreOpeningDaysAndLocation[
                              locationIndex
                            ].fineLocation.street
                          }
                        </div>
                      </div>
                      <div className="frame-address">
                        <div className="address">
                          {
                            storeDetailInfo.StoreOpeningDaysAndLocation[
                              locationIndex
                            ].fineLocation.zipCode
                          }
                        </div>
                      </div>
                      <div className="frame-address">
                        <div className="address">
                          {
                            storeDetailInfo.StoreOpeningDaysAndLocation[
                              locationIndex
                            ].fineLocation.phoneNumber
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="map-wrapper">
                <MapComponent
                  lat={
                    storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex]
                      .fineLocation.lattitude
                  }
                  lng={
                    storeDetailInfo.StoreOpeningDaysAndLocation[locationIndex]
                      .fineLocation.longtiude
                  }
                  to_be_marked={[]}
                />
              </div>
            </div>
          }

          <div className="frame-14">
            <div className="frame-9">
              <div className="text-wrapper-8">GALLERY</div>
            </div>
            <div className="frame-15">
              {storeDetailInfo.instagramPhotos.map((item: any) => (
                <Card
                  name={""}
                  storePicture={""}
                  storeId={0}
                  description={""}
                  key={item.id}
                  {...item}
                />
              ))}
            </div>
          </div>
          <div className="frame-14">
            <div className="frame-9">
              <div className="text-wrapper-8">STORE REVIEWS</div>
            </div>
            <div className="frame-16">
              <div className="read-button-btn">
                <p className="read">
                  <a href="/about" className="span">
                    Read reviews on yelp
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="frame-14">
            <div className="frame-9">
              <p className="text-wrapper-8">Others Stores You May Love</p>
            </div>
            <div className="frame-15">
              {nearByStoreList.map((item: any, index: number) => {
                return (
                  <Card
                    name={item.name}
                    storePicture={""}
                    storeId={0}
                    key={item.id}
                    {...item}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
};

export default ShopProfile;

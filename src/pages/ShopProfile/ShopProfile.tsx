import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { Head } from "../../components/Header/Header";
import img from "../../assets/mockimg.png";
import "./ShopProfile.css";
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
import { insta, items } from "./controller.shopProfile";
const ShopProfile = () => {
  return (
    <>
      <Head headerClassName={undefined} />
      <div className="shop-profile">
        <div className="section1">
          <div className="section1-part1">
            <img className="images-2" alt="Images" src={img} />
          </div>
          <div className="section-part-2">
            <div className="frame-7">
              <div className="text-wrapper-8">Pistachios</div>
            </div>
            <div className="store-description-wrapper">
              <p className="store-description">
                Hundreds of years ago ships set sail in search of fortune,
                adventure, and discovery. Using winds like the Westerlies,
                sailors crossed the world, trading&nbsp;&nbsp;not only goods,
                but also ideas, beliefs, languages, and so much more. In doing
                so, they changed the world. We hope this site, named for these
                winds, will do the same.
              </p>
            </div>
            <div className="frame-8">
              <div className="text-wrapper-9">SOCIAL</div>
              <div className="frame-9-links">
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
                  <FontAwesomeIcon icon={faYelp} />
                </a>
                <a className="icon-links" target="_blank" href="www.google.com">
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
                </a>
              </div>
            </div>
            <div className="frame-8">
              <div className="text-wrapper-10">JOIN IN</div>
              <div className="frame-9-links">
                <div className="text-wrapper-10">
                  https://www.pistachiosonline.com/pages/events
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="frame-10">
            <div className="frame-stop-by">
              <div className="text-wrapper-8">STOP BY</div>
            </div>
            <div className="frame-11">
              <div className="frame-12">
                <div className="frame-days">
                  <div className="days">MONDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">TUESDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">WEDNESDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">THURSDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">FRIDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">SATURDAY</div>
                  <div className="time">10:00PM</div>
                </div>
                <div className="frame-days">
                  <div className="days">SUNDAY</div>
                  <div className="time">10:00PM</div>
                </div>
              </div>
              <div className="frame-13">
                <div className="frame-address">
                  <div className="address">
                    Bole Atlas area, opposite Sapphire Hotel
                  </div>
                </div>
                <div className="frame-address">
                  <div className="address">Addis Ababa, Addis Ababa</div>
                </div>
                <div className="frame-address">
                  <div className="address">Ethiopia</div>
                </div>
                <div className="frame-address">
                  <div className="address">+251 116 686 928</div>
                </div>
              </div>
            </div>
          </div>
          <div className="map-wrapper">
            <MapComponent />
          </div>
        </div>
        <div className="frame-14">
          <div className="frame-9">
            <div className="text-wrapper-8">GALLERY</div>
          </div>
          <div className="frame-15">
            {insta.map((item) => (
              <Card title={""} description={""} key={item.id} {...item} />
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
            <p className="text-wrapper-8">Others Stores you may Love</p>
          </div>
          <div className="frame-15">
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopProfile;

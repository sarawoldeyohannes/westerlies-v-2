import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { Head } from "../../components/Header/Header";
import img from "../../assets/mockimg.png";
import "./ShopProfile.css";

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
              <div className="frame-9">
                <img className="vector" alt="Vector" src="vector.svg" />
                <img className="vector-2" alt="Vector" src="image.svg" />
                <img className="vector" alt="Vector" src="vector-2.svg" />
                <img className="vector" alt="Vector" src="vector-3.svg" />
              </div>
            </div>
            <div className="frame-8">
              <div className="text-wrapper-10">JOIN IN</div>
              <div className="frame-9">
                <div className="text-wrapper-10">
                  https://www.pistachiosonline.com/pages/events
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="frame-10">
            <div className="frame-9">
              <div className="text-wrapper-10">STOP BY</div>
            </div>
            <div className="frame-11">
              <div className="frame-12">
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">10:00PM</div>
                </div>
              </div>
              <div className="frame-13">
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
                <div className="frame-7">
                  <div className="days">MONDAY</div>
                  <div className="days">MONDAY</div>
                </div>
              </div>
            </div>
          </div>
          <div className="map-wrapper">
            <img className="map" alt="Map" src="map-1.png" />
          </div>
        </div>
        <div className="frame-14">
          <div className="frame-9">
            <div className="text-wrapper-11">GALLERY</div>
          </div>
          <div className="frame-15">
            <div className="frame-wrapper">
              <div className="frame-9">
                <img className="images-3" alt="Images" src="image.png" />
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="img-wrapper">
                <img className="images-3" alt="Images" src="images-1-2.png" />
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="frame-9">
                <img className="images-3" alt="Images" src="images-1-3.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="frame-14">
          <div className="frame-9">
            <div className="text-wrapper-11">STORE REVIEWS</div>
          </div>
          <div className="frame-16">
            <div className="read-reviews-on-yelp-wrapper">
              <div className="read-reviews-on-yelp">READ REVIEWS ON YELP</div>
            </div>
          </div>
        </div>
        <div className="frame-14">
          <div className="frame-9">
            <p className="text-wrapper-11">Others Stores you may Love</p>
          </div>
          <div className="frame-15">
            <img className="frame-17" alt="Frame" src="frame-349.svg" />
            <Card title={""} description={""} imageUrl={""} />
            <Card title={""} description={""} imageUrl={""} />
            <Card title={""} description={""} imageUrl={""} />
            <img className="frame-17" alt="Frame" src="frame-348.svg" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShopProfile;

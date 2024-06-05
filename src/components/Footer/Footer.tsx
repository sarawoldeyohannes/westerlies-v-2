import { forwardRef } from "react";
import "./Footer.css";
import { EmailCollectionInput } from "../EmailCollectionInput/EmailCollectionInput";
import { FaInstagram } from "react-icons/fa";
import { FooterPropsWithRef } from "./controller.footer";

const Footer = forwardRef<HTMLDivElement, FooterPropsWithRef>(
  ({ type }, ref) => {
    return (
      <div className="footer" ref={ref}>
        <div
          className={
            type == "Home" ? "footer-section" : "footer-section-disabled"
          }
        >
          <div className="our-mission">
            <div className="text-wrapper">OUR MISSION</div>
          </div>
          <div className="our-mission">
            <p className="westerlies-is-on-a">
              westerlies is on a mission to connect you with local businesses
              <br />
              who sell goods that make the world a more beautiful, thoughtful
              place.
            </p>
          </div>
          <div className="about-us-button">
            <div className="about-us-button-btn">
              <p className="more-about-us">
                <a href="/about" className="span">
                  More about us
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-section-2-wrapper">
          <div className="footer-section-2">
            <div className="connect-with-us-section">
              <div className="connect-with-us">
                <div className="text-wrapper-2">CONNECT WITH US</div>
              </div>
              <div className="instagram-icon">
                <FaInstagram />
              </div>
            </div>
            <div className="footer-section-email-collection">
              <div className="email-collection-text">
                <p className="text-wrapper-2">Sign up to explore with us!</p>
              </div>
              <EmailCollectionInput />
            </div>
          </div>
        </div>
        <div className="footer-section-3-wrapper">
          <div className="footer-section-3">
            <div className="text-wrapper-5">© 2024 Westerlies. Inc.</div>
            <div className="text-wrapper-5">Web Design by Westerlies</div>
          </div>
        </div>
      </div>
    );
  }
);
export default Footer;

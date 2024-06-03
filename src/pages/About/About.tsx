import React from "react";
import { Head } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./About.css";
import image from "../../assets/mockimg.png";
const About = () => {
  return (
    <>
      <Head headerClassName="head-instance" type="About" />
      <div className="about">
        <div className="about-container">
          <div className="about-content">
            <div className="section1">
              <div className="part1">
                <div className="every-time-you-spend-wrapper">
                  <p className="p">
                    “Every time you spend money, you&#39;re casting a vote for
                    the kind of world you want.”
                  </p>
                </div>
                <div className="p1">
                  <p className="text-wrapper-7">
                    Hundreds of years ago ships set sail in search of fortune,
                    adventure, and discovery. Using winds like the Westerlies,
                    sailors crossed the world, trading not only goods, but also
                    ideas, beliefs, languages, and so much more. In doing so,
                    they changed the world. We hope this site, named for these
                    winds, will do the same.
                  </p>
                </div>
                <div className="p1">
                  <p className="text-wrapper-7">
                    Westerlies is on a mission to connect you with independent
                    shop owners and makers – both near and far – who sell goods
                    that make the world a more beautiful, thoughtful place.
                  </p>
                </div>
                <div className="p1">
                  <p className="text-wrapper-7">
                    Please reach out to us learn more, share a favorite store,
                    or for anything else at hellowesterlies@gmail.com.
                  </p>
                </div>
              </div>
              <div className="images-wrapper">
                <img className="images" alt="Images" src={image} />
              </div>
            </div>
            <div className="section-2">
              <div className="by-connecting">
                <p className="p">
                  By connecting, we hope you’ll join us in the vote for:
                </p>
              </div>
              <div className="businesses-section">
                <div className="frame-1">
                  <div className="MAKERS-ARTISANS">
                    MAKERS, ARTISANS, AND BUILDERS
                  </div>
                  <p className="MAKERS-ARTISANS-p">
                    Those who’ve honed their craft and are&nbsp;&nbsp; creating
                    goods that tell a story – because we believe that we should
                    fill our lives and homes with things that connect us to each
                    other.
                  </p>
                </div>
                <div className="frame-1">
                  <div className="MAKERS-ARTISANS">SMALL BUSINESSES</div>
                  <p className="MAKERS-ARTISANS-p">
                    Not just one day of the year, but every day – because we
                    believe that investing in independent shops and makers is a
                    powerful tool for economic development and essential for
                    creating vibrant, healthy communities.
                  </p>
                </div>
                <div className="frame-1">
                  <div className="MAKERS-ARTISANS">ETHICAL BUSINESSES</div>
                  <p className="MAKERS-ARTISANS-p">
                    Who operate with purpose, equity, and dignity – because we
                    believe that independent shops and makers who use their
                    business as a force for good can change the world.
                  </p>
                </div>
              </div>
              <div className="explore-shops-button">
                <a className="explore-shops-button-btn" href="/">
                  <div className="text-wrapper-8">EXPLORE SHOPS NOW</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

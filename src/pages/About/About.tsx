import { Head } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./About.css";
import "./mobile.about.css";
import image from "../../assets/about.jpeg";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <Head headerClassName="head-instance" type="About" searchResult={function (searchedItemList: any): void {
        throw new Error("Function not implemented.");
      } } cityId={""} setCityId={function (cityId: string): void {
        throw new Error("Function not implemented.");
      } } />
      <div className="container-about">
        <div className="section-1">
          <div className="text-section">
            <div className="description1">
              <h1>
                “Every time you spend <br></br>money, you're casting a vote for
                the kind of world you want.”
              </h1>{" "}
              <h3>-ANNA LAPPE</h3>
            </div>

            <div className="description">
              <p>
                Hundreds of years ago ships set sail in search of fortune,
                adventure, and discovery. Using winds like the Westerlies,
                sailors crossed the world, trading not only goods, but also
                ideas, beliefs, languages, and so much more. In doing so, they
                changed the world. We hope this site, named for these winds,
                will do the same.
              </p>
              <p>
                Westerlies is on a mission to connect you with independent shop
                owners and makers – both near and far – who sell goods that make
                the world a more beautiful, thoughtful place.
              </p>
              <p>
                Please reach out to us learn more, share a favorite store, or
                for anything else at &nbsp;
                <strong>hellowesterlies@gmail.com</strong>
              </p>
            </div>
          </div>
          <div className="image-section">
            <img src={image} />
          </div>
        </div>
        <div className="section-2">
          <h1>
            By connecting, we hope you’ll <br></br>join us in the vote for:
          </h1>
          <div className="texts">
            <div className="text-one">
              <h1>
                MAKERS, ARTISANS, <br></br> AND BUILDERS
              </h1>
              <p>
                Those who’ve honed their craft and are creating goods that tell
                a story – because we believe that we should fill our lives and
                homes with things that connect us to each other.
              </p>
            </div>
            <div className="text-two">
              <h1>
                SMALL<br></br>BUSINESSES
              </h1>
              <p>
                Not just one day of the year, but every day – because we believe
                that investing in independent shops and makers is a powerful
                tool for economic development and essential for creating
                vibrant, healthy communities.
              </p>
            </div>
            <div className="text-three">
              <h1>
                ETHICAL<br></br>BUSINESSES
              </h1>
              <p>
                Who operate with purpose, equity, and dignity – because we
                believe that independent shops and makers who use their business
                as a force for good can change the world.
              </p>
            </div>
          </div>
          <Link to="/" target="_blank">
            <button>EXPLORE NEW SHOPS NOW</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

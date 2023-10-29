import { Fragment, useEffect, useState } from "react";
import {useLocation} from "react-router-dom"


import "./style.scss"
const PortfoliosPage = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  // Smooth scrolling using React
  const smoothScroll = (target: HTMLElement) => {
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    const target = document.getElementById(targetId || "");
    if (target) {
      smoothScroll(target);
    }
  };

  useEffect(() => {
    // Handle click events for smooth scrolling
    document
      .querySelectorAll<HTMLAnchorElement>(
        'a.js-scroll-trigger[href*="#"]:not([href="#"])'
      )
      .forEach((link) => {
        link.addEventListener("click", handleScrollClick);
      });
    // Handle click events for smooth scrolling
    
    

  }, [location.pathname]);
  // Smooth scrolling using React

  // toggle

   const handleToggle = () => {
    setToggle(!toggle)
   }

  // toggle

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
        id="sideNav"
      >
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
          <span className="d-block d-lg-none">Start Bootstrap</span>
          <span className="d-none d-lg-block">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </span>
        </a>
        <button
          onClick={handleToggle}
          className={toggle ? "navbar-toggler" : "navbar-toggler collapsed"}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            toggle
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#experience">
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#education">
                Education
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#skills">
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#interests">
                Interests
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#awards">
                Awards
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <section
          className="resume-section p-3 p-lg-5 d-flex d-column"
          id="about"
        >
          <div className="my-auto">
            <h1 className="Name__">
              Clarence {" "}
              <span className="text-primary">Taylor</span>
            </h1>
            <div className="subheading mb-5">
              3542 Berry Street · Cheyenne Wells, CO 80810 · (317) 585-8468 ·
              <a href="mailto:name@email.com">name@email.com</a>
            </div>
            <p className="mb-5">
              I am experienced in leveraging agile frameworks to provide a
              robust synopsis for high level overviews. Iterative approaches to
              corporate strategy foster collaborative thinking to further the
              overall value proposition.
            </p>
            <ul className="list-inline list-social-icons mb-0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="resume-section p-3 p-lg-5 d-flex flex-column"
          id="experience"
        >
          <div className="my-auto">
            <h2 className="mb-5">Experience</h2>

            <div className="resume-item d-flex flex-column flex-md-row mb-5">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">Senior Web Developer</h3>
                <div className="subheading mb-3">Intelitec Solutions</div>
                <p>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation X is on the runway
                  heading towards a streamlined cloud solution. User generated
                  content in real-time will have multiple touchpoints for
                  offshoring.
                </p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">March 2013 - Present</span>
              </div>
            </div>

            <div className="resume-item d-flex flex-column flex-md-row mb-5">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">Web Developer</h3>
                <div className="subheading mb-3">Intelitec Solutions</div>
                <p>
                  Capitalize on low hanging fruit to identify a ballpark value
                  added activity to beta test. Override the digital divide with
                  additional clickthroughs from DevOps. Nanotechnology immersion
                  along the information highway will close the loop on focusing
                  solely on the bottom line.
                </p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">December 2011 - March 2013</span>
              </div>
            </div>

            <div className="resume-item d-flex flex-column flex-md-row mb-5">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">Junior Web Designer</h3>
                <div className="subheading mb-3">Shout! Media Productions</div>
                <p>
                  Podcasting operational change management inside of workflows
                  to establish a framework. Taking seamless key performance
                  indicators offline to maximise the long tail. Keeping your eye
                  on the ball while performing a deep dive on the start-up
                  mentality to derive convergence on cross-platform integration.
                </p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">July 2010 - December 2011</span>
              </div>
            </div>

            <div className="resume-item d-flex flex-column flex-md-row">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">Web Design Intern</h3>
                <div className="subheading mb-3">Shout! Media Productions</div>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate B2C users
                  after installed base benefits. Dramatically visualize customer
                  directed convergence without revolutionary ROI.
                </p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">September 2008 - June 2010</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="resume-section p-3 p-lg-5 d-flex flex-column"
          id="education"
        >
          <div className="my-auto">
            <h2 className="mb-5">Education</h2>

            <div className="resume-item d-flex flex-column flex-md-row mb-5">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">University of Colorado Boulder</h3>
                <div className="subheading mb-3">Bachelor of Science</div>
                <div>Computer Science - Web Development Track</div>
                <p>GPA: 3.23</p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">August 2006 - May 2010</span>
              </div>
            </div>

            <div className="resume-item d-flex flex-column flex-md-row">
              <div className="resume-content mr-auto">
                <h3 className="mb-0">James Buchanan High School</h3>
                <div className="subheading mb-3">Technology Magnet Program</div>
                <p>GPA: 3.56</p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">August 2002 - May 2006</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="resume-section p-3 p-lg-5 d-flex flex-column"
          id="skills"
        >
          <div className="my-auto">
            <h2 className="mb-5">Skills</h2>

            <div className="subheading mb-3">
              Programming Languages &amp; Tools
            </div>
            <ul className="list-inline list-icons">
              <li className="list-inline-item">
                <i className="devicons devicons-html5"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-css3"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-javascript"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-jquery"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-sass"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-less"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-bootstrap"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-wordpress"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-grunt"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-gulp"></i>
              </li>
              <li className="list-inline-item">
                <i className="devicons devicons-npm"></i>
              </li>
            </ul>

            <div className="subheading mb-3">Workflow</div>
            <ul className="fa-ul mb-0">
              <li>
                <i className="fa-li fa fa-check"></i>
                Mobile-First, Responsive Design
              </li>
              <li>
                <i className="fa-li fa fa-check"></i>
                Cross Browser Testing &amp; Debugging
              </li>
              <li>
                <i className="fa-li fa fa-check"></i>
                Cross Functional Teams
              </li>
              <li>
                <i className="fa-li fa fa-check"></i>
                Agile Development &amp; Scrum
              </li>
            </ul>
          </div>
        </section>

        <section
          className="resume-section p-3 p-lg-5 d-flex flex-column"
          id="interests"
        >
          <div className="my-auto">
            <h2 className="mb-5">Interests</h2>
            <p>
              Apart from being a web developer, I enjoy most of my time being
              outdoors. In the winter, I am an avid skiier and novice ice
              climber. During the warmer months here in Colorado, I enjoy
              mountain biking, free climbing, and kayaking.
            </p>
            <p className="mb-0">
              When forced indoors, I follow a number of sci-fi and fantasy genre
              movies and television shows, I am an aspiring chef, and I spend a
              large amount of my free time exploring the latest technolgy
              advancements in the front-end web development world.
            </p>
          </div>
        </section>

        <section
          className="resume-section p-3 p-lg-5 d-flex flex-column"
          id="awards"
        >
          <div className="my-auto">
            <h2 className="mb-5">Awards &amp; Certifications</h2>
            <ul className="fa-ul mb-0">
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>
                Google Analytics Certified Developer
              </li>
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>
                Mobile Web Specialist - Google Certification
              </li>
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>1
                <sup>st</sup>
                Place - University of Colorado Boulder - Emerging Tech
                Competition 2009
              </li>
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>1
                <sup>st</sup>
                Place - University of Colorado Boulder - Adobe Creative Jam 2008
                (UI Design Category)
              </li>
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>2
                <sup>nd</sup>
                Place - University of Colorado Boulder - Emerging Tech
                Competition 2008
              </li>

              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>1
                <sup>st</sup>
                Place - James Buchanan High School - Hackathon 2006
              </li>
              <li>
                <i className="fa-li fa fa-trophy text-warning"></i>3
                <sup>rd</sup>
                Place - James Buchanan High School - Hackathon 2005
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default PortfoliosPage;

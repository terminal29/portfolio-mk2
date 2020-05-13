import React, { useState, useEffect, useRef } from "react";
import { css, StyleSheet } from "aphrodite";
import "./App.css";
import { StyleProvider } from "./StyleProvider";

import { DiReact, DiAndroid, DiApple } from "react-icons/di";
import { FaSteam, FaVrCardboard, FaGithub } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Hero from "./components/Hero";

const heroWords = [
  "experiments",
  "virtual reality",
  "websites",
  "things",
  "video games",
  "mobile apps",
  "technology",
];

const mobileMediaQuery = "@media only screen and (max-width: 750px) ";
const tabletMediaQuery = "@media only screen and (max-width: 1100px) ";

function App() {
  const [contactButtonStates, setContactButtonStates] = useState({
    linkedin: false,
    email: false,
    github: false,
    gitlab: false,
  });
  const [showMenuBorder, setShowMenuBorder] = useState(false);

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const newBorderSetting = window.scrollY > 10;
      if (showMenuBorder !== newBorderSetting) {
        setShowMenuBorder(newBorderSetting);
      }
    });
  });

  const dynStyles = StyleSheet.create({
    menuContainerBorder: {
      transition: "0.3s",
      borderStyle: "solid",
      borderBottomColor: StyleProvider.getBackgroundColour(),
      borderBottomWidth: showMenuBorder ? 2 : 0,
      background: showMenuBorder
        ? StyleProvider.getLightBackgroundColour()
        : "#00000000",
    },
  });

  return (
    <div className={css(styles.siteContainer)} id="home">
      <div className={css(styles.foldContainer)}>
        <Hero words={heroWords} transitionDelay={2000} transitionSpeed={0.5} />
        <div className={css(styles.foldPointerContainer)}>
          <div className={css(styles.foldPointer)}>more</div>
          <div className={css(styles.foldPointer)}>v</div>
        </div>
        <div
          className={css([styles.menuContainer, dynStyles.menuContainerBorder])}
        >
          <div className={css(styles.menuLeftAlign)}>
            <div className={css(styles.menuItem)}>Jacob Hilton</div>
          </div>
          <div className={css(styles.menuRightAlign)}>
            <div className={css(styles.menuPC)}>
              <a className={css(styles.menuItem)} href="#home">
                home
              </a>
              <a className={css(styles.menuItem)} href="#about">
                about
              </a>
              <a className={css(styles.menuItem)} href="#projects">
                projects
              </a>
              <a className={css(styles.menuItem)} href="#contact">
                contact
              </a>
            </div>
            <div
              className={css(styles.menuMobile)}
              onClick={() => setMobileMenuVisible(true)}
            >
              <MdMenu className={css(styles.menuItem)} size={23}>
                ham
              </MdMenu>
              {mobileMenuVisible && (
                <div className={css(styles.mobileMenuOverlay)}>
                  <a
                    className={css(styles.menuItem)}
                    href="#home"
                    onClick={(e) => {
                      setMobileMenuVisible(false);
                      e.stopPropagation();
                    }}
                  >
                    home
                  </a>
                  <a
                    className={css(styles.menuItem)}
                    href="#about"
                    onClick={(e) => {
                      setMobileMenuVisible(false);
                      e.stopPropagation();
                    }}
                  >
                    about
                  </a>
                  <a
                    className={css(styles.menuItem)}
                    href="#projects"
                    onClick={(e) => {
                      setMobileMenuVisible(false);
                      e.stopPropagation();
                    }}
                  >
                    projects
                  </a>
                  <a
                    className={css(styles.menuItem)}
                    href="#contact"
                    onClick={(e) => {
                      setMobileMenuVisible(false);
                      e.stopPropagation();
                    }}
                  >
                    contact
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css(styles.mainContentContainer)}>
        <div
          className={css(styles.subContentContainer)}
          style={{ position: "relative", top: -20 }}
        >
          <div className={css(styles.contentContainer)} id="about">
            <div className={css(styles.contentHeader)}>About me</div>
            <div className={css([styles.contentContent, styles.aboutContent])}>
              <p>
                My name is Jacob and I am a{" "}
                <span className={css(styles.highlightColour)}>
                  Software Developer
                </span>{" "}
                based in{" "}
                <span className={css(styles.highlightColour)}>
                  Brisbane, Australia
                </span>
                . I have been developing software for PC, Web, and Mobile for
                over 6 years with{" "}
                <span className={css(styles.highlightColour)}>
                  2 years professional experience
                </span>
                .
              </p>
              <p>
                {" "}
                I graduated from QUT in 2019, with a{" "}
                <span className={css(styles.highlightColour)}>
                  Bachelors of Information Technology
                </span>
                , with a major in Computer Science, and a minor in Mathematics.
              </p>
              <p>
                {" "}
                I have done work with system level languages like{" "}
                <span className={css(styles.highlightColour)}>
                  C, C++, and C#
                </span>
                , and with mobile and web languages like{" "}
                <span className={css(styles.highlightColour)}>
                  Java, JavaScript, and TypeScript
                </span>
                , and frameworks like{" "}
                <span className={css(styles.highlightColour)}>
                  Angular and React.
                </span>
              </p>
            </div>
          </div>

          <div className={css(styles.contentContainer)} id="projects">
            <div className={css(styles.contentHeader)}>Featured Projects</div>
            <div className={css(styles.contentContent)}>
              <div className={css(styles.projectContainer)}>
                <div className={css(styles.projectHeader)}>
                  Massless Pen OpenVR Driver
                </div>
                <div className={css(styles.projectIcons)}>
                  <i
                    className={`${css(
                      styles.projectIcon
                    )} devicon-cplusplus-plain`}
                  ></i>
                  <FaSteam className={css(styles.projectIcon)} />
                  <FaVrCardboard className={css(styles.projectIcon)} />
                </div>
                <div className={css(styles.projectDescription)}>
                  A driver for SteamVR to allow the 3D tracked Massless Pen to
                  be used with the Oculus Rift, Oculus Quest, HTC Vive, and
                  Valve Index headsets on the SteamVR platform.
                </div>
                <a
                  className={css(styles.projectLink)}
                  href={"https://massless.io/"}
                >
                  <div style={{ display: "inline-block", margin: 10 }}>
                    View Massless on
                  </div>
                  <i
                    className={`${css(
                      styles.projectIcon
                    )} devicon-firefox-plain`}
                  ></i>
                </a>
              </div>
              <div className={css(styles.projectContainer)}>
                <div className={css(styles.projectHeader)}>Weeknotes</div>
                <div className={css(styles.projectIcons)}>
                  <i
                    className={`${css(
                      styles.projectIcon
                    )} devicon-javascript-plain`}
                  ></i>
                  <DiReact className={css(styles.projectIcon)} />
                  <DiAndroid className={css(styles.projectIcon)} />
                  <DiApple className={css(styles.projectIcon)} />
                </div>
                <div className={css(styles.projectDescription)}>
                  A work-in-progress calendar/note taking app built using React
                  Native.
                </div>
                <a
                  className={css(styles.projectLink)}
                  href={"https://github.com/terminal29/weeknotes"}
                >
                  <div style={{ display: "inline-block", margin: 10 }}>
                    View Project on{" "}
                  </div>
                  <FaGithub className={css(styles.projectIcon)} />
                </a>
              </div>
              <div className={css(styles.projectContainer)}>
                <div className={css(styles.projectHeader)}>
                  SteamVR Driver Tutorial
                </div>
                <div className={css(styles.projectIcons)}>
                  <i
                    className={`${css(
                      styles.projectIcon
                    )} devicon-cplusplus-plain`}
                  ></i>
                  <FaSteam className={css(styles.projectIcon)} />
                  <FaVrCardboard className={css(styles.projectIcon)} />
                </div>
                <div className={css(styles.projectDescription)}>
                  A set of example drivers that show how to add custom
                  controllers and HMDs to SteamVR.
                </div>
                <a
                  className={css(styles.projectLink)}
                  href={
                    "https://github.com/terminal29/Simple-OpenVR-Driver-Tutorial"
                  }
                >
                  <div style={{ display: "inline-block", margin: 10 }}>
                    View Project on{" "}
                  </div>
                  <FaGithub className={css(styles.projectIcon)} />
                </a>
              </div>

              <div className={css(styles.projectContainer)}>
                <div className={css(styles.projectHeader)}>
                  OpenVR Device Viewer
                </div>
                <div className={css(styles.projectIcons)}>
                  <i
                    className={`${css(
                      styles.projectIcon
                    )} devicon-cplusplus-plain`}
                  ></i>
                  <FaSteam className={css(styles.projectIcon)} />
                  <FaVrCardboard className={css(styles.projectIcon)} />
                </div>
                <div className={css(styles.projectDescription)}>
                  A small tool for displaying the currently connected devices to
                  your SteamVR/OpenVR system.
                </div>
                <a
                  className={css(styles.projectLink)}
                  href={"https://github.com/terminal29/OpenVR-Device-Viewer"}
                >
                  <div style={{ display: "inline-block", margin: 10 }}>
                    View Project on{" "}
                  </div>
                  <FaGithub className={css(styles.projectIcon)} />
                </a>
              </div>
            </div>
          </div>

          <div className={css(styles.contentContainer)} id="contact">
            <div className={css(styles.contentHeader)}>Contact Me</div>

            <div className={css(styles.projectContainer)}>
              <div className={css(styles.projectHeader)}>LinkedIn</div>
              <div
                className={css(styles.contactButton)}
                onClick={() =>
                  setContactButtonStates({
                    ...contactButtonStates,
                    linkedin: true,
                  })
                }
              >
                <div style={{ display: "inline-block", margin: 10 }}>
                  {!contactButtonStates.linkedin ? (
                    "Click to show"
                  ) : (
                    <a
                      style={{ color: StyleProvider.getFontColour() }}
                      href="https://www.linkedin.com/in/jacob-hilton/"
                    >
                      https://www.linkedin.com/in/jacob-hilton/
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={css(styles.projectContainer)}>
              <div className={css(styles.projectHeader)}>Email</div>
              <div
                className={css(styles.contactButton)}
                onClick={() =>
                  setContactButtonStates({
                    ...contactButtonStates,
                    email: true,
                  })
                }
              >
                <div style={{ display: "inline-block", margin: 10 }}>
                  {!contactButtonStates.email ? (
                    "Click to show"
                  ) : (
                    <a
                      style={{ color: StyleProvider.getFontColour() }}
                      href="mailto:jacob@terminal29.com"
                    >
                      jacob@terminal29.com
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={css(styles.projectContainer)}>
              <div className={css(styles.projectHeader)}>GitHub</div>
              <div
                className={css(styles.contactButton)}
                onClick={() =>
                  setContactButtonStates({
                    ...contactButtonStates,
                    github: true,
                  })
                }
              >
                <div style={{ display: "inline-block", margin: 10 }}>
                  {!contactButtonStates.github ? (
                    "Click to show"
                  ) : (
                    <a
                      style={{ color: StyleProvider.getFontColour() }}
                      href="https://github.com/terminal29"
                    >
                      https://github.com/terminal29
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className={css(styles.projectContainer)}>
              <div className={css(styles.projectHeader)}>GitLab</div>
              <div
                className={css(styles.contactButton)}
                onClick={() =>
                  setContactButtonStates({
                    ...contactButtonStates,
                    gitlab: true,
                  })
                }
              >
                <div style={{ display: "inline-block", margin: 10 }}>
                  {!contactButtonStates.gitlab ? (
                    "Click to show"
                  ) : (
                    <a
                      style={{ color: StyleProvider.getFontColour() }}
                      href="https://gitlab.com/terminal29"
                    >
                      https://gitlab.com/terminal29
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  siteContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: StyleProvider.getBackgroundColour(),
  },
  foldContainer: {
    flex: "1 1 100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  foldPointerContainer: {
    position: "absolute",
    bottom: 30,
  },
  foldPointer: {
    textAlign: "center",
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour(),
    fontSize: "2rem",
    [tabletMediaQuery]: {
      fontSize: "1.5rem",
    },
    [mobileMediaQuery]: {
      fontSize: "1rem",
    },
    opacity: 0.7,
  },
  menuContainer: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    background: StyleProvider.getBackgroundColour() + `cc`,
    borderWidth: 0,
    height: 80,
    zIndex: 1000,
  },
  menuItem: {
    margin: "30px 30px",
    fontSize: 20,
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour(),
    transition: "0.3s",
    textDecoration: "none",
    ":hover": {
      color: StyleProvider.getHighlightFontColour(),
    },
  },
  menuLeftAlign: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
  },
  menuRightAlign: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  menuPC: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    [mobileMediaQuery]: {
      display: "none",
    },
  },
  menuMobile: {
    display: "none",
    [mobileMediaQuery]: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: StyleProvider.getLightBackgroundColour(),
  },
  mainContentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  subContentContainer: {
    background: StyleProvider.getLightBackgroundColour(),
    maxWidth: 1350,
    margin: "0 auto",
    paddingBottom: 50,
    [mobileMediaQuery]: {
      paddingBottom: 25,
    },
  },
  contentContainer: {
    padding: 100,
    paddingBottom: 50,
    [mobileMediaQuery]: {
      padding: 50,
      paddingBottom: 25,
    },
  },
  contentHeader: {
    color: StyleProvider.getHighlightFontColour(),
    fontFamily: StyleProvider.getFont(),
    fontSize: "2.4rem",
    [mobileMediaQuery]: {
      fontSize: "2rem",
    },
  },
  contentContent: {
    color: StyleProvider.getFontColour(),
    fontFamily: StyleProvider.getFont(),
  },
  aboutContent: {
    fontSize: "1.3rem",
    [mobileMediaQuery]: {
      fontSize: "1.1rem",
    },
    lineHeight: 2,
    marginTop: 10,
  },
  highlightColour: {
    color: StyleProvider.getHighlightFontColour(),
    fontSize: "1.32rem",
    [mobileMediaQuery]: {
      fontSize: "1.12rem",
    },
  },
  projectContainer: {
    margin: "30px 0",
  },
  projectHeader: {
    color: StyleProvider.getFontColour(),
    fontFamily: StyleProvider.getFont(),
    fontSize: "2rem",
    [mobileMediaQuery]: {
      fontSize: "1.6rem",
    },
    marginBottom: 10,
  },
  projectIcons: {
    margin: "10px 0",
  },
  projectIcon: {
    color: StyleProvider.getFontColour(),
    transition: "0.3s",
    ":hover": {
      color: StyleProvider.getHighlightFontColour(),
    },
    fontSize: 30,
    marginRight: 10,
  },
  projectDescription: {
    fontSize: "1.32rem",
    [mobileMediaQuery]: {
      fontSize: "1.12rem",
    },
    margin: "10px 0",
    lineHeight: 1.5,
  },
  projectLink: {
    fontSize: "1.32rem",
    [mobileMediaQuery]: {
      fontSize: "1.12rem",
    },
    display: "inline-flex",
    flexDirection: "row",
    color: StyleProvider.getFontColour(),
    textDecoration: "inherit",
    width: "auto",
    background: StyleProvider.getBackgroundColour(),
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: StyleProvider.getFont(),
  },
  contactButton: {
    cursor: "pointer",
    fontSize: "1.32rem",
    [mobileMediaQuery]: {
      fontSize: "1.12rem",
    },
    display: "inline-flex",
    flexDirection: "row",
    color: StyleProvider.getFontColour(),
    width: "auto",
    background: StyleProvider.getBackgroundColour(),
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: StyleProvider.getFont(),
  },
  mobileOverlay: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10000,
    display: "none",
    background: StyleProvider.getBackgroundColour(),
    color: StyleProvider.getFontColour(),
    fontFamily: StyleProvider.getFont(),
    padding: 40,
    fontSize: "2rem",
    [mobileMediaQuery]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
});

export default App;

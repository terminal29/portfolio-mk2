import React, { useState, useEffect, useRef } from "react";
import { css, StyleSheet } from "aphrodite";
import "./App.css";
import { StyleProvider } from "./StyleProvider";
import interpolate from "./helpers/interpolate";

function App() {
  const heroWords = [
    "experiments",
    "virtual reality",
    "websites",
    "things",
    "video games",
    "mobile apps",
    "technology"
  ];

  const [messageIndex, setMessageIndex] = useState(
    Math.floor(heroWords.length / 2)
  );

  const mod = (m: number, n: number) => ((m % n) + n) % n;

  const getClosestSnapPoint = (n: number, interval: number) => {
    return Math.round(n / interval) * interval;
  };

  const dist = (x1: number, x2: number) => Math.abs(x1 - x2);

  const heroWordRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(heroWords.length)
  );

  const [heroTextWidth, setHeroTextWidth] = useState(0);
  const [heroTextHeight, setHeroTextHeight] = useState(0);

  const [showMenuBorder, setShowMenuBorder] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", e => {
      const newBorderSetting = window.scrollY > 10;
      if (showMenuBorder !== newBorderSetting) {
        setShowMenuBorder(newBorderSetting);
      }
    });
  });

  const dynStyles = StyleSheet.create({
    heroTextDyn: {
      width: heroTextWidth
    },
    menuContainerBorder: {
      transition: "0.3s",
      background: showMenuBorder
        ? StyleProvider.getLightBackgroundColour()
        : "#00000000"
    }
  });

  useEffect(() => {
    // Move on to the next message every `n` milliseconds
    let timeout: any = null;

    const updateState = () => {
      const newIndex =
        messageIndex + 1 === heroWords.length ? 0 : messageIndex + 1;
      setMessageIndex(newIndex);
      setHeroTextWidth((heroWordRefs.current[newIndex]?.scrollWidth ?? 0) + 40);
      setHeroTextHeight(heroWordRefs.current[newIndex]?.scrollHeight ?? 0);
    };

    if (heroTextWidth === 0) updateState();

    timeout = setTimeout(() => {
      updateState();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messageIndex, heroWords, heroWordRefs, heroTextWidth]);

  return (
    <div className={css(styles.siteContainer)}>
      <div className={css(styles.foldContainer)}>
        <div className={css(styles.heroContainer)}>
          <div className={css(styles.heroText)}>
            <div className={css(styles.heroTextStatic)}>I like to make</div>
            <div
              className={css([styles.heroTextSpacing, dynStyles.heroTextDyn])}
              style={{ transition: "0.3s" }}
            >
              {heroWords.map((word, idx) => (
                <div
                  ref={ref => {
                    heroWordRefs.current[idx] = ref;
                  }}
                  className={css(styles.heroWordCarouselItem)}
                  style={{
                    opacity: interpolate(
                      dist(
                        messageIndex - idx,
                        getClosestSnapPoint(
                          messageIndex - idx,
                          heroWords.length
                        )
                      ),

                      {
                        inputRange: [0, 1, 2, heroWords.length / 2 - 1],
                        outputRange: [1, 0.4, 0.2, 0.0]
                      }
                    ),
                    transform: `translateY(${heroTextHeight *
                      (messageIndex -
                        idx -
                        getClosestSnapPoint(
                          messageIndex - idx,
                          heroWords.length
                        ))}px)`
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
            <div className={css(styles.heroTextStatic)}>work.</div>
          </div>
        </div>
        <div className={css(styles.foldPointerContainer)}>
          <div className={css(styles.foldPointer)}>see more</div>
          <div className={css(styles.foldPointer)}>v</div>
        </div>
        <div
          className={css([styles.menuContainer, dynStyles.menuContainerBorder])}
        >
          <div className={css(styles.menuLeftAlign)}>
            <div className={css(styles.menuItem)}>
              Jacob Hilton | Terminal29
            </div>
          </div>
          <div className={css(styles.menuRightAlign)}>
            <div className={css(styles.menuItem)}>home</div>
            <div className={css(styles.menuItem)}>about</div>
            <div className={css(styles.menuItem)}>projects</div>
            <div className={css(styles.menuItem)}>contact</div>
          </div>
        </div>
      </div>

      <div className={css(styles.mainContentContainer)}>
        <div
          className={css(styles.subContentContainer)}
          style={{ position: "relative", top: -20 }}
        >
          <div className={css(styles.contentContainer)}>
            <div className={css(styles.contentHeader)}>About me</div>
            <div className={css(styles.contentContent)}>
              <p>
                I am a{" "}
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

          <div className={css(styles.contentContainer)}>
            <div className={css(styles.contentHeader)}>Featured Projects</div>
            <div className={css(styles.contentContent)}></div>
          </div>

          <div className={css(styles.contentContainer)}>
            <div className={css(styles.contentHeader)}>Contact Me</div>
            <div className={css(styles.contentContent)}></div>
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
    background: StyleProvider.getBackgroundColour()
  },
  foldContainer: {
    flex: "1 1 100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  heroContainer: {
    alignSelf: "center"
  },
  heroText: {
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour(),
    fontSize: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  heroTextStatic: {},
  foldPointerContainer: {
    position: "absolute",
    bottom: 30
  },
  foldPointer: {
    textAlign: "center",
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour(),
    fontSize: 30,
    opacity: 0.7
  },
  heroTextSpacing: {
    display: "inline-flex",
    overflow: "visible",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  heroWordCarouselItem: {
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour(),
    whiteSpace: "nowrap",
    textAlign: "center",
    margin: "0 auto",
    flex: "0 0 auto",
    position: "absolute",
    transition: "0.3s"
  },
  menuContainer: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    background: StyleProvider.getBackgroundColour() + `cc`,
    height: 80,
    zIndex: 1000
  },
  menuItem: {
    margin: "30px 30px",
    fontSize: 20,
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour()
  },
  menuLeftAlign: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start"
  },
  menuRightAlign: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  mainContentContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  subContentContainer: {
    background: StyleProvider.getLightBackgroundColour(),
    maxWidth: 1350,
    margin: "0 auto"
  },
  contentContainer: {
    padding: 100
  },
  contentHeader: {
    color: StyleProvider.getFontColour(),
    fontFamily: StyleProvider.getFont(),
    fontSize: 50
  },
  contentContent: {
    color: StyleProvider.getFontColour(),
    fontFamily: StyleProvider.getFont(),
    fontSize: 20,
    lineHeight: 2
  },
  highlightColour: {
    color: StyleProvider.getHighlightFontColour(),
    fontSize: 20.5
  }
});

export default App;

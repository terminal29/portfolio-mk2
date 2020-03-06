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

  const dynStyles = StyleSheet.create({
    heroTextDyn: {
      width: heroTextWidth
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
                    transition: "0.3s",
                    position: "absolute",
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
        <div className={css(styles.menuContainer)}>
          <div className={css(styles.menuItem)}>home</div>
          <div className={css(styles.menuItem)}>about</div>
          <div className={css(styles.menuItem)}>projects</div>
          <div className={css(styles.menuItem)}>contact</div>
        </div>
      </div>

      <div>boo</div>
    </div>
  );
}

const styles = StyleSheet.create({
  siteContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  foldContainer: {
    flex: "1 1 100vh",
    background: StyleProvider.getBackgroundColour(),
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
    bottom: 20
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
    transition: "0.3s",
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
    flex: "0 0 auto"
  },
  menuContainer: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    background: StyleProvider.getBackgroundColour() + `cc`
  },
  menuItem: {
    margin: "30px 30px",
    fontSize: 20,
    fontFamily: StyleProvider.getFont(),
    color: StyleProvider.getFontColour()
  }
});

export default App;

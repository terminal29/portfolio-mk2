import React, { useState, useEffect, useRef } from "react";
import { css, StyleSheet } from "aphrodite";
import "./App.css";
import { StyleProvider } from "./StyleProvider";

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

  // Similar to react native reanimated
  const interpolate = (
    input: number,
    range: { inputRange: Array<number>; outputRange: Array<number> }
  ) => {
    if (range.inputRange.length !== range.outputRange.length)
      throw Error(
        `Input and output ranges are not same length: input: ${range.inputRange.length}, output ${range.outputRange.length}`
      );
    for (let i = 0; i < range.inputRange.length - 1; i++) {
      if (input >= range.inputRange[i] && input <= range.inputRange[i + 1]) {
        const inMin = range.inputRange[i];
        const inMax = range.inputRange[i + 1];
        const outMin = range.outputRange[i];
        const outMax = range.outputRange[i + 1];
        const abs = inMax - inMin;
        if (abs === 0) return 0;
        const percent = (input - inMin) / abs;
        return outMin * (1 - percent) + outMax * percent;
      }
    }
    // Clamp values outside
    if (input < range.inputRange[0]) {
      return range.outputRange[0];
    } else {
      return range.outputRange[range.outputRange.length - 1];
    }
  };

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

    const doStuff = () => {
      const newIndex =
        messageIndex + 1 === heroWords.length ? 0 : messageIndex + 1;
      setMessageIndex(newIndex);
      setHeroTextWidth((heroWordRefs.current[newIndex]?.scrollWidth ?? 0) + 40);
      setHeroTextHeight(heroWordRefs.current[newIndex]?.scrollHeight ?? 0);
    };

    if (heroTextWidth === 0) doStuff();

    timeout = setTimeout(() => {
      doStuff();
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
  pseudoHeroWord: {
    position: "relative",
    top: 0
  }
});

export default App;

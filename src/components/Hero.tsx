import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { StyleProvider } from "../StyleProvider";
import interpolate from "../helpers/interpolate";

interface HeroProps {
  words: string[];
  transitionDelay: number;
  transitionSpeed: number;
}

const mod = (m: number, n: number) => ((m % n) + n) % n;

const HeroContainer = styled.div`
  align-self: center;
`;

const HeroText = styled.div`
  font-family: ${StyleProvider.getFont()};
  color: ${StyleProvider.getFontColour()};
  font-size: 3rem;
  @media ${StyleProvider.getTabletMediaQueryString()} {
    font-size: 2rem;
  }
  @media ${StyleProvider.getMobileMediaQueryString()} {
    font-size: 1rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroTextStatic = styled.div`
  whitespace: nowrap;
`;

const HeroTextSpacing = styled.div.attrs(
  (props: { width: number; transitionSpeed: number }) => props
)`
  display: inline-flex;
  overflow: visible;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: ${(props) => props.transitionSpeed}s;
  width: ${(props) => props.width}px;
`;

const getClosestSnapPoint = (n: number, interval: number) => {
  return Math.round(n / interval) * interval;
};

const dist = (x1: number, x2: number) => Math.abs(x1 - x2);

const HeroTextDynamic = styled.div.attrs(
  (props: {
    currentIndex: number;
    thisIndex: number;
    height: number;
    numWords: number;
    transitionSpeed: number;
  }) => props
)`
  font-family: ${StyleProvider.getFont()};
  color: ${StyleProvider.getFontColour()};
  whitespace: nowrap;
  text-align: center;
  margin: 0 auto;
  flex: 0 0 auto;
  position: absolute;
  transition: ${(props) => props.transitionSpeed}s;
  opacity: ${(props) =>
    interpolate(
      dist(
        props.currentIndex - props.thisIndex,
        getClosestSnapPoint(
          props.currentIndex - props.thisIndex,
          props.numWords
        )
      ),
      {
        inputRange: [0, 1, 2, props.numWords / 2 - 1],
        outputRange: [1, 0.4, 0.2, 0.0],
      }
    )};
  transform: translateY(
    ${(props) =>
      props.height *
      (props.currentIndex -
        props.thisIndex -
        getClosestSnapPoint(
          props.currentIndex - props.thisIndex,
          props.numWords
        ))}px
  );
`;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Hero = (props: HeroProps) => {
  const heroWordRefs = useRef<Array<HTMLDivElement | null>>(
    new Array(props.words.length)
  );
  const [heroTextSize, _setHeroTextSize] = useState({ width: 0, height: 0 });
  const [heroTextIndex, _setHeroTextIndex] = useState(0);

  const changeHeroTextIndex = (index: number) => {
    const newIndex = mod(index, props.words.length);
    _setHeroTextIndex(newIndex);
    let newWidth = heroWordRefs.current[newIndex]?.scrollWidth ?? 0;
    newWidth += (2 * newWidth) / props.words[newIndex].length;
    _setHeroTextSize({
      width: newWidth,
      height: heroWordRefs.current[newIndex]?.scrollHeight ?? 0,
    });
  };

  useInterval(() => {
    changeHeroTextIndex(heroTextIndex + 1);
  }, props.transitionDelay);

  useEffect(() => {
    changeHeroTextIndex(heroTextIndex);
  }, []);

  return (
    <HeroContainer>
      <HeroText>
        <HeroTextStatic>I like to make</HeroTextStatic>
        <HeroTextSpacing
          width={heroTextSize.width}
          transitionSpeed={props.transitionSpeed}
        >
          {props.words.map((word, idx) => (
            <HeroTextDynamic
              ref={(ref) => (heroWordRefs.current[idx] = ref)}
              key={word}
              currentIndex={heroTextIndex}
              thisIndex={idx}
              height={heroTextSize.height}
              numWords={props.words.length}
              transitionSpeed={props.transitionSpeed}
            >
              {word}
            </HeroTextDynamic>
          ))}
        </HeroTextSpacing>
        <HeroTextStatic>work.</HeroTextStatic>
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;

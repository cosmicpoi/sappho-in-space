import styled from "styled-components";
import { ColorData } from "../Utils/colors";
import { ZIndex } from "../Utils/types";

export const goldenColorData: ColorData = {
  bg: "#f6d365",
  text: "#880000",
  floatBg: `linear-gradient(120deg, #f6d365 0%, #fda085 100%)`,
};

export const FloatingBG = styled.div<{ bg: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${ZIndex.FloatingBG};
  transition: background 2.5s;
  ${({ bg }) => bg && `background: ${bg};`};
  /* opacity: ${({ bg }) => (bg ? 1 : 0)}; */
  pointer-events: none;
`;

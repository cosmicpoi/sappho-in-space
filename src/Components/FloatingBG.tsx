import styled from "styled-components";
import { ZIndex } from "../Utils/types";

export const GRADIENT = {
  golden: `linear-gradient(120deg, #f6d365 0%, #fda085 100%)`,
};

export const FloatingBG = styled.div<{ bg: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${ZIndex.FloatingBG};
  transition: opacity 2.5s, background 2.5s;
  ${({ bg }) => bg && `background: ${bg};`};
  opacity: ${({ bg }) => (bg ? 1 : 0)};
  pointer-events: none;
`;

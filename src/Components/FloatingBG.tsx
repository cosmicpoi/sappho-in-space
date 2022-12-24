import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ColorData } from "../Utils/colors";
import { ZIndex } from "../Utils/types";

export const goldenColorData: ColorData = {
  bg: "#f6d365",
  text: "#a25200",
  floatBg: `linear-gradient(120deg, #f6d365 0%, #fda085 100%)`,
};

export const blackearthColorData: ColorData = {
  bg: "#666666",
  text: "#080808",
  floatBg: `#666666`,
};

export const crazyColorData: ColorData = {
  bg: "#5aff65",
  text: "#707a51",
  floatBg: `radial-gradient(circle, rgba(90,255,101,1) 0%, rgba(247,125,255,1) 100%)`,
};

export const giftColorData: ColorData = {
  bg: "#2376DD",
  text: "#d41259",
  floatBg: `linear-gradient( 135deg, #FFCF71 10%, #2376DD 100%)`,
};

export const accomplishColorData: ColorData = {
  bg: "#ffd6d6",
  text: "#7c4200",
  floatBg: `linear-gradient(to bottom, #e7ffc8, #fcf2c0, #ffe6c3, #ffdccc, #ffd6d6)`,
};

const StyledFloatingBG = styled.div<{ bg: string; visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${ZIndex.FloatingBG};
  transition: opacity 2.5s;
  ${({ bg }) => bg && `background: ${bg};`};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;
`;

export function FloatingBG({ bg }: { bg?: string }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("none");

  useEffect(() => {
    if (!bg) setVisible(false);
    if (bg) {
      setBackground(bg);
      setVisible(true);
    }
  }, [bg]);

  return <StyledFloatingBG bg={background} visible={visible} />;
}

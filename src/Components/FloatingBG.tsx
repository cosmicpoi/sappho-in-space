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

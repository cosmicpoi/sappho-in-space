import * as React from "react";
import { useState } from "react";
import { useGameManager } from "../..";
import { t_v } from "../../Utils/consts";
import { Layer, TextAlign } from "../../Utils/types";
import { Line } from "../Line";
import { Logo } from "./Logo";

export function Title() {
  const { viewportManager: vM } = useGameManager();

  const [x] = useState<number>(vM.getCenter().x);
  const [y] = useState<number>(vM.getCenter().y);

  return (
    <>
      <Logo x={x} y={y - 12} z={Layer.Title} />;
      <Line
        x={x}
        y={y + 13}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`arrow keys <>${t_v}v to move`}
        opacity={0.5}
      />
      <Line
        x={x}
        y={y + 13}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`<>${t_v}v`}
      />
      <Line
        x={x}
        y={y + 15}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`press SPACE to fall in love`}
        opacity={0.5}
      />
      <Line
        x={x - 7}
        y={y + 15}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`SPACE`}
      />
      <Line
        x={x}
        y={y + 17}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`ESC opens the menu`}
        opacity={0.5}
      />
      <Line
        x={x - 9}
        y={y + 17}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`ESC`}
      />
    </>
  );
}
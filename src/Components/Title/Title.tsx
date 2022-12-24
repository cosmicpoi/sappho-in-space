import * as React from "react";
import { useState } from "react";
import { useGameManager } from "../..";
import { t_v } from "../../Utils/consts";
import { Layer, TextAlign } from "../../Utils/types";
import { LineText } from "../LineText";
import { Logo } from "./Logo";

const offY = 15;
export function Title() {
  const { viewportManager: vM } = useGameManager();

  const [x] = useState<number>(vM.getCenter().x);
  const [y] = useState<number>(vM.getCenter().y);

  return (
    <>
      <Logo x={x} y={y - 12} z={Layer.Title} />
      <LineText
        x={x}
        y={y + offY}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`arrow keys <>${t_v}v to move`}
        opacity={0.5}
      />
      <LineText
        x={x}
        y={y + offY}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`<>${t_v}v`}
      />
      <LineText
        x={x}
        y={y + offY + 2}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`press SPACE to fall in love`}
        opacity={0.5}
      />
      <LineText
        x={x - 7}
        y={y + offY + 2}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`SPACE`}
      />
      {/* <LineText
        x={x}
        y={y + offY + 4}
        z={Layer.Title}
        align={TextAlign.Center}
        text={`ESC opens the menu`}
        opacity={0.5}
      />
      <LineText
        x={x - 9}
        y={y + offY + 4}
        z={Layer.Title2}
        align={TextAlign.Left}
        text={`ESC`}
      /> */}
    </>
  );
}

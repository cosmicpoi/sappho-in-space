import * as React from "react";
import { useGameManager } from ".";
import * as F0 from "./Components/Fragments/FragmentComponents/Fragment1to9";
import * as F1 from "./Components/Fragments/FragmentComponents/Fragment12to19";
import * as F2 from "./Components/Fragments/FragmentComponents/Fragment20to29";
import { Spaceship } from "./Components/Spaceship";
import { Title } from "./Components/Title/Title";

export function GameWorld() {
  const { viewportManager: vM } = useGameManager();
  const [cx] = React.useState<number>(vM.getCenter().x);
  const [cy] = React.useState<number>(vM.getCenter().y);

  return (
    <>
      <Title />
      <F0.Fragment1 x={cx - 80} y={cy} />
      <F0.Fragment2 x={cx + 40} y={cy} />
      <F0.Fragment3 x={cx + 60} y={cy + 40} />
      <F0.Fragment4 x={cx + 100} y={cy - 40} />
      <F0.Fragment5 x={cx - 140} y={cy + 60} />
      <F0.Fragment6 x={cx - 120} y={cy - 40} />
      <F0.Fragment7 x={cx - 200} y={cy - 50} />
      <F0.Fragment8 x={cx - 200} y={cy + 10} />
      <F0.Fragment9 x={cx - 200} y={cy + 50} />

      <F1.Fragment12 x={2} y={2} />
      <F1.Fragment15 x={20} y={2} />
      <F1.Fragment16 x={80} y={2} />
      <F1.Fragment17 x={160} y={2} />
      <F1.Fragment18 x={220} y={2} />
      <F1.Fragment19 x={260} y={2} />

      <F2.Fragment20 x={300} y={2} />
      <F2.Fragment21 x={340} y={2} />
      <F2.Fragment22 x={380} y={2} />
      <F2.Fragment23 x={430} y={2} />
      <F2.Fragment24 x={480} y={2} />
      <F2.Fragment25 x={540} y={2} />
      <F2.Fragment26 x={590} y={2} />
      <F2.Fragment27 x={640} y={2} />
      <F2.Fragment29 x={700} y={2} />
      <Spaceship />
    </>
  );
}

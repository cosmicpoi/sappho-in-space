import * as React from "react";
import { useGameManager } from ".";
import { Fragment1 } from "./Components/Fragments/FragmentComponents/Fragment1to9";
import { ZoneAutumn } from "./Components/Fragments/Zones/ZoneAutumn";
import { ZoneDay } from "./Components/Fragments/Zones/ZoneDay";
import { ZoneNight } from "./Components/Fragments/Zones/ZoneNight";
import { ZoneSpring } from "./Components/Fragments/Zones/ZoneSpring";
import { ZoneSummer } from "./Components/Fragments/Zones/ZoneSummer";
import { ZoneWinter } from "./Components/Fragments/Zones/ZoneWinter";
import { Spaceship } from "./Components/Spaceship";
import { Title } from "./Components/Title/Title";

export function GameWorld() {
  const { viewportManager: vM } = useGameManager();

  const [cx] = React.useState<number>(vM.getCenter().x);
  const [cy] = React.useState<number>(vM.getCenter().y);

  return (
    <>
      <Title />
      <Spaceship />
      <Fragment1 x={cx - 80} y={cy} />
      {/* <Fragments /> */}

      <ZoneSpring />
      <ZoneWinter />
      <ZoneSummer />
      <ZoneAutumn />

      <ZoneNight />
      <ZoneDay />
    </>
  );
}

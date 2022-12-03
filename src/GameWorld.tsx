import * as React from "react";
import { Line } from "./Components/Line";
import { Spaceship } from "./Components/Spaceship";
import { Title } from "./Components/Title/Title";

export function GameWorld() {
  return (
    <>
      <Title />
      <Line y={3} x={5} z={-1} text="de" />
      <Line y={4} x={7} z={-1} text="of my brested friend" />

      {/* <Wall hitbox={{ x: center.x, y: center.y - 10, width: 10, height: 1 }} /> */}

      <Line
        y={10}
        x={5}
        z={-1}
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
      />
      <Line
        y={11}
        x={5}
        z={-1}
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
      />
      <Line
        y={12}
        x={5}
        z={-1}
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
      />
      <Line
        y={13}
        x={5}
        z={-1}
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
      />
      <Line
        y={14}
        x={5}
        z={-1}
        text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
      />

      <Spaceship />
    </>
  );
}

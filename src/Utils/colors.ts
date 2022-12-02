export const COLORS = {
  black: "#111122",
  white: "#f3f3f3",
  bgSummer: "#4C0F3F",
  bgWinter: "#0C344B",
  bgSpring: "#ADEDC3",
  bgAutumn: "#F7D289",

  colorSummer: "#F5EE41",
  colorWinter: "#CDE6E9",
  colorSpring: "#BA72D3",
  colorAutumn: "#A20101",
};

export enum Environment {
  Night,
  Day,
  Winter,
  Spring,
  Summer,
  Autumn,
  DEFAULT = Environment.Night,
}

export const environmentColor: Record<Environment, string> = [
  COLORS.white, // Night
  COLORS.black, // Day
  COLORS.colorWinter, // Winter
  COLORS.colorSpring, // Spring
  COLORS.colorSummer, // Summer
  COLORS.colorAutumn, // Autumn
];

export const environmentBackground: Record<Environment, string> = [
  COLORS.black, // Night
  COLORS.white, // Day
  COLORS.bgWinter, // Winter
  COLORS.bgSpring, // Spring
  COLORS.bgSummer, // Summer
  COLORS.bgAutumn, // Autumn
];

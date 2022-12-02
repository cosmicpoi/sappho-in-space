export const COLORS = {
  bgNight: "#111122",
  bgDay: "#F9E9DA",

  bgSummer: "#4C0F3F",
  bgWinter: "#0C344B",
  bgSpring: "#ADEDC3",
  bgAutumn: "#F7D289",

  colorNight: "#f3f3f3",
  colorDay: "0D0040",

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
  COLORS.colorNight, // Night
  COLORS.colorDay, // Day
  COLORS.colorWinter, // Winter
  COLORS.colorSpring, // Spring
  COLORS.colorSummer, // Summer
  COLORS.colorAutumn, // Autumn
];

export const environmentBackground: Record<Environment, string> = [
  COLORS.bgNight, // Night
  COLORS.bgDay, // Day
  COLORS.bgWinter, // Winter
  COLORS.bgSpring, // Spring
  COLORS.bgSummer, // Summer
  COLORS.bgAutumn, // Autumn
];

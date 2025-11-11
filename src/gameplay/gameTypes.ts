export const PRECISION = 1000;

export interface ToppingDefinition {
  id: string;
  label: string;
  value: number; // stored as thousandths for precise fraction math
  fractionLabel: string;
  decimalLabel: string;
  description: string;
  colorClasses: string;
  asset?: string;
}

export interface DroppedTopping extends ToppingDefinition {
  instanceId: string;
  rotation: number;
  position: {
    x: number;
    y: number;
  };
}

export const TOPPINGS: ToppingDefinition[] = [
  {
    id: 'pepperoni',
    label: 'Pepperoni Comet',
    value: 250, // 1/4
    fractionLabel: '1/4',
    decimalLabel: '0.25',
    description: 'Classic spicy slices loved by Mars miners.',
    colorClasses: 'from-red-500 to-red-600',
    asset: '/toppings/pepperoni.png',
  },
  {
    id: 'mushroom',
    label: 'Moon Mushrooms',
    value: 125, // 1/8
    fractionLabel: '1/8',
    decimalLabel: '0.125',
    description: 'Glow-in-the-dark fungi gathered on Io.',
    colorClasses: 'from-emerald-400 to-lime-500',
    asset: '/toppings/mushroom.png',
  },
  {
    id: 'nebulaCheese',
    label: 'Nebula Cheese',
    value: 500, // 1/2
    fractionLabel: '1/2',
    decimalLabel: '0.5',
    description: 'Melty cheese clouds straight from Orion.',
    colorClasses: 'from-yellow-300 to-amber-400',
    asset: '/toppings/cheese.png',
  },
  {
    id: 'stardust',
    label: 'Stardust Sprinkles',
    value: 375, // 3/8
    fractionLabel: '3/8',
    decimalLabel: '0.375',
    description: 'Sweet sparkles mined from comets.',
    colorClasses: 'from-pink-400 to-fuchsia-500',
    asset: '/toppings/stardust.png',
  },
  {
    id: 'asteroidOlive',
    label: 'Asteroid Olives',
    value: 250, // 1/4
    fractionLabel: '1/4',
    decimalLabel: '0.25',
    description: 'Salty crunch sourced from asteroid belts.',
    colorClasses: 'from-slate-500 to-slate-600',
    asset: '/toppings/olive.png',
  },
  {
    id: 'galacticPineapple',
    label: 'Galactic Pineapple',
    value: 375, // 3/8
    fractionLabel: '3/8',
    decimalLabel: '0.375',
    description: 'Zero-gravity pineapples with extra zing.',
    colorClasses: 'from-orange-300 to-amber-500',
    asset: '/toppings/pineapple.png',
  },
];

export const TARGET_POOL: number[] = [250, 375, 500, 625, 750, 875];

const FRACTION_MAP: Record<number, string> = {
  125: '1/8',
  250: '1/4',
  375: '3/8',
  500: '1/2',
  625: '5/8',
  750: '3/4',
  875: '7/8',
  1000: '1',
};

export const valueToDecimal = (value: number) =>
  (value / PRECISION).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');

export const valueToFraction = (value: number) =>
  FRACTION_MAP[value] ?? `${valueToDecimal(value)} of a pizza`;

export const generateTargetFraction = () =>
  TARGET_POOL[Math.floor(Math.random() * TARGET_POOL.length)];

export const getToppingById = (id: string) =>
  TOPPINGS.find((topping) => topping.id === id);

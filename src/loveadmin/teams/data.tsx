export type Colour =
  | "black"
  | "white"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "cyan"
  | "teal"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "stone";

export const colorHexMap: { [key in Colour]: string } = {
  black: "#000000",
  white: "#000000",
  red: "#dc2626",
  orange: "#ea580c",
  amber: "#d97706",
  yellow: "#ca8a04",
  lime: "#65a30d",
  green: "#16a34a",
  emerald: "#059669",
  teal: "#0d9488",
  cyan: "#0891b2",
  sky: "#0284c7",
  blue: "#2563eb",
  indigo: "#4f46e5",
  violet: "#7c3aed",
  purple: "#9333ea",
  fuchsia: "#c026d3",
  pink: "#db2777",
  rose: "#e11d48",
  stone: "#57534e",
};

export const teamBgClasses = {
  black: "from-neutral-50/75",
  white: "from-neutral-50/75",
  red: "from-red-50/75",
  orange: "from-orange-50/75",
  amber: "from-amber-50/75",
  yellow: "from-yellow-50/75",
  lime: "from-lime-50/75",
  green: "from-green-50/75",
  emerald: "from-emerald-50/75",
  cyan: "from-cyan-50/75",
  teal: "from-teal-50/75",
  sky: "from-sky-50/75",
  blue: "from-blue-50/75",
  indigo: "from-indigo-50/75",
  violet: "from-violet-50/75",
  purple: "from-purple-50/75",
  fuchsia: "from-fuchsia-50/75",
  pink: "from-pink-50/75",
  rose: "from-rose-50/75",
  stone: "from-stone-50/75",
};

export type Squad = {
  name: string;
  teams: Team[];
  image?: string;
  players?: Player[];
  coaches?: Coach[];
};

export type Team = {
  name: string;
  colour: Colour;
  players: Player[];
  coaches: Coach[];
};

export type Player = {
  teamColour?: string;
  teamName?: string;
  id: string;
  name: string;
  image: string;
  dob: string;

  outstanding?: string | undefined;
  productFee?: number;
  redCards?: number;
  yellowCards?: number;
  lateFees?: number;
  due?: string;

  productFeeDate?: string;
  redCardDate?: string;
  yellowCardDate?: string;
  lateFeeDate?: string;
};

export type Coach = {
  teamColour?: string;
  teamName?: string;
  id: string;
  name: string;
  image: string;
};

export const initialSquads: Squad[] = [
  {
    name: "U10 Girls",
    image: "https://i.ibb.co/dWTrvXQ/ED3-NSn-XWw-AASf-K1.jpg",
    teams: [
      {
        name: "Development",
        colour: "violet",
        players: [],
        coaches: [],
      },
      { name: "Juniors", colour: "orange", players: [], coaches: [] },
    ],
  },
  {
    name: "U07s",
    image: "https://i.ibb.co/bNhQwX0/u7.jpg",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U08s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U09s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },
      {
        name: "Blues",
        colour: "blue",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U10s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },
      {
        name: "Blues",
        colour: "blue",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U11s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },

      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U12s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },

      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U13s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },

      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
      {
        name: "Yellows",
        colour: "yellow",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U14s",
    teams: [
      {
        name: "Athletic",
        colour: "green",
        players: [],
        coaches: [],
      },

      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U15s",
    teams: [
      {
        name: "Blacks",
        colour: "black",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U16s",
    teams: [
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Reds",
        colour: "red",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U17s",
    teams: [
      {
        name: "Athletic",
        colour: "green",
        players: [],
        coaches: [],
      },
      {
        name: "Juniors (Saturday)",
        colour: "pink",
        players: [],
        coaches: [],
      },
      {
        name: "Whites",
        colour: "white",
        players: [],
        coaches: [],
      },
    ],
  },
  {
    name: "U18s",
    teams: [
      {
        name: "Juniors",
        colour: "pink",
        players: [],
        coaches: [],
      },
    ],
  },
];

export const maleFirstNames = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Charles",
  "Thomas",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Andrew",
  "Brian",
  "Kevin",
  "Jason",
  "Timothy",
  "Steven",
  "Paul",
  "Kenneth",
  "Gregory",
  "Joshua",
  "Patrick",
  "Jack",
  "Ryan",
  "Brandon",
  "Justin",
];

export const femaleFirstNames = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Nancy",
  "Lisa",
  "Betty",
  "Margaret",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Donna",
  "Emily",
  "Michelle",
  "Carol",
  "Amanda",
  "Melissa",
  "Deborah",
  "Stephanie",
  "Rebecca",
  "Laura",
  "Sharon",
  "Cynthia",
  "Kathleen",
];

export const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Moore",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
];

export function generateRandomPlayer(id: number, squadName: string): Player {
  const firstNames =
    squadName === "U10 Girls" ? femaleFirstNames : maleFirstNames;
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
  const genderPath = squadName === "U10 Girls" ? "women" : "men";
  const image = `https://randomuser.me/api/portraits/${genderPath}/${
    id % 100
  }.jpg`;
  const dob =
    Number(squadName.substring(1, 3)) +
    " years " +
    Math.floor(Math.random() * 10) +
    " months";

  return { id: id.toString(), name, image, dob };
}

export function generateRandomCoach(id: number, squadName: string): Coach {
  const firstNames =
    squadName === "U10 Girls" ? femaleFirstNames : maleFirstNames;
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
  const genderPath = squadName === "U10 Girls" ? "women" : "men";
  const image = `https://randomuser.me/api/portraits/${genderPath}/${
    id % 100
  }.jpg`;

  return { id: id.toString(), name, image };
}

export function addCoachesAndPlayersToTeams(squads: Squad[]): Squad[] {
  let personId = 1;
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return squads.map((squad) => {
    // Generate at least one coach for the squad not assigned to a team
    const squadCoaches = Array.from({ length: 1 }, () =>
      generateRandomCoach(personId++, squad.name)
    );

    // Optionally generate some players for the squad not assigned to a team
    const nonTeamPlayersCount = Math.random() < 0.5 ? getRandomNumber(1, 3) : 0;
    const squadPlayers = Array.from({ length: nonTeamPlayersCount }, () =>
      generateRandomPlayer(personId++, squad.name)
    );

    return {
      ...squad,
      players: squadPlayers,
      coaches: squadCoaches,
      teams: squad.teams.map((team) => ({
        ...team,
        players: Array.from({ length: getRandomNumber(7, 10) }, () =>
          generateRandomPlayer(personId++, squad.name)
        ),
        coaches: Array.from({ length: getRandomNumber(1, 3) }, () =>
          generateRandomCoach(personId++, squad.name)
        ),
      })),
    };
  });
}

export const updatedSquads = addCoachesAndPlayersToTeams(initialSquads);

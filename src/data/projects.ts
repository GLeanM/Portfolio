export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
  fullDescription?: string;
  links?: ProjectLink[];
};

// Placeholder content — replace with your real projects.
export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of this project: what it does, what you built, and what you used to build it.",
    fullDescription:
      "A longer write-up of this project goes here: the problem it solved, the stack you used, decisions you made along the way, and anything you're particularly proud of.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    title: "Project Two",
    description:
      "Another project worth mentioning. Swap this out with something you're proud of.",
    fullDescription:
      "A longer write-up of this project goes here: the problem it solved, the stack you used, decisions you made along the way, and anything you're particularly proud of.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    title: "Project Three",
    description: "A third example project. Add as many of these as you like.",
    fullDescription:
      "A longer write-up of this project goes here: the problem it solved, the stack you used, decisions you made along the way, and anything you're particularly proud of.",
    links: [{ label: "GitHub", url: "#" }],
  },
];

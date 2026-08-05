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
    title: "SmartWaste",
    description: "A deep learning-powered web application that classifies household waste as compost, recycling, or landfill from a single image.",
    fullDescription:
      "This project is an end-to-end image classification system that helps users determine the correct way to dispose of household waste."
      + "Using a dataset of approximately 15,000 labeled images, we trained and evaluated both a custom Convolutional Neural Network (CNN)" 
      + "and a transfer learning model based on ResNet50 to classify uploaded images into compost, recycling, or landfill. After comparing the models, "
      +"the custom CNN achieved the highest accuracy and was selected for deployment in a web application where users can upload an image and receive a real-time waste classification."
      + " This project provided hands-on experience with computer vision, TensorFlow, deep learning, data preprocessing, model evaluation, and deploying machine learning through an interactive web interface.",
    links: [{ label: "Site ↗", url: "https://huggingface.co/spaces/amurji22/CS_3346_Final_Project" }],
  },
];

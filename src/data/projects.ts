export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  fullDescription?: string;
  links?: ProjectLink[];
};

// Placeholder content — replace with your real projects.
export const projects: Project[] = [
  {
    title: "VR Workout Environment - Thesis",
    tech: ["Unity", "C#", "Meta Quest"],
    description:
      "My undergraduate thesis that investigated the use of virtual reality in exercsising.",
    fullDescription:
      "Developed a virtual reality exercise environment using Unity, C#, and the Meta Quest 3 to investigate how immersive environments influence exercise performance, motivation, and stress. I designed and developed multiple VR environments and conducted a user study comparing VR and traditional workouts, collecting performance and psychological data to analyze the impact of VR on the exercise experience.",
    links: [{ label: "Paper", url: "#" }],
  },
  {
    title: "Pneumonia Detection Model",
    tech: ["TensorFlow", "CNN"],
    description:
      "Image classification model for pneumonia detection. 90.61% accuracy.",
    fullDescription:
      "Developed a machine learning model using Convolutional Neural Networks (CNNs) and transfer learning to classify chest X-ray images as Normal, COVID-19, Bacterial Pneumonia, or Viral Pneumonia. Using TensorFlow and Keras, the project involved image preprocessing, model training and fine-tuning, and evaluation using precision, recall, F1-score, and confusion matrices.",
    links: [{ label: "Site ↗", url: "https://pneumoniadetector.vercel.app/" }],
  },
  {
    title: "SmartWaste",
    tech: ["TensorFlow", "Python"],
    description: "A deep learning-powered web application that classifies household waste as compost, recycling, or landfill from a single image.",
    fullDescription:
      "This project is an end-to-end image classification system that helps users determine the correct way to dispose of household waste."
      + " Using a dataset of approximately 15,000 labeled images, we trained and evaluated both a custom Convolutional Neural Network (CNN)" 
      + "and a transfer learning model based on ResNet50 to classify uploaded images into compost, recycling, or landfill. After comparing the models, "
      +"the custom CNN achieved the highest accuracy and was selected for deployment in a web application where users can upload an image and receive a real-time waste classification."
      + " This project provided hands-on experience with computer vision, TensorFlow, deep learning, data preprocessing, model evaluation, and deploying machine learning through an interactive web interface.",
    links: [{ label: "Site ↗", url: "https://huggingface.co/spaces/amurji22/CS_3346_Final_Project" }],
  },
    {
    title: "Choreo Player",
    tech: ["React", "Tailwind"],
    description: "A web application where dancers can upload songs and create choreography.",
    fullDescription:
      "This project is a web application designed to assist choreographers in creating, editing, and sharing dance routines."
      + " It features a user-friendly interface built with React and Tailwind CSS, allowing users to easily manipulate and visualize their choreography. Users get to manipulate the audio by slowing down or speeding up their songs. Users can loop sections of the song so they can play it over and over and drill the parts they want. Slowing or speeding up the song doesn't affect the pitch.",
    links: [{ label: "Github", url: "https://github.com/GLeanM/DancePlayback" }],
  },
];

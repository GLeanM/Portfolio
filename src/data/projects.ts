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
    title: "Relast - Hack the Valley 11",
    tech: ["React Native", "Expo", "Gemini", "Supabase"],
    description:
      "An AI sustainability assistant that tells you which bin your trash goes in, how to extend a product's life, and what to cook with leftovers.",
    fullDescription:
      "Built in 36 hours with a team of four at Hack the Valley 11, Relast is a mobile AI sustainability assistant built with Expo and React Native."
      + " Users snap a photo or type a question and get advice on what to do with an item: which bin it belongs in (recycling, garbage, compost, hazardous or e-waste),"
      + " how to repair, donate or resell it to extend its life, or quick recipes to use up leftover food. Google's Gemini generates each answer in a structured JSON format,"
      + " while a Vision Transformer trained on 12 garbage types, converted to ONNX and quantized to 8-bit, runs on-device with Transformers.js to classify waste."
      + " Supabase handles authentication, per-user history and private photo storage with row-level security, and the app uses location speed data to estimate the CO₂ saved by walking instead of driving.",
    links: [
      { label: "Devpost ↗", url: "https://devpost.com/software/relast" },
      { label: "Github", url: "https://github.com/GLeanM/HackTheValley" },
    ],
  },
  {
    title: "VR Workout Environment - Thesis",
    tech: ["Unity", "C#", "Meta Quest"],
    description:
      "My undergraduate thesis that investigated the use of virtual reality in exercsising.",
    fullDescription:
      "Developed a virtual reality exercise environment using Unity, C#, and the Meta Quest 3 to investigate how immersive environments influence exercise performance, motivation, and stress. I designed and developed multiple VR environments and conducted a user study comparing VR and traditional workouts, collecting performance and psychological data to analyze the impact of VR on the exercise experience.",
    links: [{ label: "Paper", url: "/documents/MichaelGleanThesis.pdf" }],
  },
  {
    title: "Pneumonia Detection Model",
    tech: ["TensorFlow", "CNN"],
    description:
      "Image classification model for pneumonia detection. 90.61% accuracy.",
    fullDescription:
      "Developed a machine learning model using Convolutional Neural Networks (CNNs) and transfer learning to classify chest X-ray images as Normal, COVID-19, Bacterial Pneumonia, or Viral Pneumonia. Using TensorFlow and Keras, the project involved image preprocessing, model training and fine-tuning, and evaluation using precision, recall, F1-score, and confusion matrices.",
    links: [
      { label: "Site ↗", url: "https://pneumoniadetector.vercel.app/" },
      { label: "Paper", url: "/documents/Streamlining_Pneumonia_Diagnosis-BY6VMKPd.pdf" },
    ],
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
    links: [
      { label: "Site ↗", url: "https://huggingface.co/spaces/amurji22/CS_3346_Final_Project" },
      { label: "Paper", url: "/documents/CS_3346_Final_Report.pdf" },
    ],
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

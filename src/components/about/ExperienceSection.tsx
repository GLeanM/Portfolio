import { experience } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-4xl font-light tracking-tight">Experience</h2>
      <ul className="flex flex-col gap-4">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <div>
              <span className="font-bold text-lg">{job.company}</span>
              <span className="text-lg"> — {job.role}</span>
            </div>
            <span className="whitespace-nowrap text-lg">
              {job.start} – {job.end}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

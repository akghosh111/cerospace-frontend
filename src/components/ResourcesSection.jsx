import React from "react";

const resourcesData = [
  {
    title: "iCall (TISS)",
    description:
      "A mental health support service from Tata Institute of Social Sciences that offers free and anonymous counseling.",
    link: "https://icallhelpline.org/",
  },
  {
    title: "Vandrevala Foundation Helpline",
    description:
      "24/7 mental health support through phone and email for individuals in distress.",
    link: "https://www.vandrevalafoundation.com/",
  },
  {
    title: "Kiran Helpline",
    description:
      "Government of India’s mental health helpline available at 1800-599-0019.",
    link: "https://www.mohfw.gov.in/",
  },
  {
    title: "YourDOST",
    description:
      "Online emotional wellness platform that connects individuals with qualified professionals.",
    link: "https://yourdost.com/",
  },
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="bg-blue-100 py-10 pb-30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-blue-900 mb-6 text-center">
          Mental Health Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourcesData.map((resource, index) => (
            <div
              key={index}
              className="bg-green-50 p-6 border border-gray-300 rounded-xl hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-800 mb-4">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:underline"
              >
                Visit Resource
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
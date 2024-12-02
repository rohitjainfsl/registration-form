import React from "react";

function Courses() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Full Stack Web Development
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Master front-end, back-end, databases, and deployment with our
          comprehensive course.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              HTML, CSS & JavaScript
            </h2>
            <p className="text-gray-600">
              Learn the foundational technologies of the web, including HTML for
              structure, CSS for styling, and JavaScript for interactivity.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Front-end Frameworks
            </h2>
            <p className="text-gray-600">
              Build dynamic and responsive user interfaces using React and
              integrate with modern libraries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Back-end Development
            </h2>
            <p className="text-gray-600">
              Dive into server-side programming with Node.js, Express.js, and
              RESTful API design.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Databases
            </h2>
            <p className="text-gray-600">
              Master database design and management with MongoDB and MySQL,
              including query optimization.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Deployment
            </h2>
            <p className="text-gray-600">
              Learn to deploy your applications on cloud platforms like AWS,
              Heroku, and Vercel for seamless delivery.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Advanced Topics
            </h2>
            <p className="text-gray-600">
              Explore advanced topics like GraphQL, WebSockets, and serverless
              architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;

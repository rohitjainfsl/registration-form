import React from "react";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Full Stack Development",
      excerpt:
        "Explore how full-stack development has become one of the most sought-after skills in the tech industry...",
      date: "November 20, 2024",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Understanding React's Virtual DOM",
      excerpt:
        "Delve into how React's Virtual DOM improves performance and simplifies UI development...",
      date: "November 18, 2024",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS",
      excerpt:
        "Learn how Tailwind CSS can revolutionize your front-end workflow with its utility-first approach...",
      date: "November 15, 2024",
      author: "Alex Johnson",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Latest Blog Posts
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                By {post.author} on {post.date}
              </p>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;

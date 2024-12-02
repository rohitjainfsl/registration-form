// components/HomeSection.jsx
const Home = () => {
  return (
    <section className="bg-gray-900 text-black text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold">Become A</h1>
        <h1 className="text-5xl font-bold">Full Stack Developer</h1>
        <hr className="my-4 border-yellow-400 w-16 mx-auto" />
        <h2 className="text-2xl">
          in just <span className="text-yellow-400">6</span> Months
        </h2>
        <p className="text-lg font-semibold mt-4">That's all the time it takes..</p>
        <a
          href="https://demo.fullstacklearning.com/register/"
          className="bg-yellow-400 text-black py-3 px-6 mt-6 inline-block rounded-lg text-lg"
        >
          Join Now
        </a>
      </div>
    </section>
  );
};

export default Home;

import Feed from "@/components/Feed.jsx";

const Home = () => (
  <section className='w-full flex-center flex-col'>

    <h1 className='head_text text-center'>
        Prompt Smarter, Not Harder
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>Ignite Ideas with AI</span>
    </h1>

    <p className='desc text-center'>
      Promptune is an open-source platform to explore, create, and share prompts 
      that spark creativity.
    </p>

    <Feed />
    
  </section>
);

export default Home;
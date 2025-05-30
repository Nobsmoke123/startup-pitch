import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";

  const posts = [
    {
      _id: 1,
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Chidera Ejimofor" },
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1742827871494-3a34fc06b69f?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Robots",
      title: "We Robots",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-26-semibold">
          {query ? `Search results for ${query}` : `All Startups`}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} {...post} />)
          ) : (
            <li className="card">No startups found</li>
          )}
        </ul>
      </section>
    </>
  );
}

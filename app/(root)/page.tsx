import SearchForm from "@/components/SearchForm";
import StartupCard, { StartUpTypeCard } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";
  const params = { search: query || null };

  // const {posts} = (await client.fetch(STARTUPS_QUERY)) as StartUpTypeCard[];
  const { data: posts } = (await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  })) as { data: StartUpTypeCard[] };

  // console.log(JSON.stringify(posts, null, 2));

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
      <SanityLive />
    </>
  );
}

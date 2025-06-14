import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartUpTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {
    id,
  });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartUpTypeCard) => (
          <StartupCard key={startup._id} {...startup} />
        ))
      ) : (
        <p className="text-14-normal">No startups found.</p>
      )}
    </>
  );
};

export default UserStartups;

import StartupCard, { StartUpTypeCard } from "@/components/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true; // Enable Partial Prerendering

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch the startup post and editor picks concurrently, using parallel requests.
  const [post, { select: editorPicks }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {
      id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) {
    return notFound();
  }

  // Sequential requests can be slow, so we use Promise.all to fetch both queries concurrently.
  // const post = (await client.fetch(STARTUP_BY_ID_QUERY, {
  //   id,
  // })) as StartUpTypeCard;

  // const { select: editorPicks } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   slug: "editor-picks",
  // });

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image!}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image || "https://placehold.co/48x48"}
                alt="author"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-20-medium !text-black-300">
                  {post.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result"> No details provided.</p>
          )}
        </div>

        <hr className="divider" />

        {/* Editor recommended startups */}
        {editorPicks?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPicks.map((startup: StartUpTypeCard, index: number) => (
                <StartupCard key={startup._id + index} {...startup} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          {/* Fetch and display recommended startups here */}
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

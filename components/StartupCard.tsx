import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

// export type StartupCardProps = {
//   _id: number;
//   title: string;
//   description: string;
//   category: string;
//   image: string;
//   author: { _id: number; name: string };
//   views: number;
//   _createdAt: Date;
// };

export type StartUpTypeCard = Omit<Startup, "author"> & {
  author?: Pick<Author, "_id" | "name" | "image" | "username">;
};

const StartupCard: React.FC<StartUpTypeCard> = ({
  _id,
  _createdAt,
  views,
  author,
  description,
  image,
  category,
  title,
}) => {
  return (
    <li className="startup-card group" key={_id}>
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "/placeholder.png"}
            alt={author?.name || "Author Image"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <div>
        <p className="startup-card_desc">{description}</p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="startup-banner" className="startup-card_img" />

        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>

          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${_id}`} className="text-white">
              Details
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("sleleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;

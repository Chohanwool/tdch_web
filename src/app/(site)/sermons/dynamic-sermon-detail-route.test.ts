import type { Metadata } from "next";
import SermonDetailPage, { generateMetadata } from "@/app/(site)/sermons/[slug]/[youtubeVideoId]/page";

void SermonDetailPage;
void generateMetadata;

type SermonDetailPageProps = Parameters<typeof SermonDetailPage>[0];

const _assertPageProps: SermonDetailPageProps = {
  params: Promise.resolve({
    slug: "messages",
    youtubeVideoId: "abc123",
  }),
};
void _assertPageProps;

const _assertMetadataShape: Metadata = {};
void _assertMetadataShape;

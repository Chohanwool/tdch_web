import type { Metadata } from "next";
import SermonListPage, { generateMetadata } from "@/app/(site)/sermons/[slug]/page";

void SermonListPage;
void generateMetadata;

type SermonListPageProps = Parameters<typeof SermonListPage>[0];

const _assertPageProps: SermonListPageProps = {
  params: Promise.resolve({ slug: "messages" }),
  searchParams: Promise.resolve({ page: "1" }),
};
void _assertPageProps;

const _assertMetadataShape: Metadata = {};
void _assertMetadataShape;

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildVideoDetailPath,
  buildVideoListPath,
  resolveVideoRoute,
} from "./video-route-utils.ts";

describe("video route utils", () => {
  it("builds list and detail paths from an arbitrary root href", () => {
    const rootHref = "/media/messages";

    assert.equal(buildVideoListPath(rootHref), "/media/messages");
    assert.equal(buildVideoDetailPath(rootHref, "abc123"), "/media/messages/abc123");
  });

  it("normalizes nested root hrefs before building public paths", () => {
    const rootHref = "/media/messages/archive/";

    assert.equal(buildVideoListPath(rootHref), "/media/messages/archive");
    assert.equal(buildVideoDetailPath(rootHref, "xyz987"), "/media/messages/archive/xyz987");
  });

  it("resolves a pathname to the matching root href and content site key", () => {
    const groups = [
      {
        key: "home",
        href: "/",
        contentSiteKey: null,
        items: [],
      },
      {
        key: "video",
        href: "/media",
        contentSiteKey: null,
        items: [
          {
            key: "messages",
            href: "/media/messages",
            contentSiteKey: "messages",
            items: [
              {
                key: "messages-live",
                href: "/media/messages/live",
                contentSiteKey: "messages-live",
                items: [],
              },
            ],
          },
          {
            key: "shorts",
            href: "/media/shorts",
            contentSiteKey: "shorts",
            items: [],
          },
        ],
      },
    ];

    assert.deepEqual(resolveVideoRoute("/media/messages", groups), {
      rootHref: "/media/messages",
      siteKey: "messages",
    });

    assert.deepEqual(resolveVideoRoute("/media/messages/abc123", groups), {
      rootHref: "/media/messages",
      siteKey: "messages",
      youtubeVideoId: "abc123",
    });
  });

  it("prefers the deepest nested content site root when resolving a detail pathname", () => {
    const groups = [
      {
        key: "video",
        href: "/media",
        contentSiteKey: null,
        items: [
          {
            key: "messages",
            href: "/media/messages",
            contentSiteKey: "messages",
            items: [
              {
                key: "messages-live",
                href: "/media/messages/live",
                contentSiteKey: "messages-live",
                items: [],
              },
            ],
          },
        ],
      },
    ];

    assert.deepEqual(resolveVideoRoute("/media/messages/live/xyz987", groups), {
      rootHref: "/media/messages/live",
      siteKey: "messages-live",
      youtubeVideoId: "xyz987",
    });
  });
});

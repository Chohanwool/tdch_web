# Navigation + Video Integration

## Current Model

- Site navigation is managed as a single admin-driven menu system.
- Menu behavior is type-based with `STATIC_PAGE`, `BOARD_PAGE`, and `VIDEO_PAGE`.
- Video menus no longer depend on hardcoded `/sermons` behavior.
- Video management remains a separate system and is linked through `VIDEO_PAGE` menus.
- Public video routes resolve from the menu root and the linked video collection, not from developer-only keys.

## Admin/Ops

- Operators manage all menu types from one admin navigation workflow.
- The UI only asks for fields relevant to the selected menu type.
- Operators do not enter internal keys or developer concepts.
- Video discovery, sync, and metadata editing remain available in the media/admin flow.
- Navigation and video operations are aligned through menu type and root linkage.

## Final Status

- The unified navigation and video integration model is the final operating direction.
- Legacy plan documents remain historical references only.
- New documentation should point to this canonical model instead of older split docs.

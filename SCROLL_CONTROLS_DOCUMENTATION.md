# ScrollControls Implementation Documentation

## Overview
ScrollControls provide large, accessible buttons for eye gaze navigation throughout the MND Playbook application.

## Key Improvements Made

### 1. Enhanced Detection System
The ScrollControls now use multiple methods to detect scrollable content:
- **Immediate check** on mount
- **Delayed checks** at 100ms and 500ms to catch late-loading content
- **ResizeObserver** to detect container size changes
- **MutationObserver** to detect content additions/removals
- **Scroll event listener** for real-time updates

### 2. Positioning Above Bottom Navigation
- Adjusted vertical positioning to avoid overlapping with bottom navigation
- Mobile: `top-[calc(50%-56px)]` - accounts for ~112px bottom nav
- Desktop: `md:top-[calc(50%-48px)]` - accounts for ~96px bottom nav
- Z-index: 50 (above all other content)

## Implementation Locations

### Roadmap Page (/)

**File:** `src/components/roadmap/roadmap-view.tsx`

```
RoadmapView (flex h-full flex-col relative)
  ├─ ScrollControls ← Controls the timeline container
  │   ├─ containerRef: timelineScrollRef
  │   ├─ position: "right"
  │   └─ autoHide: true
  │
  ├─ Header Section (border-b)
  │   ├─ Title & subtitle
  │   ├─ Current stage indicator
  │   ├─ Help section (collapsible)
  │   ├─ Pathway filters
  │   └─ Score summary
  │
  └─ Timeline Container (ref={timelineScrollRef}, overflow-auto)
      └─ VerticalTimeline
          ├─ Dual pathway stages
          ├─ Convergence point
          └─ Converged stages
```

**Scrollable Element:** The timeline container (`overflow-auto, flex-1, min-h-0`)
**ScrollControls Target:** `timelineScrollRef` pointing to timeline container

---

### Assessment Page (/assess) & Progress Page (/progress)

**File:** `src/components/layout/app-shell.tsx`

```
AppShell (flex min-h-screen flex-col relative)
  ├─ ScrollControls ← Controls the main content (only for non-full-width pages)
  │   ├─ containerRef: mainContentRef
  │   ├─ position: "right"
  │   └─ autoHide: true
  │
  ├─ Header (sticky top-0 z-10)
  │   └─ App title & logout button
  │
  ├─ Main Content (ref={mainContentRef}, overflow-auto, flex-1)
  │   └─ Page content wrapped in max-w-4xl container
  │       ├─ /assess → AssessmentWizard
  │       └─ /progress → ScoreDashboard
  │
  └─ Bottom Navigation (fixed bottom-0)
      └─ Nav buttons (Roadmap, Assess, Progress)
```

**Scrollable Element:** The main element (`overflow-auto, flex-1, pb-28`)
**ScrollControls Target:** `mainContentRef` pointing to main element

---

### Stage Detail Modal (Overlay)

**File:** `src/components/roadmap/stage-detail-modal.tsx`

```
Modal Overlay (fixed inset-0 z-50)
  └─ Modal Content (max-w-4xl max-h-[90vh])
      ├─ ScrollControls ← Controls modal content
      │   ├─ containerRef: scrollContainerRef
      │   └─ position: "right"
      │
      ├─ Header (with close button)
      │
      ├─ Scrollable Content (ref={scrollContainerRef}, overflow-y-auto)
      │   ├─ Stage info cards
      │   ├─ Description
      │   ├─ Symptoms
      │   ├─ Warnings
      │   └─ Resources
      │
      └─ Footer Actions (sticky bottom)
```

**Scrollable Element:** Modal content div (`overflow-y-auto`)
**ScrollControls Target:** `scrollContainerRef`

---

### Stage Detail Panel (Bottom Sheet)

**File:** `src/components/roadmap/stage-detail-panel.tsx`

```
Panel Wrapper (fixed inset-x-0 bottom-0 z-50)
  └─ Panel Content (ref={scrollContainerRef}, max-h-[85vh], overflow-y-auto)
      ├─ ScrollControls ← Controls panel content
      │   └─ containerRef: scrollContainerRef
      │
      ├─ Close button
      ├─ Header
      ├─ Resources
      ├─ Notes textarea
      └─ Action buttons
```

**Scrollable Element:** Panel content div (`overflow-y-auto`)
**ScrollControls Target:** `scrollContainerRef`

---

## Troubleshooting

### If ScrollControls are not visible:

1. **Check console for errors** - React ref issues will show in console
2. **Verify container is scrollable** - Content must be taller than container height
3. **Wait for content to load** - Controls auto-hide if content isn't scrollable yet
4. **Check z-index** - Controls should be at z-50, above other content
5. **Inspect positioning** - Controls should be `right-2 md:right-4` from edge

### Expected Behavior:

- **On page load**: Controls may be hidden initially (auto-hide)
- **After content loads**: Controls appear if content is scrollable
- **When scrolling**: Buttons enable/disable based on scroll position
- **At scroll top**: "Top" and "Up" buttons are disabled
- **At scroll bottom**: "Down" and "Bottom" buttons are disabled

---

## Button Specifications

| Button | Icon | Action | Scroll Amount |
|--------|------|--------|---------------|
| Top | 🔼🔼 | Jump to top | `scrollTop = 0` |
| Up | ⬆️ | Scroll up | `-200px` (default) |
| Down | ⬇️ | Scroll down | `+200px` (default) |
| Bottom | 🔽🔽 | Jump to bottom | `scrollTop = scrollHeight` |

**Size:** 56×56px (14rem × 14rem)
**Gap:** 8px between buttons
**Focus Ring:** 4px blue ring on focus
**Disabled State:** Gray background, gray text, cursor not-allowed

---

## Configuration Options

```typescript
interface ScrollControlsProps {
  containerRef: React.RefObject<HTMLElement | null>;
  position?: 'left' | 'right';  // Default: 'right'
  scrollAmount?: number;          // Default: 200 (pixels)
  className?: string;             // Additional CSS classes
  autoHide?: boolean;             // Default: true
}
```

---

## Testing Checklist

- [ ] Roadmap page: Controls visible when timeline has many stages
- [ ] Assessment page: Controls visible when questions overflow
- [ ] Progress page: Controls visible when score history is long
- [ ] Stage modal: Controls visible when stage content is long
- [ ] Stage panel: Controls visible when panel content overflows
- [ ] Controls positioned above bottom navigation (no overlap)
- [ ] Controls disappear when content fits on screen (auto-hide)
- [ ] Buttons correctly enable/disable based on scroll position
- [ ] Smooth scrolling animations work properly
- [ ] Focus states work with keyboard navigation

---

## Files Modified

1. `src/components/ui/scroll-controls.tsx` - Main component
2. `src/components/ui/index.ts` - Export
3. `src/components/roadmap/roadmap-view.tsx` - Roadmap implementation
4. `src/components/roadmap/vertical-timeline.tsx` - Cleanup (removed duplicate)
5. `src/components/roadmap/stage-detail-modal.tsx` - Modal implementation
6. `src/components/roadmap/stage-detail-panel.tsx` - Panel implementation
7. `src/components/layout/app-shell.tsx` - Assessment/Progress implementation

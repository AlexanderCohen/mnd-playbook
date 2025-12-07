# Roadmap Screen Redesign Proposal

## Current State Analysis
- Linear timeline layout (cramped on mobile, cluttered on desktop)
- Stage cards show minimal info (code + name only)
- Detail exploration via bottom-sheet modal
- "All pathways" view is complex and requires horizontal scrolling
- No visual disease progression indicators

## Proposed Modern Layout

### Design Principles
1. **Clear Progression** - Visual journey through disease stages
2. **Progressive Disclosure** - Show more info as users engage
3. **Pathway Clarity** - Separate pathways in distinct visual sections
4. **Responsive** - Different optimal layouts per device size
5. **Accessible** - Maintain eye-gaze and large touch targets

---

## LAYOUT 1: VERTICAL CARD-BASED TIMELINE (Mobile & Tablet)

### Structure
```
┌─────────────────────────────────┐
│         Score Summary           │ (Compact card, optional)
└─────────────────────────────────┘

┌─ LOWER LIMB PATHWAY (Blue) ─────────────┐
│ ┌───────────────────────────────────┐  │
│ │ L1: Early Signs                   │◀─┼─── Current Stage (blue accent)
│ │ Foot drop, tripping, leg weakness │  │
│ │                                   │  │
│ │ 3 resources: PT, aids...          │  │
│ └───────────────────────────────────┘  │
│           ↓ (visual connector)          │
│ ┌───────────────────────────────────┐  │
│ │ L2: Mobility Aids                 │  │
│ │ Crutches, walker, braces...       │  │
│ │                                   │  │
│ │ 3 resources: Equipment...         │  │
│ └───────────────────────────────────┘  │
│           ↓                              │
│ [More stages...]                        │
└─────────────────────────────────────────┘

┌─ BULBAR PATHWAY (Purple) ───────────────┐
│ ┌───────────────────────────────────┐  │
│ │ B1: Early Signs                   │  │
│ │ Slurred speech, choking...        │  │
│ │                                   │  │
│ │ 3 resources: Speech therapy...    │  │
│ └───────────────────────────────────┘  │
│           ↓                              │
│ [More stages...]                        │
└─────────────────────────────────────────┘

┌─ CONVERGED PATHWAY (Gray) ──────────────┐
│ ┌───────────────────────────────────┐  │
│ │ C1: PEG / Feeding Tube            │  │
│ │ Advanced nutritional support...   │  │
│ │                                   │  │
│ │ 3 resources: Nutrition...         │  │
│ └───────────────────────────────────┘  │
│           ↓                              │
│ [Final stages...]                       │
└─────────────────────────────────────────┘
```

### Stage Card Details
```
┌────────────────────────────────────────┐
│ ● L1    Early Signs                    │ ← Color dot + code + name
├────────────────────────────────────────┤
│ Foot drop, tripping, leg weakness      │ ← Subtitle
├────────────────────────────────────────┤
│ Common early signs include...          │ ← Brief description (2 lines)
│ This stage typically involves...       │
├────────────────────────────────────────┤
│ 🔗 Physical Therapy                    │ ← Resource preview
│ 🔗 Assistive Devices                   │    (3 compact items)
│ 🔗 Home Safety Assessment              │
├────────────────────────────────────────┤
│ [Expand ↓]  [Share]  [Note]           │ ← Action buttons
└────────────────────────────────────────┘
```

### Expanded State (Click to expand in place)
```
┌────────────────────────────────────────┐
│ ● L1    Early Signs                ✕   │
├────────────────────────────────────────┤
│ Foot drop, tripping, leg weakness      │
├────────────────────────────────────────┤
│ DESCRIPTION                            │
│ Common early signs of lower limb       │
│ MND include foot drop, frequent        │
│ tripping, and leg weakness. This       │
│ stage typically involves...            │
│                                        │
│ DURATION: Usually 1-2 years            │
│ SEVERITY: ⚬ ⚬ ⚬ ◉ ◉ (Mild)          │
├────────────────────────────────────────┤
│ RESOURCES                              │
│ ┌──────────────────────────────────┐  │
│ │ 🏥 Physical Therapy              │  │
│ │ Work with PT to maintain mobility│  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │ 🦺 Assistive Devices             │  │
│ │ Crutches, canes, braces...       │  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │ 🏠 Home Safety Assessment        │  │
│ │ Assess home for modifications... │  │
│ └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│ MY NOTES                               │
│ [Text input for personal notes...]     │
├────────────────────────────────────────┤
│ [← Back]  [Mark as Current]  [→]       │
└────────────────────────────────────────┘
```

### Collapsed Pathway View (shows only current pathway)
- Single pathway displayed vertically
- Cleaner, faster to scroll
- Toggle via pathway selector

---

## LAYOUT 2: HORIZONTAL JOURNEY MAP (Desktop)

### Structure
```
LOWER LIMB                    BULBAR                      CONVERGED
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  L1: Early Signs     │→│  B1: Early Signs     │→│  C1: PEG Feeding     │
│  Foot drop...        │  │  Slurred speech...   │  │  Feeding tube...     │
│  [Current]           │  │                      │  │                      │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
         ↓                        ↓                         ↓
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  L2: Mobility Aids   │→│  B2: Speech Support  │→│  C2: Respiratory     │
│  Crutches, walker... │  │  AAC devices...      │  │  Ventilator...       │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
         ↓                        ↓                         ↓
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  L3: Modifications   │→│  B3: AAC             │→│  C3: Full-time Care  │
│  Accessibility...    │  │  Advanced AAC...     │  │  24/7 support...     │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
         ↓                        ↓                         ↓
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  L4: Wheelchair      │→│  B4: Swallowing      │→│  C4: Palliative Plan │
│  Transition...       │  │  Feeding changes...  │  │  End-of-life...      │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘

Click any card to expand inline or open side panel
```

### Stage Card (Desktop)
```
┌─────────────────────────────────────┐
│ ● L1    Early Signs                 │
├─────────────────────────────────────┤
│ Foot drop, tripping, leg weakness   │
├─────────────────────────────────────┤
│ Brief description...                │
│                                     │
│ Resources: 3 items                  │
│ [View Details →]                    │
└─────────────────────────────────────┘
```

### Side Panel (Desktop - Alternative to expand)
When user clicks a card:
```
┌────────────────────────────────────────────────────────┐
│ LOWER LIMB PATHWAY                                    │
│                                                        │
│ ◀ L1: Early Signs                                     │
│                                                        │
│ DESCRIPTION                                            │
│ Common early signs of lower limb MND include foot     │
│ drop, frequent tripping, and leg weakness...          │
│                                                        │
│ TIMELINE: Usually 1-2 years                            │
│ SEVERITY: ⚬⚬⚬◉◉ Mild                                │
│ CARE LEVEL: Self-sufficient                            │
│                                                        │
│ RESOURCES                                              │
│ • Physical Therapy                                    │
│ • Assistive Devices                                   │
│ • Home Safety Assessment                              │
│                                                        │
│ MY NOTES                                               │
│ [Textarea for notes]                                  │
│                                                        │
│ ┌─────────────────────────────────────────────┐       │
│ │ [← Previous Stage] [Mark as Current] [→]   │       │
│ └─────────────────────────────────────────────┘       │
└────────────────────────────────────────────────────────┘
```

---

## KEY DESIGN IMPROVEMENTS

### 1. Progressive Information Disclosure
- **Collapsed state**: Code + Name + Subtitle + 3 Resources preview + Action buttons
- **Expanded state**: Full description + Duration + Severity + Expanded resources + Notes

### 2. Visual Disease Progression
- Severity indicator (5-point scale): ⚬ ⚬ ⚬ ◉ ◉
- Duration estimates: "Usually 1-2 years"
- Care level badges: Self-sufficient → Assisted → 24/7 support

### 3. Pathway Clarity
- Each pathway is a distinct section with color-coded header
- Clear visual separation between pathways
- Pathway-specific cards only shown when that pathway selected
- Convergence point is natural (C pathway comes after both)

### 4. Resource Display
- Resource items shown inline with icons and descriptions
- Expandable for more details
- Clickable links to external resources
- Organized by type (PT, Equipment, Support, etc.)

### 5. Better Mobile Experience
- Single pathway view reduces scroll distance
- Expand/collapse in place (no modal)
- Compact card format
- Vertical connectors between stages

### 6. Better Desktop Experience
- All pathways visible at once in journey map
- Click any card for side panel details
- Horizontal layout shows disease flow
- Side panel doesn't hide content

### 7. Navigation & Context
- "Previous/Next Stage" buttons in expanded view
- Current stage highlighted with visual accent
- Breadcrumb showing active pathway
- Clear progression direction (↓ on mobile, → on desktop)

---

## DATA STRUCTURE ENHANCEMENTS

### Extend Stage Model
```typescript
interface Stage {
  // Current fields
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  pathway: PathwayType;
  order: number;
  color: string;
  resources: Resource[];

  // NEW fields for progression visualization
  duration?: string;           // "Usually 1-2 years"
  severity: 1 | 2 | 3 | 4 | 5; // Severity scale
  careLevel: 'self-sufficient' | 'assisted' | '24/7 support';
  commonSymptoms?: string[];
  nextStageWarnings?: string[]; // What to watch for
  relatedStages?: string[];     // Links to similar stages

  // Resource enhancement
  resources: Resource[];        // Extended with categories
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'medical' | 'equipment' | 'support' | 'lifestyle';
  icon?: string;
  url?: string;
  phone?: string;
  local?: boolean; // Can be provided locally
}
```

### Enhanced Alert/Trigger System
- Connect alerts to specific stages
- Show "Next Stage" alert when ready
- Provide guidance on stage transition timing

---

## Component Breakdown

### New/Modified Components

1. **`stage-card.tsx`** - Enhanced with expand/collapse
   - Collapsed view: compact layout
   - Expanded view: full details
   - Animation on expand

2. **`stage-section.tsx`** - NEW
   - Groups pathway + all its stages
   - Pathway header with color coding
   - Expandable/collapsible section
   - Vertical connectors between stages

3. **`pathway-journey-map.tsx`** - NEW (Desktop)
   - Grid layout for all pathways
   - Horizontal flow visualization
   - Click handlers for stage selection

4. **`stage-detail-side-panel.tsx`** - NEW (Desktop)
   - Replaces bottom sheet for desktop
   - Shows full stage details
   - Navigation between stages

5. **`roadmap-view.tsx`** - Reorganized
   - Conditional rendering: mobile vs desktop
   - Mobile: Vertical stacked sections
   - Desktop: Journey map + side panel
   - Header and filters remain

6. **`roadmap-mobile.tsx`** - NEW
   - Mobile-optimized view
   - Stacked pathway sections
   - Expand/collapse cards

7. **`roadmap-desktop.tsx`** - NEW
   - Journey map timeline
   - Side panel for details
   - Better space utilization

---

## Implementation Approach

### Phase 1: Data Model Enhancement
- Update stage data with new fields (duration, severity, careLevel)
- Add categories to resources
- Update types in TypeScript

### Phase 2: Mobile First
- Update `stage-card.tsx` with expand/collapse
- Create `stage-section.tsx` for pathway grouping
- Modify `roadmap-view.tsx` to use sections
- Test on mobile/tablet

### Phase 3: Desktop Optimization
- Create `pathway-journey-map.tsx`
- Create `stage-detail-side-panel.tsx`
- Create desktop/mobile conditional rendering
- Optimize space usage

### Phase 4: Polish & Accessibility
- Ensure large touch targets maintained
- Test eye-gaze compatibility
- Smooth animations
- Responsive breakpoints

---

## Benefits of New Design

✅ **Cleaner Visual Hierarchy** - Pathway sections clearly separated
✅ **Better Information Architecture** - Progressive disclosure reduces cognitive load
✅ **Improved Navigation** - Users understand disease progression clearly
✅ **Responsive** - Optimal layouts for all device sizes
✅ **Modern Aesthetic** - Clean cards, better spacing, visual progression indicators
✅ **Accessible** - Maintains large targets, good contrast, clear focus states
✅ **Engaging** - Expand/collapse interaction, visual disease progression
✅ **Informative** - Severity, duration, and care level visible at a glance

---

## Mockup Files Recommendation

Create in Figma/Excalidraw:
1. Mobile vertical card layout
2. Mobile expanded card state
3. Desktop journey map
4. Desktop side panel detail view
5. Tablet responsive breakpoint

Would you like me to proceed with implementing this design, or would you like to discuss/modify any aspects first?

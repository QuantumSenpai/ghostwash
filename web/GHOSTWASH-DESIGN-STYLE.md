# Ghostwash --- Design Direction

## ElevenLabs-inspired, but unmistakably Ghostwash

**Document type:** Product design brief / UI implementation guide\
**Product:** Ghostwash Humanizer\
**Direction:** Editorial minimalism × expressive AI craft × a tiny retro
"ghost" signature\
**Principle:** Borrow the restraint, typography-led confidence,
whitespace, and polished product thinking seen in ElevenLabs. Do not
copy its brand assets, exact layouts, logo, or distinctive visual
motifs. Ghostwash should feel like its own writing product.

------------------------------------------------------------------------

## 1. The product feeling

Ghostwash should feel like a calm, capable writing studio---not a gaming
site, AI dashboard full of charts, or a loud "AI detector bypass" tool.

The experience should communicate:

-   **Clarity:** the user knows where to paste text, what the tool will
    do, and where the result appears.
-   **Control:** rewriting is an intentional action; the user can
    compare, inspect, copy, and revise.
-   **Craft:** typography and spacing make writing itself the hero.
-   **Privacy-mindedness:** no unnecessary visual noise or exaggerated
    claims.
-   **Personality:** a tiny ghost-like visual signature and a
    distinctive accent add memorability without turning the interface
    into a cartoon.

### The design sentence

> A quiet, editorial writing studio with a near-paper canvas, ink-like
> typography, precise controls, and one small "Phantom Mint" signal that
> marks moments of transformation.

### Brand personality

  -----------------------------------------------------------------------
  Trait                               How it should look
  ----------------------------------- -----------------------------------
  Thoughtful                          Calm spacing, measured copy, no
                                      aggressive popups

  Precise                             Clear labels, aligned controls,
                                      consistent borders

  Human                               Warm off-white surfaces, readable
                                      line-height, gentle motion

  Slightly uncanny                    Tiny ghost/pixel details, used
                                      sparingly

  Trustworthy                         Honest processing states, clear
                                      privacy and limitation notes
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. Visual inspiration: what to take from ElevenLabs

ElevenLabs is useful as a **design reference**, not a template to clone.
Study its official brand resources and public product interface for
restraint, typography, high contrast, and a coherent system. Its
official brand guidance also treats its product families as distinct
visual systems.

### Principles to adapt

1.  **Let typography do the work.** Use a strong headline and readable
    body copy instead of decorative illustrations everywhere.
2.  **Use neutral surfaces as the foundation.** Let the writing editor
    be the most important object on screen.
3.  **Make actions feel deliberate.** Primary buttons should be clear,
    compact, and visually stable.
4.  **Use expressive visuals sparingly.** Keep decorative motion to the
    hero, a tiny brand mark, and meaningful processing feedback.
5.  **Build a real component system.** Reuse radii, spacing, borders,
    type sizes, and interaction states.
6.  **Keep marketing and product UI related, not identical.** The
    landing page can be expressive; the editor should be quiet and
    functional.

### What Ghostwash should not copy

-   ElevenLabs logos, names, proprietary assets, or exact brand palette.
-   A generic "AI purple gradient + glass cards" look.
-   Huge animated orbs that compete with the writing.
-   A wall of nested cards and dashboard widgets.
-   Fake AI-detection accuracy, fake processing progress, or claims that
    promise detector evasion.

**Reference:** [ElevenLabs official brand
resources](https://elevenlabs.io/brand) · [ElevenLabs UI
components](https://ui.elevenlabs.io/docs)

------------------------------------------------------------------------

## 3. Signature visual idea: "The Phantom Mark"

Ghostwash needs one ownable detail---not ten different effects.

### The mark

Create a tiny custom ghost symbol from a simple geometric silhouette.
One corner or pixel can be offset, as if a fragment is dissolving and
reforming. Keep the mark abstract and clean; avoid a childish cartoon
face.

Possible treatments: - A 16--24 px mark beside the `ghostwash`
wordmark. - A tiny "missing pixel" detail in the favicon. - A
three-frame pixel-shift animation while a rewrite is genuinely
processing. - A small mint-colored marker beside a completed result. - A
monochrome outline version in neutral states.

### The signature motion: "Dissolve → Reform"

When the user runs a rewrite: 1. The button enters a disabled/loading
state. 2. A few tiny square fragments shift around the mark---never the
entire screen. 3. A real status label changes as backend stages change,
if those stages exist. 4. The result appears with a subtle 160--240 ms
fade/translate transition. 5. The accent returns to its resting state.

Do not show a made-up percentage or claim the text is "100% human." If
actual backend progress is unavailable, use a restrained spinner and
honest status text such as "Refining your text...".

### Motion rules

-   Standard UI transitions: **140--200 ms**.
-   Panel/result transitions: **180--260 ms**.
-   Easing: gentle ease-out; no springy bounce by default.
-   Hover: small color/border change, not a large scale effect.
-   Respect `prefers-reduced-motion`.
-   No constant floating, blinking, scanlines, or animated backgrounds
    behind long text.

------------------------------------------------------------------------

## 4. Layout and page structure

### A. Marketing landing page

The landing page should be simple enough to understand in one glance.

**Top navigation** - Left: Ghostwash wordmark + Phantom Mark. - Right:
How it works, Privacy, Sign in (only if authentication exists). -
Primary action: "Open Studio". - Use a restrained sticky header only if
it improves navigation.

**Hero** - Eyebrow: `A QUIETER WAY TO REFINE WRITING` - Headline:
`Make every word feel more like you.` - Supporting line:
`Refine clarity, rhythm, and tone while keeping your meaning intact.` -
Primary CTA: `Open the Studio` - Secondary link: `See how it works` -
Right/below: one small editorial text-transformation visual, not a giant
dashboard mockup. - The hero should work without animation; motion is
enhancement, not required content.

**How it works** - 3 concise steps: Paste → Refine → Review. - Use
simple line icons or typographic numbering. - Avoid oversized feature
cards.

**Capabilities** - Humanizer Studio. - Original vs. refined diff
comparison. - Writing analysis / style flags. - External evaluation
links, clearly labelled as third-party tools. - Privacy and attribution
information.

**Trust section** - Explain what is processed and stored in plain
language. - Only state privacy guarantees that the implementation
actually supports. - Avoid promising that a rewrite will bypass AI
detectors.

**Footer** - About - External Tools - Privacy Policy - Terms - Copyright
& Attribution - Testing / Evaluation - Contact

### B. Humanizer Studio --- the main product

The studio is the product. It should prioritize writing, not branding.

**Desktop layout** - Compact top bar with brand mark, Studio label, and
minimal navigation. - Centered workspace with a sensible max width
(roughly 1100--1240 px for a two-column editor). - Two clear work areas:
source text and refined output. - Source and output areas should be
aligned and visually balanced. - Controls sit close to the text they
affect. - Avoid a permanent left sidebar unless actual product
navigation needs it.

**Suggested structure** 1. Workspace title: `Humanizer Studio` 2. Small
helper text: `Refine wording without losing your meaning.` 3. Input
panel: - `Original text` - Character/word count - Paste / clear
controls - Text area with comfortable line-height 4. Refinement
controls: - Tone or style selector, if supported by the backend -
Strength selector, if supported by the backend - Primary `Refine text`
action 5. Output panel: - `Refined text` - Copy action -
Regenerate/refine again, if supported - Output count 6. Secondary
tools: - `Compare changes` - `Writing analysis` - `External checks` 7.
Quiet status line for processing, errors, or completion.

**Empty state** - Use a small Phantom Mark and one useful sentence. -
Example: `Your next draft starts here. Paste some text to begin.` -
Avoid giant illustrations and fake sample metrics.

**Loading state** - Disable duplicate submissions. - Keep input content
stable. - Display a truthful status. - Do not fake progress or change
the text before the server returns a result.

**Error state** - Keep the user's source text. - Explain the problem in
plain language. - Offer a retry action when appropriate. - Do not
replace an error with a vague "Something magical happened" message.

**Success state** - Show the refined text clearly. - Give copy feedback
such as `Copied`. - Keep the confirmation temporary and accessible. - Do
not force a celebratory modal.

### C. Diff Compare

This is a functional tool, not a decorative feature.

-   Use a side-by-side comparison on wide screens.
-   On mobile, use tabs or a stacked view.
-   Highlight additions and removals with both color and labels/icons;
    never rely on color alone.
-   Keep highlights subtle so long passages remain readable.
-   Add `Original` and `Refined` labels.
-   Provide a clear way back to the editor.
-   Preserve paragraphs and line breaks whenever possible.

### D. Writing Analysis

-   Present actionable style observations, not an authoritative "human
    score" unless a real, validated metric exists.
-   Prefer labels such as `Style flags`, `Readability`,
    `Sentence variety`, and `Repeated phrasing` when these are actually
    measured.
-   Explain what each signal means.
-   Keep any score secondary to the text itself.
-   Avoid presenting third-party AI detector results as definitive proof
    of authorship.

### E. External Tools

-   Present ZeroGPT, GPTZero, Copyleaks, Originality.ai, or other
    supported tools as external links.
-   Label them as third-party services.
-   Explain that results can disagree and are not definitive proof.
-   Never imply Ghostwash is affiliated with those services unless that
    is true.

------------------------------------------------------------------------

## 5. Typography system

### Desired typographic feeling

Editorial, calm, confident, and highly readable. Use a clean sans-serif
for the interface and optionally a restrained serif for one large
marketing headline. Do not use pixel fonts for paragraphs or the main
editor.

### Practical font stack

-   **UI and body:** Inter, with system sans-serif fallback.
-   **Optional display face:** a refined editorial serif such as
    `Instrument Serif` for a single landing-page headline, if it fits
    the brand.
-   **Technical metadata:** `IBM Plex Mono` or system monospace for
    counts, small status labels, and version-like details.
-   **Editor text:** Inter or system sans-serif; prioritize legibility
    and line-height.

Example CSS stack:

``` css
:root {
  --font-ui: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Instrument Serif", Georgia, serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}
```

### Type scale

  Token            Desktop Use
  ------------ ----------- -------------------------------------
  Display        56--68 px Landing hero headline only
  H1             36--44 px Page headline
  H2             26--32 px Main sections
  H3             18--22 px Panel or feature headings
  Body large     16--18 px Hero description
  Body           14--16 px Interface copy
  Label          12--13 px Field labels and secondary controls
  Micro          10--11 px Small metadata only; use sparingly

-   Use 1.05--1.15 line-height for large headings.
-   Use 1.45--1.65 line-height for body copy.
-   Use regular/medium weights for most UI.
-   Reserve bold for hierarchy, not decoration.
-   Avoid excessive all-caps labels or wide letter spacing.

------------------------------------------------------------------------

## 6. Shape, spacing, and surface rules

### Shape language

-   Inputs and buttons: 8--10 px radius.
-   Panels: 12--16 px radius.
-   Pills: only for compact status or category labels.
-   Borders: thin and low contrast.
-   Shadows: subtle and rare; use borders and surface contrast before
    shadows.

### Spacing scale

Use a consistent 4 px base scale.

  Token          Value Typical use
  ------------ ------- -----------------------------
  `space-1`       4 px Icon/label micro-gap
  `space-2`       8 px Compact control gap
  `space-3`      12 px Small component padding
  `space-4`      16 px Standard UI gap
  `space-6`      24 px Panel padding / section gap
  `space-8`      32 px Major grouping
  `space-12`     48 px Section spacing
  `space-16`     64 px Landing page sections
  `space-24`     96 px Large hero separation

### Surfaces

-   Prefer a page canvas plus one elevated/editor surface.
-   Avoid putting a card inside a card inside another card.
-   Separate sections with whitespace, headings, and hairline borders.
-   Use dark surfaces as a deliberate theme, not as a default "AI
    futuristic" effect.
-   Keep the editor visually quiet so users can focus on their own
    words.

------------------------------------------------------------------------

## 7. Color usage

Use the separate `GHOSTWASH-COLOR-PALETTE.md` file as the source of
truth.

### Core idea

-   **Paper / Ink:** the calm editorial base.
-   **Phantom Mint:** Ghostwash's own signature accent for primary
    actions and meaningful state changes.
-   **Mist / Slate:** borders, muted text, and quiet surfaces.
-   **Semantic colors:** reserved for success, warning, and error
    states.

### Accent discipline

The signature accent should appear in only a few high-value places: -
Primary action. - Focus ring or selected control. - Small Phantom Mark
detail. - A success/finished indicator.

Do not paint every link, card, badge, icon, and heading with the accent.
A restrained accent feels more distinctive.

------------------------------------------------------------------------

## 8. Interaction patterns

### Buttons

-   Primary: solid Phantom Mint with dark ink text, provided contrast is
    accessible.
-   Secondary: neutral surface with a thin border.
-   Tertiary: text action with clear hover and focus states.
-   Destructive: only for irreversible actions such as clearing content,
    with confirmation if necessary.

### Inputs

-   Clear label above each input.
-   Visible focus ring.
-   Helpful placeholder, but never use placeholder text as the only
    label.
-   Character limits and counts should update from actual state.
-   Avoid excessive controls beside the editor.

### Selectors

-   Use a compact select or segmented control for a small number of
    modes.
-   Expose only options the backend really supports.
-   Add a short explanation if a setting changes the result
    significantly.

### Feedback

-   Copy confirmation near the copy action.
-   Inline errors near the affected control.
-   Processing status near the primary action or output panel.
-   Use toasts only for brief global feedback, not for important error
    explanations.

### Accessibility

-   Keyboard-accessible controls and logical focus order.
-   Visible focus states.
-   Semantic labels and appropriate ARIA attributes.
-   Respect reduced motion.
-   Maintain readable contrast for text, controls, and status
    indicators.
-   Use text/icons in addition to color for success, warning, and error
    states.

------------------------------------------------------------------------

## 9. Responsive behavior

### Desktop (≥ 1024 px)

-   Two-column source/output editor.
-   Comfortable maximum content width.
-   Controls remain near the panel they affect.

### Tablet (768--1023 px)

-   Two columns only if each editor remains comfortably readable.
-   Otherwise stack panels.
-   Reduce outer page padding before shrinking text excessively.

### Mobile (\< 768 px)

-   Single-column editor.
-   Switch between `Original` and `Refined` tabs if vertical scrolling
    becomes unwieldy.
-   Keep the main action easy to reach without covering text.
-   Make controls touch-friendly (around 44 px minimum target where
    practical).
-   Do not use hover as the only way to reveal actions.
-   Keep decorative motion light to protect performance and battery.

------------------------------------------------------------------------

## 10. Implementation notes for the existing stack

The project currently uses a **FastAPI backend** and is planning a
**Next.js UI**. Keep the visual system independent of business logic.

### Suggested frontend approach

-   Next.js with TypeScript.
-   Tailwind CSS for tokens/layout, or CSS variables plus modules if
    that better fits the existing project.
-   A small reusable component set: `Button`, `TextArea`, `Panel`,
    `StatusMessage`, `ModeSelector`, `DiffView`, `Toast`.
-   Use CSS transitions for most interface motion.
-   Add Motion/Framer Motion only for transitions that benefit from
    orchestration.
-   Use a custom SVG/CSS Phantom Mark rather than shipping a heavy
    animation library solely for a tiny icon.

### Token-first CSS

Map the separate palette file into semantic CSS variables rather than
scattering hex values throughout components:

``` css
:root {
  --color-canvas: #F7F6F2;
  --color-surface: #FFFFFF;
  --color-surface-muted: #EFEEE8;
  --color-ink: #191B19;
  --color-text-secondary: #686D66;
  --color-border: #E2E2D9;
  --color-accent: #B9F36A;
  --color-accent-hover: #A6E653;
  --color-focus: #587C2A;
}
```

These are the proposed Ghostwash tokens; use
`GHOSTWASH-COLOR-PALETTE.md` for full definitions and dark-mode
counterparts.

### Component quality bar

-   One source of truth for tokens.
-   No duplicated one-off radii or spacing values.
-   Loading, disabled, hover, focus, success, and error states for every
    relevant control.
-   Avoid layout shifts when results appear.
-   Keep long text performant; avoid animating the entire editor
    content.
-   Do not persist user text unless the product explicitly explains and
    supports that behavior.

------------------------------------------------------------------------

## 11. Suggested microcopy

Use warm, direct language. Avoid exaggerated claims.

  -----------------------------------------------------------------------
  Context                             Suggested copy
  ----------------------------------- -----------------------------------
  Hero                                "Make every word feel more like
                                      you."

  Supporting text                     "Refine clarity, rhythm, and tone
                                      while keeping your meaning intact."

  Input empty state                   "Paste your draft to get started."

  Primary action                      "Refine text"

  Processing                          "Refining your text..."

  Success                             "Your refined draft is ready."

  Copy confirmation                   "Copied to clipboard"

  Empty output                        "Your refined version will appear
                                      here."

  Error                               "We couldn't refine this text. Your
                                      original draft is still here---try
                                      again."

  Diff section                        "Review what changed."

  Analysis section                    "Writing signals"

  Privacy link                        "How your text is handled"
  -----------------------------------------------------------------------

Use these only where they accurately describe product behavior.

------------------------------------------------------------------------

## 12. What makes this design specifically Ghostwash?

The personal signature is the combination of **editorial calm + Phantom
Mark + Phantom Mint**.

-   Editorial calm keeps the tool serious and readable.
-   The Phantom Mark provides a small, ownable identity.
-   Phantom Mint is a distinctive accent used only when the user acts or
    a meaningful state changes.
-   The dissolve/reform motion represents refining language, rather than
    pretending the product is a game or a magical detector bypass.
-   The studio stays focused on the actual workflow: input → refine →
    compare → analyze → copy.

This creates a recognizable identity without clutter, visual gimmicks,
or copying ElevenLabs.

------------------------------------------------------------------------

## 13. Final design checklist

Before shipping, verify:

-   [ ] The main editor is the visual priority.
-   [ ] A first-time user understands the workflow in seconds.
-   [ ] There is one dominant primary action.
-   [ ] The UI uses consistent spacing, typography, radii, and borders.
-   [ ] The Phantom Mark is subtle and consistent.
-   [ ] Accent color is used selectively.
-   [ ] Animations are short, useful, and reduced-motion aware.
-   [ ] The app does not fake processing progress.
-   [ ] Diff highlights remain readable in long text.
-   [ ] Mobile layout is genuinely usable.
-   [ ] Privacy claims match actual backend behavior.
-   [ ] AI-detector outcomes are not presented as definitive authorship
    proof.
-   [ ] No ElevenLabs logo, exact brand assets, or confusingly similar
    identity is used.

### Source references

-   [ElevenLabs official brand resources](https://elevenlabs.io/brand)
-   [ElevenLabs UI documentation](https://ui.elevenlabs.io/docs)
-   [ElevenLabs public UI components](https://ui.elevenlabs.io/)

**Design direction summary:** Build Ghostwash as a calm, premium writing
studio with an editorial foundation and one memorable "phantom" detail.
Let the user's writing---not the decoration---own the screen.

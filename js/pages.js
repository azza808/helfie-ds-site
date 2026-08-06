(function () {
  function logo() {
    return (
      '<a class="logo" href="#cover" aria-label="Helfie Design System home">' +
      '<img class="logo__mark" src="assets/9c7986a030f38eafc7251c4cc3b1d099ad65a88d.svg" alt="" />' +
      '<img class="logo__word" src="assets/2d7dcf73a945b3ff9b8e620d2c83940c3a37617b.svg" alt="Helfie" />' +
      "</a>"
    );
  }

  function masthead(title, subtitle) {
    return (
      '<header class="masthead">' +
      logo() +
      '<h1 class="masthead__title">' +
      title +
      "</h1>" +
      '<p class="masthead__subtitle">' +
      subtitle +
      "</p>" +
      "</header><hr class=\"rule\" />"
    );
  }

  function footer(meta, nextId, nextLabel) {
    var link = nextId
      ? '<a class="page-link" href="#' + nextId + '">' + nextLabel + "</a>"
      : "";
    return (
      '<hr class="rule" /><footer class="page-footer"><p class="page-footer__note">' +
      meta +
      "</p>" +
      link +
      "</footer>"
    );
  }

  function lead(title, body, noteLabel, noteBody) {
    return (
      '<section class="section lead"><div class="lead__primary"><p class="lead__title">' +
      title +
      '</p><p class="lead__body">' +
      body +
      '</p></div><aside class="note"><p class="note__label">' +
      noteLabel +
      '</p><p class="note__body">' +
      noteBody +
      "</p></aside></section><hr class=\"rule\" />"
    );
  }

  function stub(id, title, subtitle, blurb, nextId, nextLabel) {
    var node = (window.HDS_FIGMA_NODES && window.HDS_FIGMA_NODES[id]) || "";
    return (
      masthead(title, subtitle) +
      '<section class="section lead"><div class="lead__primary"><p class="lead__title">In Figma</p><p class="lead__body">' +
      blurb +
      '</p><p class="lead__body stub-note">Full specimens live on the V5 · Design system canvas. This shell matches that file; open Figma beside the site when reviewing.</p></div>' +
      '<aside class="note"><p class="note__label">FIGMA NODE</p><p class="note__body">' +
      (node || "See V5 · Design system") +
      "</p></aside></section>" +
      footer(
        "Keep Figma open beside this site when reviewing a page that is still being coded out.",
        nextId,
        nextLabel
      )
    );
  }

  function code(html) {
    return (
      '<div class="code-panel"><button type="button" class="code-panel__copy" data-copy>Copy</button><pre class="code-block">' +
      html +
      "</pre></div>"
    );
  }

  /* Toast row: icon · text stack · optional action · optional dismiss — matches 7179:7223 */
  function toastEl(opts) {
    opts = opts || {};
    var type = opts.type || "success";
    var icon =
      type === "success"
        ? "Check-Fill.svg"
        : type === "warning"
          ? "Alert-Fill.svg"
          : type === "error"
            ? "Alert-Fill.svg"
            : "Information-Fill.svg";
    var html =
      '<div class="ds-toast ds-toast--' +
      type +
      '"' +
      (opts.live ? ' data-live="toast-dismiss"' : "") +
      ">" +
      '<img class="ds-toast__icon" src="assets/icons/' +
      icon +
      '" alt="" width="24" height="24" />' +
      '<div class="ds-toast__text">' +
      '<p class="ds-toast__title">' +
      opts.title +
      "</p>";
    if (opts.body) {
      html += '<p class="ds-toast__body">' + opts.body + "</p>";
    }
    html += "</div>";
    if (opts.action) {
      html +=
        '<button type="button" class="ds-toast__action">' +
        opts.action +
        "</button>";
    }
    if (opts.dismiss) {
      html +=
        '<button type="button" class="ds-toast__close"' +
        (opts.live ? " data-toast-close" : "") +
        ' aria-label="Dismiss">' +
        '<img src="assets/icons/Close-Stroke.svg" alt="" width="24" height="24" />' +
        "</button>";
    }
    html += "</div>";
    return html;
  }


  /* Page indicator dots. Static specimens render as spans so only the live
     group is clickable. Active pill 16×6, inactive 6×6, gap 4. */
  function dots(total, active, opts) {
    opts = opts || {};
    var items = "";
    for (var i = 1; i <= total; i += 1) {
      var on = i === active;
      var cls = "ds-stepper__dot" + (on ? " is-active" : "");
      items += opts.live
        ? '<button type="button" class="' +
          cls +
          '" aria-label="Slide ' +
          i +
          " of " +
          total +
          '" aria-current="' +
          (on ? "true" : "false") +
          '"></button>'
        : '<span class="' + cls + '"></span>';
    }
    return (
      '<div class="ds-stepper' +
      (opts.dark ? " ds-stepper--mode-light" : "") +
      '"' +
      (opts.live ? ' data-live="stepper-dots" role="group" aria-label="Page indicator"' : ' aria-hidden="true"') +
      ">" +
      items +
      "</div>"
    );
  }

  function swatchGroup(title, note, items) {
    var cells = items
      .map(function (s) {
        return (
          '<div class="swatch-token"><div class="swatch-token__chip" style="background:' +
          s[1] +
          '"></div><p class="swatch-token__name">' +
          s[0] +
          '</p><p class="swatch-token__hex">' +
          s[2] +
          "</p></div>"
        );
      })
      .join("");
    return (
      '<section class="section"><h2 class="display">' +
      title +
      '</h2><p class="stub-note" style="margin-bottom:20px">' +
      note +
      '</p><div class="specimen"><div class="swatch-token-grid">' +
      cells +
      "</div></div></section>"
    );
  }

  function scaleRows(rows) {
    return rows
      .map(function (r) {
        return (
          '<div class="scale-row"><p class="scale-row__token">' +
          r[0] +
          '</p><p class="scale-row__val">' +
          r[1] +
          '</p><div class="scale-row__bar"><span style="width:' +
          r[1] +
          '"></span></div><p class="scale-row__use">' +
          r[2] +
          "</p></div>"
        );
      })
      .join("");
  }

  window.HDS_PAGES = {
    start: function (meta) {
      return (
        masthead("Start here", "Orientation") +
        '<section class="section lead"><div class="lead__primary"><p class="lead__title">What this is</p><p class="lead__body">This system exists so Helfie feels like one product. It holds the decisions we have already made about structure, language, colour, and behaviour, so that every new screen starts further along than a blank canvas. It covers the consumer experience and Helfie One.</p></div><aside class="note"><p class="note__label">IF YOU READ ONE PAGE</p><p class="note__body">Read Principles. It settles most decisions before they reach a screen.</p></aside></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">How to use this system</h2><div class="steps"><div class="step"><p class="step__num">01</p><p class="step__title">Start with Principles</p><p class="step__body">Read the five principles before you open Figma. They settle most arguments before a screen exists.</p></div><div class="step"><p class="step__num">02</p><p class="step__title">Take from Foundations</p><p class="step__body">Colour, type, spacing, and radius are tokens. Use the token name, never the raw value.</p></div><div class="step"><p class="step__num">03</p><p class="step__title">Compose from components</p><p class="step__body">Build from the library. If nothing fits, propose an extension rather than shipping a one-off.</p></div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Who this is for</h2><div class="def"><p class="def__term">Designers</p><p class="def__detail">The Figma library, the token set, and the patterns to compose from. Propose extensions through design review rather than detaching components.</p></div><hr class="rule" /><div class="def"><p class="def__term">Engineers</p><p class="def__detail">Token names map directly to code. Component specs, states, and behaviour live on each component page alongside the visual.</p></div><hr class="rule" /><div class="def"><p class="def__term">Product and content</p><p class="def__detail">Voice and tone, plus the language we use for health information — including what we never claim on a user’s behalf.</p></div></section>' +
        footer(
          "Questions about anything here go to the design channel, not to a fork of the library.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    philosophy: function (meta) {
      return (
        masthead("Philosophy", "Why we build this way") +
        '<section class="section"><p class="note__label">WHAT WE BELIEVE</p><p class="display display--regular" style="margin-top:18px">Health information is only useful if someone can act on it. Every screen we make is judged by one question: does this make the next step obvious?</p></section><hr class="rule" />' +
        '<section class="section--essay essay"><p class="essay__prose">People come to Helfie at moments that matter — a symptom they are worried about, a result they do not understand. Trust is not built by looking clinical. It is built by being accurate, by showing our working, and by never overstating what we know. When we are uncertain, we say so plainly rather than hiding behind a confident interface.</p><aside class="essay__side"><p class="note__label">ON TRUST</p><p class="step__body">Restraint reads as competence. Overclaiming does not.</p></aside></section><hr class="rule" />' +
        '<section class="section--essay essay"><p class="essay__prose">A health product that shouts creates anxiety. Ours stays quiet so the information can be loud. In practice that means restraint with colour, generous space around anything that matters, and motion used only to explain a change rather than to decorate one.</p><aside class="essay__side"><p class="note__label">ON CALM</p><p class="step__body">The interface recedes so the result can be read.</p></aside></section><hr class="rule" />' +
        '<section class="section--essay essay"><p class="essay__prose">Two audiences, one system. A clinician working in Helfie One and a person checking a result at home should meet the same patterns, even where density and depth differ. Shared structure is what lets us move quickly without asking anyone to relearn the product.</p><aside class="essay__side"><p class="note__label">ON ONE PRODUCT</p><p class="step__body">Consumer and Helfie One are the same language at different densities.</p></aside></section>' +
        footer(
          "These beliefs are abstract on purpose. Principles turn them into decisions you can apply on a Tuesday afternoon.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    principles: function (meta) {
      var rows = [
        ["01", "Clarity over cleverness", "If it needs explaining, redesign it.", "Plain language before clinical language. One idea per screen. Remove the second-best option rather than shrinking it."],
        ["02", "Calm by default", "The interface stays quiet so the health information can be loud.", "Restrained colour, generous space, and motion only where it helps someone understand what just changed."],
        ["03", "One clear next step", "Every screen answers the question: what do I do now?", "A single primary action per screen. Secondary paths stay reachable but never compete for attention."],
        ["04", "Trust lives in the details", "Accuracy, states, and error handling are the brand.", "Design the empty, loading, error, and permission states before the happy path. Never guess a result on the user’s behalf."],
        ["05", "Consistent, not uniform", "Same patterns everywhere; context decides the density.", "Consumer and Helfie One share components and mental models. Density and spacing adapt — the pattern never does."],
      ];
      var html =
        masthead("Principles", "Five non-negotiables") +
        '<section class="section lead"><div class="lead__primary"><p class="lead__title">My compass</p><p class="lead__body">These five principles decide what ships. They are not aspirations and they are not a tone layer applied at the end. When features expand, surfaces multiply, and more stakeholders get involved, they protect structure, clarity, and focus for the person using me — across the consumer experience and Helfie One.</p></div><aside class="note"><p class="note__label">THE TEST</p><p class="note__body">If a decision conflicts with these principles, change the decision — not the principle.</p></aside></section><hr class="rule" />';
      rows.forEach(function (r, i) {
        html +=
          '<section class="section--tight principle"><div class="principle__statement"><p class="principle__num">' +
          r[0] +
          '</p><p class="principle__title">' +
          r[1] +
          '</p><p class="principle__tagline">' +
          r[2] +
          '</p></div><aside class="principle__practice"><p class="note__label">IN PRACTICE</p><p class="principle__practice-body">' +
          r[3] +
          "</p></aside></section>";
        if (i < rows.length - 1) html += '<hr class="rule" />';
      });
      return (
        html +
        footer(
          "Principles are reviewed once a year. Everything else in this system is downstream of them.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    voice: function (meta) {
      var pairs = [
        ["DELIVERING A RESULT", "Your result is outside the typical range. Here is what to do next.", "Abnormal result detected."],
        ["WHEN WE ARE UNSURE", "We could not read this photo clearly. Try again in better light.", "Analysis failed."],
        ["ASKING FOR INFORMATION", "Adding your age lets us give you a more accurate check.", "Please complete all required fields."],
        ["WHEN SOMETHING BREAKS", "That did not save. Check your connection and try again.", "Error 500: the request could not be completed."],
      ];
      var pairHtml = pairs
        .map(function (p, i) {
          return (
            (i ? '<hr class="rule" />' : "") +
            '<div class="say-pair"><p class="say-pair__ctx">' +
            p[0] +
            '</p><div class="say-pair__cols"><div><p class="label">WE SAY</p><p class="body">' +
            p[1] +
            '</p></div><div class="dont"><p class="label muted">WE DO NOT SAY</p><p class="body">' +
            p[2] +
            "</p></div></div></div>"
          );
        })
        .join("");
      var never = [
        "Never diagnose. Helfie indicates and explains; a clinician diagnoses.",
        "Never use urgency or fear as a growth tactic.",
        "Never hide uncertainty behind a confident tone.",
        "Never describe a person by their condition.",
      ]
        .map(function (t) {
          return '<div><span class="dash">—</span><p>' + t + "</p></div>";
        })
        .join("");
      return (
        masthead("Voice & tone", "How Helfie sounds") +
        lead(
          "Words are interface",
          "People read our words at moments when they are already worried. The wrong sentence undoes a good screen. Write as one careful person talking to another — not as a system reporting on itself.",
          "THE TEST",
          "Would you say this out loud to someone sitting across from you?"
        ) +
        '<section class="section"><h2 class="display">How we sound</h2><div class="quality-row"><div><h3>Plain</h3><p>Everyday words. If a clinician word is unavoidable, explain it once.</p></div><div><h3>Warm</h3><p>Human, not chirpy. Concern without hand-holding.</p></div><div><h3>Precise</h3><p>Say exactly what we know and exactly what we do not.</p></div><div><h3>Steady</h3><p>Never alarmist, never falsely reassuring.</p></div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">We say, we do not say</h2>' +
        pairHtml +
        "</section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Never</h2><div class="never-list">' +
        never +
        "</div></section>" +
        footer(
          "Clinical wording is reviewed before release. If a sentence makes a claim about someone’s health, it does not ship on a designer’s judgement alone.",
          meta.next,
          meta.nextLabel
        )
      );
    },

colour: function (meta) {
      var textTokens = [
        ["colour-text-primary", "#111111", "#111111"],
        ["colour-text-secondary", "#3d3d3d", "#3D3D3D"],
        ["colour-text-tertiary", "#666666", "#666666"],
        ["colour-text-disabled", "#666666", "#666666"],
        ["colour-text-inverse-primary", "#ffffff", "#FFFFFF"],
        ["colour-text-inverse-secondary", "#e5e5e5", "#E5E5E5"],
        ["colour-text-inverse-tertiary", "#d1d1d1", "#D1D1D1"],
        ["colour-text-inverse-disabled", "#888888", "#888888"],
        ["colour-text-guidance", "#b8b8b8", "#B8B8B8"],
        ["colour-text-emphasis", "#0537ff", "#0537FF"],
        ["colour-text-success", "#15803d", "#15803D"],
        ["colour-text-warning", "#c2410c", "#C2410C"],
        ["colour-text-error", "#b91c1c", "#B91C1C"],
      ];
      var surfaces = [
        ["colour-fill-neutral", "#ffffff", "#FFFFFF"],
        ["colour-fill-neutral-subtle", "#f5f5f5", "#F5F5F5"],
        ["colour-fill-neutral-strong", "#e5e5e5", "#E5E5E5"],
        ["colour-fill-inverse-neutral", "#262626", "#262626"],
        ["colour-fill-inverse-neutral-subtle", "#666666", "#666666"],
        ["colour-fill-inverse-neutral-strong", "#111111", "#111111"],
        ["colour-fill-accent", "#0537ff", "#0537FF"],
        ["colour-fill-accent-subtle", "#f2f6ff", "#F2F6FF"],
        ["colour-fill-accent-strong", "#cbdafe", "#CBDAFE"],
        ["colour-fill-accent-extra-strong", "#173cc2", "#173CC2"],
        ["colour-fill-info", "#f2f6ff", "#F2F6FF"],
        ["colour-fill-success", "#cfffe0", "#CFFFE0"],
        ["colour-fill-warning", "#ffedd5", "#FFEDD5"],
        ["colour-fill-error", "#fee2e2", "#FEE2E2"],
        ["colour-fill-disabled", "#e5e5e5", "#E5E5E5"],
        ["colour-translucent-neutral", "rgba(255,255,255,0.6)", "#FFFFFF · 60%"],
        ["colour-translucent-neutral-subtle", "rgba(255,255,255,0.4)", "#FFFFFF · 40%"],
        ["colour-translucent-neutral-strong", "rgba(255,255,255,0.8)", "#FFFFFF · 80%"],
        ["colour-translucent-grey", "rgba(245,245,245,0.6)", "#F5F5F5 · 60%"],
        ["colour-translucent-grey-subtle", "rgba(245,245,245,0.4)", "#F5F5F5 · 40%"],
        ["colour-translucent-grey-strong", "rgba(245,245,245,0.8)", "#F5F5F5 · 80%"],
        ["colour-translucent-inverse", "rgba(17,17,17,0.6)", "#111111 · 60%"],
        ["colour-translucent-inverse-subtle", "rgba(17,17,17,0.4)", "#111111 · 40%"],
        ["colour-translucent-inverse-strong", "rgba(17,17,17,0.8)", "#111111 · 80%"],
        ["colour-no-fill", "transparent", "transparent"],
      ];
      var icons = [
        ["colour-icon-primary", "#111111", "#111111"],
        ["colour-icon-inverse-primary", "#ffffff", "#FFFFFF"],
        ["colour-icon-secondary", "#666666", "#666666"],
        ["colour-icon-tertiary", "#888888", "#888888"],
        ["colour-icon-disabled", "#d1d1d1", "#D1D1D1"],
        ["colour-icon-accent", "#0537ff", "#0537FF"],
        ["colour-icon-info", "#0537ff", "#0537FF"],
        ["colour-icon-success", "#00c448", "#00C448"],
        ["colour-icon-warning", "#f97316", "#F97316"],
        ["colour-icon-error", "#dc2626", "#DC2626"],
        ["colour-icon-destructive", "#dc2626", "#DC2626"],
      ];
      var status = [
        ["colour-status-error-ultralight", "#fee2e2", "#FEE2E2"],
        ["colour-status-error-subtle", "#ffc1c1", "#FFC1C1"],
        ["colour-status-error-default", "#dc2626", "#DC2626"],
        ["colour-status-error-emphasis", "#a81616", "#A81616"],
        ["colour-status-error-strong", "#7d1713", "#7D1713"],
        ["colour-status-info-ultralight", "#f2f6ff", "#F2F6FF"],
        ["colour-status-info-subtle", "#cbdafe", "#CBDAFE"],
        ["colour-status-info-default", "#28a5ff", "#28A5FF"],
        ["colour-status-info-emphasis", "#073e96", "#073E96"],
        ["colour-status-info-strong", "#082f73", "#082F73"],
        ["colour-status-success-ultralight", "#cfffe0", "#CFFFE0"],
        ["colour-status-success-subtle", "#9fffc3", "#9FFFC3"],
        ["colour-status-success-default", "#00c448", "#00C448"],
        ["colour-status-success-emphasis", "#15803d", "#15803D"],
        ["colour-status-success-strong", "#0e5e2d", "#0E5E2D"],
        ["colour-status-warning-ultralight", "#ffedd5", "#FFEDD5"],
        ["colour-status-warning-subtle", "#fed7aa", "#FED7AA"],
        ["colour-status-warning-default", "#f97316", "#F97316"],
        ["colour-status-warning-emphasis", "#c2410c", "#C2410C"],
        ["colour-status-warning-strong", "#9a3412", "#9A3412"],
      ];
      return (
        masthead("Colour", "Foundation · Semantic tokens") +
        lead(
          "Semantic names, not paint names",
          "Reach for the token that says what the colour is doing, never the one that says what it looks like. When the palette shifts, everything named by intent moves with it.",
          "SOURCE",
          "Component Library 2026. Semantic Tokens collection, Light and Dark modes."
        ) +
        swatchGroup(
          "Text",
          "Foreground colours. Inverse tokens are for dark and brand surfaces.",
          textTokens
        ) +
        '<hr class="rule" />' +
        swatchGroup(
          "Surfaces",
          "Backgrounds and fills. Translucent tokens carry their own alpha.",
          surfaces
        ) +
        '<hr class="rule" />' +
        swatchGroup(
          "Iconography",
          "Icons track the text scale so a label and its icon stay in step.",
          icons
        ) +
        '<hr class="rule" />' +
        swatchGroup(
          "Status",
          "Five steps per status. Ultralight and subtle are surfaces; the rest are foregrounds.",
          status
        ) +
        footer(
          "Never invent a hex on a screen. If a role is missing, extend the token set — do not hardcode a one-off.",
          meta.next,
          meta.nextLabel
        )
      );
    },

typography: function (meta) {
      var scale = [
        ["Health you can act on", "Display/Regular", "Ubuntu Regular · 36/44 · -0.7", "36px", "400", "-0.7px", "normal"],
        ["Your results, explained", "H1/Regular", "Ubuntu Medium · 32/38 · -0.5", "32px", "500", "-0.5px", "normal"],
        ["Recent checks", "H2/Regular", "Ubuntu Medium · 28/34 · -0.5", "28px", "500", "-0.5px", "normal"],
        ["Skin assessment", "H3/Regular", "Ubuntu Medium · 24/30 · -0.3", "24px", "500", "-0.3px", "normal"],
        ["What we looked at", "H4/Regular", "Ubuntu Medium · 22/28 · -0.3", "22px", "500", "-0.3px", "normal"],
        ["Next steps", "H5/Regular", "Ubuntu Medium · 20/26 · -0.1", "20px", "500", "-0.1px", "normal"],
        ["Before you start", "H6/Regular", "Ubuntu Medium · 18/24 · -0.1", "18px", "500", "-0.1px", "normal"],
      ];
      var body = [
        ["Take a photo in good light and hold steady for a moment.", "Body/Large-Regular", "Ubuntu Regular · 18/24", "18px", "400", "0", "normal"],
        ["Take a photo in good light and hold steady for a moment.", "Body/Medium-Regular", "Ubuntu Regular · 16/22", "16px", "400", "0", "normal"],
        ["Take a photo in good light and hold steady for a moment.", "Body/Small-Regular", "Ubuntu Regular · 14/20", "14px", "400", "0", "normal"],
        ["Results are indicative and not a diagnosis.", "Body/Caption-Regular", "Ubuntu Regular · 12/16", "12px", "400", "0", "normal"],
        ["Start a check", "Label/Large-Regular", "Ubuntu Regular · 18/24 · -0.1", "18px", "400", "-0.1px", "normal"],
        ["Save for later", "Label/Medium-Regular", "Ubuntu Regular · 16/20 · -0.1", "16px", "400", "-0.1px", "normal"],
        ["Not now", "Label/Small-Regular", "Ubuntu Regular · 14/16 · -0.1", "14px", "400", "-0.1px", "normal"],
      ];
      var weights = [
        ["Skin assessment", "H3/Light", "Ubuntu Regular · quiet headings", "24px", "400", "-0.3px", "normal"],
        ["Skin assessment", "H3/Regular", "Ubuntu Medium · the default", "24px", "500", "-0.3px", "normal"],
        ["Skin assessment", "H3/Emphasis", "Ubuntu Bold · use sparingly", "24px", "700", "-0.3px", "normal"],
        ["Skin assessment", "H3/Italic", "Ubuntu Medium Italic · quotes only", "24px", "500", "-0.3px", "italic"],
      ];
      function typeBlock(rows) {
        return rows
          .map(function (r) {
            return (
              '<div class="type-row"><p class="type-row__sample" style="font-size:' +
              r[3] +
              ";font-weight:" +
              r[4] +
              ";letter-spacing:" +
              (r[5] || "0") +
              ";font-style:" +
              (r[6] || "normal") +
              '">' +
              r[0] +
              '</p><p class="type-row__meta"><strong>' +
              r[1] +
              "</strong><br />" +
              r[2] +
              "</p></div>"
            );
          })
          .join("");
      }
      return (
        masthead("Typography", "Foundation · 46 styles") +
        lead(
          "One family, carefully spaced",
          "Ubuntu carries everything. Every style below is bound to the published library style, so these specimens cannot drift out of date — change the style and this page changes with it.",
          "SOURCE",
          "All 46 styles are responsive. Size is bound to the Device collection and steps down across XS & SM, MD, and LG & XL. Values shown are LG & XL."
        ) +
        '<section class="section"><h2 class="display">Scale</h2><p class="stub-note" style="margin-bottom:20px">Display down to H6. Every step mirrors the published style.</p><div class="specimen">' +
        typeBlock(scale) +
        "</div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Body and labels</h2><p class="stub-note" style="margin-bottom:20px">Body is for reading. Labels are for controls — tighter leading, slight negative tracking.</p><div class="specimen">' +
        typeBlock(body) +
        "</div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Weight</h2><p class="stub-note" style="margin-bottom:20px">One size, four weights. Change weight before you change size.</p><div class="specimen">' +
        typeBlock(weights) +
        "</div></section>" +
        footer(
          "Never invent a size between steps. If the hierarchy is wrong, change the content structure — not the type size.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    spacing: function (meta) {
      var rows = [
        ["spacing-padding-2xs", "2px", "Hairline gaps. Icon to its own label."],
        ["spacing-padding-xs", "4px", "Tight pairs that belong together."],
        ["spacing-padding-sm", "8px", "Label to field. The default small gap."],
        ["spacing-padding-md", "12px", "Inside compact controls."],
        ["spacing-padding-lg", "16px", "Standard padding inside a card."],
        ["spacing-padding-xl", "24px", "Between grouped items in a list."],
        ["spacing-padding-2xl", "32px", "Between distinct blocks."],
        ["spacing-padding-3xl", "48px", "Section padding on larger screens."],
        ["spacing-padding-4xl", "64px", "Between major sections."],
        ["spacing-padding-5xl", "128px", "Page top and bottom margin."],
      ];
      return (
        masthead("Spacing", "Foundation · 10 steps") +
        lead(
          "Rhythm, not guesswork",
          "Every gap comes from the same ten steps, built on a 4pt base. If a value is not on the scale, the layout is telling you something is wrong — not that the scale needs another number.",
          "SOURCE",
          "Padding and margin share identical values. Padding is space inside a container; margin is space outside it."
        ) +
        '<section class="section"><h2 class="display">Scale</h2><p class="stub-note" style="margin-bottom:20px">Drawn at 1:1. The bar is the value.</p><div class="specimen">' +
        scaleRows(rows) +
        "</div></section>" +
        footer(
          "Bars below are drawn at true size. A 2px bar really is 2px wide.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    radius: function (meta) {
      var items = [
        ["base-radius-none", "0", "0px · Tables, full-bleed media."],
        ["base-radius-2xs", "4px", "4px · Tags and small indicators."],
        ["base-radius-xs", "8px", "8px · Inputs and swatches."],
        ["base-radius-sm", "12px", "12px · Buttons and compact cards."],
        ["base-radius-md", "16px", "16px · Standard cards."],
        ["base-radius-lg", "24px", "24px · Sheets and large surfaces."],
        ["base-radius-xl", "32px", "32px · Modals and hero panels."],
        ["base-radius-full", "999px", "999px · Pills, chips, avatars."],
      ];
      var grid = items
        .map(function (r) {
          return (
            '<div class="radius-item"><div class="radius-item__tile" style="border-radius:' +
            r[1] +
            '"></div><p>' +
            r[0] +
            '</p><p class="use">' +
            r[2] +
            "</p></div>"
          );
        })
        .join("");
      return (
        masthead("Corner radius", "Foundation · 8 steps") +
        lead(
          "Softness with a system",
          "Radius signals how solid something is. Flat edges read as structure, generous curves read as an object you could pick up. Eight steps cover everything — there is no ninth.",
          "SOURCE",
          "Built on the same 4pt base as spacing. base-radius-full resolves to 999 so it always renders as a true pill."
        ) +
        '<section class="section"><h2 class="display">Scale</h2><p class="stub-note" style="margin-bottom:20px">Each tile has its corner bound to the token, so these are the real values.</p><div class="specimen"><div class="radius-grid">' +
        grid +
        "</div></div></section>" +
        footer(
          "28px appears in the Grid system 4pt scale but not in the corner-radius tokens. This site uses it for panels; product surfaces should stay on the eight steps above.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    elevation: function (meta) {
      return (
        masthead("Elevation", "Foundation · 3 levels, 1 material") +
        lead(
          "Height means urgency",
          "Shadow is a claim about importance. The higher something floats, the more it is interrupting. Three levels is enough — if you need a fourth, the screen is doing too much at once.",
          "SOURCE",
          "Published as effect styles, not variables. Apply the style rather than typing a shadow by hand."
        ) +
        '<section class="section"><h2 class="display">Levels</h2><p class="stub-note" style="margin-bottom:20px">Shown on a subtle surface so the shadow is readable.</p><div class="specimen" style="background:#f5f5f5"><div class="elev-grid">' +
        '<div class="elev-item"><div class="elev-card elev-card--stacked"></div><p>Elevation/Stacked</p><p class="use">Blur 8 · y 0 · 12%</p><p class="use">Cards sitting in a list. Separation without lift.</p></div>' +
        '<div class="elev-item"><div class="elev-card elev-card--surface"></div><p>Elevation/Surface</p><p class="use">Blur 8 · y 2 · 6%</p><p class="use">A surface resting on the page. The quietest level.</p></div>' +
        '<div class="elev-item"><div class="elev-card elev-card--floating"></div><p>Elevation/Floating</p><p class="use">Blur 24 · y 4 · 12%</p><p class="use">Modals, sheets, menus. Something is waiting on you.</p></div>' +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Material</h2><p class="stub-note" style="margin-bottom:20px">Frosted blurs whatever sits behind it. It needs something behind it to be worth using.</p><div class="frosted-demo"><div class="frosted-demo__bands"><span style="background:#0537ff"></span><span style="background:#00c448"></span><span style="background:#f97316"></span><span style="background:#dc2626"></span></div><div class="frosted-demo__panel">Material/Frosted · background blur 24</div></div></section>' +
        footer(
          "Never use shadow as decoration. If nothing is floating above anything, it stays flat.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    grid: function (meta) {
      var bps = [
        ["XS", "Mobile", "320 – 479px", "4", "16px", "16px", "288px"],
        ["S", "Small Tablet", "480 – 767px", "4", "32px", "16px", "416px"],
        ["M", "Large Tablet", "768 – 1279px", "8", "32px", "16px", "704px"],
        ["L", "Desktop", "1280 – 1439px", "12", "200px", "24px", "880px"],
        ["XL", "Wide Desktop", "1440px +", "12", "198px", "24px", "1044px"],
      ];
      var rows = bps
        .map(function (r) {
          return (
            "<tr>" +
            r.map(function (c) { return "<td>" + c + "</td>"; }).join("") +
            "</tr>"
          );
        })
        .join("");
      return (
        masthead("Grid", "Foundation · 5 breakpoints") +
        lead(
          "Snap, never interpolate",
          "Each breakpoint has its own column count, margin and gutter. Move between them in steps, not by scaling — a layout that stretches smoothly between breakpoints is a layout that is wrong at both ends.",
          "SOURCE",
          "Component Library 2026, Grid system. Every increment sits on a 4pt base and is available as a variable."
        ) +
        '<section class="section"><h2 class="display">Breakpoints</h2><p class="stub-note" style="margin-bottom:20px">Column width is derived. Set margin, gutter and column count; let the columns fall out of that.</p><div class="specimen"><table class="bp-table"><thead><tr><th>BP</th><th>Name</th><th>Viewport</th><th>Cols</th><th>Margin</th><th>Gutter</th><th>Content</th></tr></thead><tbody>' +
        rows +
        "</tbody></table></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Sidebar patterns</h2><p class="stub-note" style="margin-bottom:20px">On L and XL, the wide left margin can hold a rail. Content still starts at the same x as a page without a sidebar.</p><div class="specimen"><table class="bp-table"><thead><tr><th>BP</th><th>Pattern</th><th>Rail</th><th>Gap</th><th>Use</th></tr></thead><tbody><tr><td>L–XL</td><td>Docs / settings</td><td>125–160px</td><td>24–48px</td><td>Persistent navigation beside content</td></tr><tr><td>M</td><td>Collapsible</td><td>Drawer</td><td>—</td><td>Open on demand; do not shrink content permanently</td></tr><tr><td>XS–S</td><td>None</td><td>—</td><td>—</td><td>Full-width content; nav moves to header or sheet</td></tr></tbody></table></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Snap layouts to the breakpoint table</li><li>Keep content width derived from margin + gutter + columns</li><li>Reuse the same XL content width (1044) across docs pages</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Interpolate column counts between breakpoints</li><li>Shrink gutters to fit one more card</li><li>Invent a sixth breakpoint for a single screen</li></ul></div></div></section>' +
        footer(
          "This documentation site is laid out on the XL grid: 198px margin, 1044px content.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    logo: function (meta) {
      return (
        masthead("Logo", "Atoms · 5 components, 22 variants") +
        lead(
          "Four lockups, one mark",
          "Use the horizontal lockup unless something physically stops you. The other three exist for real constraints — a narrow column, an app icon, a partner sign-off — not for variety.",
          "SOURCE",
          "Component Library 2026. Horizontal, Vertical, Logomark, Logotype and Partner lockups."
        ) +
        '<section class="section"><h2 class="display">Lockups</h2><p class="stub-note" style="margin-bottom:20px">Horizontal is the default. Everything else answers a constraint.</p><div class="specimen" style="background:#f5f5f5"><div class="sel-grid">' +
        '<div class="sel-item"><strong>HORIZONTAL</strong><div style="padding:20px;margin:12px 0;background:#0537ff;border-radius:16px">' +
        logo() +
        '</div><p>Default for headers, docs, and marketing.</p></div>' +
        '<div class="sel-item"><strong>LOGOMARK</strong><div style="padding:20px;margin:12px 0;background:#0537ff;border-radius:16px"><img class="logo__mark" src="assets/9c7986a030f38eafc7251c4cc3b1d099ad65a88d.svg" alt="Helfie mark" style="height:44px;width:auto" /></div><p>App icons, favicons, and tight spaces.</p></div>' +
        '<div class="sel-item"><strong>LOGOTYPE</strong><div style="padding:20px;margin:12px 0;background:#0537ff;border-radius:16px"><img class="logo__word" src="assets/2d7dcf73a945b3ff9b8e620d2c83940c3a37617b.svg" alt="Helfie" style="height:22px;width:auto" /></div><p>When the mark is already nearby.</p></div>' +
        '<div class="sel-item"><strong>STYLES</strong><p style="margin-top:12px">Brand coloured · Mono · Mono-Reversed</p><p>Pick by surface contrast, not preference. Reversed for accent and dark fills.</p></div>' +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Prefer the horizontal lockup</li><li>Keep clear space around the mark</li><li>Use Mono-Reversed on colour-fill-accent</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Restyle, recolour, or outline the mark</li><li>Stretch or rotate any lockup</li><li>Swap in a custom wordmark</li></ul></div></div></section>' +
        footer(
          "Partner lockups and minimum sizes are specified in the Component Library 2026 Logo page.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    iconography: function (meta) {
      var sizes = [
        ["16px", "Dense lists and tight UI"],
        ["24px", "Default. Most UI icons"],
        ["32px", "Emphasised actions"],
        ["40px", "Large controls"],
        ["44px", "Smallest comfortable touch target"],
        ["48px", "Feature moments"],
        ["56px", "Hero and empty states"],
      ];
      var sizeHtml = sizes
        .map(function (s) {
          var n = parseInt(s[0], 10);
          return (
            '<div class="sel-item"><strong>' +
            s[0].toUpperCase() +
            '</strong><div class="icon-size" style="width:' +
            n +
            "px;height:" +
            n +
            'px" aria-hidden="true"></div><p>' +
            s[1] +
            "</p></div>"
          );
        })
        .join("");
      var notes = {
        "AI Health Checks":
          "Named for the check they represent. One icon per check, never reused for another.",
      };
      var groups = window.HDS_ICON_GROUPS || [];
      var groupHtml = groups
        .map(function (g) {
          var note =
            notes[g.name] ||
            "Published library names. Open the matching frame in Figma for the live glyph.";
          var files = window.HDS_ICON_FILES || {};
          var cells = (g.icons || [])
            .map(function (name) {
              var safe = String(name)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
              var file = files[name];
              var mark = file
                ? '<img class="icon-cell__img" src="assets/icons/' +
                  encodeURIComponent(file).replace(/%2F/g, "/") +
                  '" alt="" width="24" height="24" loading="lazy" />'
                : '<span class="icon-cell__mark" aria-hidden="true"></span>';
              return (
                '<div class="icon-cell">' +
                mark +
                '<code class="icon-cell__name">' +
                safe +
                "</code></div>"
              );
            })
            .join("");
          return (
            '<section class="section"><h2 class="display">' +
            g.name +
            '</h2><p class="stub-note" style="margin-bottom:20px">' +
            note +
            '</p><div class="specimen"><div class="icon-grid">' +
            cells +
            '</div></div></section><hr class="rule" />'
          );
        })
        .join("");
      return (
        masthead("Iconography", "Atoms · 278 published icons in 22 groups, plus Icon Slot") +
        lead(
          "One idea, one icon, one name",
          "The set is large because health is specific — a blood-pressure cuff is not a heart, and a heart is not a pulse. Search the name before you draw anything new — it almost certainly exists.",
          "SOURCE",
          "Component Library 2026. Every icon below is a live instance from the published library — not a redraw."
        ) +
        '<section class="section"><h2 class="display">Size</h2><p class="stub-note" style="margin-bottom:20px">Icon Slot holds every icon at a fixed size. 24px is the default; 44px is the smallest comfortable touch target.</p><div class="specimen"><div class="sel-grid">' +
        sizeHtml +
        '</div></div></section><hr class="rule" />' +
        groupHtml +
        footer(
          "Icons never carry meaning alone. Pair one with a label unless the control is universally understood.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    button: function (meta) {
      return (
        masthead("Button", "Molecule · 108 variants") +
        lead(
          "One primary action per screen",
          "Buttons commit someone to something. Every screen gets one Primary and no more — if two actions both look primary, neither is. Secondary carries the reasonable alternative; Tertiary carries the escape route.",
          "SOURCE",
          "Component Library 2026 · live instances on V5 Button page (51:3)"
        ) +
        '<section class="section"><h2 class="display">Status</h2><div class="specimen"><p class="specimen__label">Variants</p><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg">Start a check</button><p class="specimen__caption"><strong>Primary</strong>The one commit on the screen</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--secondary ds-button--lg">Save for later</button><p class="specimen__caption"><strong>Secondary</strong>The reasonable alternative</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--tertiary ds-button--lg">Not now</button><p class="specimen__caption"><strong>Tertiary</strong>The escape route</p></div></div></div>' +
        code('&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg</span>"&gt;Start a check&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--secondary ds-button--lg</span>"&gt;Save for later&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--tertiary ds-button--lg</span>"&gt;Not now&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Size</h2><div class="specimen"><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--xl">Start a check</button><p class="specimen__caption"><strong>Large</strong>56px</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg">Start a check</button><p class="specimen__caption"><strong>Medium</strong>48px</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--md">Start a check</button><p class="specimen__caption"><strong>Small</strong>40px · full radius</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--sm">Start a check</button><p class="specimen__caption"><strong>XSmall</strong>32px · full radius</p></div></div></div>' +
        code('&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--xl</span>"&gt;…&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg</span>"&gt;…&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--md</span>"&gt;…&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--sm</span>"&gt;…&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">State</h2><div class="specimen"><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg">Start a check</button><p class="specimen__caption"><strong>Default</strong></p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--lg ds-button--disabled" disabled>Start a check</button><p class="specimen__caption"><strong>Disabled</strong></p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--destructive ds-button--lg">Delete result</button><p class="specimen__caption"><strong>Destructive</strong></p></div></div></div>' +
        code('&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg</span>"&gt;Start a check&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--disabled</span>" disabled&gt;Start a check&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--destructive ds-button--lg</span>"&gt;Delete result&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Type</h2><p class="stub-note" style="margin-bottom:20px">Three shapes from the library: text only, icon beside the label, or icon alone. Icon uses the Add glyph at 24px (20px on XSmall icon+text).</p><div class="specimen"><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg">Start a check</button><p class="specimen__caption"><strong>Text</strong>Label only</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg ds-button--icon-text" style="--ds-button-icon:url(\'assets/icons/Add.svg\')"><span class="ds-button__icon" aria-hidden="true"></span>Add</button><p class="specimen__caption"><strong>Icon+text</strong>24px icon · 8px gap</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg ds-button--icon" style="--ds-button-icon:url(\'assets/icons/Add.svg\')" aria-label="Add"><span class="ds-button__icon" aria-hidden="true"></span><span class="ds-button__label">Add</span></button><p class="specimen__caption"><strong>Icon</strong>48×48 circle</p></div></div></div>' +
        code('&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg ds-button--icon-text</span>" style="--ds-button-icon:url(\'assets/icons/Add.svg\')"&gt;\n  &lt;span class="<span class="tok">ds-button__icon</span>" aria-hidden="true"&gt;&lt;/span&gt;Add\n&lt;/button&gt;\n&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg ds-button--icon</span>" aria-label="Add" style="--ds-button-icon:url(\'assets/icons/Add.svg\')"&gt;\n  &lt;span class="<span class="tok">ds-button__icon</span>"&gt;&lt;/span&gt;\n&lt;/button&gt;') +
        '<div class="specimen" style="margin-top:20px"><p class="specimen__label">Icon across sizes</p><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--xl ds-button--icon" style="--ds-button-icon:url(\'assets/icons/Add.svg\')" aria-label="Add large"><span class="ds-button__icon" aria-hidden="true"></span></button><p class="specimen__caption"><strong>Large</strong>56px</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--lg ds-button--icon" style="--ds-button-icon:url(\'assets/icons/Add.svg\')" aria-label="Add medium"><span class="ds-button__icon" aria-hidden="true"></span></button><p class="specimen__caption"><strong>Medium</strong>48px</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--md ds-button--icon" style="--ds-button-icon:url(\'assets/icons/Add.svg\')" aria-label="Add small"><span class="ds-button__icon" aria-hidden="true"></span></button><p class="specimen__caption"><strong>Small</strong>40px</p></div><div class="specimen__item"><button type="button" class="ds-button ds-button--primary ds-button--sm ds-button--icon" style="--ds-button-icon:url(\'assets/icons/Add.svg\')" aria-label="Add xsmall"><span class="ds-button__icon" aria-hidden="true"></span></button><p class="specimen__caption"><strong>XSmall</strong>32px</p></div></div></div>' +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live playground</h2><p class="stub-note" style="margin-bottom:20px">Tap a variant. Specimens stay clickable; this row reports what you chose.</p><p class="live-status" data-live="status-line" aria-live="polite">Click a button below…</p><div class="specimen" data-live="button-playground"><div class="specimen__row"><button type="button" class="ds-button ds-button--primary ds-button--lg">Primary</button><button type="button" class="ds-button ds-button--secondary ds-button--lg">Secondary</button><button type="button" class="ds-button ds-button--tertiary ds-button--lg">Tertiary</button><button type="button" class="ds-button ds-button--destructive ds-button--lg">Destructive</button></div></div>' +
        code('&lt;p class="<span class="tok">live-status</span>" data-live="<span class="tok">status-line</span>" aria-live="polite"&gt;…&lt;/p&gt;\n&lt;button class="<span class="tok">ds-button ds-button--primary ds-button--lg</span>"&gt;Primary&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Label the outcome, not the mechanism</li><li>Keep one Primary per screen</li><li>Match size to the density of the surface</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Stack two Primary buttons side by side</li><li>Invent a size outside the scale</li><li>Use Destructive for reversible cancels</li></ul></div></div></section>' +
        footer(
          "Full axes: Type (Text, Icon+text, Icon) × Size × Status × State.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    fields: function (meta) {
      return (
        masthead("Fields", "Component · 4 field types") +
        lead(
          "Ask for the least you need",
          "Fields collect answers. Every part except the input is optional — add only what the question needs.",
          "SOURCE",
          "Component Library 2026. Types, states, anatomy, and usage."
        ) +
        '<section class="section"><h2 class="display">Live fields</h2><p class="stub-note" style="margin-bottom:20px">Default, focused helper, and error that clears once you type more than two characters.</p><div class="specimen"><div class="specimen__row" style="align-items:flex-start">' +
        '<div class="ds-field" data-live="field"><label class="ds-field__label" for="live-f1">Full name</label><input class="ds-field__input" id="live-f1" placeholder="As on your ID" autocomplete="name" /><p class="ds-field__hint">We use this on your result summary.</p></div>' +
        '<div class="ds-field ds-field--error" data-live="field" data-min-length="3"><label class="ds-field__label" for="live-f2">Postcode</label><input class="ds-field__input" id="live-f2" value="X" aria-invalid="true" /><p class="ds-field__error">Enter at least three characters.</p></div>' +
        '<div class="ds-field" data-live="field"><label class="ds-field__label" for="live-f3">Notes</label><textarea class="ds-field__input" id="live-f3" placeholder="Optional context"></textarea><p class="ds-field__hint">Multiline when the answer is longer than a line.</p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-field</span>" data-live="<span class="tok">field</span>"&gt;\n  &lt;label class="<span class="tok">ds-field__label</span>" for="id"&gt;Label&lt;/label&gt;\n  &lt;input class="<span class="tok">ds-field__input</span>" id="id" /&gt;\n  &lt;p class="<span class="tok">ds-field__hint</span>"&gt;Helper&lt;/p&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">States</h2><p class="stub-note" style="margin-bottom:20px">Shown on the single-line field as static specimens. All four types share this model.</p><div class="specimen"><div class="specimen__row" style="align-items:flex-start">' +
        '<div class="specimen__item"><div class="ds-field"><label class="ds-field__label" for="f1">Label</label><input class="ds-field__input" id="f1" placeholder="Placeholder" readonly /><p class="ds-field__hint">Helper text goes here</p></div><p class="specimen__caption"><strong>Default</strong>Empty, waiting for an answer</p></div>' +
        '<div class="specimen__item"><div class="ds-field"><label class="ds-field__label" for="f2">Label</label><input class="ds-field__input" id="f2" value="Ellery Bahar" readonly /><p class="ds-field__hint">Helper text goes here</p></div><p class="specimen__caption"><strong>Filled</strong>Carries what was typed</p></div>' +
        '<div class="specimen__item"><div class="ds-field ds-field--error"><label class="ds-field__label" for="f3">Label</label><input class="ds-field__input" id="f3" value="X" aria-invalid="true" readonly /><p class="ds-field__error">Something needs fixing</p></div><p class="specimen__caption"><strong>Error</strong>Message says how to fix it</p></div>' +
        '<div class="specimen__item"><div class="ds-field"><label class="ds-field__label" for="f4">Label</label><input class="ds-field__input" id="f4" value="Not editable" disabled /><p class="ds-field__hint">Say elsewhere how to enable it</p></div><p class="specimen__caption"><strong>Disabled</strong>Unavailable, not hidden</p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-field ds-field--error</span>"&gt;\n  &lt;input class="<span class="tok">ds-field__input</span>" aria-invalid="true" /&gt;\n  &lt;p class="<span class="tok">ds-field__error</span>"&gt;Something needs fixing&lt;/p&gt;\n&lt;/div&gt;\n&lt;input class="<span class="tok">ds-field__input</span>" disabled /&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Anatomy</h2><p class="stub-note" style="margin-bottom:20px">Every part is optional except the input itself. Add only what the question needs.</p>' +
        '<div class="def"><p class="def__term">Title</p><p class="def__detail">What is being asked. Visible, not a placeholder.</p></div><hr class="rule" />' +
        '<div class="def"><p class="def__term">Input text</p><p class="def__detail">What the person actually typed.</p></div><hr class="rule" />' +
        '<div class="def"><p class="def__term">Display text</p><p class="def__detail">A hint of the expected shape. Never the label.</p></div><hr class="rule" />' +
        '<div class="def"><p class="def__term">Instruction text</p><p class="def__detail">Rules stated before the mistake, not after.</p></div><hr class="rule" />' +
        '<div class="def"><p class="def__term">Helper text</p><p class="def__detail">Why you are asking, when that is not obvious.</p></div><hr class="rule" />' +
        '<div class="def"><p class="def__term">Error message</p><p class="def__detail">What went wrong and how to fix it.</p></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Label every field visibly. Placeholders disappear exactly when they are needed.</li><li>Size the field to the answer — a postcode field should not be as wide as an address.</li><li>Say what went wrong and how to fix it. “Invalid input” helps nobody.</li><li>Allow the messy real answer: hyphens, apostrophes, spaces, no middle name.</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Use a placeholder as the label</li><li>Mark errors with colour alone — the message carries the meaning</li><li>Disable a field without saying elsewhere how to enable it</li><li>Ask for information you will not use</li></ul></div></div></section>' +
        footer(
          "Single-line carries 63 variants across five axes. Reach for the simplest one that answers the question.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    selection: function (meta) {
      return (
        masthead("Selection controls", "Atoms · 4 components, 23 variants") +
        lead(
          "Pick the control that matches the choice",
          "Checkbox for many, radio for one, toggle for a setting that applies the moment it is flipped. Getting this wrong makes people undo things they never meant to do.",
          "SOURCE",
          "Component Library 2026. Checkbox, Radio Button, Toggle and Selection Item."
        ) +
        '<section class="section"><h2 class="display">States</h2><p class="stub-note" style="margin-bottom:20px">Static specimens of every state, across all three controls. Nothing here responds — the live sections are below.</p><div class="specimen" data-live="checkbox-static"><p class="specimen__label">Checkbox</p><div class="specimen__row">' +
        '<div class="specimen__item"><span class="ds-check"><span class="ds-check__box"></span> Unselected</span><p class="specimen__caption"><strong>Unselected</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-check"><span class="ds-check__box is-on"></span> Selected</span><p class="specimen__caption"><strong>Selected</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-check"><span class="ds-check__box is-partial"></span> Partial</span><p class="specimen__caption"><strong>Partial</strong>Some children selected</p></div>' +
        '<div class="specimen__item"><span class="ds-check" style="opacity:.45"><span class="ds-check__box"></span> Disabled</span><p class="specimen__caption"><strong>Disabled</strong></p></div>' +
        '</div></div><div class="specimen"><p class="specimen__label">Radio button</p><div class="specimen__row">' +
        '<div class="specimen__item"><span class="ds-check"><span class="ds-radio__dot"></span> Unselected</span><p class="specimen__caption"><strong>Unselected</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-check"><span class="ds-radio__dot is-on"></span> Selected</span><p class="specimen__caption"><strong>Selected</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-check" style="opacity:.45"><span class="ds-radio__dot"></span> Disabled</span><p class="specimen__caption"><strong>Disabled</strong></p></div>' +
        '</div></div><div class="specimen"><p class="specimen__label">Toggle</p><div class="specimen__row">' +
        '<div class="specimen__item"><span class="ds-toggle" role="switch" aria-checked="false" aria-disabled="true"></span><p class="specimen__caption"><strong>Off · Large</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-toggle is-on" role="switch" aria-checked="true" aria-disabled="true"></span><p class="specimen__caption"><strong>On · Large</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-toggle ds-toggle--sm" role="switch" aria-checked="false" aria-disabled="true"></span><p class="specimen__caption"><strong>Off · Small</strong></p></div>' +
        '<div class="specimen__item"><span class="ds-toggle ds-toggle--sm is-on" role="switch" aria-checked="true" aria-disabled="true"></span><p class="specimen__caption"><strong>On · Small</strong></p></div>' +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Checkbox</h2><p class="stub-note" style="margin-bottom:20px">Tap to toggle. Partial demo cycles a third state when marked.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>LIVE</strong><label class="ds-check ds-check--input"><input type="checkbox" class="ds-check-input" /><span class="ds-check__box"></span> Email me updates</label></div>' +
        '<div class="sel-item" data-partial="true"><strong>PARTIAL DEMO</strong><span class="ds-check"><span class="ds-check__box"></span> Some children selected</span></div>' +
        '<div class="sel-item" data-live="checkbox-static"><strong>DISABLED</strong><span class="ds-check" style="opacity:.45"><span class="ds-check__box"></span> Option</span></div>' +
        '</div></div>' +
        code('&lt;label class="<span class="tok">ds-check ds-check--input</span>"&gt;\n  &lt;input type="checkbox" class="<span class="tok">ds-check-input</span>" /&gt;\n  &lt;span class="<span class="tok">ds-check__box</span>"&gt;&lt;/span&gt;\n  Label\n&lt;/label&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Radio button</h2><p class="stub-note" style="margin-bottom:20px">One choice from a set. Tap a row to select.</p><div class="specimen"><div class="sel-grid" data-live="radio-group">' +
        '<div class="sel-item"><span class="ds-check"><span class="ds-radio__dot is-on"></span> Daily summary</span></div>' +
        '<div class="sel-item"><span class="ds-check"><span class="ds-radio__dot"></span> Weekly only</span></div>' +
        '<div class="sel-item"><span class="ds-check"><span class="ds-radio__dot"></span> Never</span></div>' +
        '</div></div>' +
        code('&lt;div data-live="<span class="tok">radio-group</span>"&gt;\n  &lt;span class="<span class="tok">ds-check</span>"&gt;&lt;span class="<span class="tok">ds-radio__dot is-on</span>"&gt;&lt;/span&gt; Option&lt;/span&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Toggle</h2><p class="stub-note" style="margin-bottom:20px">Switch role — applies immediately in product; here it only toggles on screen.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>REMINDERS</strong><span class="ds-check">Off<button type="button" class="ds-toggle ds-toggle--sm" role="switch" aria-checked="false" data-live="toggle"></button></span></div>' +
        '<div class="sel-item"><strong>REMINDERS ON</strong><span class="ds-check">On<button type="button" class="ds-toggle ds-toggle--sm is-on" role="switch" aria-checked="true" data-live="toggle"></button></span></div>' +
        '<div class="sel-item"><strong>LARGE</strong><button type="button" class="ds-toggle" role="switch" aria-checked="false" data-live="toggle" aria-label="Large toggle"></button></div>' +
        '</div></div>' +
        code('&lt;button type="button" class="<span class="tok">ds-toggle</span>" role="switch" aria-checked="false" data-live="<span class="tok">toggle</span>"&gt;&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Selection item</h2><p class="stub-note" style="margin-bottom:20px">A labelled row that wraps a checkbox for denser lists.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item" style="border:1px solid #d1d1d1;border-radius:16px;padding:12px 16px;background:#fff"><label class="ds-check ds-check--input"><input type="checkbox" class="ds-check-input" /><span class="ds-check__box"></span> Label with checkbox</label></div>' +
        '<div class="sel-item" style="border:1px solid #0537ff;border-radius:16px;padding:12px 16px;background:#f2f6ff"><label class="ds-check ds-check--input"><input type="checkbox" class="ds-check-input" checked /><span class="ds-check__box is-on"></span> Selected</label></div>' +
        "</div></div>" +
        code('&lt;label class="<span class="tok">ds-check ds-check--input</span>"&gt;&lt;input type="checkbox" class="<span class="tok">ds-check-input</span>" /&gt;&lt;span class="<span class="tok">ds-check__box</span>"&gt;&lt;/span&gt; Label&lt;/label&gt;') +
        '</section>' +
        footer(
          "If the choice is many-of-many, use checkbox. If it is one-of-many, use radio. If it is an immediate setting, use toggle.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    chips: function (meta) {
      return (
        masthead("Chips", "Atom · 8 variants") +
        lead(
          "A filter, not a button",
          "Chips narrow a set. They do not submit, save, or navigate. Selection must be obvious at a glance.",
          "SOURCE",
          "Component Library 2026. Selected state, indicator, and usage."
        ) +
        '<section class="section"><h2 class="display">Live filter group</h2><p class="stub-note" style="margin-bottom:20px">Multi-select — tap chips to apply or clear filters.</p><div class="specimen"><div class="specimen__row" data-live="chip-group" data-mode="multi"><button type="button" class="ds-chip ds-chip--selected">All</button><button type="button" class="ds-chip">Skin</button><button type="button" class="ds-chip">Heart</button><button type="button" class="ds-chip">Sleep</button></div></div>' +
        code('&lt;div data-live="<span class="tok">chip-group</span>" data-mode="<span class="tok">multi</span>"&gt;\n  &lt;button type="button" class="<span class="tok">ds-chip ds-chip--selected</span>"&gt;All&lt;/button&gt;\n  &lt;button type="button" class="<span class="tok">ds-chip</span>"&gt;Skin&lt;/button&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Selected state</h2><p class="stub-note" style="margin-bottom:20px">Selection is the whole job. The chosen state has to be unmistakable at a glance.</p><div class="specimen"><div class="specimen__row"><div class="specimen__item"><button type="button" class="ds-chip">Filter</button><p class="specimen__caption"><strong>Unselected</strong>1px border · tertiary text</p></div><div class="specimen__item"><button type="button" class="ds-chip ds-chip--selected">Selected</button><p class="specimen__caption"><strong>Selected</strong>Inverse fill (#111) · white label</p></div></div></div>' +
        code('&lt;button type="button" class="<span class="tok">ds-chip</span>"&gt;Filter&lt;/button&gt;\n&lt;button type="button" class="<span class="tok">ds-chip ds-chip--selected</span>"&gt;Selected&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Indicator</h2><p class="stub-note" style="margin-bottom:20px">Clinical status attached to a filter. Colour reinforces the meaning; it never carries it alone.</p><div class="specimen"><div class="specimen__row"><button type="button" class="ds-chip">None</button><button type="button" class="ds-chip"><span class="ds-chip__dot" aria-hidden="true"></span>Good</button><button type="button" class="ds-chip"><span class="ds-chip__dot ds-chip__dot--concerning" aria-hidden="true"></span>Concerning</button><button type="button" class="ds-chip"><span class="ds-chip__dot ds-chip__dot--critical" aria-hidden="true"></span>Critical</button></div></div>' +
        code('&lt;button type="button" class="<span class="tok">ds-chip</span>"&gt;\n  &lt;span class="<span class="tok">ds-chip__dot ds-chip__dot--critical</span>" aria-hidden="true"&gt;&lt;/span&gt;Critical\n&lt;/button&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Keep labels to one or two words</li><li>Show selected state with shape and fill, not colour alone</li><li>Put the most-used filters first</li><li>Let someone clear every chip in one tap</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Use a chip to submit, save, or navigate</li><li>Attach a health indicator with no clinical meaning</li><li>Place chips on the brand surface until Brand is published</li><li>Stack more than one row without a way to see the rest</li></ul></div></div></section>' +
        footer(
          "The indicator carries clinical meaning. Never use it decoratively and never let colour be the only signal.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    badge: function (meta) {
      return (
        masthead("Badge", "Atoms · 2 components, 19 variants") +
        lead(
          "Status at a glance, never a control",
          "A badge reports state. It is not tappable and not a substitute for a button or chip.",
          "SOURCE",
          "Component Library 2026. Status, size, and Lozenge."
        ) +
        '<section class="section"><h2 class="display">Status</h2><p class="stub-note" style="margin-bottom:20px">Seven statuses. The word carries the meaning — colour only reinforces it.</p><div class="specimen"><div class="specimen__row"><span class="ds-badge ds-badge--success">Success</span><span class="ds-badge ds-badge--warning">Warning</span><span class="ds-badge ds-badge--error">Error</span><span class="ds-badge ds-badge--info">Info</span><span class="ds-badge ds-badge--neutral">Neutral</span><span class="ds-badge ds-badge--ai">AI</span><span class="ds-badge ds-badge--ghost">Ghost</span></div></div>' +
        code('&lt;span class="<span class="tok">ds-badge ds-badge--success</span>"&gt;Success&lt;/span&gt;\n&lt;span class="<span class="tok">ds-badge ds-badge--warning</span>"&gt;Warning&lt;/span&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Size</h2><p class="stub-note" style="margin-bottom:20px">Large is the default. Small is for dense lists and table cells.</p><div class="specimen"><div class="specimen__row"><span class="ds-badge ds-badge--info">Large</span><span class="ds-badge ds-badge--info ds-badge--sm">Small</span></div></div>' +
        code('&lt;span class="<span class="tok">ds-badge ds-badge--info ds-badge--sm</span>"&gt;Small&lt;/span&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Lozenge</h2><p class="stub-note" style="margin-bottom:20px">A separate component, not a small badge. 20 high, grey fill for every type, and a 6px dot that carries the meaning.</p><div class="specimen"><div class="specimen__row">' +
        '<span class="ds-lozenge"><span class="ds-lozenge__dot" aria-hidden="true"></span>Neutral</span>' +
        '<span class="ds-lozenge ds-lozenge--info"><span class="ds-lozenge__dot" aria-hidden="true"></span>Info</span>' +
        '<span class="ds-lozenge ds-lozenge--success"><span class="ds-lozenge__dot" aria-hidden="true"></span>Good</span>' +
        '<span class="ds-lozenge ds-lozenge--warning"><span class="ds-lozenge__dot" aria-hidden="true"></span>Watch</span>' +
        '<span class="ds-lozenge ds-lozenge--error"><span class="ds-lozenge__dot" aria-hidden="true"></span>Error</span>' +
        "</div></div>" +
        code('&lt;span class="<span class="tok">ds-lozenge ds-lozenge--success</span>"&gt;&lt;span class="<span class="tok">ds-lozenge__dot</span>"&gt;&lt;/span&gt;Good&lt;/span&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live status</h2><p class="stub-note" style="margin-bottom:20px">Switch the status to see how much the fill changes and how little the shape does. The word always carries the meaning.</p><p class="live-status" data-live="status-line" aria-live="polite">Pick a status…</p><div class="specimen" data-live="variant-picker" data-remove="ds-badge--success ds-badge--warning ds-badge--error ds-badge--info ds-badge--neutral ds-badge--ai ds-badge--ghost"><div class="specimen__row" data-live="chip-group" data-mode="single" style="margin-bottom:20px"><button type="button" class="ds-chip ds-chip--selected" data-set="ds-badge--success">Success</button><button type="button" class="ds-chip" data-set="ds-badge--warning">Warning</button><button type="button" class="ds-chip" data-set="ds-badge--error">Error</button><button type="button" class="ds-chip" data-set="ds-badge--info">Info</button><button type="button" class="ds-chip" data-set="ds-badge--neutral">Neutral</button><button type="button" class="ds-chip" data-set="ds-badge--ai">AI</button><button type="button" class="ds-chip" data-set="ds-badge--ghost">Ghost</button></div><div class="specimen__row"><span class="ds-badge ds-badge--success" data-variant-target>Result</span><span class="ds-badge ds-badge--success ds-badge--sm" data-variant-target>Result</span></div></div>' +
        code('&lt;div data-live="<span class="tok">variant-picker</span>" data-remove="<span class="tok">ds-badge--success ds-badge--warning …</span>"&gt;\n  &lt;button class="<span class="tok">ds-chip</span>" data-set="<span class="tok">ds-badge--warning</span>"&gt;Warning&lt;/button&gt;\n  &lt;span class="<span class="tok">ds-badge ds-badge--success</span>" data-variant-target&gt;Result&lt;/span&gt;\n&lt;/div&gt;') +
        '</section>' +
        footer(
          "Badge and Lozenge overlap. Badge is the default; reach for Lozenge only inside dense rows where 20px height matters.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "badge-grid": function (meta) {
      var grid = function (count, typeMod, title) {
        var badges = "";
        for (var i = 0; i < count; i++) {
          badges += '<span class="ds-badge ' + typeMod + '">Badge</span>';
        }
        return (
          '<div class="ds-badge-grid">' +
          (title ? '<p class="ds-badge-grid__title">' + title + "</p>" : "") +
          '<div class="ds-badge-grid__row">' +
          badges +
          "</div></div>"
        );
      };
      return (
        masthead("Badge grid", "Component · 54 variants") +
        lead(
          "Many small facts, one block",
          "Badge Grid is No. of Badges (2–10) × Badge Type. One type per grid. Title is part of the component (“Grid Title” in the library).",
          "SOURCE",
          "Badge Grid 7175:5895 · site only; library unchanged"
        ) +
        '<section class="section"><h2 class="display">Anatomy</h2><p class="stub-note" style="margin-bottom:20px">Grid Title, then a row of Badge instances (gap 8). Stack gap 12.</p><div class="specimen">' +
        grid(3, "ds-badge--info", "Grid Title") +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-badge-grid</span>"&gt;\n  &lt;p class="<span class="tok">ds-badge-grid__title</span>"&gt;Grid Title&lt;/p&gt;\n  &lt;div class="<span class="tok">ds-badge-grid__row</span>"&gt;…badges…&lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">No. of badges</h2><p class="stub-note" style="margin-bottom:20px">Library values 2 through 10. Representative counts below.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>2</strong>' + grid(2, "ds-badge--info", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>3</strong>' + grid(3, "ds-badge--info", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>5</strong>' + grid(5, "ds-badge--info", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>8</strong>' + grid(8, "ds-badge--info", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>10</strong>' + grid(10, "ds-badge--info", "Grid Title") + "</div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Badge type</h2><p class="stub-note" style="margin-bottom:20px">One type per grid: Success, Warning, Error, Info, Neutral, AI Gradient.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>SUCCESS</strong>' + grid(3, "ds-badge--success", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>WARNING</strong>' + grid(3, "ds-badge--warning", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>ERROR</strong>' + grid(3, "ds-badge--error", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>INFO</strong>' + grid(3, "ds-badge--info", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>NEUTRAL</strong>' + grid(3, "ds-badge--neutral", "Grid Title") + "</div>" +
        '<div class="sel-item"><strong>AI</strong>' + grid(3, "ds-badge--ai", "Grid Title") + "</div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Live type</h2><p class="stub-note" style="margin-bottom:20px">Switch the type across the whole grid at once.</p><p class="live-status" data-live="status-line" aria-live="polite">Pick a type…</p><div class="specimen" data-live="variant-picker" data-remove="ds-badge--success ds-badge--warning ds-badge--error ds-badge--info ds-badge--neutral ds-badge--ai"><div class="specimen__row" data-live="chip-group" data-mode="single" style="margin-bottom:20px"><button type="button" class="ds-chip ds-chip--selected" data-set="ds-badge--success">Success</button><button type="button" class="ds-chip" data-set="ds-badge--warning">Warning</button><button type="button" class="ds-chip" data-set="ds-badge--info">Info</button><button type="button" class="ds-chip" data-set="ds-badge--ai">AI</button></div><div class="ds-badge-grid"><p class="ds-badge-grid__title">Grid Title</p><div class="specimen__row ds-badge-grid__row"><span class="ds-badge ds-badge--success" data-variant-target>Badge</span><span class="ds-badge ds-badge--success" data-variant-target>Badge</span><span class="ds-badge ds-badge--success" data-variant-target>Badge</span></div></div></div></section>' +
        footer(
          "One type per grid. Mixing statuses inside a single grid removes the pattern that makes it readable.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    avatar: function (meta) {
      return (
        masthead("Avatar", "Atom · 8 variants") +
        lead(
          "A person, not a decoration",
          "An avatar identifies whose data, whose check, whose conversation is on screen. It is never ornamental and never used as a logo stand-in.",
          "SOURCE",
          "Component Library 2026. Four sizes across guest and registered users."
        ) +
        '<section class="section"><h2 class="display">Size</h2><p class="stub-note" style="margin-bottom:20px">Four sizes. Match the density of the surface — lists stay small; profiles go large.</p><div class="specimen"><div class="specimen__row">' +
        '<div class="specimen__item"><div class="ds-avatar ds-avatar--sm">IB</div><p class="specimen__caption"><strong>SM</strong>32px</p></div>' +
        '<div class="specimen__item"><div class="ds-avatar ds-avatar--md">IB</div><p class="specimen__caption"><strong>MD</strong>48px</p></div>' +
        '<div class="specimen__item"><div class="ds-avatar ds-avatar--lg">IB</div><p class="specimen__caption"><strong>LG</strong>64px</p></div>' +
        '<div class="specimen__item"><div class="ds-avatar ds-avatar--xl">IB</div><p class="specimen__caption"><strong>XL</strong>96px</p></div>' +
        '</div></div>' +
        code('&lt;div class="<span class="tok">ds-avatar ds-avatar--sm</span>"&gt;IB&lt;/div&gt;\n&lt;div class="<span class="tok">ds-avatar ds-avatar--md</span>"&gt;IB&lt;/div&gt;\n&lt;div class="<span class="tok">ds-avatar ds-avatar--lg</span>"&gt;IB&lt;/div&gt;\n&lt;div class="<span class="tok">ds-avatar ds-avatar--xl</span>"&gt;IB&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">User type</h2><p class="stub-note" style="margin-bottom:20px">Guest is an anonymous mark. Registered carries initials, or a photo when one exists.</p><div class="specimen"><div class="specimen__row"><div class="specimen__item"><div class="ds-avatar ds-avatar--lg">IB</div><p class="specimen__caption"><strong>Registered</strong>Initials or photo</p></div><div class="specimen__item"><div class="ds-avatar ds-avatar--lg ds-avatar--guest" aria-hidden="true"></div><p class="specimen__caption"><strong>Guest</strong>Anonymous mark</p></div></div></div>' +
        code('&lt;div class="<span class="tok">ds-avatar ds-avatar--lg ds-avatar--guest</span>" aria-hidden="true"&gt;&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Profile picture</h2><p class="stub-note" style="margin-bottom:20px">Photo when available; fallback to initials. Never invent a face.</p><div class="specimen"><div class="specimen__row"><div class="specimen__item"><div class="ds-avatar ds-avatar--lg">IB</div><p class="specimen__caption"><strong>Initial</strong></p></div><div class="specimen__item"><div class="ds-avatar ds-avatar--lg ds-avatar--photo" aria-label="Photo placeholder"></div><p class="specimen__caption"><strong>Photo</strong></p></div></div></div>' +
        code('&lt;div class="<span class="tok">ds-avatar ds-avatar--lg ds-avatar--photo</span>"&gt;&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live size</h2><p class="stub-note" style="margin-bottom:20px">Step through the four sizes on one avatar to feel how the initials scale with the circle.</p><p class="live-status" data-live="status-line" aria-live="polite">Pick a size…</p><div class="specimen" data-live="variant-picker" data-remove="ds-avatar--sm ds-avatar--md ds-avatar--lg ds-avatar--xl"><div class="specimen__row" data-live="chip-group" data-mode="single" style="margin-bottom:20px"><button type="button" class="ds-chip" data-set="ds-avatar--sm">SM</button><button type="button" class="ds-chip" data-set="ds-avatar--md">MD</button><button type="button" class="ds-chip ds-chip--selected" data-set="ds-avatar--lg">LG</button><button type="button" class="ds-chip" data-set="ds-avatar--xl">XL</button></div><div class="ds-avatar ds-avatar--lg" data-variant-target>IB</div></div>' +
        code('&lt;div data-live="<span class="tok">variant-picker</span>" data-remove="<span class="tok">ds-avatar--sm ds-avatar--md ds-avatar--lg ds-avatar--xl</span>"&gt;\n  &lt;button class="<span class="tok">ds-chip</span>" data-set="<span class="tok">ds-avatar--xl</span>"&gt;XL&lt;/button&gt;\n  &lt;div class="<span class="tok">ds-avatar ds-avatar--lg</span>" data-variant-target&gt;IB&lt;/div&gt;\n&lt;/div&gt;') +
        '</section>' +
        footer(
          "Guest avatars carry no initial that could be mistaken for a real identity. Keep the mark anonymous until someone registers.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    tile: function (meta) {
      // Tile 7173:999 is a row: icon circle, then a label/body stack.
      var tileEl = function (mods, label, body) {
        return (
          '<div class="ds-tile ' + mods + '">' +
          '<div class="ds-tile__icon" aria-hidden="true"></div>' +
          '<div class="ds-tile__text"><strong>' + label + "</strong><span>" + body + "</span></div>" +
          "</div>"
        );
      };
      return (
        masthead("Tile", "Atom · 4 variants") +
        lead(
          "The card, by its real name",
          "A tile is a tappable surface that holds one idea — a check, a result, a shortcut. It is not a layout container and not a modal.",
          "SOURCE",
          "Component Library 2026. Size and surface are the only axes."
        ) +
        '<section class="section"><h2 class="display">Size</h2><p class="stub-note" style="margin-bottom:20px">Small for dense grids. Large when the tile is the primary target on the screen.</p><div class="specimen"><div class="specimen__row">' +
        '<div class="specimen__item">' + tileEl("ds-tile--lg", "Skin check", "Start a new assessment") + '<p class="specimen__caption"><strong>Large</strong>240×72 · padding 12 · icon 48</p></div>' +
        '<div class="specimen__item">' + tileEl("ds-tile--sm", "Journal", "Add a note") + '<p class="specimen__caption"><strong>Small</strong>200×56 · padding 8 · icon 40</p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-tile ds-tile--lg</span>"&gt;\n  &lt;div class="<span class="tok">ds-tile__icon</span>"&gt;&lt;/div&gt;\n  &lt;div class="<span class="tok">ds-tile__text</span>"&gt;&lt;strong&gt;Skin check&lt;/strong&gt;&lt;span&gt;Start a new assessment&lt;/span&gt;&lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Surface</h2><p class="stub-note" style="margin-bottom:20px">White for most product UI. Grey when the tile needs to sit back from the surface around it.</p><div class="specimen"><div class="specimen__row">' +
        '<div class="specimen__item">' + tileEl("ds-tile--lg", "White", "Default surface") + '<p class="specimen__caption"><strong>Large · White</strong></p></div>' +
        '<div class="specimen__item">' + tileEl("ds-tile--lg ds-tile--grey", "Grey", "Subtle surface") + '<p class="specimen__caption"><strong>Large · Grey</strong></p></div>' +
        '<div class="specimen__item">' + tileEl("ds-tile--sm", "White", "Default surface") + '<p class="specimen__caption"><strong>Small · White</strong></p></div>' +
        '<div class="specimen__item">' + tileEl("ds-tile--sm ds-tile--grey", "Grey", "Subtle surface") + '<p class="specimen__caption"><strong>Small · Grey</strong></p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-tile ds-tile--lg ds-tile--grey</span>"&gt;…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live selection</h2><p class="stub-note" style="margin-bottom:20px">One tile at a time. A tile is a single target — the whole surface responds, not a control inside it.</p><p class="live-status" data-live="status-line" aria-live="polite">Pick a tile below…</p><div class="specimen"><div class="specimen__row" data-live="tile-select">' +
        tileEl("ds-tile--lg is-selected", "Skin check", "Start a new assessment") +
        tileEl("ds-tile--lg", "Heart check", "Measure resting rate") +
        tileEl("ds-tile--lg", "Sleep check", "Review last night") +
        "</div></div>" +
        code('&lt;div data-live="<span class="tok">tile-select</span>"&gt;\n  &lt;div class="<span class="tok">ds-tile ds-tile--lg is-selected</span>"&gt;…&lt;/div&gt;\n  &lt;div class="<span class="tok">ds-tile ds-tile--lg</span>"&gt;…&lt;/div&gt;\n&lt;/div&gt;') +
        '</section>' +
        footer(
          "A tile is a single target. Do not nest interactive controls inside one.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    divider: function (meta) {
      return (
        masthead("Divider", "Atom · 6 variants") +
        lead(
          "Space first, line second",
          "A divider separates related groups. Prefer spacing alone when the layout already reads clearly — the line is reinforcement, not structure.",
          "SOURCE",
          "Component Library 2026. Prominence and an optional label."
        ) +
        '<section class="section"><h2 class="display">Prominence</h2><p class="stub-note" style="margin-bottom:20px">Subtle for quiet lists. Strong when two regions must not blur together.</p><div class="specimen"><div class="sel-grid"><div class="sel-item"><strong>SUBTLE</strong><hr class="ds-divider ds-divider--subtle" /><p>Quiet lists</p></div><div class="sel-item"><strong>DEFAULT</strong><hr class="ds-divider" /><p>Standard separation</p></div><div class="sel-item"><strong>STRONG</strong><hr class="ds-divider ds-divider--strong" /><p>Regions that must not blur</p></div></div></div>' +
        code('&lt;hr class="<span class="tok">ds-divider ds-divider--subtle</span>" /&gt;\n&lt;hr class="<span class="tok">ds-divider</span>" /&gt;\n&lt;hr class="<span class="tok">ds-divider ds-divider--strong</span>" /&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">With a label</h2><p class="stub-note" style="margin-bottom:20px">Use a label only when the groups need naming — never as decoration. Shown at each prominence.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>SUBTLE · LABELLED</strong><div class="ds-divider-label"><span></span><em>Earlier today</em><span></span></div></div>' +
        '<div class="sel-item"><strong>DEFAULT · LABELLED</strong><div class="ds-divider-label"><span style="background:#d1d1d1"></span><em>Yesterday</em><span style="background:#d1d1d1"></span></div></div>' +
        '<div class="sel-item"><strong>STRONG · LABELLED</strong><div class="ds-divider-label"><span style="background:#111111;height:2px"></span><em>Last week</em><span style="background:#111111;height:2px"></span></div></div>' +
        '<div class="sel-item"><strong>NO LABEL</strong><hr class="ds-divider" /><p>Space first, line second</p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-divider-label</span>"&gt;\n  &lt;span&gt;&lt;/span&gt;&lt;em&gt;Earlier today&lt;/em&gt;&lt;span&gt;&lt;/span&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live prominence</h2><p class="stub-note" style="margin-bottom:20px">Switch prominence to feel how much separation each step buys.</p><p class="live-status" data-live="status-line" aria-live="polite">Pick a prominence…</p><div class="specimen" data-live="variant-picker" data-remove="ds-divider--subtle ds-divider--strong"><div class="specimen__row" data-live="chip-group" data-mode="single" style="margin-bottom:20px"><button type="button" class="ds-chip" data-set="ds-divider--subtle">Subtle</button><button type="button" class="ds-chip ds-chip--selected" data-set="">Default</button><button type="button" class="ds-chip" data-set="ds-divider--strong">Strong</button></div><p style="margin:0 0 4px;font-family:Ubuntu,sans-serif;font-size:14px">Recent checks</p><hr class="ds-divider" data-variant-target /><p style="margin:4px 0 0;font-family:Ubuntu,sans-serif;font-size:14px;color:#666">Earlier this month</p></div></section>' +
        footer(
          "Three dividers on one screen usually means the layout needs restructuring, not more lines.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    filter: function (meta) {
      var filterRow = function (count, selected) {
        var html = '<div class="ds-filter"' + (selected ? ' data-live="chip-group" data-mode="multi"' : "") + ">";
        if (selected) {
          html +=
            '<button type="button" class="ds-filter__clear" aria-label="Clear filters">' +
            '<img src="assets/icons/Close-Fill.svg" alt="" />' +
            "</button>";
        }
        for (var i = 0; i < count; i++) {
          var sel = selected && i === 0 ? " ds-chip--selected" : "";
          html +=
            '<button type="button" class="ds-chip' +
            sel +
            '">Filter name</button>';
        }
        return html + "</div>";
      };
      return (
        masthead("Filter", "Component · 16 variants") +
        lead(
          "Narrow a list without leaving it",
          "Filter is a horizontal row of Chip instances. The library axes are device orientation, how many filters, and whether one is selected — not a separate chip style.",
          "SOURCE",
          "Filter 6398:4425 · built from Chip 6398:3932"
        ) +
        '<section class="section"><h2 class="display">Anatomy</h2><p class="stub-note" style="margin-bottom:20px">Chips in a row, gap 12. Labels use the library placeholder “Filter name”. This is the Filter component — not a freeform chip playground.</p><div class="specimen"><p class="specimen__label">No. of filters = 6 · Filter selected? = False · XS/S</p>' +
        filterRow(6, false) +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-filter</span>"&gt;\n  &lt;button class="<span class="tok">ds-chip</span>"&gt;Filter name&lt;/button&gt;\n  …\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">No. of filters</h2><p class="stub-note" style="margin-bottom:20px">Library values: 3, 4, 5, or 6 chips in the row.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>3</strong>' + filterRow(3, false) + "</div>" +
        '<div class="sel-item"><strong>4</strong>' + filterRow(4, false) + "</div>" +
        '<div class="sel-item"><strong>5</strong>' + filterRow(5, false) + "</div>" +
        '<div class="sel-item"><strong>6</strong>' + filterRow(6, false) + "</div>" +
        '</div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Filter selected</h2><p class="stub-note" style="margin-bottom:20px">False: every chip unselected. True: Close-Fill (28) leads the row, then one selected chip and the rest unselected.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>FALSE</strong>' + filterRow(6, false) + "</div>" +
        '<div class="sel-item"><strong>TRUE</strong>' + filterRow(6, true) + "</div>" +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-filter</span>"&gt;\n  &lt;button class="<span class="tok">ds-filter__clear</span>" aria-label="Clear filters"&gt;…Close-Fill…&lt;/button&gt;\n  &lt;button class="<span class="tok">ds-chip ds-chip--selected</span>"&gt;Filter name&lt;/button&gt;\n  …\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Device orientation</h2><p class="stub-note" style="margin-bottom:20px">XS/S and M share the same Chip composition and gap. M specimens in the library sit at a slightly shorter chip height; the site uses the published Chip (32) so we do not invent a second chip size.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>XS / S</strong>' + filterRow(4, false) + "</div>" +
        '<div class="sel-item"><strong>M</strong>' + filterRow(4, false) + "</div>" +
        '</div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live selection</h2><p class="stub-note" style="margin-bottom:20px">Tap chips on the selected row. Clear uses the leading Close control from the library True state.</p><p class="live-status" data-live="status-line" aria-live="polite">Try a filter…</p><div class="specimen">' +
        filterRow(5, true) +
        "</div></section>" +
        footer(
          "Filter = Chip row with library axes. Do not invent count suffixes or alternate filter controls.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    dropdown: function (meta) {
      return (
        masthead("Dropdown menu", "Component · 9 variants") +
        lead(
          "The list a dropdown field opens",
          "This is the menu that appears from a dropdown field — not the field itself. Keep options short, decisive, and finite.",
          "SOURCE",
          "Component Library 2026. Option count and in-context placement."
        ) +
        '<section class="section"><h2 class="display">Item state</h2><p class="stub-note" style="margin-bottom:20px">Three states, shown as static specimens. Pressed is the option currently chosen.</p><div class="specimen"><div class="specimen__row" style="align-items:flex-start">' +
        '<div class="specimen__item"><div class="ds-menu" data-live="menu-static" style="width:220px"><button type="button">Default</button></div><p class="specimen__caption"><strong>Default</strong>White fill, primary text</p></div>' +
        '<div class="specimen__item"><div class="ds-menu" data-live="menu-static" style="width:220px"><button type="button" class="is-selected">Pressed</button></div><p class="specimen__caption"><strong>Pressed</strong>#f2f6ff fill, #a3bfff border</p></div>' +
        '<div class="specimen__item"><div class="ds-menu" data-live="menu-static" style="width:220px"><button type="button" disabled>Disabled</button></div><p class="specimen__caption"><strong>Disabled</strong>#e5e5e5 fill, tertiary text</p></div>' +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Option count</h2><p class="stub-note" style="margin-bottom:20px">Short lists stay scannable. Ten options is the ceiling before you should reconsider the pattern.</p><div class="specimen"><div class="specimen__row" style="align-items:flex-start"><div class="specimen__item"><div class="ds-menu" data-live="menu-static" style="width:220px"><button type="button" class="is-selected">Option one</button><button type="button">Option two</button></div><p class="specimen__caption"><strong>Two options</strong></p></div><div class="specimen__item"><div class="ds-menu" data-live="menu-static" style="width:220px"><button type="button" class="is-selected">Option one</button><button type="button">Option two</button><button type="button">Option three</button><button type="button">Option four</button><button type="button">Option five</button></div><p class="specimen__caption"><strong>Five options</strong></p></div></div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live menu</h2><p class="stub-note" style="margin-bottom:20px">Pick an option. Selection stays visible so the menu can reopen on the current choice.</p><div class="specimen"><div class="ds-menu" data-live="menu"><button type="button" class="is-selected" aria-current="true">Option one</button><button type="button">Option two</button><button type="button">Option three</button></div></div>' +
        code('&lt;div class="<span class="tok">ds-menu</span>" data-live="<span class="tok">menu</span>"&gt;\n  &lt;button type="button" class="<span class="tok">is-selected</span>" aria-current="true"&gt;Option one&lt;/button&gt;\n  &lt;button type="button"&gt;Option two&lt;/button&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">In context</h2><p class="stub-note" style="margin-bottom:20px">Anchor to the field that opened it. Never float a menu without a clear source.</p><div class="specimen"><div style="max-width:300px"><div class="ds-field" style="margin-bottom:8px"><label class="ds-field__label" for="dd-field">Reminder frequency</label><input class="ds-field__input" id="dd-field" value="Option one" readonly /></div><div class="ds-menu" data-live="menu-static"><button type="button" class="is-selected">Option one</button><button type="button">Option two</button><button type="button">Option three</button></div></div></div></section>' +
        footer(
          "Ten options is the ceiling before you should reconsider the pattern.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    stepper: function (meta) {
      var lengths = [2, 3, 4, 5, 6]
        .map(function (n) {
          return (
            '<div class="specimen__item">' +
            dots(n, 1) +
            '<p class="specimen__caption"><strong>' +
            n +
            " slides</strong>Slide 1 active</p></div>"
          );
        })
        .join("");
      return (
        masthead("Stepper", "Component · 40 variants") +
        lead(
          "Where am I in the sequence",
          "The stepper is a page indicator, not a numbered checklist. It reports position inside a short set of slides — the dots never carry labels and never act as a table of contents.",
          "SOURCE",
          "Component Library 2026. Active pill 16×6, inactive dot 6×6, gap 4. Modes Light and Dark; two to six slides."
        ) +
        '<section class="section"><h2 class="display">Slide count</h2><p class="stub-note" style="margin-bottom:20px">Two to six slides. Beyond six the dots stop reading as a countable set — use a different pattern.</p><div class="specimen"><p class="specimen__label">Mode · Light</p><div class="specimen__row">' +
        lengths +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-stepper</span>"&gt;\n  &lt;span class="<span class="tok">ds-stepper__dot is-active</span>"&gt;&lt;/span&gt;\n  &lt;span class="<span class="tok">ds-stepper__dot</span>"&gt;&lt;/span&gt;\n  &lt;span class="<span class="tok">ds-stepper__dot</span>"&gt;&lt;/span&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Active position</h2><p class="stub-note" style="margin-bottom:20px">The active slide is the only one that widens. Everything else stays a 6px dot.</p><div class="specimen"><p class="specimen__label">Four slides · Light</p><div class="specimen__row">' +
        '<div class="specimen__item">' + dots(4, 1) + '<p class="specimen__caption"><strong>First</strong>Slide 1 of 4</p></div>' +
        '<div class="specimen__item">' + dots(4, 2) + '<p class="specimen__caption"><strong>Middle</strong>Slide 2 of 4</p></div>' +
        '<div class="specimen__item">' + dots(4, 4) + '<p class="specimen__caption"><strong>Last</strong>Slide 4 of 4</p></div>' +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Mode</h2><p class="stub-note" style="margin-bottom:20px">The mode names the dots, not the surface behind them. Dark dots on a light background; Light dots over an inverse or image background.</p><div class="specimen"><p class="specimen__label">Mode · Dark</p><div class="specimen__row">' +
        '<div class="specimen__item">' + dots(4, 2) + '<p class="specimen__caption"><strong>Dark</strong>Active #111111 · inactive #111111 at 40%</p></div>' +
        '</div></div><div class="specimen" style="background:#111111"><p class="specimen__label" style="color:#b8b8b8">Mode · Light</p><div class="specimen__row">' +
        '<div class="specimen__item">' + dots(4, 2, { dark: true }) + '<p class="specimen__caption" style="color:#b8b8b8"><strong style="color:#ffffff">Light</strong>Active #ffffff · inactive white 40%</p></div>' +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-stepper ds-stepper--mode-light</span>"&gt;\n  &lt;span class="<span class="tok">ds-stepper__dot is-active</span>"&gt;&lt;/span&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live indicator</h2><p class="stub-note" style="margin-bottom:20px">Tap a dot to move the active slide. In product the dots follow the carousel — they do not drive it.</p><p class="live-status" data-live="status-line" aria-live="polite">Tap a dot below…</p><div class="specimen">' +
        dots(5, 1, { live: true }) +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-stepper</span>" data-live="<span class="tok">stepper-dots</span>" role="group" aria-label="Page indicator"&gt;\n  &lt;button type="button" class="<span class="tok">ds-stepper__dot is-active</span>" aria-current="true"&gt;&lt;/button&gt;\n  &lt;button type="button" class="<span class="tok">ds-stepper__dot</span>" aria-current="false"&gt;&lt;/button&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Using it well</h2><div class="guidelines"><div class="guidelines__col"><h3>Do</h3><ul><li>Keep the set between two and six slides</li><li>Match the mode to the surface behind it</li><li>Pair the dots with a swipe or button someone can actually use</li></ul></div><div class="guidelines__col"><h3>Do not</h3><ul><li>Label the dots or number them</li><li>Use the indicator as the only way to move between slides</li><li>Animate the pill anywhere other than to the active slide</li></ul></div></div></section>' +
        footer(
          "The indicator reports position — it never asks someone to re-enter a decision they already made.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    table: function (meta) {
      return (
        masthead("Table", "Components · 3 parts, 17 variants") +
        lead(
          "For comparison, not for lists",
          "Use a table when columns must align so values can be compared. A simple list of cards is usually clearer for browsing.",
          "SOURCE",
          "Component Library 2026. Structure, columns, row, and cell."
        ) +
        '<section class="section"><h2 class="display">Header row</h2><p class="stub-note" style="margin-bottom:20px">On by default. Turn it off only when the surrounding layout already names the columns.</p><div class="specimen"><p class="specimen__label">Header row · on</p><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Check</th><th>Date</th><th>Status</th></tr></thead><tbody><tr><td>Skin</td><td>12 Jul</td><td><span class="ds-lozenge ds-lozenge--success"><span class="ds-lozenge__dot"></span>Good</span></td></tr><tr><td>Heart</td><td>10 Jul</td><td><span class="ds-lozenge ds-lozenge--warning"><span class="ds-lozenge__dot"></span>Watch</span></td></tr></tbody></table></div></div><div class="specimen"><p class="specimen__label">Header row · off</p><div class="ds-table-wrap"><table class="ds-table"><tbody><tr><td>Skin</td><td>12 Jul</td><td><span class="ds-lozenge ds-lozenge--success"><span class="ds-lozenge__dot"></span>Good</span></td></tr><tr><td>Heart</td><td>10 Jul</td><td><span class="ds-lozenge ds-lozenge--warning"><span class="ds-lozenge__dot"></span>Watch</span></td></tr></tbody></table></div></div>' +
        code('&lt;div class="<span class="tok">ds-table-wrap</span>"&gt;\n  &lt;table class="<span class="tok">ds-table</span>"&gt;\n    &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Check&lt;/th&gt;&lt;th&gt;Date&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n    &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Skin&lt;/td&gt;&lt;td&gt;12 Jul&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;/table&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Header column</h2><p class="stub-note" style="margin-bottom:20px">A leading header column names each row. Use it when the row label matters as much as the values.</p><div class="specimen"><p class="specimen__label">Header column · on</p><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Measure</th><th>Jul</th><th>Aug</th></tr></thead><tbody><tr><th scope="row">Resting heart rate</th><td>64 bpm</td><td>61 bpm</td></tr><tr><th scope="row">Sleep</th><td>6h 40m</td><td>7h 10m</td></tr></tbody></table></div></div>' +
        code('&lt;tr&gt;&lt;th scope="row"&gt;Resting heart rate&lt;/th&gt;&lt;td&gt;64 bpm&lt;/td&gt;&lt;/tr&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Cell type</h2><p class="stub-note" style="margin-bottom:20px">Two cell types. Header carries the column or row name; Text carries the value.</p><div class="specimen"><div class="specimen__row"><div class="specimen__item"><div class="ds-table-wrap" style="width:auto"><table class="ds-table" style="width:auto"><tbody><tr><th>Status</th></tr></tbody></table></div><p class="specimen__caption"><strong>Type · Header</strong>Ubuntu 12/16, #3d3d3d on #e5e5e5</p></div><div class="specimen__item"><div class="ds-table-wrap" style="width:auto"><table class="ds-table" style="width:auto"><tbody><tr><td>Good</td></tr></tbody></table></div><p class="specimen__caption"><strong>Type · Text</strong>Ubuntu 14/20, primary text</p></div></div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live row selection</h2><p class="stub-note" style="margin-bottom:20px">Click a row to select it. Selection highlights the whole record, never a single cell.</p><p class="live-status" data-live="status-line" aria-live="polite">Click a row below…</p><div class="specimen"><div class="ds-table-wrap"><table class="ds-table" data-live="table-row"><thead><tr><th>Check</th><th>Date</th><th>Status</th></tr></thead><tbody><tr><td>Skin</td><td>12 Jul</td><td><span class="ds-lozenge ds-lozenge--success"><span class="ds-lozenge__dot"></span>Good</span></td></tr><tr><td>Heart</td><td>10 Jul</td><td><span class="ds-lozenge ds-lozenge--warning"><span class="ds-lozenge__dot"></span>Watch</span></td></tr><tr><td>Sleep</td><td>08 Jul</td><td><span class="ds-lozenge"><span class="ds-lozenge__dot"></span>No data</span></td></tr></tbody></table></div></div>' +
        code('&lt;table class="<span class="tok">ds-table</span>" data-live="<span class="tok">table-row</span>"&gt;\n  &lt;tbody&gt;&lt;tr class="<span class="tok">is-selected</span>"&gt;&lt;td&gt;Skin&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Columns, row, cell</h2><div class="def"><p class="def__term">Columns</p><p class="def__detail">Each column has one job. Sort only when the data supports a meaningful order.</p></div><hr class="rule" /><div class="def"><p class="def__term">Row</p><p class="def__detail">Rows are for records. Do not turn a row into a mini layout with nested actions unless the pattern is published.</p></div><hr class="rule" /><div class="def"><p class="def__term">Cell</p><p class="def__detail">Cells hold one value or one control — not both competing for attention.</p></div></section>' +
        footer(
          "Header row for what the columns mean. Body for the data. Nothing else pretends to be a column.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    toast: function (meta) {
      return (
        masthead("Toast", "Component · 8 variants") +
        lead(
          "Confirm quietly, then get out of the way",
          "A toast confirms something already happened. It is not a dialog, not an error banner, and not the only place critical copy lives.",
          "SOURCE",
          "Component Library 2026 · Toast 7179:7223"
        ) +
        '<section class="section"><h2 class="display">Type</h2><p class="stub-note" style="margin-bottom:20px">Four types on a white fill — the border and status icon carry the meaning. Title and body stack with a 4px gap.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>SUCCESS</strong>' +
        toastEl({ type: "success", title: "Saved", body: "Your note is in the journal." }) +
        "</div>" +
        '<div class="sel-item"><strong>INFO</strong>' +
        toastEl({ type: "info", title: "Syncing", body: "This may take a moment." }) +
        "</div>" +
        '<div class="sel-item"><strong>WARNING</strong>' +
        toastEl({ type: "warning", title: "Check connection", body: "We will retry automatically." }) +
        "</div>" +
        '<div class="sel-item"><strong>ERROR</strong>' +
        toastEl({ type: "error", title: "Could not save", body: "Try again when you are online." }) +
        "</div>" +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-toast ds-toast--success</span>"&gt;\n  &lt;img class="<span class="tok">ds-toast__icon</span>" src="assets/icons/Check-Fill.svg" /&gt;\n  &lt;div class="<span class="tok">ds-toast__text</span>"&gt;\n    &lt;p class="<span class="tok">ds-toast__title</span>"&gt;Saved&lt;/p&gt;\n    &lt;p class="<span class="tok">ds-toast__body</span>"&gt;Your note is in the journal.&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Description · Action</h2><p class="stub-note" style="margin-bottom:20px">Title alone when the outcome is obvious. Add one line of description when it is not. An optional action must be undoable or navigational — never the primary commit for a destructive act.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>TITLE ONLY</strong>' +
        toastEl({ type: "success", title: "Saved" }) +
        "</div>" +
        '<div class="sel-item"><strong>TITLE · DESCRIPTION</strong>' +
        toastEl({ type: "success", title: "Saved", body: "Your note is in the journal." }) +
        "</div>" +
        '<div class="sel-item"><strong>WITH ACTION</strong>' +
        toastEl({ type: "success", title: "Saved", body: "Your note is in the journal.", action: "Undo" }) +
        "</div>" +
        '<div class="sel-item"><strong>WITH DISMISS</strong>' +
        toastEl({ type: "info", title: "Syncing", body: "This may take a moment.", dismiss: true }) +
        "</div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Live dismiss</h2><p class="stub-note" style="margin-bottom:20px">Dismiss removes the toast. In product it also auto-dismisses — the copy must never be the only place a message lives.</p><div class="specimen">' +
        toastEl({
          type: "success",
          title: "Saved",
          body: "Your note is in the journal.",
          dismiss: true,
          live: true,
        }) +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-toast ds-toast--success</span>" data-live="<span class="tok">toast-dismiss</span>"&gt;\n  &lt;div class="<span class="tok">ds-toast__text</span>"&gt;…&lt;/div&gt;\n  &lt;button class="<span class="tok">ds-toast__close</span>" data-toast-close&gt;…&lt;/button&gt;\n&lt;/div&gt;') +
        '</section>' +
        footer(
          "Never put the only copy of an error or legal notice inside a toast.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    modal: function (meta) {
      var slot = '<span class="ds-slot" aria-hidden="true">Slot</span>';
      var slots6 = slot + slot + slot + slot + slot + slot;
      var modalLockup = function (frameMod, title, sec, pri, live) {
        return (
          '<div class="ds-modal' + (frameMod ? " " + frameMod : "") + '">' +
          '<div class="ds-modal__slots">' + slots6 + "</div>" +
          '<div class="ds-modal__decision">' +
          '<p class="ds-modal__title">' + title + "</p>" +
          '<div class="ds-modal__actions"' + (live ? ' data-live="modal-actions"' : "") + ">" +
          '<button type="button" class="ds-button ds-button--secondary ds-button--md">' + sec + "</button>" +
          '<button type="button" class="ds-button ds-button--primary ds-button--md">' + pri + "</button>" +
          "</div></div></div>"
        );
      };
      /* Drawer Base: Button Type=Text, Size=Large (site --xl) — label only, centred */
      var drawerBtn = function (status, label) {
        return (
          '<button type="button" class="ds-button ds-button--' +
          status +
          ' ds-button--xl">' +
          '<span class="ds-button__label">' +
          label +
          "</span></button>"
        );
      };
      var drawerLockup = function (topVisual) {
        var heroExtra = "";
        if (topVisual === "icon") {
          heroExtra =
            '<div class="ds-drawer__hero-icon" aria-hidden="true">' +
            '<img src="assets/icons/Information-Stroke.svg" alt="" />' +
            "</div>";
        } else if (topVisual === "graphics") {
          heroExtra = slot;
        }
        return (
          '<div class="ds-drawer">' +
          '<div class="ds-drawer__sheet">' +
          '<div class="ds-drawer__dragger" aria-hidden="true"></div>' +
          '<div class="ds-drawer__hero">' +
          heroExtra +
          '<div class="ds-drawer__text">' +
          '<p class="ds-drawer__title">A short title is the best</p>' +
          '<p class="ds-drawer__message">A message should be a short sentence max two lines.</p>' +
          "</div></div>" +
          slot +
          "</div>" +
          '<div class="ds-drawer__base">' +
          drawerBtn("primary", "Button") +
          drawerBtn("secondary", "Button") +
          "</div></div>"
        );
      };
      return (
        masthead("Modal & Drawer", "Components · Modal 3 device · Drawer 9 variants") +
        lead(
          "Two ways to interrupt",
          "A modal centres a decision on a darkened page. A drawer is a bottom sheet (or larger centred panel on M) with a hero, slot, and base actions. Specimens match Component Library 2026 lockups.",
          "SOURCE",
          "Modal 7179:8157 · Drawer 6457:911"
        ) +
        '<section class="section"><h2 class="display">Modal anatomy</h2><p class="stub-note" style="margin-bottom:20px">Viewport · Modal frame · Slot area (content / description) · Decision title · Small Secondary and Primary. Slots are the library Slot atom — put description and other content there, not as a separate modal body style.</p><div class="specimen"><p class="specimen__label">Device = XS · library default labels</p><div class="ds-modal-viewport">' +
        modalLockup("", "Decision title", "Secondary Button", "Primary Button", false) +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-modal-viewport</span>"&gt;\n  &lt;div class="<span class="tok">ds-modal</span>"&gt;\n    &lt;div class="<span class="tok">ds-modal__slots</span>"&gt;…Slot…&lt;/div&gt;\n    &lt;div class="<span class="tok">ds-modal__decision</span>"&gt;\n      &lt;p class="<span class="tok">ds-modal__title</span>"&gt;Decision title&lt;/p&gt;\n      &lt;div class="<span class="tok">ds-modal__actions</span>"&gt;Secondary · Primary (Small)&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Modal device</h2><p class="stub-note" style="margin-bottom:20px">The only Modal variant axis in the library: Device XS, SM, MD. Frame widths 447 · 540 · 720. MD uses 32px padding.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>XS</strong><div class="ds-modal-viewport" style="min-height:280px;padding:24px 16px">' +
        modalLockup("", "Decision title", "Secondary Button", "Primary Button", false) +
        "</div></div>" +
        '<div class="sel-item"><strong>SM</strong><div class="ds-modal-viewport ds-modal-viewport--sm" style="min-height:280px;padding:24px 16px">' +
        modalLockup("ds-modal--sm", "Decision title", "Secondary Button", "Primary Button", false) +
        "</div></div>" +
        '<div class="sel-item"><strong>MD</strong><div class="ds-modal-viewport ds-modal-viewport--md" style="min-height:280px;padding:24px 16px">' +
        modalLockup("ds-modal--md", "Decision title", "Secondary Button", "Primary Button", false) +
        "</div></div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Modal in use</h2><p class="stub-note" style="margin-bottom:20px">Same lockup. Decision title and button labels carry the product copy. Content and description still belong in the Slot area — shown here as Slot placeholders, as in the library.</p><p class="live-status" data-live="modal-status" aria-live="polite">Try Secondary or Primary…</p><div class="specimen"><div class="ds-modal-viewport">' +
        modalLockup("", "Leave this check?", "Keep going", "Leave", true) +
        "</div></div>" +
        code('&lt;p class="<span class="tok">ds-modal__title</span>"&gt;Leave this check?&lt;/p&gt;\n&lt;!-- Slots hold description / content — do not invent a separate body component --&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Drawer anatomy</h2><p class="stub-note" style="margin-bottom:20px">Viewport · Container · Drawer sheet (dragger, hero, slot) · Base with stacked Large Text Primary and Secondary. Copy below is the library’s own title and message.</p><div class="specimen"><p class="specimen__label">Top Visual Type = None · XS</p><div class="ds-drawer-viewport">' +
        drawerLockup("none") +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-drawer-viewport</span>"&gt;\n  &lt;div class="<span class="tok">ds-drawer</span>"&gt;\n    &lt;div class="<span class="tok">ds-drawer__sheet</span>"&gt;dragger · hero · Slot&lt;/div&gt;\n    &lt;div class="<span class="tok">ds-drawer__base</span>"&gt;Large Text buttons&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Drawer top visual</h2><p class="stub-note" style="margin-bottom:20px">Library axis: Graphics (Slot above title), Icon (48 guide circle), or None. Device Orientation XS / S / M is the other axis — XS bottom sheet shown here.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>NONE</strong><div class="ds-drawer-viewport" style="min-height:360px">' +
        drawerLockup("none") +
        "</div></div>" +
        '<div class="sel-item"><strong>ICON</strong><div class="ds-drawer-viewport" style="min-height:360px">' +
        drawerLockup("icon") +
        "</div></div>" +
        '<div class="sel-item"><strong>GRAPHICS</strong><div class="ds-drawer-viewport" style="min-height:360px">' +
        drawerLockup("graphics") +
        "</div></div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Live drawer</h2><p class="stub-note" style="margin-bottom:20px">Open and close the library drawer (None). No extra components inside the Slot.</p><p class="live-status" data-live="status-line" aria-live="polite">Drawer open</p><div class="specimen" data-live="drawer-toggle"><div style="margin-bottom:20px"><button type="button" class="ds-button ds-button--secondary ds-button--md" data-drawer-button>Close drawer</button></div><div class="ds-drawer-viewport" data-drawer-target>' +
        drawerLockup("none") +
        "</div></div>" +
        code('&lt;div data-live="<span class="tok">drawer-toggle</span>"&gt;\n  &lt;button data-drawer-button&gt;…&lt;/button&gt;\n  &lt;div class="<span class="tok">ds-drawer-viewport</span>" data-drawer-target&gt;…library drawer…&lt;/div&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Choosing between them</h2><div class="guidelines"><div class="guidelines__col"><h3>Use a modal</h3><ul><li>Blocking decision</li><li>Content and description in Slots</li><li>Clear Secondary / Primary commit</li></ul></div><div class="guidelines__col"><h3>Use a drawer</h3><ul><li>Bottom sheet context (XS / S)</li><li>Hero + Slot + Base actions</li><li>Page underneath still matters</li></ul></div></div></section>' +
        footer(
          "Specimens follow Modal 7179:8157 and Drawer 6457:911. Do not invent alternate lockups.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "info-panel": function (meta) {
      // Info panel 7181:2106 — [24 icon] [text] and, on Slimline, a 20 chevron.
      var infoEl = function (mods, title, body, extra, attrs) {
        var slim = mods.indexOf("ds-info--slimline") > -1;
        return (
          '<div class="ds-info ' + mods + '"' + (attrs ? " " + attrs : "") + ">" +
          '<span class="ds-info__icon" aria-hidden="true"></span>' +
          '<div class="ds-info__text">' +
          (slim ? "" : "<strong>" + title + "</strong>") +
          "<p>" + body + "</p>" +
          (extra || "") +
          "</div>" +
          (slim ? '<span class="ds-info__chevron" aria-hidden="true"></span>' : "") +
          "</div>"
        );
      };
      return (
        masthead("Info panel", "Component · 8 variants") +
        lead(
          "Context that stays on the page",
          "An info panel explains or warns without taking over the screen. It is not a toast and not a modal.",
          "SOURCE",
          "Component Library 2026. Layout, style, and outline. Action is not a published axis yet."
        ) +
        '<section class="section"><h2 class="display">Layout</h2><p class="stub-note" style="margin-bottom:20px">Detailed carries a title and an explanation. Slimline is one line — use it when the message is a single sentence.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>DETAILED</strong>' + infoEl("", "Why we ask", "Age helps us give a more accurate check.") + "</div>" +
        '<div class="sel-item"><strong>SLIMLINE</strong>' + infoEl("ds-info--slimline", "", "Take the photo in good light.") + "</div>" +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-info</span>"&gt;\n  &lt;span class="<span class="tok">ds-info__icon</span>"&gt;&lt;/span&gt;\n  &lt;div class="<span class="tok">ds-info__text</span>"&gt;&lt;strong&gt;Why we ask&lt;/strong&gt;&lt;p&gt;…&lt;/p&gt;&lt;/div&gt;\n&lt;/div&gt;\n&lt;div class="<span class="tok">ds-info ds-info--slimline</span>"&gt;\n  &lt;span class="<span class="tok">ds-info__icon</span>"&gt;&lt;/span&gt;\n  &lt;div class="<span class="tok">ds-info__text</span>"&gt;&lt;p&gt;…&lt;/p&gt;&lt;/div&gt;\n  &lt;span class="<span class="tok">ds-info__chevron</span>"&gt;&lt;/span&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Style</h2><p class="stub-note" style="margin-bottom:20px">Accent draws the eye for important context. Neutral for quiet help.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>ACCENT</strong>' + infoEl("ds-info--accent", "Why we ask", "Age helps us give a more accurate check.") + "</div>" +
        '<div class="sel-item"><strong>NEUTRAL</strong>' + infoEl("", "Tip", "Take the photo in good light and hold steady.") + "</div>" +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-info ds-info--accent</span>"&gt;…&lt;/div&gt;\n&lt;div class="<span class="tok">ds-info</span>"&gt;…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Outlined</h2><p class="stub-note" style="margin-bottom:20px">Outline the panel when it sits on a surface close to its own fill. On white, the fill alone is usually enough.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>ACCENT · OUTLINED</strong>' + infoEl("ds-info--accent ds-info--outlined", "Why we ask", "Age helps us give a more accurate check.") + "</div>" +
        '<div class="sel-item"><strong>ACCENT · NO OUTLINE</strong>' + infoEl("ds-info--accent", "Why we ask", "Age helps us give a more accurate check.") + "</div>" +
        '<div class="sel-item"><strong>NEUTRAL · OUTLINED</strong>' + infoEl("ds-info--outlined", "Tip", "Take the photo in good light.") + "</div>" +
        '<div class="sel-item"><strong>NEUTRAL · NO OUTLINE</strong>' + infoEl("", "Tip", "Take the photo in good light.") + "</div>" +
        "</div></div>" +
        code('&lt;div class="<span class="tok">ds-info ds-info--accent ds-info--outlined</span>"&gt;…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
'<section class="section"><h2 class="display">Live outline</h2><p class="stub-note" style="margin-bottom:20px">Toggle the outline on both panels at once and watch how much separation it adds.</p><p class="live-status" data-live="status-line" aria-live="polite">Toggle the outline…</p><div class="specimen" data-live="info-toggle"><div class="specimen__row" style="margin-bottom:20px"><button type="button" class="ds-chip" data-toggle-class="ds-info--outlined">Outlined</button></div><div class="sel-grid">' +
        infoEl("ds-info--accent", "Why we ask", "Age helps us give a more accurate check.", "", "data-toggle-target") +
        infoEl("", "Tip", "Take the photo in good light and hold steady.", "", "data-toggle-target") +
        "</div></div>" +
        code('&lt;div data-live="<span class="tok">info-toggle</span>"&gt;\n  &lt;button class="<span class="tok">ds-chip</span>" data-toggle-class="<span class="tok">ds-info--outlined</span>"&gt;Outlined&lt;/button&gt;\n  &lt;div class="<span class="tok">ds-info ds-info--accent</span>" data-toggle-target&gt;…&lt;/div&gt;\n&lt;/div&gt;') +
        '</section>' +
        footer(
          "Accent draws the eye. Use it when missing the message would change the outcome.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "action-bar": function (meta) {
      /* Action bar: Button Type=Text, Size=Large (site --xl) — label only, centred */
      var abBtn = function (status, label) {
        return (
          '<button type="button" class="ds-button ds-button--' +
          status +
          ' ds-button--xl">' +
          '<span class="ds-button__label">' +
          label +
          "</span></button>"
        );
      };
      var bar = function (mods, primaryFirst) {
        var buttons = primaryFirst
          ? abBtn("primary", "Button") + abBtn("secondary", "Button")
          : abBtn("primary", "Button") + abBtn("secondary", "Button");
        return '<div class="ds-action-bar' + (mods ? " " + mods : "") + '">' + buttons + "</div>";
      };
      return (
        masthead("Action bar", "Component · 20 variants") +
        lead(
          "The decision, pinned where the thumb is",
          "Action bar is Device × Layout × Colour mode. Buttons are the published Button — Text, Large — stretched to fill the bar.",
          "SOURCE",
          "Action bar 2610:3445 · site only; library unchanged"
        ) +
        '<section class="section"><h2 class="display">Layout</h2><p class="stub-note" style="margin-bottom:20px">Horizontal places Primary and Secondary side by side. Vertical stacks them. Order matches the library: Primary, then Secondary.</p><div class="specimen"><p class="specimen__label">Horizontal · XS · Light</p>' +
        bar("", true) +
        '</div><div class="specimen"><p class="specimen__label">Vertical · XS · Light</p>' +
        bar("ds-action-bar--vertical", true) +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-action-bar</span>"&gt;\n  &lt;button class="<span class="tok">ds-button ds-button--primary ds-button--xl</span>"&gt;…&lt;/button&gt;\n  &lt;button class="<span class="tok">ds-button ds-button--secondary ds-button--xl</span>"&gt;…&lt;/button&gt;\n&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Colour mode</h2><p class="stub-note" style="margin-bottom:20px">Light, Light-Secondary, Dark, Dark-Secondary — match the surface under the bar.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>LIGHT</strong>' + bar("", true) + "</div>" +
        '<div class="sel-item"><strong>LIGHT-SECONDARY</strong>' + bar("ds-action-bar--light-secondary", true) + "</div>" +
        '<div class="sel-item" style="background:#111;padding:12px;border-radius:8px"><strong style="color:#b8b8b8">DARK</strong>' + bar("ds-action-bar--dark", true) + "</div>" +
        '<div class="sel-item" style="background:#111;padding:12px;border-radius:8px"><strong style="color:#b8b8b8">DARK-SECONDARY</strong>' + bar("ds-action-bar--dark-secondary", true) + "</div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Device orientation</h2><p class="stub-note" style="margin-bottom:20px">XS, S, and M share the same Layout × Colour matrix. Specimens below keep the XS lockup at the published widths.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>XS</strong>' + bar("", true) + "</div>" +
        '<div class="sel-item"><strong>S</strong>' + bar("ds-action-bar--s", true) + "</div>" +
        '<div class="sel-item"><strong>M</strong>' + bar("ds-action-bar--m", true) + "</div>" +
        "</div></div></section><hr class=\"rule\" />" +
        '<section class="section"><h2 class="display">Live actions</h2><p class="stub-note" style="margin-bottom:20px">Press either control. Secondary is the quieter alternative — never a second primary.</p><p class="live-status" data-live="status-line" aria-live="polite">Press a control below…</p><div class="specimen"><div class="ds-action-bar" data-live="action-bar">' +
        abBtn("primary", "Button") +
        abBtn("secondary", "Button") +
        "</div></div></section>" +
        footer(
          "One primary action. Buttons come from the Button set — do not invent bar-only controls.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    chat: function (meta) {
      return (
        masthead("Chat", "Components · Chat bubble + AI Response") +
        lead(
          "A conversation, not a command line",
          "Two different pieces. The person’s message sits in a pale blue bubble on the right. Helfie’s reply is plain text on the left — no bubble behind it.",
          "SOURCE",
          "Component Library 2026 · Chat bubble 7232:495 · AI Response 6405:3750"
        ) +
        '<section class="section"><h2 class="display">Chat bubble</h2><p class="stub-note" style="margin-bottom:20px">This is the person’s message. Pale blue fill, rounded on three corners, sharp on the bottom-right, aligned to the right.</p><div class="specimen"><div class="ds-chat" style="max-width:100%"><div class="ds-chat__user">Can you explain this result?</div></div><p class="specimen__caption" style="margin-top:16px"><strong>Chat bubble</strong>#f2f6ff · pad 16 · corners 24 / 24 / 0 / 24</p></div>' +
        code('&lt;div class="<span class="tok">ds-chat__user</span>"&gt;Can you explain this result?&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">AI Response</h2><p class="stub-note" style="margin-bottom:20px">Helfie’s reply. No coloured bubble — just text on the left. Longer replies can add check suggestions and a Sources row underneath (see the library page).</p><div class="specimen"><div class="ds-chat" style="max-width:100%"><div class="ds-chat__ai"><p>Your result sits outside the typical range. Here is what to do next.</p></div></div><p class="specimen__caption" style="margin-top:16px"><strong>AI Response</strong>No fill · Ubuntu 16/22 · left aligned</p></div>' +
        code('&lt;div class="<span class="tok">ds-chat__ai</span>"&gt;&lt;p&gt;Your result sits outside the typical range.&lt;/p&gt;&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">The exchange</h2><p class="stub-note" style="margin-bottom:20px">Turn by turn. Person on the right, Helfie on the left. Never reorder or merge turns to tidy the thread.</p><div class="specimen"><div class="ds-chat"><div class="ds-chat__user">Can you explain this result?</div><div class="ds-chat__ai"><p>Your result sits outside the typical range. Here is what to do next.</p></div></div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live thread</h2><p class="stub-note" style="margin-bottom:20px">Send a message; Helfie answers with a preset reply. Input uses the Chat interaction bar sheet. Suggested prompts are Chat prompt from the library.</p><div class="specimen" data-live="chat-send" data-chat-reply="Your result sits outside the typical range. Here is what to do next."><div class="ds-chat" data-chat-thread><div class="ds-chat__ai"><p>Ask me anything about your recent checks.</p></div></div><div class="ds-ibar" style="margin-top:16px;padding-top:16px"><div class="ds-ibar__chat-sheet"><input class="ds-ibar__input" data-chat-input placeholder="Ask anything" aria-label="Ask anything" /><div class="ds-ibar__chat-actions"><div class="ds-ibar__chat-tools"><button type="button" class="ds-ibar__tool" aria-label="Attach"><img src="assets/icons/Attachment.svg" alt="" /></button></div><button type="button" class="ds-ibar__tool" data-chat-send aria-label="Send"><img src="assets/icons/Send-Fill.svg" alt="" /></button></div></div></div><div class="ds-chat-prompt" style="margin-top:12px"><button type="button" class="ds-chat-prompt__item">Input text Ipsum mutiny chantey</button><button type="button" class="ds-chat-prompt__item">Input text Ipsum mutiny chantey</button></div></div>' +
        code('&lt;div class="<span class="tok">ds-ibar__chat-sheet</span>"&gt;…Chat interaction bar…&lt;/div&gt;\n&lt;div class="<span class="tok">ds-chat-prompt</span>"&gt;…Chat prompt…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Where to find them in Figma</h2><div class="def"><p class="def__term">Chat bubble</p><p class="def__detail">Component Library 2026 → ⤷Chat bubble. The pale blue message on the right.</p></div><hr class="rule" /><div class="def"><p class="def__term">AI Response</p><p class="def__detail">Component Library 2026 → ⤷AI response. Plain text reply on the left — not a bubble.</p></div><hr class="rule" /><div class="def"><p class="def__term">Chat prompt</p><p class="def__detail">Component Library 2026 → ⤷Chat Prompt. Where the next message is typed.</p></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Rules that do not bend</h2><div class="never-list"><div><span class="dash">—</span><p>Never present an AI answer as clinical advice.</p></div><div><span class="dash">—</span><p>Keep a path to a human when stakes are high.</p></div></div></section>' +
        footer(
          "Chat bubble = person. AI Response = Helfie. Do not swap the styles.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "interaction-bars": function (meta) {
      var iconBtn = function (src, label) {
        return (
          '<button type="button" class="ds-button ds-button--secondary ds-button--lg ds-button--icon" style="--ds-button-icon:url(\'' +
          src +
          '\')" aria-label="' +
          label +
          '"><span class="ds-button__icon" aria-hidden="true"></span></button>'
        );
      };
      var action = function (label, iconSrc) {
        return (
          '<button type="button" class="ds-ibar__action">' +
          '<span class="ds-ibar__action-icon is-img" aria-hidden="true"><img src="' +
          iconSrc +
          '" alt="" /></span>' +
          '<span class="ds-ibar__action-label">' +
          label +
          "</span></button>"
        );
      };
      var pill = function (title, soft) {
        return (
          '<div class="ds-ibar__pill"><span class="ds-ibar__pill-icon' +
          (soft ? " ds-ibar__pill-icon--soft" : "") +
          '" aria-hidden="true"></span><span class="ds-ibar__pill-text"><p class="ds-ibar__pill-title">' +
          title +
          '</p><p class="ds-ibar__pill-sub">Check again</p></span></div>'
        );
      };
      var fav = function (n) {
        var html = '<div class="ds-fav">';
        for (var i = 0; i < n; i++) {
          html +=
            '<div class="ds-fav__item"><span class="ds-fav__icon" aria-hidden="true"></span><p class="ds-fav__label">Selfie AI</p></div>';
        }
        return html + "</div>";
      };
      var mainPrimary =
        '<div class="ds-ibar"><div class="ds-ibar__row">' +
        action("Name1", "assets/icons/Add.svg") +
        action("Name1", "assets/icons/Search.svg") +
        '<div class="ds-ibar__field"><input type="text" placeholder="Ask anything" aria-label="Ask anything" readonly /></div>' +
        iconBtn("assets/icons/Search.svg", "Search") +
        "</div></div>";
      var mainSecondary =
        '<div class="ds-ibar"><div class="ds-ibar__row">' +
        iconBtn("assets/icons/Close-Stroke.svg", "Close") +
        '<div class="ds-ibar__cluster">' +
        action("Name1", "assets/icons/Add.svg") +
        action("Name1", "assets/icons/Microphone.svg") +
        action("Name1", "assets/icons/Attachment.svg") +
        "</div></div></div>";
      var chatDefault =
        '<div class="ds-ibar"><div class="ds-ibar__pills">' +
        pill("Title Text", false) +
        '</div><div class="ds-ibar__chat-sheet"><input class="ds-ibar__input" placeholder="Ask anything" aria-label="Ask anything" readonly /><div class="ds-ibar__chat-actions"><div class="ds-ibar__chat-tools"><button type="button" class="ds-ibar__tool" aria-label="Attach"><img src="assets/icons/Attachment.svg" alt="" /></button><button type="button" class="ds-ibar__tool" aria-label="Voice"><img src="assets/icons/Microphone.svg" alt="" /></button></div><button type="button" class="ds-ibar__tool" aria-label="Send"><img src="assets/icons/Send-Fill.svg" alt="" /></button></div></div></div>';
      var searchActive =
        '<div class="ds-ibar ds-ibar--search"><div class="ds-ibar__pills">' +
        pill("Title Text", true) +
        '</div><div class="ds-ibar__row"><div class="ds-ibar__field" style="height:48px;flex:1"><button type="button" class="ds-ibar__tool" aria-label="Back" style="width:32px;height:32px;background:transparent"><img src="assets/icons/Left.svg" alt="" /></button><input class="ds-ibar__input" placeholder="Search" aria-label="Search" readonly /></div>' +
        iconBtn("assets/icons/Close-Stroke.svg", "Close") +
        "</div></div>";
      var journal =
        '<div class="ds-ibar ds-ibar--journal"><div class="ds-ibar__pills">' +
        pill("Title Text", true) +
        '</div><div class="ds-ibar__row ds-ibar__row--between"><div class="ds-ibar__cluster">' +
        action("Name1", "assets/icons/Add.svg") +
        action("Name1", "assets/icons/Microphone.svg") +
        action("Name1", "assets/icons/Attachment.svg") +
        '</div><div class="ds-ibar__row" style="width:auto;gap:8px">' +
        iconBtn("assets/icons/Close-Stroke.svg", "Close") +
        iconBtn("assets/icons/Add.svg", "Add") +
        "</div></div></div>";
      return (
        masthead("Interaction bars", "Components · Main · Chat · Search · Journal · Fav") +
        lead(
          "The bar that changes with the job",
          "These specimens follow the published sets: Main, Chat, Search, Journal note, and Fav check. Controls use library Button and measured bar chrome — not invented unicode sketches.",
          "SOURCE",
          "Main 9001:705 · Chat 9001:897 · Search 9014:33644 · Journal 9025:36169 · Fav 9014:35343"
        ) +
        '<section class="section"><h2 class="display">Main interaction bar</h2><p class="stub-note" style="margin-bottom:20px">Axes: Device size × Action (Primary / Secondary interaction) × Page. XS Primary and Secondary Homepage below.</p><div class="specimen"><p class="specimen__label">Primary interaction · Homepage · Xs</p>' +
        mainPrimary +
        '</div><div class="specimen"><p class="specimen__label">Secondary interaction · Homepage · Xs</p>' +
        mainSecondary +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-ibar</span>"&gt;…Interaction button · field · Button Icon…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Chat interaction bar</h2><p class="stub-note" style="margin-bottom:20px">Contextual pills above the chat sheet. Default state shown.</p><div class="specimen"><p class="specimen__label">Chat default · Default · Xs</p>' +
        chatDefault +
        '</div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Search interaction bar</h2><p class="stub-note" style="margin-bottom:20px">Pills plus search field and a Medium Icon Button (Close).</p><div class="specimen"><p class="specimen__label">Active · Xs</p>' +
        searchActive +
        '</div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Journal note bar</h2><p class="stub-note" style="margin-bottom:20px">Single published variant (Default): pill row + action cluster + icon buttons.</p><div class="specimen">' +
        journal +
        '</div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Fav check</h2><p class="stub-note" style="margin-bottom:20px">Number axis 1–5.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item"><strong>1</strong>' +
        fav(1) +
        "</div>" +
        '<div class="sel-item"><strong>3</strong>' +
        fav(3) +
        "</div>" +
        '<div class="sel-item"><strong>5</strong>' +
        fav(5) +
        "</div>" +
        '</div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live main bar</h2><p class="stub-note" style="margin-bottom:20px">Press a control. Slots come from the library Main bar.</p><p class="live-status" data-live="status-line" aria-live="polite">Press a control on the bar…</p><div class="specimen"><div data-live="action-bar">' +
        mainPrimary +
        "</div></div></section>" +
        footer(
          "One interaction bar per screen. Rebuild from the published set — do not invent bar chrome.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "header-nav": function (meta) {
      var iconBtn = function (src, label, cls) {
        return (
          '<button type="button" class="' +
          (cls || "ds-header__icon") +
          '" aria-label="' +
          label +
          '"><img src="' +
          src +
          '" alt="" /></button>'
        );
      };
      var titleHeader = function (alignMod, colourMod, userGuest) {
        return (
          '<div class="ds-header ds-header--title-' +
          alignMod +
          (colourMod ? " " + colourMod : "") +
          '">' +
          iconBtn("assets/icons/Left.svg", "Back", "ds-header__back") +
          '<p class="ds-header__title">Page name</p>' +
          (userGuest
            ? '<span class="ds-avatar ds-avatar--sm ds-avatar--guest" aria-label="Guest"></span>'
            : '<span class="ds-avatar ds-avatar--sm">IB</span>') +
          "</div>"
        );
      };
      var aiHeader = function (colourMod, guest) {
        return (
          '<div class="ds-header' +
          (colourMod ? " " + colourMod : "") +
          '">' +
          iconBtn("assets/icons/Close-Stroke.svg", "Close") +
          '<div class="ds-header__context"><p class="ds-header__title">Page name</p>' +
          (guest
            ? '<span class="ds-avatar ds-avatar--sm ds-avatar--guest" aria-label="Guest"></span>'
            : '<span class="ds-avatar ds-avatar--sm">IB</span>') +
          "</div>" +
          iconBtn("assets/icons/Add.svg", "More") +
          '<span class="ds-header__wallet" aria-label="Tokens">30</span>' +
          "</div>"
        );
      };
      var brandHeader = function () {
        return (
          '<div class="ds-header ds-header--brand">' +
          '<img class="ds-header__brand" src="assets/9c7986a030f38eafc7251c4cc3b1d099ad65a88d.svg" alt="Helfie" />' +
          '<span class="ds-avatar ds-avatar--sm ds-avatar--guest" aria-label="Guest"></span>' +
          "</div>"
        );
      };
      return (
        masthead("Header navigation", "Component · 120 variants") +
        lead(
          "Where am I, and how do I get out",
          "Header Navigation axes: Device × Type × User type × Colour Mode. Specimens use library icons and Avatar — not unicode arrows.",
          "SOURCE",
          "Header Navigation 6398:6293 · site only; library unchanged"
        ) +
        '<section class="section"><h2 class="display">Type</h2><p class="stub-note" style="margin-bottom:20px">AI header, Title Leading, Title Centre, Brand. Contextual matches AI chrome with icons.</p><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">AI header · Guest · Light</p>' +
        aiHeader("", true) +
        '</div><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">Title Leading · Registered · Light-Secondary</p>' +
        titleHeader("leading", "ds-header--light-secondary", false) +
        '</div><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">Title Centre · Registered · Light-Secondary</p>' +
        titleHeader("centre", "ds-header--light-secondary", false) +
        '</div><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">Brand · Guest · Light</p>' +
        brandHeader() +
        "</div>" +
        code('&lt;div class="<span class="tok">ds-header</span>"&gt;…library nav row…&lt;/div&gt;') +
        '</section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Colour mode</h2><p class="stub-note" style="margin-bottom:20px">Light, Light-Secondary, Dark, Dark-Secondary.</p><div class="specimen"><div class="sel-grid">' +
        '<div class="sel-item" style="background:#f5f5f5;padding:12px;border-radius:8px"><strong>LIGHT</strong>' +
        aiHeader("", false) +
        "</div>" +
        '<div class="sel-item" style="background:#eee;padding:12px;border-radius:8px"><strong>LIGHT-SECONDARY</strong>' +
        titleHeader("leading", "ds-header--light-secondary", false) +
        "</div>" +
        '<div class="sel-item" style="background:#333;padding:12px;border-radius:8px"><strong style="color:#b8b8b8">DARK</strong>' +
        aiHeader("ds-header--dark", false) +
        "</div>" +
        '<div class="sel-item" style="background:#000;padding:12px;border-radius:8px"><strong style="color:#b8b8b8">DARK-SECONDARY</strong>' +
        aiHeader("ds-header--dark-secondary", false) +
        "</div>" +
        '</div></div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">User type</h2><p class="stub-note" style="margin-bottom:20px">Guest uses the anonymous Avatar. Registered shows initials.</p><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">Registered</p>' +
        titleHeader("leading", "ds-header--light-secondary", false) +
        '</div><div class="specimen" style="background:#f5f5f5"><p class="specimen__label">Guest</p>' +
        titleHeader("leading", "ds-header--light-secondary", true) +
        '</div></section><hr class="rule" />' +
        '<section class="section"><h2 class="display">Live navigation</h2><p class="stub-note" style="margin-bottom:20px">Press back or account.</p><p class="live-status" data-live="status-line" aria-live="polite">Press back or account…</p><div class="specimen" style="background:#f5f5f5"><div class="ds-header ds-header--title-leading ds-header--light-secondary" data-live="header-back">' +
        iconBtn("assets/icons/Left.svg", "Back", "ds-header__back") +
        '<p class="ds-header__title">Page name</p>' +
        '<button type="button" class="ds-avatar ds-avatar--sm" data-label="Account" aria-label="Account" style="border:0;cursor:pointer">IB</button>' +
        "</div></div></section>" +
        footer(
          "A back affordance is not optional on any screen someone can reach from somewhere else.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    "bottom-bar": function (meta) {
      return (
        masthead("Bottom bar", "Deprecated") +
        lead(
          "Archived — do not use for new work",
          "Bottom bar is retained for legacy screens only. New flows use Interaction bars, which change with the job instead of offering a fixed tab set.",
          "REPLACE WITH",
          "Interaction bars · Main, Chat, Search, Journal note"
        ) +
        footer(
          "If you find a Bottom bar in production, plan a migration — do not extend it.",
          meta.next,
          meta.nextLabel
        )
      );
    },

    footer: function (meta) {
      return (
        masthead("Footer", "Navigation · 1 component, 1 variant") +
        lead(
          "The end of a marketing page",
          "The product footer lockup closes a marketing or web page. It is not an in-app tab bar and not a place to park extra navigation.",
          "SOURCE",
          "Component Library 2026. One lockup."
        ) +
        '<section class="section"><h2 class="display">Footer</h2><p class="stub-note" style="margin-bottom:20px">One lockup, no variants. Marketing and web surfaces only — never inside the app.</p><div class="specimen"><div class="ds-site-footer">' +
        logo() +
        '<p>A single fixed lockup. If a page needs something the footer does not carry, that content belongs in the page body, not bolted onto the footer.</p></div></div>' +
        code('&lt;footer class="<span class="tok">ds-site-footer</span>"&gt;\n  &lt;a class="<span class="tok">logo</span>" href="/"&gt;…&lt;/a&gt;\n  &lt;p&gt;…&lt;/p&gt;\n&lt;/footer&gt;') +
        '</section>' +
        footer(
          "The footer is the only bar that scrolls with the page. Everything else that sits at the base of a screen is pinned.",
          meta.next,
          meta.nextLabel
        )
      );
    },
  };

  // Safety net for any nav ids added later
  window.HDS_NAV.forEach(function (group) {
    group.items.forEach(function (item) {
      if (!window.HDS_PAGES[item.id]) {
        window.HDS_PAGES[item.id] = function (meta) {
          return stub(
            item.id,
            item.label,
            group.label.charAt(0) + group.label.slice(1).toLowerCase(),
            "Documentation page from the V5 · Design system Figma file.",
            meta.next,
            meta.nextLabel
          );
        };
      }
    });
  });
})();

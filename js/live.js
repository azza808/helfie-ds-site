(function () {
  function plainFromPre(pre) {
    return pre.textContent || pre.innerText || "";
  }

  function copyPlain(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function wrapBareCodeBlocks(root) {
    root.querySelectorAll(".code-block").forEach(function (pre) {
      if (pre.closest(".code-panel")) return;
      var panel = document.createElement("div");
      panel.className = "code-panel";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-panel__copy";
      btn.setAttribute("data-copy", "");
      btn.textContent = "Copy";
      pre.parentNode.insertBefore(panel, pre);
      panel.appendChild(btn);
      panel.appendChild(pre);
    });
  }

  function bindCopy(root) {
    wrapBareCodeBlocks(root);
    root.querySelectorAll(".code-panel__copy, [data-copy]").forEach(function (btn) {
      if (btn._hdsCopyBound) return;
      btn._hdsCopyBound = true;
      btn.addEventListener("click", function () {
        var panel = btn.closest(".code-panel");
        var pre = panel ? panel.querySelector(".code-block") : btn.nextElementSibling;
        if (!pre || !pre.classList.contains("code-block")) return;
        var text = plainFromPre(pre);
        copyPlain(text).then(function () {
          var prev = btn.textContent;
          btn.textContent = "Copied";
          window.setTimeout(function () {
            btn.textContent = prev;
          }, 1500);
        });
      });
    });
  }

  function bindChips(root) {
    var grouped = new Set();
    root.querySelectorAll('[data-live="chip-group"]').forEach(function (group) {
      var mode = group.getAttribute("data-mode") || "multi";
      group.querySelectorAll(".ds-chip").forEach(function (chip) {
        grouped.add(chip);
        if (chip._hdsChipBound) return;
        chip._hdsChipBound = true;
        chip.addEventListener("click", function () {
          if (mode === "single") {
            group.querySelectorAll(".ds-chip").forEach(function (c) {
              c.classList.remove("ds-chip--selected");
            });
            chip.classList.add("ds-chip--selected");
          } else {
            chip.classList.toggle("ds-chip--selected");
          }
        });
      });
    });

    root.querySelectorAll("button.ds-chip, .ds-chip").forEach(function (chip) {
      if (grouped.has(chip) || chip._hdsChipBound) return;
      if (chip.disabled || chip.getAttribute("aria-disabled") === "true") return;
      chip._hdsChipBound = true;
      chip.addEventListener("click", function () {
        chip.classList.toggle("ds-chip--selected");
      });
    });
  }

  function setToggleState(el, on) {
    el.classList.toggle("is-on", on);
    el.setAttribute("aria-pressed", on ? "true" : "false");
    if (el.getAttribute("role") === "switch" || el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", on ? "true" : "false");
    }
  }

  function bindToggles(root) {
    root.querySelectorAll("button.ds-toggle, [data-live=\"toggle\"]").forEach(function (el) {
      if (el._hdsToggleBound) return;
      el._hdsToggleBound = true;
      if (!el.hasAttribute("tabindex") && el.tagName !== "BUTTON") {
        el.setAttribute("tabindex", "0");
      }
      if (el.classList.contains("is-on")) {
        setToggleState(el, true);
      } else {
        setToggleState(el, false);
      }
      function flip() {
        setToggleState(el, !el.classList.contains("is-on"));
      }
      el.addEventListener("click", flip);
      el.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          flip();
        }
      });
    });
  }

  function bindCheckInputs(root) {
    root.querySelectorAll("input.ds-check-input[type=\"checkbox\"]").forEach(function (input) {
      if (input._hdsCheckBound) return;
      input._hdsCheckBound = true;
      function syncFromInput() {
        var box = input.parentElement && input.parentElement.querySelector(".ds-check__box");
        if (box) {
          box.classList.toggle("is-on", input.checked);
          box.classList.remove("is-partial");
        }
      }
      syncFromInput();
      input.addEventListener("change", syncFromInput);
    });
  }

  function bindCustomCheckboxes(root) {
    root.querySelectorAll(".ds-check__box").forEach(function (box) {
      if (box._hdsBoxBound) return;
      var host = box.closest(".ds-check");
      if (host && host.querySelector("input.ds-check-input")) return;
      if (host && host.closest("[data-live=\"checkbox-static\"]")) return;
      box._hdsBoxBound = true;
      var partialHost =
        box.closest('[data-partial="true"]') ||
        (host && host.getAttribute("data-partial") === "true" ? host : null);
      var label = host || box.parentElement;
      if (label && !label.hasAttribute("tabindex") && label.tagName !== "LABEL") {
        label.setAttribute("tabindex", "0");
        label.setAttribute("role", "checkbox");
        label.setAttribute("aria-checked", box.classList.contains("is-on") ? "true" : "false");
      }
      function syncAria() {
        if (!label || label.tagName === "LABEL") return;
        if (box.classList.contains("is-partial")) {
          label.setAttribute("aria-checked", "mixed");
        } else {
          label.setAttribute("aria-checked", box.classList.contains("is-on") ? "true" : "false");
        }
      }
      function cycle() {
        if (host && host.style.opacity === "0.45") return;
        if (partialHost) {
          if (!box.classList.contains("is-on") && !box.classList.contains("is-partial")) {
            box.classList.add("is-on");
            box.classList.remove("is-partial");
          } else if (box.classList.contains("is-on")) {
            box.classList.remove("is-on");
            box.classList.add("is-partial");
          } else {
            box.classList.remove("is-partial");
          }
        } else {
          box.classList.toggle("is-on");
          box.classList.remove("is-partial");
        }
        syncAria();
      }
      box.addEventListener("click", function (e) {
        e.stopPropagation();
        cycle();
      });
      if (label) {
        label.addEventListener("click", function (e) {
          if (e.target === box) return;
          cycle();
        });
        label.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            cycle();
          }
        });
      }
      syncAria();
    });
  }

  function bindRadios(root) {
    root.querySelectorAll('[data-live="radio-group"]').forEach(function (group) {
      group.querySelectorAll(".ds-radio__dot").forEach(function (dot) {
        if (dot._hdsRadioBound) return;
        dot._hdsRadioBound = true;
        dot.setAttribute("tabindex", "0");
        dot.setAttribute("role", "radio");
        function select() {
          group.querySelectorAll(".ds-radio__dot").forEach(function (d) {
            d.classList.remove("is-on");
            d.setAttribute("aria-checked", "false");
          });
          dot.classList.add("is-on");
          dot.setAttribute("aria-checked", "true");
        }
        dot.addEventListener("click", select);
        dot.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            select();
          }
        });
        dot.setAttribute("aria-checked", dot.classList.contains("is-on") ? "true" : "false");
      });
      group.querySelectorAll('input[type="radio"]').forEach(function (input) {
        if (input._hdsRadioBound) return;
        input._hdsRadioBound = true;
        input.addEventListener("change", function () {
          if (!input.checked) return;
          var name = input.name;
          group.querySelectorAll('input[type="radio"][name="' + name + '"]').forEach(function (r) {
            var dot = r.parentElement && r.parentElement.querySelector(".ds-radio__dot");
            if (dot) dot.classList.toggle("is-on", r.checked);
          });
        });
      });
    });
  }

  function bindButtonPress(root) {
    root.querySelectorAll("button:not(:disabled)").forEach(function (btn) {
      if (btn._hdsPressBound) return;
      if (!btn.classList.contains("ds-button") && !btn.classList.contains("ds-chip")) return;
      btn._hdsPressBound = true;
      btn.addEventListener("click", function () {
        btn.classList.add("is-pressed");
        window.setTimeout(function () {
          btn.classList.remove("is-pressed");
        }, 150);
      });
    });
  }

  function bindFields(root) {
    root.querySelectorAll('[data-live="field"]').forEach(function (field) {
      var input = field.querySelector("input, textarea");
      if (!input || input._hdsFieldBound) return;
      input._hdsFieldBound = true;
      input.addEventListener("input", function () {
        var min = parseInt(field.getAttribute("data-min-length") || "3", 10);
        if (field.classList.contains("ds-field--error") && input.value.trim().length > min - 1) {
          field.classList.remove("ds-field--error");
          var err = field.querySelector(".ds-field__error");
          if (err) err.textContent = "";
        }
      });
      input.addEventListener("focus", function () {
        field.classList.add("ds-field--focused");
      });
      input.addEventListener("blur", function () {
        field.classList.remove("ds-field--focused");
      });
    });
  }

  function bindMenus(root) {
    root.querySelectorAll('[data-live="menu"], .ds-menu[data-live="menu"]').forEach(function (menu) {
      menu.querySelectorAll("button").forEach(function (item) {
        if (item._hdsMenuBound) return;
        item._hdsMenuBound = true;
        item.addEventListener("click", function () {
          menu.querySelectorAll("button").forEach(function (b) {
            b.classList.remove("is-selected");
            b.removeAttribute("aria-current");
          });
          item.classList.add("is-selected");
          item.setAttribute("aria-current", "true");
        });
      });
    });
    root.querySelectorAll(".ds-menu:not([data-live])").forEach(function (menu) {
      if (!menu.closest("[data-live=\"menu\"]")) {
        menu.setAttribute("data-live", "menu");
        bindMenus(root);
      }
    });
  }

  function bindToastDismiss(root) {
    root.querySelectorAll("[data-live=\"toast-dismiss\"]").forEach(function (toast) {
      var close = toast.querySelector("[data-toast-close]");
      if (!close || close._hdsToastBound) return;
      close._hdsToastBound = true;
      close.addEventListener("click", function () {
        toast.classList.add("is-dismissed");
        toast.setAttribute("hidden", "");
      });
    });
  }

  /* Status lines are per-section so a page can carry more than one live demo. */
  function statusFor(el) {
    var scope = el.closest(".section") || document;
    return (
      scope.querySelector('[data-live="status-line"]') ||
      document.querySelector('[data-live="status-line"]')
    );
  }

  function setStatus(node, text) {
    if (!node) return;
    node.textContent = text;
    node.classList.add("is-visible");
  }

  function bindPlaygrounds(root) {
    root.querySelectorAll('[data-live="button-playground"] .ds-button').forEach(function (btn) {
      if (btn._hdsPlayBound) return;
      btn._hdsPlayBound = true;
      btn.addEventListener("click", function () {
        setStatus(statusFor(btn), "You clicked: " + (btn.textContent || "").trim());
      });
    });

    var modalStatus = root.querySelector('[data-live="modal-status"]');
    if (modalStatus) {
      root.querySelectorAll('[data-live="modal-actions"] button').forEach(function (btn) {
        if (btn._hdsModalBound) return;
        btn._hdsModalBound = true;
        btn.addEventListener("click", function () {
          setStatus(modalStatus, "Modal action: " + (btn.textContent || "").trim());
        });
      });
    }
  }

  /* Page indicator dots — active pill moves to the dot you press. */
  function bindStepperDots(root) {
    root.querySelectorAll('[data-live="stepper-dots"]').forEach(function (group) {
      var dots = group.querySelectorAll(".ds-stepper__dot");
      dots.forEach(function (dot, i) {
        if (dot._hdsDotBound) return;
        dot._hdsDotBound = true;
        dot.addEventListener("click", function () {
          dots.forEach(function (d) {
            d.classList.remove("is-active");
            d.setAttribute("aria-current", "false");
          });
          dot.classList.add("is-active");
          dot.setAttribute("aria-current", "true");
          setStatus(
            statusFor(group),
            "Slide " + (i + 1) + " of " + dots.length
          );
        });
      });
    });
  }

  /* Single-select tile group. */
  function bindTileSelect(root) {
    root.querySelectorAll('[data-live="tile-select"]').forEach(function (group) {
      group.querySelectorAll(".ds-tile").forEach(function (tile) {
        if (tile._hdsTileBound) return;
        tile._hdsTileBound = true;
        if (!tile.hasAttribute("tabindex")) tile.setAttribute("tabindex", "0");
        if (!tile.hasAttribute("role")) tile.setAttribute("role", "button");
        function select() {
          group.querySelectorAll(".ds-tile").forEach(function (t) {
            t.classList.remove("is-selected");
            t.setAttribute("aria-pressed", "false");
          });
          tile.classList.add("is-selected");
          tile.setAttribute("aria-pressed", "true");
          var name = tile.querySelector("strong");
          setStatus(
            statusFor(group),
            "Selected: " + ((name && name.textContent) || "").trim()
          );
        }
        tile.addEventListener("click", select);
        tile.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            select();
          }
        });
        tile.setAttribute("aria-pressed", tile.classList.contains("is-selected") ? "true" : "false");
      });
    });
  }

  /* Click a body row to highlight it. */
  function bindTableRows(root) {
    root.querySelectorAll('[data-live="table-row"]').forEach(function (table) {
      table.querySelectorAll("tbody tr").forEach(function (row) {
        if (row._hdsRowBound) return;
        row._hdsRowBound = true;
        row.setAttribute("tabindex", "0");
        function select() {
          table.querySelectorAll("tbody tr").forEach(function (r) {
            r.classList.remove("is-selected");
            r.removeAttribute("aria-selected");
          });
          row.classList.add("is-selected");
          row.setAttribute("aria-selected", "true");
          var first = row.querySelector("td");
          setStatus(
            statusFor(table),
            "Row selected: " + ((first && first.textContent) || "").trim()
          );
        }
        row.addEventListener("click", select);
        row.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            select();
          }
        });
      });
    });
  }

  /* Toggle a modifier class on a marked target — used for Info panel outline. */
  function bindClassToggles(root) {
    root.querySelectorAll('[data-live="info-toggle"]').forEach(function (group) {
      var targets = group.querySelectorAll("[data-toggle-target]");
      group.querySelectorAll("[data-toggle-class]").forEach(function (btn) {
        if (btn._hdsClassToggleBound) return;
        btn._hdsClassToggleBound = true;
        var cls = btn.getAttribute("data-toggle-class");
        btn.setAttribute(
          "aria-pressed",
          targets[0] && targets[0].classList.contains(cls) ? "true" : "false"
        );
        btn.addEventListener("click", function () {
          var on = !(targets[0] && targets[0].classList.contains(cls));
          targets.forEach(function (t) {
            t.classList.toggle(cls, on);
          });
          btn.setAttribute("aria-pressed", on ? "true" : "false");
          setStatus(
            statusFor(group),
            (btn.textContent || "").trim() + ": " + (on ? "on" : "off")
          );
        });
      });
    });
  }

  /* Swap one modifier class for another across marked targets. */
  function bindVariantPickers(root) {
    root.querySelectorAll('[data-live="variant-picker"]').forEach(function (picker) {
      var remove = (picker.getAttribute("data-remove") || "").split(/\s+/).filter(Boolean);
      var targets = picker.querySelectorAll("[data-variant-target]");
      picker.querySelectorAll("[data-set]").forEach(function (option) {
        if (option._hdsVariantBound) return;
        option._hdsVariantBound = true;
        option.addEventListener("click", function () {
          var next = option.getAttribute("data-set");
          targets.forEach(function (t) {
            remove.forEach(function (cls) {
              t.classList.remove(cls);
            });
            if (next) t.classList.add(next);
          });
          setStatus(statusFor(picker), "Variant: " + (option.textContent || "").trim());
        });
      });
    });
  }

  /* Action bar and header back both report which control was pressed. */
  function bindStatusButtons(root) {
    [
      ['[data-live="action-bar"]', "Action bar: "],
      ['[data-live="header-back"]', "Header: "],
    ].forEach(function (pair) {
      root.querySelectorAll(pair[0]).forEach(function (group) {
        group.querySelectorAll("button").forEach(function (btn) {
          if (btn._hdsStatusBtnBound) return;
          btn._hdsStatusBtnBound = true;
          btn.addEventListener("click", function () {
            var name =
              btn.getAttribute("data-label") ||
              (btn.textContent || "").trim() ||
              btn.getAttribute("aria-label") ||
              "Control";
            setStatus(statusFor(group), pair[1] + name);
          });
        });
      });
    });
  }

  /* Send a message into the thread, then answer with the preset reply. */
  function bindChatSend(root) {
    root.querySelectorAll('[data-live="chat-send"]').forEach(function (block) {
      var thread = block.querySelector("[data-chat-thread]");
      var input = block.querySelector("[data-chat-input]");
      var send = block.querySelector("[data-chat-send]");
      if (!thread || !send || send._hdsChatBound) return;
      send._hdsChatBound = true;
      var reply =
        block.getAttribute("data-chat-reply") ||
        "Your result sits outside the typical range. Here is what to do next.";
      var pending = false;

      function append(kind, text) {
        var bubble = document.createElement("div");
        bubble.className = kind === "ai" ? "ds-chat__ai" : "ds-chat__user";
        if (kind === "ai") {
          /* AI Response has no name label and no filled bubble — plain body text */
          var body = document.createElement("p");
          body.textContent = text;
          bubble.appendChild(body);
        } else {
          bubble.textContent = text;
        }
        thread.appendChild(bubble);
      }

      function submit() {
        if (pending) return;
        var text = (input && input.value.trim()) || "Can you explain this result?";
        append("user", text);
        if (input) input.value = "";
        pending = true;
        window.setTimeout(function () {
          append("ai", reply);
          pending = false;
        }, 450);
      }

      send.addEventListener("click", submit);
      if (input) {
        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        });
      }
      /* Chat prompt items fill the Chat interaction bar input */
      block.querySelectorAll(".ds-chat-prompt__item").forEach(function (prompt) {
        if (prompt._hdsPromptBound) return;
        prompt._hdsPromptBound = true;
        prompt.addEventListener("click", function () {
          if (!input) return;
          input.value = (prompt.textContent || "").trim();
          input.focus();
        });
      });
    });
  }

  /* Open and close the drawer specimen. */
  function bindDrawerToggle(root) {
    root.querySelectorAll('[data-live="drawer-toggle"]').forEach(function (group) {
      var target = group.querySelector("[data-drawer-target]");
      var btn = group.querySelector("[data-drawer-button]");
      if (!target || !btn || btn._hdsDrawerBound) return;
      btn._hdsDrawerBound = true;
      function sync() {
        var open = !target.classList.contains("is-closed");
        btn.textContent = open ? "Close drawer" : "Open drawer";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      sync();
      btn.addEventListener("click", function () {
        target.classList.toggle("is-closed");
        sync();
        setStatus(
          statusFor(group),
          "Drawer " + (target.classList.contains("is-closed") ? "closed" : "open")
        );
      });
    });
  }

  window.HDS_bindLive = function (root) {
    root = root || document;
    bindCopy(root);
    bindChips(root);
    bindToggles(root);
    bindCheckInputs(root);
    bindCustomCheckboxes(root);
    bindRadios(root);
    bindButtonPress(root);
    bindFields(root);
    bindMenus(root);
    bindToastDismiss(root);
    bindPlaygrounds(root);
    bindStepperDots(root);
    bindTileSelect(root);
    bindTableRows(root);
    bindClassToggles(root);
    bindVariantPickers(root);
    bindStatusButtons(root);
    bindChatSend(root);
    bindDrawerToggle(root);
  };
})();

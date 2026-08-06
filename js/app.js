(function () {
  var cover = document.getElementById("cover");
  var app = document.getElementById("app");
  var navEl = document.getElementById("nav");
  var mainEl = document.getElementById("main");

  function allItems() {
    var items = [];
    window.HDS_NAV.forEach(function (g) {
      g.items.forEach(function (i) {
        items.push(i);
      });
    });
    return items;
  }

  function findMeta(id) {
    return allItems().find(function (i) {
      return i.id === id;
    });
  }

  function renderNav(activeId) {
    navEl.innerHTML = window.HDS_NAV.map(function (group) {
      var links = group.items
        .map(function (item) {
          var cls = item.id === activeId ? "is-active" : "";
          if (item.deprecated) cls += (cls ? " " : "") + "is-deprecated";
          return (
            '<a href="#' +
            item.id +
            '" class="' +
            cls +
            '"' +
            (item.deprecated ? ' title="Deprecated — prefer Interaction bars"' : "") +
            ">" +
            item.label +
            "</a>"
          );
        })
        .join("");
      return (
        '<div class="nav__group"><p class="nav__label">' +
        group.label +
        "</p>" +
        links +
        "</div>"
      );
    }).join("");
  }

  function showCover() {
    cover.classList.remove("is-hidden");
    app.classList.remove("is-active");
    document.title = "Helfie Design System";
    window.scrollTo(0, 0);
  }

  function showPage(id) {
    if (!id || id === "cover") {
      showCover();
      return;
    }
    var meta = findMeta(id);
    if (!meta) {
      showCover();
      return;
    }
    cover.classList.add("is-hidden");
    app.classList.add("is-active");
    renderNav(id);
    var render = window.HDS_PAGES[id];
    mainEl.innerHTML = render
      ? render(meta)
      : "<p>Page not found.</p>";
    if (window.HDS_bindLive) window.HDS_bindLive(mainEl);
    document.title = meta.label + " · Helfie Design System";
    window.scrollTo(0, 0);
  }

  function route() {
    var hash = (location.hash || "#cover").slice(1);
    if (!hash || hash === "cover") showCover();
    else showPage(hash);
  }

  /* Logo / Cover nav: always return to cover (hashchange alone can miss same-hash clicks). */
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest('a[href="#cover"]');
    if (!link) return;
    e.preventDefault();
    if (location.hash !== "#cover") {
      location.hash = "cover";
    } else {
      showCover();
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();

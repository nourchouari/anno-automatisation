/* ==========================================================================
   ANNO — Scripts du site
   --------------------------------------------------------------------------
   Aucune dépendance externe. Chargé avec `defer` : le DOM est prêt.

   1. initReveal()    — apparition des blocs au défilement
   2. initMenu()      — menu mobile (hamburger)
   3. initRdv()       — modale « Réserver un rendez-vous »
   4. initSimulator() — simulateur de la section « Le calcul »
   ========================================================================== */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var MOBILE_QUERY = window.matchMedia("(max-width: 960px)");


  /* ------------------------------------------------------------------------
     1. Apparition au défilement
     ------------------------------------------------------------------------ */

  function initReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    // Sans IntersectionObserver, ou si l'utilisateur limite les animations,
    // tout est affiché immédiatement.
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    elements.forEach(function (el) { observer.observe(el); });
  }


  /* ------------------------------------------------------------------------
     2. Menu mobile
     ------------------------------------------------------------------------ */

  function initMenu() {
    var burger = document.querySelector(".burger");
    var menu = document.getElementById("menu-mobile");
    if (!burger || !menu) return;

    var LABEL_OPEN = "Ouvrir le menu";
    var LABEL_CLOSE = "Fermer le menu";

    function isOpen() {
      return burger.getAttribute("aria-expanded") === "true";
    }

    function open() {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", LABEL_CLOSE);
      menu.classList.add("is-open");
      document.body.classList.add("has-menu-open");

      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }

    function close(returnFocus) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", LABEL_OPEN);
      menu.classList.remove("is-open");
      document.body.classList.remove("has-menu-open");

      if (returnFocus) burger.focus({ preventScroll: true });
    }

    burger.addEventListener("click", function () {
      if (isOpen()) { close(true); } else { open(); }
    });

    // Un clic sur un lien ferme le menu (l'ancre fait ensuite son travail)
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) close(false);
    });

    // Échap ferme le menu
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) close(true);
    });

    // Le menu ne doit jamais rester ouvert en revenant sur un écran large
    function handleBreakpoint(event) {
      if (!event.matches && isOpen()) close(false);
    }
    if (typeof MOBILE_QUERY.addEventListener === "function") {
      MOBILE_QUERY.addEventListener("change", handleBreakpoint);
    } else if (typeof MOBILE_QUERY.addListener === "function") {
      MOBILE_QUERY.addListener(handleBreakpoint);
    }
  }


  /* ------------------------------------------------------------------------
     3. Modale « Réserver un rendez-vous »
     ------------------------------------------------------------------------ */

  function initRdv() {
    var dialog = document.getElementById("rdv");
    if (!dialog) return;

    var supportsDialog = typeof dialog.showModal === "function";
    var lastTrigger = null;

    function open(trigger) {
      lastTrigger = trigger || null;
      document.body.classList.add("has-menu-open");

      if (supportsDialog) {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }

      var firstOption = dialog.querySelector(".rdv__option");
      if (firstOption) firstOption.focus({ preventScroll: true });
    }

    function close() {
      document.body.classList.remove("has-menu-open");

      if (supportsDialog && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }

      if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus({ preventScroll: true });
      }
      lastTrigger = null;
    }

    // Tous les boutons « Réserver un rendez-vous » du site
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-rdv], [data-rdv-open]");
      if (trigger) {
        event.preventDefault();
        // Si le déclencheur est dans le menu mobile, on le laisse se refermer
        var burger = document.querySelector(".burger");
        if (burger && burger.getAttribute("aria-expanded") === "true") {
          burger.click();
        }
        open(trigger);
        return;
      }

      if (event.target.closest("[data-rdv-close]")) {
        event.preventDefault();
        close();
      }
    });

    // Clic en dehors du contenu (sur le fond) : on ferme
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) close();
    });

    // Échap : `<dialog>` gère la fermeture, on remet juste le défilement
    dialog.addEventListener("close", function () {
      document.body.classList.remove("has-menu-open");
    });

    // Repli pour les navigateurs sans <dialog> : Échap doit fonctionner aussi
    if (!supportsDialog) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && dialog.hasAttribute("open")) close();
      });
    }

    // Un appel lancé depuis la modale la referme
    dialog.addEventListener("click", function (event) {
      if (event.target.closest(".rdv__option")) {
        window.setTimeout(close, 400);
      }
    });
  }


  /* ------------------------------------------------------------------------
     4. Simulateur — un devis sans réponse sur cinq est récupéré
     ------------------------------------------------------------------------ */

  function initSimulator() {
    var TAUX_RECUPERATION = 0.2;

    var devis   = document.getElementById("c-devis");
    var montant = document.getElementById("c-montant");
    var part    = document.getElementById("c-pct");
    if (!devis || !montant || !part) return;

    var outDevis   = document.getElementById("o-devis");
    var outMontant = document.getElementById("o-montant");
    var outPart    = document.getElementById("o-pct");
    var resEuros   = document.getElementById("r-euros");
    var resDevis   = document.getElementById("r-devis");

    function format(value) {
      return value.toLocaleString("fr-FR");
    }

    function update() {
      var nbDevis = Number(devis.value);
      var moyenne = Number(montant.value);
      var sansReponse = Number(part.value) / 100;

      outDevis.textContent   = format(nbDevis);
      outMontant.textContent = format(moyenne) + " €";
      outPart.textContent    = part.value + " %";

      var recuperes = nbDevis * sansReponse * TAUX_RECUPERATION;
      var euros = Math.round(recuperes * moyenne / 10) * 10;

      resEuros.textContent = format(euros) + " €";
      resDevis.textContent = recuperes < 1 ? "environ 1" : format(Math.round(recuperes));
    }

    [devis, montant, part].forEach(function (input) {
      input.addEventListener("input", update);
    });

    update();
  }


  /* --------------------------------------------------------------------- */

  initReveal();
  initMenu();
  initRdv();
  initSimulator();
})();

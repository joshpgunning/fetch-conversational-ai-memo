/* @ds-bundle: {"format":3,"namespace":"Frisbee_46df5c","components":[],"sourceHashes":{"components/reactions.js":"a9d0db7ecde6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Frisbee_46df5c = window.Frisbee_46df5c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/reactions.js
try { (() => {
/* Fetch Design System — Reactions count roller
 *
 * Expands every `.fetch-reactions__count[data-unliked][data-liked]` into a
 * row of per-character viewports so that ONLY the digits that differ between
 * the unliked and liked values animate when the user toggles `data-liked`
 * on the parent `.fetch-reactions` button.
 *
 * Usage:
 *   <span class="fetch-reactions__count" data-unliked="144" data-liked="145"></span>
 *
 * On load, this becomes:
 *   <span class="fetch-reactions__count" …>
 *     <span class="fetch-reactions__count-char">     ← static "1"
 *       <span class="fetch-reactions__count-track">
 *         <span class="fetch-reactions__count-slot">1</span>
 *         <span class="fetch-reactions__count-slot">1</span>
 *       </span>
 *     </span>
 *     <span class="fetch-reactions__count-char">     ← static "4"
 *       …same…
 *     </span>
 *     <span class="fetch-reactions__count-char">     ← rolls 4→5
 *       <span class="fetch-reactions__count-track">
 *         <span class="fetch-reactions__count-slot">4</span>  ← unliked top
 *         <span class="fetch-reactions__count-slot">5</span>  ← liked bottom
 *       </span>
 *     </span>
 *   </span>
 *
 * The CSS rule on `.fetch-reactions[data-liked="true"]` translates each
 * track up by one line — but for chars where both slots are the same, the
 * motion is invisible.
 */
(function () {
  function expand(el) {
    if (!el || el.dataset.expanded === '1') return;
    var unliked = el.getAttribute('data-unliked') || el.textContent || '';
    var liked = el.getAttribute('data-liked') || unliked;

    // Right-align by padding the SHORTER value with leading spaces so the
    // values line up at their last char. (Same-length is the common case;
    // 9→10, 99→100 etc trigger this.)
    var len = Math.max(unliked.length, liked.length);
    var u = unliked.padStart(len, ' ');
    var l = liked.padStart(len, ' ');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < len; i++) {
      var uc = u.charAt(i);
      var lc = l.charAt(i);
      // Render leading-space padding as a zero-width char so widths still
      // line up but no glyph shows.
      var ucDisp = uc === ' ' ? ' ' : uc;
      var lcDisp = lc === ' ' ? ' ' : lc;
      var charEl = document.createElement('span');
      charEl.className = 'fetch-reactions__count-char';
      // Mark chars whose value differs so only those animate. The CSS rule
      // that translates the track is gated by `--changes`, so identical
      // chars (and entire counts like "2.4k" → "2.4k") stay perfectly inert.
      if (uc !== lc) charEl.classList.add('fetch-reactions__count-char--changes');
      var track = document.createElement('span');
      track.className = 'fetch-reactions__count-track';
      var slotU = document.createElement('span');
      slotU.className = 'fetch-reactions__count-slot';
      slotU.textContent = ucDisp;
      var slotL = document.createElement('span');
      slotL.className = 'fetch-reactions__count-slot';
      slotL.textContent = lcDisp;
      track.appendChild(slotU); // top = unliked
      track.appendChild(slotL); // bottom = liked
      charEl.appendChild(track);
      frag.appendChild(charEl);
    }
    el.textContent = '';
    el.appendChild(frag);
    el.dataset.expanded = '1';
  }
  function expandAll(root) {
    (root || document).querySelectorAll('.fetch-reactions__count[data-unliked][data-liked]').forEach(expand);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      expandAll();
    });
  } else {
    expandAll();
  }

  // Expose for late-injected markup.
  window.FetchReactions = {
    expand: expand,
    expandAll: expandAll
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reactions.js", error: String((e && e.message) || e) }); }

})();

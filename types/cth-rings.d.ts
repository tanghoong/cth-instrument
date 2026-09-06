import type { CTHKnob } from './cth-knob';

export declare class CTHRings extends HTMLElement {
  /**
   * The slotted knobs, outermost first — the order they appear in the markup.
   * cth-rings sizes them; it does not draw them, so each stays an ordinary knob
   * you can set `value` on directly.
   */
  readonly rings: CTHKnob[];
}

declare global {
  interface HTMLElementTagNameMap {
    'cth-rings': CTHRings;
  }
}

export default CTHRings;

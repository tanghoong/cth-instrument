export declare class CTHHeat extends HTMLElement {
  /**
   * The values as given. Assigning an array is the same as setting `values=`.
   * Reading returns a copy, so mutating it does not change the ring.
   */
  values: number[];
  /** How many concentric rings to split the list across. Attribute: `rows` (default 1). */
  rows: number;
  /** The value the pointer is over, or `null`. Needs `interactive`. Read-only. */
  readonly hot: number | null;
  /**
   * Presentational attributes with no property mirror:
   * `shape` (`"cells"` | `"bars"`), `scale`, `min`, `max`, `sweep`, `start`,
   * `labels`, `label-radius`, `label`, `unit`, `decimals`, `interactive`, and
   * `readout` (`"average"` | `"sum"` | `"max"` | `"none"`).
   * Set them with `setAttribute`.
   *
   * Slot: `center` replaces the computed readout with your own markup.
   *
   * Without `min`/`max` the colour scale spans the data's own extremes.
   */
}

export interface CTHHeatHoverDetail {
  /** Index into `values`, or -1 when the pointer left the cells. */
  index: number;
  /** The value at that index, or `null`. */
  value: number | null;
}

declare global {
  interface HTMLElementTagNameMap {
    'cth-heat': CTHHeat;
  }
  interface HTMLElementEventMap {
    /** Fired when the pointer moves onto a different cell, or off the ring. */
    'cth-hover': CustomEvent<CTHHeatHoverDetail>;
  }
}

export default CTHHeat;

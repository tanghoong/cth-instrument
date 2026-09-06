export interface CTHBlip {
  /** Bearing in degrees, 0 = north, clockwise. */
  bearing: number;
  /** Distance from the centre, 0 at the origin to 1 at the outer ring. */
  range: number;
  label?: string;
}

export declare class CTHRadar extends HTMLElement {
  /** Contacts on the scope. Assigning replaces the whole set and redraws. */
  blips: CTHBlip[];
  /** Seconds per revolution of the sweep. `0` stops it. Attribute: `period`. */
  period: number;

  addBlip(blip: CTHBlip): this;
  clearBlips(): this;
  /** Replace the contacts with `n` at random bearings and ranges. */
  scatter(n?: number): this;
}

declare global {
  interface HTMLElementTagNameMap {
    'cth-radar': CTHRadar;
  }
  interface HTMLElementEventMap {
    /** Fired each time the sweep's leading edge crosses a contact. */
    'cth-detect': CustomEvent<CTHBlip & { index: number }>;
    /** Fired when a click on an `interactive` scope adds a contact. */
    'cth-blip': CustomEvent<{ bearing: number; range: number; count: number }>;
  }
}

export default CTHRadar;

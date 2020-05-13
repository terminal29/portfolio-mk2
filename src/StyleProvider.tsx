export class StyleProvider {
  public static getFont(): string {
    return '"Lucida Console", Monaco, monospace';
  }
  public static getBackgroundColour(): string {
    return "#1D1D1D";
  }
  public static getLightBackgroundColour(): string {
    return "#222222";
  }
  public static getFontColour(): string {
    return "#d0d0d0";
  }
  public static getHighlightFontColour(): string {
    return "#e0e0e0";
  }
  public static getMobileMediaQueryString(): string {
    return "only screen and (max-width: 750px)";
  }
  public static getTabletMediaQueryString(): string {
    return "only screen and (max-width: 1100px)";
  }
}

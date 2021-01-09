/**
 * Provides common method used for string formatting.
 */
export class StringFormatter {

  /**
   * Store value on which different methods has to be applied.
   */
  private value: string;

  /**
   * Constructor for StringFormatter
   * @param value Value on which methods has to be applied
   */
  constructor(value: string) {
    this.value = value;
  }

  /**
   * Split given string by the defined splitter and join.
   * Default join is by space.
   *
   * @param split Split literal
   * @param join Join literal
   */
  public splitToTitleCase(split: string, join = ' ') {
    return this.value.split(split).map(
      w => w[0].toUpperCase() + w.substr(1).toLowerCase()
    ).join(join);
  }

  public stringsWithoutHTMLTags(str: string) {
    const regEx = /(<([^>]+)>)/ig;
    return str.replace(regEx, '');
  }
}

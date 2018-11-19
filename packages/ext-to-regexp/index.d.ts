interface ExtRegExp extends RegExp {
  /** add extname to regexp */
  add(...extname: string[]): ExtRegExp;
  /** remove extname from regexp */
  remove(...extname: string[]): ExtRegExp;
  /** get extname from regexp */
  readonly extname: string[];
}

/** Convert extname into regexp */
declare function extToRegexp(...extname: string[]): ExtRegExp;

export = extToRegexp;

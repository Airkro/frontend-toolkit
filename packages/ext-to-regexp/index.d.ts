interface ExtRegExp extends RegExp {
  /** add extname to regexp */
  add(...extname: string[]): ExtRegExp;
  /** remove extname from regexp */
  remove(...extname: string[]): ExtRegExp;
  /** get raw regexp */
  valueOf(): RegExp;
  /** get extname from regexp */
  readonly extname: string[];
  /** get suffix from regexp */
  readonly suffix: string[];
}

/** Convert extname into regexp */
declare function extToRegexp(options: {
  suffix?: string[];
  extname: string[];
}): ExtRegExp;

export = extToRegexp;

export enum Type {
  AMOUNT = 'Amount',
  TITLE = 'Title',
  DATE = 'Date',
}

export enum AmountCondition {
  MORE = 'More',
  LESS = 'Less',
  EQUALS = 'Equals',
}

export enum TitleCondition {
  STARTS_WITH = 'Starts with',
  ENDS_WITH = 'Ends with',
  CONTAINS = 'Contains',
}

export enum DateCondition {
  FROM = 'From',
  TO = 'To',
  EQUALS = 'Equals'
}
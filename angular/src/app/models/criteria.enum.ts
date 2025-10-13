export enum Type {
  AMOUNT = 'AMOUNT',
  TITLE = 'TITLE',
  DATE = 'DATE',
}

export enum AmountCondition {
  MORE = 'MORE',
  LESS = 'LESS',
  EQUALS = 'EQUALS',
}

export enum TitleCondition {
  STARTS_WITH = 'STARTS WITH',
  ENDS_WITH = 'ENDS WITH',
  CONTAINS = 'CONTAINS',
}

export enum DateCondition {
  FROM = 'FROM',
  TO = 'TO',
  EQUALS = 'EQUALS'
}
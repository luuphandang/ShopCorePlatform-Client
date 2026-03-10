type TNe = {
  $ne: unknown;
};

type TLt = {
  $lt: number | Date;
};

type TLte = {
  $lte: number | Date;
};

type TGt = {
  $gt: number | Date;
};

type TGte = {
  $gte: number | Date;
};

type TIn<T> = {
  $in: T[keyof T][];
};

type TNotIn = {
  $nIn: unknown[];
};

type TContains = {
  $contains: string | number;
};

type TNotContains = {
  $nContains: unknown;
};

type TIContains = {
  $iContains: string | number;
};

type TNotIContains = {
  $nIContains: unknown;
};

type TNull = {
  $null: boolean;
};

type TNotNull = {
  $nNull: boolean;
};

type TBetween = {
  $between: [number, number] | [Date, Date] | [string, string];
};

type TContainsAnyInteger = {
  $containsAnyInteger: number[];
};

type TContainsAnyString = {
  $containsAnyString: string[];
};

type TContainsValueInteger = {
  $containsValueInteger: number;
};

type TContainsValueString = {
  $containsValueString: string;
};

type TContainsAllInteger = {
  $containsAllInteger: number[];
};

type TContainsAllString = {
  $containsAllString: string[];
};

export type TFilterOperator<T> =
  | T
  | TNe
  | TLt
  | TLte
  | TGt
  | TGte
  | TIn<T>
  | TNotIn
  | TContains
  | TNotContains
  | TNull
  | TNotNull
  | TBetween
  | TIContains
  | TNotIContains
  | TContainsAnyInteger
  | TContainsAnyString
  | TContainsValueInteger
  | TContainsValueString
  | TContainsAllInteger
  | TContainsAllString;

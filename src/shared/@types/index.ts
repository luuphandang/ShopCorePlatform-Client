export type DeepRemoveNull<T> = T extends (infer U)[]
  ? DeepRemoveNull<U>[]
  : T extends object
    ? { [K in keyof T]: DeepRemoveNull<Exclude<T[K], null>> }
    : Exclude<T, null>;

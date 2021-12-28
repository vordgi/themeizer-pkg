class GlobalRef<T> {
  private readonly sym: symbol;

  constructor (uniqueName: string) {
    this.sym = Symbol.for(uniqueName);
  }

  get value (): T {
    return (global as any)[this.sym] as T;
  }

  set value (value: T) {
    (global as any)[this.sym] = value;
  }
}

export default GlobalRef;

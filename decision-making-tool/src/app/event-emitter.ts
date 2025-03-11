class Emitter {
  private events: Record<string, ((...arguments_: unknown[]) => void)[]> = {};

  public on(event: string, listener: () => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  public emit(event: string, ...arguments_: unknown[]): void {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        listener(...arguments_);
      }
    }
  }
}

export default Emitter;

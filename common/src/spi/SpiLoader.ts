export interface SpiLoader<T> {
    load(packagePath: string): Promise<T>;
}

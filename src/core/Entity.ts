import type { INewNull } from "@core/INewNull";

export abstract class Entity<T> implements INewNull {
  protected readonly _id: string | undefined;
  public readonly props: T;
  isNull = true;

  protected constructor(props: T, id?: string) {
    this._id = id;
    this.props = props;
    this.isNull = false;
  }
}

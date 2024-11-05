import { Entity } from "@core/Entity";
import type { RoleDTO, UserStatusDTO } from "@services/apis/user";

type UserStatus = UserStatusDTO;
type UserRole = RoleDTO;

export interface UserProps {
  email: string;
  firstname: string;
  lastname: string;
  status: UserStatus;
  roles: UserRole[];
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get id(): string {
    return this._id ?? "";
  }

  get email(): string {
    return this.props.email;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get firstname(): string {
    return this.props.firstname;
  }

  get lastname(): string {
    return this.props.lastname;
  }

  get roles(): string[] {
    return this.props.roles;
  }
}

//Use as a default value adn also to make there is data or not using `isNull` property
export const nullUserEntity = (): User => {
  const user = new User({} as UserProps);
  user.isNull = true;
  return user;
};
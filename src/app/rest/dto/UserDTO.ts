import {UserRoleDTO} from "./UserRoleDTO";

export interface UserDTO {
  id?: number;
  cdsid?:string; // Using ? because it's usually null on 'Create'

  secret: string | null;
  tempSecret: string | null;
  mfaEnabled: boolean;

  /** * Maps to hashPassword in Java.
   * Remember: This is the plain-text password sent to the server.
   */
  hashPassword?: string;
  active: boolean;

  personId?: number;
  roles: UserRoleDTO[];        // List<String> maps to string[]
}



export interface UserInfoDTO {
  userID: number;
  userName: string;
  email: string;
  roleIds: number[];
  lastLogginDate: string;
}


export class ChangePasswordDTO {
  currentPassword!: string;
  newPassword!: string;
}


export class UserProfileDTO {
  userID!: number;
  phoneNumber!: string;
  birthDate!: string;
  gender!: number;
  userImage!: string;
  firstNameAr!: string;
  lastNameAr!: string;
}
export class EditUserInfoDTO {
  email!: string;
  phoneNumber!: string;
  birthDate!: Date;
  gender!: number;
  userImage!: string;
  firstNameAr!: string;
  lastNameAr!: string;
}

export interface UserDetailsDTO {
  userName: string;
  mobileNumber: string;
  lastLogin: string | null;
  creationDate: string;
  genderId: number;
  genderNameAr: string;
  genderNameEn: string;
  birthDate: string | null;
}
export class tblWebUsersTypeLockup {
  id!: number;
  nameAr!: string | null;
  nameEn!: string | null;
}
export class LoginDTO {
  userName!: string;
  password!: string;
}

export class RegisterDTO {
  username!: string;
  email!: string;
  password!: string;
  ModifyBy!:number;
}


export class LoginResponseDTO {
  token!: string;
  refreshToken!: string;
  roleIds!: number[];
}

export class UserInfoDTO {
  userID!: number
  userName!: string
  email!: string
  roleId!: number
  lastLogginDate!: string
  roleNameEN!: string
  roleNameAR!: string
  userImage!: string
}

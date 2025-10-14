export interface UserDto {
  idUserDto: number;
  isAdminDto: boolean;
  nomUserDto: string;
  prenomUserDto: string;
  mailUserDto: string;
  mdpUserDto?: string;
  recettesDto: any[];
}
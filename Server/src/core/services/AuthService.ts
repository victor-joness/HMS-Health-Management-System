import bcrypt from "bcrypt";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { genAuthToken } from "../../infrastructure/external-services/genAuthToken";
import { UserServices } from "./UserServices";
import { UserRepositoryImplementation } from "../implementation/UserRepositoryImplementation";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { CreateError } from "../../shared/errors/CreateError";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";
import { HospitalsServices } from "./HospitalsService";
import { PgTransaction } from "drizzle-orm/pg-core";

const saltRounds = 10;

export class AuthService {
  constructor(
    private UserServices: UserServices,
    private HospitalServices: HospitalsServices,
    private CacheService: CacheInterface
  ) {}

  async login(email: string, password: string) {
    const user = await this.UserServices.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const userDTO = {...user, HospitalInfo: await this.HospitalServices.getHospitalById(user.HospitalId)};

    const token = genAuthToken(userDTO);
    return { user, token };
  }

  async register(userData: any) {
    if (!userData.Name || !userData.Email || !userData.Password) {
      throw new CreateError("Dados obrigatórios ausentes");
    }

    const existingUser = await this.UserServices.getUserByEmail(userData.Email);
    if (existingUser) {
      throw new CreateError("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);

    const user: any = {
      Name: userData.Name,
      Email: userData.Email,
      Password: hashedPassword,
      Role: UserRoleEnum.PACIENTE,
      Img: userData.Img ?? "default-img.png",
      Gender: userData.Gender,
      Age: userData.Age,
      PhoneNumber: userData.PhoneNumber,
      PhoneEmergency: userData.PhoneEmergency,
      HospitalId: userData.HospitalId,
      DeletionDate: null,
      ModifiedDate: null,
      CreationDate: new Date().toISOString(),
    };

    const createdUser = await this.UserServices.createUser(user);

    const token = genAuthToken(createdUser);

    return { createdUser, token };
  }

  // Recuperação de senha
  /* async forgotPassword(email: string) {
    try {
      const user = await this.authRepository.getUserByEmail(email);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Gerar um token de recuperação (geralmente geramos um token único)
      const resetToken = genAuthToken(user); // Utilizando o mesmo genAuthToken para simplificação
      // Enviar e-mail para o usuário com o link de recuperação de senha
      const resetLink = `https://example.com/reset-password?token=${resetToken}`;
      await sendEmail(user.email, "Recuperação de senha", `Clique no link para redefinir sua senha: ${resetLink}`);

      return { message: "Email de recuperação enviado" };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Erro ao recuperar senha");
    }
  } */

  // Resetar senha
  /* async resetPassword(token: string, newPassword: string) {
    try {
      // Validar o token, normalmente você verificaria o token aqui
      const decodedToken = decodeAuthToken(token);
      const userId = decodedToken.id;

      const user = await this.userServices.getUserById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Criptografar a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const UserDTO : UpdateUserDTO = { 
        Password: hashedPassword,
       };

      // Atualizar a senha no banco de dados
      await this.userServices.updateUser(UserDTO);  // Alterar o objeto para o novo valor da senha

      return { message: "Senha redefinida com sucesso" };
    } catch (error) {
      throw new Error();
    }
  } */

  // Alterar a senha do usuário
  /* async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ) {
    try {
      // Buscar o usuário no banco de dados
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Verificar se a senha antiga está correta
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        throw new Error("Senha antiga incorreta");
      }

      // Criptografar a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Atualizar a senha no banco de dados
      await this.authRepository.updatePassword(userId, hashedPassword);

      return { message: "Senha alterada com sucesso" };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Erro ao alterar a senha");
    }
  } */
}

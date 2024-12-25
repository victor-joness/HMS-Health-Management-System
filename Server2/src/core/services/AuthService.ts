import bcrypt from "bcrypt";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { genAuthToken } from "../../infrastructure/external-services/genAuthToken";
import { User } from "../entities/User";
import { UserServices } from "./UserServices";
import { UserRepositoryImplementation } from "../implementation/UserRepositoryImplementation";
import { Gender } from "../../shared/utils/enum/GenderEnum";

const saltRounds = 10;

export class AuthService {
  private userRepository = new UserRepositoryImplementation();
  private userServices = new UserServices(this.userRepository);

  constructor() {}

  // Método de login
  async login(email: string, password: string) {
    try {
      const user = await this.userServices.getUserByEmail(email);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.Password);
      if (!passwordMatch) {
        throw new Error("Senha incorreta");
      }

      const token = genAuthToken(user);
      return { user, token };
    } catch (error) {
      throw new Error();
    }
  }

  async register(userData: any) {
    try {
      // Validação básica
      if (!userData.Name || !userData.Email || !userData.Password) {
        throw new Error("Dados obrigatórios ausentes");
      }

      const existingUser = await this.userServices.getUserByEmail(userData.Email);
      if (existingUser) {
        throw new Error("Email já está em uso");
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
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
      };

      const createdUser = await this.userServices.createUser(user);

      const token = genAuthToken(createdUser);

      return { createdUser, token };
    } catch (error) {
      throw new Error(`Erro ao registrar usuário, ${error}`);
    }
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

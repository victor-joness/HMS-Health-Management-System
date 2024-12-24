import { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { CredentialRequest } from "../../shared/utils/functions/CredentialRequest";
import { Equals } from "../../shared/utils/functions/Equals";

interface User {
  id: number;
  name: string;
  role: UserRoleEnum;
}

export const AuthMiddleware = (req: Request, res: Response): any => {
  const userAuthRequest = basicAuth(req);

  if (!userAuthRequest || !userAuthRequest.name || !userAuthRequest.pass) {
    return res.status(401).send("Acesso negado. Credenciais não fornecidas.");
  }

  const user = {
    username: userAuthRequest.name,
    password: userAuthRequest.pass,
  };

  let authenticatedUser: User;

  switch (true) {
    case Equals(user, CredentialRequest.ADMIN):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.ADMIN,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.DOUTOR):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.DOUTOR,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.ENFERMEIRA):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.ENFERMEIRA,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.PACIENTE):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.PACIENTE,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.VIEWER):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.VIEWER,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.RH):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.RH,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.FINANCEIRO):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.FINANCEIRO,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.FARMACIA):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.FARMACIA,
      };
      return authenticatedUser;
    case Equals(user, CredentialRequest.LABORATORIO):
      authenticatedUser = {
        id: 1,
        name: user.username,
        role: UserRoleEnum.LABORATORIO,
      };
      return authenticatedUser;
    default: {
      return res.status(403).send("Acesso negado. Credenciais inválidas.");
    }
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userAutenticated = AuthMiddleware(req, res);

  if (userAutenticated.role === UserRoleEnum.ADMIN) {
    next();
  } else {
    res
      .status(403)
      .send("Acesso negado. Somente administradores podem acessar.");
  }
};

export const isDoctor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (AuthMiddleware(req, res).role === UserRoleEnum.DOUTOR) {
    next();
  } else {
    res.status(403).send("Acesso negado. Somente doutores podem acessar.");
  }
};

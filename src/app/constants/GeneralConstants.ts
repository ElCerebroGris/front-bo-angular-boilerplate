export class GeneralConstants {

  static ESTADO = {
    ATIVADO: { code: 1, info: 'Activo' },
    DESATIVADO: { code: 2, info: 'Desativado' },
    toArray: () => {
      return [
        GeneralConstants.ESTADO.ATIVADO,
        GeneralConstants.ESTADO.DESATIVADO,
      ];
    },
    getInfo: (code: number) => {
      return GeneralConstants.ESTADO.toArray()
        .filter((p) => p.code == code)
        .pop()!.info;
    },
  };

  static NIVEL_USUARIO = {
    ADMINISTRADOR: { code: 1, info: 'Administrador' },
    AUDITOR: { code: 2, info: 'AUDITOR' },
    GESTOR_CLIENTE: { code: 3, info: 'OPERADOR' },
    SUPERVISOR: { code: 4, info: 'SUPERVISOR' },
    FORMADOR: { code: 5, info: 'formador' },
    toArray: () => {
      return [
        GeneralConstants.NIVEL_USUARIO.ADMINISTRADOR,
        GeneralConstants.NIVEL_USUARIO.AUDITOR,
        GeneralConstants.NIVEL_USUARIO.GESTOR_CLIENTE,
        GeneralConstants.NIVEL_USUARIO.SUPERVISOR,
        GeneralConstants.NIVEL_USUARIO.FORMADOR,
      ];
    },
    getInfo: (code: number) => {
      return GeneralConstants.NIVEL_USUARIO.toArray()
        .filter((p) => p.code == code)
        .pop()!.info;
    },
  };

  static AREAS = {
    RH: { code: 1, info: 'RH' },
    DTI: { code: 2, info: 'DTI' },
    ADMINISTRACAO: { code: 3, info: 'ADMINISTRAÇÃO' },
    toArray: () => {
      return [
        GeneralConstants.AREAS.RH,
        GeneralConstants.AREAS.DTI,
        GeneralConstants.AREAS.ADMINISTRACAO,
      ];
    },
    getInfo: (code: number) => {
      const area = GeneralConstants.AREAS.toArray()
        .filter((p) => p.code == code)
        .pop();
      return area != null ? area.info : '';
    },
  };

  static USER_AUTH = {
    TOKEN_KEY: 'bo_angular_token',
    ROLE_KEY: 'bo_angular_role',
    USERID_KEY: 'bo_angular_user_id',
    USERNAME_KEY: 'bo_angular_user_nome',
    USEREMAIL_KEY: 'bo_angular_user_email',
  };
}

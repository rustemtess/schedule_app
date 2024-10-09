import { IPermission } from '../../pages/users/interface';

export interface IRegister {
    setRegisterForm: Function,
    setUsers: Function,
    userId?: number,
    userPermissionId?: number,
    permissions: Array<IPermission>
}
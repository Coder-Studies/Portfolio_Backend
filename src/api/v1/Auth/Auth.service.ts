import { createAuth_Validator, loginAuth_Validator } from './Auth.validator';

import AuthConstant from './Auth.constant';
import AuthModel from './Auth.model';
import AuthDal from './Auth.dal';
import JwtUtils from '../../../utils/Jwt.utils';

export let Auth_Service = {
  signUp: async ({
    name,
    email,
    hashPassword,
    refreshToken,
    role,
  }: {
    name: string;
    email: string;
    refreshToken?: string;
    hashPassword: string;
    role: string;
  }) => {
    try {
      const { error } = createAuth_Validator.validate({
        name,
        email,
        Password: hashPassword,
        role,
      });

      if (error) {
        throw new Error(
          error.details.map((detail) => detail.message).join(', '),
        );
      }

      const Auth_User = await AuthModel.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (!Auth_User) {
        throw new Error(AuthConstant.CREATED_FAILED);
      }

      return Auth_User;
    } catch (error: any) {
      if (error.isJoi) {
        throw new Error(
          `Validation failed: ${error.details.map((detail: any) => detail.message).join(', ')}`,
        );
      }

      throw new Error(error.message || 'An unexpected error occurred');
    }
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = loginAuth_Validator.validate({
        email: email,
        Password: password,
      });

      if (error) {
        throw new Error(
          error.details.map((detail) => detail.message).join(', '),
        );
      }

      const Auth_User = await AuthModel.findOne({ email });

      if (!Auth_User) {
        throw new Error(AuthConstant.FAIL_TO_FIND_USER);
      }

      const isMatch = await Auth_User.comparePassword(
        password,
        Auth_User.password,
      );

      if (!isMatch) {
        throw new Error(AuthConstant.INCORECT_PASSWORD);
      }

      return Auth_User;
    } catch (error: any) {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  },
};

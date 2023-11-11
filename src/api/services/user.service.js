import { getMessage } from '../../helpers/Messages.js';
import { asignSessionToken } from './session.service.js';
import { prisma } from '../../loaders/database.js';

const profileSelect = {
  1: { role: true },
  2: {
    sellerProfile: {
      include: {
        store: true
      }
    }
  },
  3: {
    courierProfile: true
  },
  4: {
    buyerProfile: true
  }
};
export const findUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return getMessage(false, users, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error al obtener los usuarios');
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      getMessage(true, user, 'User not exists');
    }
    const userDetails = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      include: profileSelect[user.roleId]
    });
    return userDetails
      ? getMessage(false, userDetails, 'Data successfully obtained')
      : getMessage(true, userDetails, 'User not exists');
  } catch (error) {
    return getMessage(true, error.message, 'User not exists');
  }
};

export const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        role: true
      }
    }); // * SELECT * FROM user WHERE email = email [{},{}]
    // * null * undefined

    return user
      ? getMessage(false, user, 'Data successfully obtained')
      : getMessage(true, user, 'User not exists');
  } catch (error) {
    return getMessage(true, error.message, 'User not exists');
  }
};

export const modifiedUser = async (id, user) => {
  try {
    const userModified = await prisma.user.update({
      where: {
        id
      },
      data: user
    });
    return getMessage(false, userModified, 'User modified successfully');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error modifying user');
  }
};

export const removeUser = async (id) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id
      }
    });
    return getMessage(false, userDeleted, 'User deleted successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting user');
  }
};

export const asignRoleUser = async (id, idRole) => {
  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        roleId: idRole
      }
    });
    return getMessage(false, user, 'Role assigned successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error assigning role');
  }
};

export const signInUser = async (user) => {
  console.log('este es mi usuario');
  console.log(user);
  try {
    // guardo el token en la base de datos
    const userSession = await asignSessionToken(user);
    // obtengo el usuario con su perfil
    const userInfo = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      include: profileSelect[user.roleId]
    });
    // elimino la contraseña del usuario
    const userWithoutPassword = { ...userInfo };
    delete userWithoutPassword.password;
    return getMessage(
      false,
      { userWithoutPassword, token: userSession.data },
      'User session successfully obtained'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error creating session ');
  }
};

export const createUser = async (user, idRole, passwordHash) => {
  const { name, lastName, email, phoneNumber, storeName } = user;

  const profileCreators = {
    // admin
    1: {
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      roleId: idRole
    },
    // seller vendedor
    2: {
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      roleId: idRole,
      sellerProfile: {
        create: {
          store: {
            create: {
              name: storeName
            }
          }
        }
      }
    },
    // courier repartidor
    3: {
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      roleId: idRole,
      courierProfile: {
        create: {}
      }
    },
    // buyer comprador usuario normal
    4: {
      name,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      roleId: idRole,
      buyerProfile: {
        create: {}
      }
    }
  };
  try {
    const newUser = await prisma.user.create({
      data: profileCreators[idRole]
    });
    return getMessage(
      false,
      { user: newUser },
      'User and profile created successfully'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error creating user and profile');
  }
};
/* export const createUserAndSignIn = async (user, idRole, passwordHash) => {
  const { name, lastName, email, phoneNumber, storeName } = user;
  const profileCreators = {
    2: (transaction, userId, storeName) =>
      transaction.sellerProfile.create({
        data: { userId, store: { create: { name: storeName } } }
      }),
    3: (transaction, userId) =>
      transaction.courierProfile.create({ data: { userId } }),
    4: (transaction, userId) =>
      transaction.buyerProfile.create({ data: { userId } })
  };

  return await prisma.$transaction(async (transaction) => {
    // Primero, creamos al usuario
    const userCreated = await transaction.user.create({
      data: {
        name,
        lastName,
        email,
        phoneNumber,
        password: passwordHash,
        roleId: idRole
      }
    });

    // Si el roleId corresponde a un perfil, lo creamos
    let profileCreated;
    if (profileCreators[idRole]) {
      profileCreated = await profileCreators[idRole](
        transaction,
        userCreated.id,
        storeName
      );
    }
    // Aquí, asumimos que asignSessionToken se modifica para usar la transacción pasada como argumento
    const tokenSession = await tokenSign(userCreated, config.jwt.jwtExpire); // Modificamos el primer argumento de tokenSign
    const expiresAt = new Date();
    const tokenDurationHours = Number(
      process.env.JWT_EXPIRES_IN.replace('h', '')
    );
    expiresAt.setHours(expiresAt.getHours() + tokenDurationHours);
    const userSession = await asignSessionToken(
      transaction, // Aquí pasamos la transacción
      userCreated.id,
      tokenSession,
      expiresAt
    );
    console.log('aqui ya no llegue papi');

    const userWithoutPassword = {
      ...userSession.data,
      profile: profileCreated
    };
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword,
      token: tokenSession
    };
  });
};
 */

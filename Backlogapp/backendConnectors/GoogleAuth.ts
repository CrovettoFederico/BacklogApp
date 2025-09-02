import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';

// Inicializa Google Sign-In (llama esto al iniciar tu app)
export function configureGoogleSignIn() {
  GoogleSignin.configure({    
    webClientId: '994492199508-65j4cn8hb7h36aslesl4p6583hpbg97j.apps.googleusercontent.com', 
    offlineAccess: false,
  });
}

// Función para iniciar sesión
export async function signInWithGoogle(): Promise<User | null> {
  try {
    GoogleSignin.configure();
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo.data;
  } catch (error: any) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // El usuario canceló el login
      return null;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operación en progreso
      return null;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play Services no disponible
      return null;
    } else {
      // Otro error
      throw error;
    }
  }
}

// Función para cerrar sesión
export async function signOutGoogle() {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    // Maneja el error si es necesario
  }
}
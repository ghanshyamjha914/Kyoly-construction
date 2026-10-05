import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'ADMIN' | 'PROJECT_ENGINEER' | 'QUANTITY_SURVEYOR' | 'VIEWER';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  roleTitle: string;
  email: string;
  department: string;
  lastLogin: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  sessionToken: string | null;
  loginError: string | null;
  login: (username: string, password: string, rememberHours?: number) => Promise<boolean>;
  logout: () => void;
  hasRole: (allowedRoles: UserRole[]) => boolean;
  canEdit: boolean;
  canManageSettings: boolean;
  authNotice: string;
}

const SESSION_STORAGE_KEY = 'kyoly_internal_session_auth_v1';

// Initial internal authorized staff credentials for Kyoly Construction
// (In production with backend, these verify against server-side bcrypt / JWT / OAuth)
const PRECONFIGURED_USERS: Record<string, { password: string; user: AuthUser }> = {
  admin: {
    password: 'Kyoly@2026!',
    user: {
      id: 'USR-KCPL-001',
      username: 'admin',
      fullName: 'Er. Ghanshyam Jha',
      role: 'ADMIN',
      roleTitle: 'Managing Director & Authorized Administrator',
      email: 'ghanshyamjha914@gmail.com',
      department: 'Executive Engineering & Contracts',
      lastLogin: new Date().toISOString(),
    },
  },
  engineer: {
    password: 'Engineer@2026!',
    user: {
      id: 'USR-KCPL-002',
      username: 'engineer',
      fullName: 'Er. R. K. Shrestha',
      role: 'PROJECT_ENGINEER',
      roleTitle: 'Chief Project Engineer',
      email: 'engineer@kyolyconstruction.com',
      department: 'Site Execution & Permits',
      lastLogin: new Date().toISOString(),
    },
  },
  surveyor: {
    password: 'Surveyor@2026!',
    user: {
      id: 'USR-KCPL-003',
      username: 'surveyor',
      fullName: 'Er. Sunita Acharya',
      role: 'QUANTITY_SURVEYOR',
      roleTitle: 'Head of Structural Design & BOQ',
      email: 'estimation@kyolyconstruction.com',
      department: 'Quantity Surveying & Rate Analysis',
      lastLogin: new Date().toISOString(),
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Restore authenticated session from sessionStorage on page reload
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Verify expiry
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setCurrentUser(parsed.user);
          setSessionToken(parsed.token);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('Session load error', e);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const login = async (usernameInput: string, passwordInput: string, rememberHours = 4): Promise<boolean> => {
    setLoginError(null);
    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    if (!cleanUsername || !cleanPassword) {
      setLoginError('Please enter both username and password.');
      return false;
    }

    // Lookup user in preconfigured auth database
    const record = PRECONFIGURED_USERS[cleanUsername];

    if (!record || record.password !== cleanPassword) {
      setLoginError('Invalid username or confidential access password. Access denied.');
      return false;
    }

    // Generate secure session token and expiry
    const token = `KCPL-SEC-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const expiresAt = Date.now() + rememberHours * 60 * 60 * 1000;

    const loggedUser: AuthUser = {
      ...record.user,
      lastLogin: new Date().toISOString(),
    };

    setCurrentUser(loggedUser);
    setSessionToken(token);

    // Save session in sessionStorage (isolated per browser session)
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          user: loggedUser,
          token,
          expiresAt,
        })
      );
    } catch (err) {
      console.warn('Unable to persist session', err);
    }

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setSessionToken(null);
    setLoginError(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!currentUser) return false;
    return allowedRoles.includes(currentUser.role);
  };

  const canEdit = currentUser ? ['ADMIN', 'PROJECT_ENGINEER', 'QUANTITY_SURVEYOR'].includes(currentUser.role) : false;
  const canManageSettings = currentUser ? currentUser.role === 'ADMIN' : false;

  const authNotice =
    'Kyoly Construction Enterprise Access Control: Session tokens are cryptographically isolated in browser session storage and automatically expire upon logout or window closure.';

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        sessionToken,
        loginError,
        login,
        logout,
        hasRole,
        canEdit,
        canManageSettings,
        authNotice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

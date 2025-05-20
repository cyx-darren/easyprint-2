import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found in session");
          setIsAdmin(false);
          return;
        }

        console.log("Checking admin status for user:", user.id);
        const { data: roleData, error: roleError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id);

        console.log("Role query result:", roleData);
        console.log("Role query error:", roleError);

        if (roleError) {
          console.error('Error fetching profile:', roleError);
          setIsAdmin(false);
          return;
        }

        const hasAdminRole = roleData && roleData.length > 0 && 
          roleData.some(profile => profile.role === 'admin');
        
        console.log("Is user admin?", hasAdminRole);
        setIsAdmin(hasAdminRole);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  // If already logged in as admin, redirect to admin dashboard
  if (isAdmin) {
    console.log("User is admin, redirecting to dashboard");
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Attempting login for email:", email);
      
      // 1. Attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Sign in error:", signInError);
        throw signInError;
      }
      
      if (!data?.user) {
        console.error("No user data returned from sign in");
        throw new Error('No user data returned');
      }

      console.log("User authenticated:", data.user.id);

      // 2. Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', data.user.id);

      console.log("Role query result:", roleData);
      console.log("Role query error:", roleError);

      if (roleError) {
        console.error("Profile query error:", roleError);
        throw roleError;
      }

      // Check if user has admin role
      const hasAdminRole = roleData && roleData.length > 0 && 
        roleData.some(profile => profile.role === 'admin');

      console.log("Is user admin?", hasAdminRole);

      if (!hasAdminRole) {
        throw new Error('Unauthorized: Admin access required');
      }

      // 3. If all checks pass, redirect to admin dashboard
      const from = location.state?.from?.pathname || '/admin';
      console.log("Admin check passed, redirecting to:", from);
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Login process error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the admin dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Admin email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage; 
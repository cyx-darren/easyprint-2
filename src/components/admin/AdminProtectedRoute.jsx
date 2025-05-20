import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("Protected Route: No user found in session");
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        console.log("Protected Route: Checking admin status for user:", user.id);
        const { data: roleData, error: roleError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id);

        console.log("Protected Route: Role query result:", roleData);
        console.log("Protected Route: Role query error:", roleError);

        if (roleError) {
          console.error('Protected Route: Error fetching profile:', roleError);
          setIsAdmin(false);
          return;
        }

        const hasAdminRole = roleData && roleData.length > 0 && 
          roleData.some(profile => profile.role === 'admin');

        console.log("Protected Route: Is user admin?", hasAdminRole);
        setIsAdmin(hasAdminRole);
      } catch (error) {
        console.error('Protected Route: Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Protected Route: Auth state changed", session?.user?.id);
      
      if (!session?.user) {
        console.log("Protected Route: No user in session after auth change");
        setIsAdmin(false);
        return;
      }

      try {
        const { data: roleData, error: roleError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id);

        console.log("Protected Route: Role query result after auth change:", roleData);
        console.log("Protected Route: Role query error after auth change:", roleError);

        if (roleError) {
          console.error('Protected Route: Error fetching profile after auth change:', roleError);
          setIsAdmin(false);
          return;
        }

        const hasAdminRole = roleData && roleData.length > 0 && 
          roleData.some(profile => profile.role === 'admin');

        console.log("Protected Route: Is user admin after auth change?", hasAdminRole);
        setIsAdmin(hasAdminRole);
      } catch (error) {
        console.error('Protected Route: Error checking admin status after auth change:', error);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    console.log("Protected Route: User is not admin, redirecting to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log("Protected Route: Admin access granted");
  return children;
};

export default AdminProtectedRoute; 
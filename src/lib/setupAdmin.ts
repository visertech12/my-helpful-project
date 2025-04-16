
import { supabase } from './supabaseClient';

// This function should be run once to set up the admin user
export async function setupAdmin() {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin@123'; // Strong password for admin
    
    // Check if admin already exists
    const { data: existingProfiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin')
      .limit(1);
      
    if (existingProfiles && existingProfiles.length > 0) {
      console.log('Admin already exists');
      return;
    }
    
    // Create admin user with authentication
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });
    
    if (authError) {
      throw authError;
    }
    
    // Add admin role to the profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: 'admin',
          full_name: 'System Administrator'
        })
        .eq('id', authData.user.id);
        
      if (profileError) {
        throw profileError;
      }
      
      console.log('Admin user created successfully');
    }
    
    return {
      email: adminEmail,
      password: adminPassword
    };
  } catch (error) {
    console.error('Error setting up admin:', error);
    throw error;
  }
}

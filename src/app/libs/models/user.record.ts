export interface User {
  user_id: string;           
  
  username: string;           
  email: string;              
  
  created_at: string;         
  updatedAt: string | null;   
  
  passwordHash: string | null; 
  
  avatarUrl: string | null;   
  bio: string | null;         
  
  locationCity: string | null;
  locationCountry: string | null;
}

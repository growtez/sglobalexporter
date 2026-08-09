import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    // Exchange the auth code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the newly signed-in user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if the user is an admin
        const { data: adminData } = await supabase
          .from("allowed_users")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .eq("is_active", true)
          .single()

        if (adminData) {
          return NextResponse.redirect(new URL('/admin', requestUrl.origin))
        }
      }
      
      const next = requestUrl.searchParams.get('next')
      console.log("[OAUTH_CALLBACK] Exchanged code for session.");
      console.log("[OAUTH_CALLBACK] Original next param:", next);
      
      const finalUrl = new URL(next || '/profile', requestUrl.origin);
      console.log("[OAUTH_CALLBACK] Redirecting to:", finalUrl.toString());
      
      return NextResponse.redirect(finalUrl)
    }
  }

  // If there's an error or no code, redirect to login with error
  return NextResponse.redirect(new URL('/auth/login?error=Authentication failed', requestUrl.origin))
}

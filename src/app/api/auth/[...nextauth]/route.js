import NextAuthModule from 'next-auth';
import GoogleProviderModule from 'next-auth/providers/google';
import GitHubProviderModule from 'next-auth/providers/github';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

const NextAuth = NextAuthModule.default;
const GoogleProvider = GoogleProviderModule.default;
const GitHubProvider = GitHubProviderModule.default;

const handler = NextAuth({

  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })

  ],

  callbacks: {

    async session({ session }) {

       await connectToDB(); // ✅ Ensure DB is connected before querying

       // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;

    },

//     async signIn({ profile }) { 
       
//       try{

//         await connectToDB();

//         console.log("EMAIL",profile.email);
           
//         // check if user already exists
//         const userExists = await User.findOne({ email: profile.email });

//          if (userExists) 
//         return true;
     
//         let baseUsername = (profile.name || profile.login)
//                             .replace(/\s+/g, '')              // Remove **all spaces**
//                             .replace(/[^a-zA-Z0-9._]/g, '')   // Remove **everything except** letters, numbers, dot (.), and underscore (_)
//                             .toLowerCase();                   // Convert to **lowercase**


//   //This checks: "Is the username invalid according to your schema rules?"
//   if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(baseUsername)) {
        
// //Cut the username down to 12 characters if it's too long (so we can append a number and still keep under 20 characters).        
//         baseUsername = baseUsername.slice(0, 12);

// //Append a random 4-digit number (e.g., 1234) to ensure it more likely to be unique.So "john" becomes something like "john1234"
//         baseUsername += Math.floor(1000 + Math.random() * 9000); 

//     }

//       await User.create({

//         email: profile.email,
//         username: baseUsername,
//         image: profile.picture || profile.avatar_url,

//       });

//       return true;

//     }
     
//     catch(err)
//     {
//         console.error('SignIn Error:', err.message);
//         return false;
//     }

//     }

      async signIn({ profile }) {
     try {
    await connectToDB();

    //Safe check for email presence
    if (!profile?.email) {
      console.error("No email found in profile");
      return false;
    }

    console.log("EMAIL:", profile.email);

    //Check if user already exists
    const userExists = await User.findOne({ email: profile.email });
    
    if (userExists) 
    return true;

    //Generate username safely
    let baseUsername = (profile.name || profile.login || "user")
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9._]/g, '')
      .toLowerCase();

    //Fallback if username is invalid or short
    if (
      !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(baseUsername)
    ) {
      baseUsername = baseUsername.slice(0, 12) + Math.floor(1000 + Math.random() * 9000);
    }

    //Create new user in DB
    await User.create({
      email: profile.email,
      username: baseUsername,
      image: profile.picture || profile.avatar_url || '',
    });

    return true;
  } 
  catch (err) {
    console.error("SignIn Error:", err.message);
    return false;
  }
}



  },

});

export { handler as GET, handler as POST };

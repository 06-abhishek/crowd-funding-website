import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/user";
import connectDB from "@/db/connectDB";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],

  callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (account.provider === "github") {
//         try {
//           await connectDB();
//           try {
//             const currentUser = await User.findOne({ email: email });

//             if (!currentUser) {
//               // create new user:
//               const newUser = await new User({
//                 email: user.email,
//                 name: user.name || profile.name,
//                 username: user.email.split("@")[0],
//                 profilePic: user.image || profile.avatar_url,

//                 created_At: new Date(),
//                 updated_At: new Date(),
//               });
//               await newUser.save();
//             } else {
//               user.name = currentUser.username;
//             }
//             return true;
//           } catch (error) {
//             console.log(error);
//           }
//         } catch (error) {
//           console.log(error);
//           return false;
//         }
//       }
//       return true;
//     },

        async signIn({ user, account, profile, email, credentials }) {
          if (account.provider === "github") {
            try {
              await connectDB();
              try {
                // Use user.email directly instead of email
                const currentUser = await User.findOne({ email: email });

                if (!currentUser) {
                  // create new user:
                  const newUser = new User({
                    email: user.email,
                    name: user.name || profile.name,
                    username: user.email.split("@")[0],
                    profilePic: user.image || profile.avatar_url,
                    created_At: new Date(),
                    updated_At: new Date(),
                  });
                  await newUser.save();
                } else {
                  user.name = currentUser.username;
                }
                return true;
              } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Return false if there's an error
              }
            } catch (error) {
              console.error("Error connecting to DB:", error);
              return false; // Return false if there's an error
            }
          }
          return true;
        },

    async session({ session, user, token }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });

        if (!dbUser) {
          console.log("User not found in database.");
          return session; // You can handle this more gracefully
        }

        if (dbUser) {
          // Use .toObject() safely, if necessary
          const userObject = dbUser.toObject ? dbUser.toObject() : dbUser;
          session.user.name = userObject.username;
          session.user.image = userObject.profilePic || session.user.image;
        } else {
          console.log("User not found in the database");
        }
      } catch (error) {
        console.error("Error fetching user data from DB:", error);
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

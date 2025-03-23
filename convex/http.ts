import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";

const http = httpRouter();
export const userAction = httpAction(async (ctx, req) => {
    const {data, type} = await req.json();
    console.log("Received Data:", data);
    const email = data.email_addresses[0]?.email_address || "";
    const externalAccount = data.external_accounts?.[0]; 
    switch (type) {
        case 'user.created':
            await ctx.runMutation(internal.users.createUser, {
                email,
                clerkId: data.id,
                imageUrl:externalAccount?.avatar_url || data.image_url,
                first_name: data.first_name,
                last_name:data.last_name,
                username:data.username,
                followersCount:0,
            })
            console.log('user created');
            break;
        case 'user.updated':
            console.log('user updated');
            break;
    }
    return new Response(null, { status: 200 });
});
http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: userAction,
  });
//https://kindred-gopher-183.convex.site // đây là endpoint ví dụ: https://kindred-gopher-183.convex.site/clerk-users-webhook
export default http;
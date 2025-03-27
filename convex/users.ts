import { Id } from "./_generated/dataModel";
import { internalMutation, query } from "./_generated/server";
import {v} from 'convex/values'
export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('users').collect();
    }
})

export const createUser = internalMutation({
    args:{
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.optional(v.string()),
        first_name: v.optional(v.string()),
        last_name: v.optional(v.string()),
        username: v.union(v.string(), v.null()),
        bio: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        followersCount: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert('users', {...args,
            username: args.username || `${args.first_name}${args.last_name}`,
        });
        return userId;
    }
})

export const searchUser = query({
    args: {
        search: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .withSearchIndex('searchUsers', (q) => q.search('username', args.search))
            .collect();
        const userWithImage = await Promise.all(user.map(async (user) =>{
            if (!user?.imageUrl || user.imageUrl.startsWith("http")){
                user.imageUrl;
                return user;
            }

            const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);
            user.imageUrl = url!;
            return user;
        })) 
        return userWithImage;
    }
})
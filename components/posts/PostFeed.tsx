import React from 'react';
import PostItem from "@/components/posts/PostItem";
import usePosts from "@/hooks/usePosts";

interface PostFeedProps {
    userId?: string;
}

const PostFeed = ({ userId }: PostFeedProps) => {
    const { data: posts = []} = usePosts(userId)


    return (
        <>
            { posts.map((post: Record<string, any>) => (
                <PostItem userId={userId}  key={post.id} data={post} />
            ))}
        </>
    );
};

export default PostFeed;
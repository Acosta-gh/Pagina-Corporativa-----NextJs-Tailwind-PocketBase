import { PostsProvider } from '@/context/PostsContext';

export default function BlogLayout({ children }) {
  return <PostsProvider perPage={9}>{children}</PostsProvider>;
}
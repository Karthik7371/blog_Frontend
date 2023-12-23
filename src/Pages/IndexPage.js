import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader component
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("https://blog-syj3.onrender.com/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false); // Set loading to false when posts are fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <>
      {loading ? (
        // Render loading indicator while posts are being fetched
        <div className="flex items-center justify-center mt-20">
          <ClipLoader
            color="#767676"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Render posts once fetched
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
    </>
  );
}

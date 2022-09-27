import React, { useEffect, useState } from "react";
import axios from "axios";
import { Posts } from "../pages/Posts";
import { Paginations } from "../pages/Paginations";


function Carousels() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:3333/process");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  // console.log(posts)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPosts = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexofFirstPosts, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <React.Fragment>
      {/* <h1 className="text-primary mb-3">MY DATA</h1> */}
      <Posts posts={currentPosts} loading={loading} />
      <Paginations
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
}

export default Carousels;

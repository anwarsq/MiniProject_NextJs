export default function About({ posts }) {
    // Render posts...
    console.log(posts)
    console.log(posts?.data[0].content)
    return (
      <main
      className={`flex min-h-screen flex-col items-center justify-between p-20`}
  >
      <div className="text-center">
        <h1 className="font-extrabold">About My Page</h1>
        <div>
        <p>
          {
            posts?.data[0].content
          }
        </p>
        </div>
      </div>
      </main>
    )
  }
   
  export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/about/1?searchBy=id');
    const posts = await res.json();
    return {
      props: {
        posts,
      },
    };
  }
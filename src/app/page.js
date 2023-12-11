import { getServerSession } from "next-auth";
import { Feed } from "./components/Feed";
export default async function Home() {
  const session = await getServerSession();
  console.log("ertretrehfgd");
  if (session) {
    redirect("/dashboard");
  }
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}

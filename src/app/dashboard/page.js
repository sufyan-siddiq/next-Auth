import React from 'react';
import { Feed } from '../components/Feed';

const page = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text pt-[130px] orange_gradient">
      Dashboard
      <br className="max-md:hidden" />
    </h1>
    <p className="desc text-center">
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>
    <Feed />
  </section>
  );
}

export default page;

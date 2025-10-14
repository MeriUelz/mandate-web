import { seedBlogArticles } from "./seed-blog";

async function setup() {
  // Seed blog articles
  await seedBlogArticles();
}

setup()
  .then(() => {
    console.log("setup.ts complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

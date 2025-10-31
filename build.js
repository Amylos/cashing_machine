import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";

async function build() {
  try {
    console.log("🧹 Cleaning dist folder...");
    await fs.emptyDir("dist");

    console.log("📦 Building and minifying JavaScript...");
    await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      minify: true,
      platform: "node",
      target: "node18",
      outfile: "dist/index.min.js",
      sourcemap: true,
    });

    console.log("📁 Copying config files...");
    await fs.copy("config", "dist/config");

    console.log("🗂️ Copying models...");
    await fs.copy("models", "dist/models");

    console.log("⚙️ Copying services...");
    await fs.copy("services", "dist/services");

    console.log("🛠️ Copying utils...");
    await fs.copy("utils", "dist/utils");

    console.log("👁️ Copying views...");
    await fs.copy("views", "dist/views");

    console.log("🖼️ Copying assets...");
    await fs.copy("assets", "dist/assets");

    console.log("📄 Copying package.json...");
    const pkg = await fs.readJson("package.json");
    // Supprimer les devDependencies pour la production
    // delete pkg.devDependencies;
    // delete pkg.scripts;
    await fs.writeJson("dist/package.json", pkg, { spaces: 2 });

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

build();

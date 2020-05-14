<h1 align="center">
  Gulp for traditional boilerplate (Minus Tailwind)
</h1>

Basic gulp process for compiling SCSS + Sourcemaps, JS and live reload with BrowserSync

- [🥤 Gulp Docs](https://gulpjs.com/docs/en/getting-started/quick-start)

## 🚀 Quick start

1.  **Download the repo as a zip file. Put the contents of the zip file into your theme directory with the exception of the ignore files (these should go where ever your git repo starts).**

    ```sh
    git clone https://github.com/alexjamesdesign/gulp-traditional
    ```

1.  **Change filepaths.**
    Theres a couple of filepaths in the gulpfile and package.json that you'll need to change to reflect your sites proxy.


1.  **Install NPM assets.**


    ```sh
    npm install
    ```

1.  **Run it!**

    ```sh
    npm run dev
    ```

    or

    ```sh
    gulp dev
    ```

    Your site is now running at `http://localhost:3000/`!


## 💫 Deployment

    To run the build tasks, you should add a build pipeline to DeployHQ for the following.

    ```sh
    gulp build --production
    ```

    You should also consider caching your node_modules like so

    ```sh
    wp-content/theme-name/node_modules/**
    wp-content/theme-name/node_modules/*
    wp-content/theme-name/node_modules/
    ```
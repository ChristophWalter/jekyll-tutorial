# What is this?
This tutorial should give an introduction to static site generators by describing the steps how I discovered this topic. Therefore each commit is one step towards the goal of hosting a website which is generated statically. I got some ideas on what else could be done, which are listed on the bottom.

I chose Jekyll, cause it is widely known (https://jekyllrb.com). But there are a lot of other static site generators which are quite similar...

# When to use a static site generator?
To get into this topic you should understand the difference between dynamic and static pages, so lets google that: https://www.google.de/?q=static+vs+dynamic+websites
In short:
 - A dynamic website handles typically uses a cms and database to serve its pages.
 - A static site generator generates static files (e.g. html, css, js) once and just serves them on every requests.
 
So when deciding what to use, you should think about the following:
 - How important is page speed?
 - What about Maintanance and robustness?
 - Security?
 - Who is building the site: (non-)developer?
 - Do we have compicated content moderation workflow as in huge companies?
 - Let's brainstorm for more :)

# jekyll-tutorial
## 1. Simple bootstrap site
Just to start with something, let's create with a simple bootstrap layout and a "really" static website with one page.

You can open this page with your browser or serve it with a local server, e.g. 
```
python3 -m http.server 4000
```

## 2. Jekyll QuickStart
Go through the jekyll QuickStart to setup your environment and an example jekyll blog. It's easy and well documented:

https://jekyllrb.com/docs/quickstart/
## 3. Cleanup
We want to create our own theme, so let's cleanup the quick start setup and use our bootstrap page as template for our index file.

Jekyll has its own server, so use this command to build and serve your site for local development:
```
bundle exec jekyll serve
```
## 4. Using layouts
Now we want to fill our index file with some content, which will the be included in our default layout using the following variable:
```
{{ content }}
```
Our error site (404) will now also use the default template.
## 5. Adding a news page
This will add an overview page for our news (which will be added soon)
Use this page to understand the liquid templating, conditions and filter:

https://jekyllrb.com/docs/templates/
## 6. Adding a layout for single news
Try to understand default variables like content, page and site with help of this documentation: 

https://jekyllrb.com/docs/variables/

## 7. Markdown
Let's seperate content from html markup and styling by using markdown for every page.
## 8. Page structure
Improve our structure by using an own folder for pages. The site author now only needs to touch the folders _posts and _pages.
## 9. dynamic navigation
Our navigation will get its own file and generate its own links from existing pages.
## 10. Refactor default layout
Now we want to use includes to create components for our layout, cause we can...
## 11. Example for adding posts and pages
It's very easy to create new posts are pages now, take a look!
## 12. Adding some gulp magic
I will not get into gulp here, but this commit will help us to get ready for production:
 - uses sass and generate css
 - bundle assets together
 - use browsersync to develop easier for on multiple browsers (e.g. mobile)
 - create tasks for local developing and deploying

## 13. Upload to github pages
That's it. Just run
```
gulp build
```
to generate your website and push it as commit to your git repo. You can configure github to automatically serve the /docs folder on a specific url, like it is set up for this project:


https://christophwalter.github.io/jekyll-tutorial/

You may also want to build a small pipeline to automatically regenerate (and deploy) your page on every commit. This would make it even simplier to update your website.
## Looking forward
Some things which seems to be interesting and may be added to this repo sometime:
 - Set up an admin ui for authors.
 - Add a contact form (A serverless function may fit here)
 - Create a build pipeline and deploy to somewhere. A S3 bucket could fit well here.

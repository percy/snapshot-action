# Percy for Static Sites

## Deprecated

⚠️ This action is only required if you're using an older SDK not using Percy CLI. In Percy CLI, GitHub actions will work out of the box.


<details><summary>Example for how to migrate</summary>
<p>
  
### Before
  
```yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Install
        run: bundle install
      - name: Build
        run: bundle exec jekyll build
      - name: Percy Test
        uses: percy/snapshot-action@v0.1.2
        with:
          build-directory: "_site/"
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

  
### After

```yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Install
        run: bundle install
      - name: Build
        run: bundle exec jekyll build
      - name: Percy Test
        run: npx percy snapshot _site/
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```
</p>
</details>

_____


A GitHub action to visuall test static sites with Percy. [Full API docs for this action
can be found here](https://docs.percy.io/docs/github-actions#section-snapshot-action)

## Quick start

To use the Percy snapshot GitHub action you will need to add a new step to your
actions config using the `percy/snapshot-action` action. `snapshot-action` has one
required input: the directory where your static site is built to. You will also need
to set your `PERCY_TOKEN` in your GitHub projects settings.

Below is a sample config that tests a Jekyll static site with Percy:

``` yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Install
        run: bundle install
      - name: Build
        run: bundle exec jekyll build
      - name: Percy Test
        uses: percy/snapshot-action@v0.1.2
        with:
          build-directory: "_site/"
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

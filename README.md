[![Deploy to GitHub Pages](https://github.com/caglarturali/caglarturali.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/caglarturali/caglarturali.github.io/actions/workflows/gh-pages.yml)

## JSON Resume–compatible personal website.

This is a CV–themed personal website that uses a [JSON Resume](https://github.com/jsonresume) data source.

### Screenshots

<details>
  <summary>Desktop</summary>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="screenshots/desktop-light.png" width="400" />
    <img src="screenshots/desktop-dark.png" width="400" />
  </div>
</details>

<details>
  <summary>Mobile</summary>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="screenshots/mobile-light-1.png" width="200" />
    <img src="screenshots/mobile-light-2.png" width="200" />
    <img src="screenshots/mobile-dark-1.png" width="200" />
    <img src="screenshots/mobile-dark-2.png" width="200" />
  </div>
</details>

### Built Using

- React
- TypeScript
- Tailwind CSS
- Font Awesome Icons
- Parcel
- Vitest

### Development

You know the drill. Fork it, clone it, install it, run it.

```bash
# Assuming you have forked under https://github.com/yourusername/yourusername.github.io
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
npm install
npm start
```

To build for production, run;

```bash
npm run build
```

### Personal Use

You are free to use it as your personal website. Note that you might want to keep an upstream remote pointing to this repository since I will be making changes along the way. Follow these steps to customize it for your own use;

- Update [`resume.json`](data/resume.json) with your own personal details. You can also use [`resume.sample.json`](data/resume.sample.json) as a reference.

- Update [`extras.json`](data/extras.json). This will be used alongside your resume data to perform some static processing including;

  - Generation of a TTS-audio representation of your name. I have a Turkish name, I needed this.

- Adjust the domain. Since this project is set up for GitHub Pages deployment with a custom domain, you need to make adjustments to the following;

  - [`homepage`](package.json#L4) field in **package.json**
  - [`cname`](.github/workflows/gh-pages.yml#L39) key in **gh-pages.yml**. Remove this if you are going to use `github.io` subdomain.

### Live Preview

You can also live preview your publicly accessible resume data by pointing the `resume` parameter to it. Example usage:

https://turali.js.org/?resume=https://raw.githubusercontent.com/thomasdavis/resume/refs/heads/master/resume.json

# GitHub Pages publication

The site is plain HTML, CSS, JavaScript and local JSON on **`main`**. `.nojekyll` disables unnecessary Jekyll processing. The expected project URL is:

https://paperstrange.github.io/IndiaGames/

## Configuration

In [Settings → Pages](https://github.com/PaperStrange/IndiaGames/settings/pages), choose **Deploy from a branch**, then **main** and **/ (root)**, and Save. GitHub creates the Pages build/deployment automatically. Subsequent pushes to main update the published site.

The connected integration returned HTTP 403 (`Resource not accessible by integration`) when querying Pages settings on October 21. Repository metadata reported `has_pages: false`. The integration can push source, but Pages activation requires an account/integration with the relevant Pages administration permissions. The repository’s visibility must not be changed as a workaround.

This file describes setup; a successful Git push alone does not establish that the site is live. Final publication must be checked against the Pages deployment and the actual URL. No personal token belongs in this repository or its static JavaScript.

## Local preview and checks

```sh
python3 scripts/sync-dashboard.py
python3 -m http.server 8120 --bind 127.0.0.1
```

Open the local root through HTTP. Also verify a project-path preview at `/IndiaGames/`, because GitHub serves project sites below that path. Check all three project cards, the game/status/search filters, task details, empty results, keyboard navigation and a narrow viewport. Local asset/data URLs must remain relative; GitHub source links are intentionally remote.

## After activation

Confirm that `https://paperstrange.github.io/IndiaGames/` returns the project hub and that its task JSON loads. Check the Pages build’s source revision. If deployment fails, inspect its actual error before changing configuration or rerunning. Record activation and verification in a dated delivery note; keep earlier failures as history rather than claiming they never happened.

# GitHub Pages publication

The site is plain HTML, CSS, JavaScript and local JSON on **`main`**. `.nojekyll` disables unnecessary Jekyll processing. The expected project URL is:

https://paperstrange.github.io/IndiaGames/

## Current verification · 28 October 2026

**The main dashboard is now live at [paperstrange.github.io/IndiaGames](https://paperstrange.github.io/IndiaGames/).** A later settings read shows **main / (root)** and a successful Pages deployment of `1dd23301fdd3046a0c7f5403bcd25957e2176562`. Six actual HTTPS files (HTML, JavaScript, CSS and three JSON data files) exactly match that commit; see [live asset verification](verification-launch-2026-10-28/live-assets.json). The local browser checks cover the same runtime at root/project paths and desktop/narrow widths. Direct remote Chromium was blocked by this environment's proxy certificate trust before rendering; that failed attempt is preserved, and TLS verification was not bypassed.

Earlier in this work, settings were **master/root** and the live page was the candidate README. The authorized source-update PUT returned **403, Resource not accessible by integration**; an immediate follow-up still showed master. The subsequent successful main deployment is an observed new state, not proof that the rejected request succeeded or that this integration now has Pages write permission. Both observations remain in [publication.json](verification-launch-2026-10-28/publication.json).

Main and master branch-protection reads still return **403, Resource not accessible by integration**; enforcement remains unverified and no protections were changed. Vivid policy PR #1 has no human reviews. These remain dependencies for the [20 November game launch](launch/2026-11-20/README.md). Publishing this dashboard does not approve or release any game; the official registry remains empty.

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

## Verified remote status · 21 October 2026

- Main hub and release process uploaded at [`5f9b45e`](https://github.com/PaperStrange/IndiaGames/commit/5f9b45e22d03d540a23d56809f7313025d2b215d); master staging installed at [`8246c87`](https://github.com/PaperStrange/IndiaGames/commit/8246c87ea8abf89679869ef0e3a9bb71b95039bb). Remote SHAs matched after push.
- GitHub Actions succeeded on [main](https://github.com/PaperStrange/IndiaGames/actions/runs/39548153606) and [master](https://github.com/PaperStrange/IndiaGames/actions/runs/39548224005). Main’s publisher correctly had no versions to create.
- The authorized request to create Pages with `main` / root returned **403: Resource not accessible by integration**. The expected Pages URL returned **404**. The site source is uploaded; the website is **not live**.
- Reading main and master branch-protection settings also returned **403**. Existing settings could not be inspected, so no protection configuration was overwritten. Required gate enforcement is **not verified**. CODEOWNERS and workflow files alone do not enable branch protection.

### Historical administrator checklist · October 21

Pages configuration is now verified above. Branch-protection enforcement and actual promotion review remain outstanding.

1. In [Pages settings](https://github.com/PaperStrange/IndiaGames/settings/pages), select **Deploy from a branch → main → / (root)** and Save. Then verify the deployment’s revision and actual site URL.
2. In [branch settings](https://github.com/PaperStrange/IndiaGames/settings/branches), protect **main** with required PRs, at least one approving human review, code-owner review, dismissed stale approvals, resolved conversations and the required **release-gate** check on the latest changes. Disable force pushes, deletion and bypass of these requirements where available.
3. Protect **master** from force pushes/deletion and require its **release-gate** staging check. Keep draft human evidence permitted there. Restrict official version-tag mutation; allow only the reviewed publication workflow/authorized maintainer to create those tags.
4. Confirm these settings with an actual promotion PR before calling the process enforced. Follow the [release policy](RELEASE-POLICY.md); review workflow/policy changes separately from game promotion.

No additional game release is needed to activate the dashboard. Do not fill the empty registry or invent participant records to make the page appear complete.

## 21 October implementation recheck

After staging Vivid 0.1.1, a fresh `GET /repos/PaperStrange/IndiaGames/pages` still returned HTTP 403, “Resource not accessible by integration.” The dashboard source is maintained on main, but no live Pages deployment is claimed. A repository administrator must enable/configure Pages and verify the resulting URL using the steps above. Candidate source links are GitHub repository views, not public playable URLs.

## Fresh publication check · 27 October 2026

The coordinator queried Pages again: `GET /repos/PaperStrange/IndiaGames/pages` returned **403, Resource not accessible by integration**. The actual expected URL, `https://paperstrange.github.io/IndiaGames/`, returned **404**. No live deployment is verified. Repository source updates and local browser checks do not change that result.

A repository administrator still needs to enable **Deploy from a branch → main → / (root)** in [Pages settings](https://github.com/PaperStrange/IndiaGames/settings/pages), then verify the deployed revision and actual URL. Do not alter repository visibility as a workaround. Main/master protection settings are not newly verified by this Pages request.

Vivid policy [PR #1](https://github.com/PaperStrange/IndiaGames/pull/1) remains open at `4a4f3996fefc198370814c71acb45af3470bd47f`, with no human reviews at this check. Its earlier CI result is separate from current human approval and Pages publication.

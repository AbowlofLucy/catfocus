# 🐾 CatFocus

**CatFocus** is a gamified productivity timer where tasks become floating Morandi-coloured yarn balls around an animated grey cat. Finish your work, feed the cat, and turn focus into a small reward loop.

> Tiny tasks, happy cat.

## ✨ Features

- Animated chibi grey cat with wandering eyes and blinking
- Task “yarn balls” orbiting around the cat
- Create tasks with:
  - task name
  - deadline
  - exact focus duration from 1–16 hours
  - category
  - notes
  - local file metadata
- Filter tasks by duration range, date and status
- Persistent timer that survives page refreshes
- Pause / resume / stop controls
- Browser notification when the focus duration ends
- “主人，我该吃饭啦！” in-app reminder
- Completion reward flow:
  1. click **我弄完了！**
  2. add food three times
  3. cat eats for five seconds
  4. task becomes complete
- Tasks and timer persist in `localStorage`
- Responsive desktop/mobile layout
- No account, backend or database required

## 🖥️ Tech stack

- React
- TypeScript
- Vite
- CSS animations
- Web Notifications API
- Local Storage
- Vitest

## 🚀 Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## ✅ Test and build

```bash
npm test
npm run build
```

The production files will be generated in `dist/`.

## 🌐 Deploy to GitHub Pages

A GitHub Actions workflow is already included at `.github/workflows/deploy.yml`.

1. Push this repository to a GitHub repository whose default branch is `main`.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main` (or run the workflow manually).
4. GitHub will install dependencies, run tests, build the app and publish `dist/`.

The project uses `base: './'` in Vite so static asset paths work cleanly on GitHub Pages. You can also deploy it to Vercel or Netlify.

## 🔔 About notifications

Browsers require the user to explicitly allow notifications. CatFocus asks for permission when a timer is started.

A normal web page **cannot guarantee a custom always-on-top paw window above every desktop application**, especially after the browser is fully closed. The current version therefore uses:

- an in-app paw reminder
- the browser's system notification API

For true always-on-top desktop reminders, see the desktop roadmap below.

## 📎 About attached files

For privacy and simplicity, v1 stores only file metadata (name, size and type). It does **not** upload the file contents. A future version could use IndexedDB for local blobs or cloud storage for authenticated users.

## 🗺️ Roadmap

- [ ] PWA install support
- [ ] IndexedDB file storage
- [ ] Weekly productivity analytics
- [ ] Focus streaks and cat mood system
- [ ] More cat animations / unlockable themes
- [ ] Export/import task data
- [ ] Electron or Tauri desktop version
- [ ] True always-on-top custom paw reminder
- [ ] Optional cloud sync

## 📊 Future Data Science extension

A later analytics module could explore:

- daily and weekly focus duration
- task completion rate
- completion by category
- deadline vs. completion behaviour
- average task completion time
- personal productivity trends

This would turn CatFocus into both a software engineering project and a small personal productivity analytics project.

## 📁 Project structure

```text
catfocus/
├── src/
│   ├── components/
│   │   ├── AddTaskModal.tsx
│   │   ├── CatFace.tsx
│   │   ├── FeedingScene.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── HungryOverlay.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TimerView.tsx
│   │   └── YarnBall.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── types/
│   │   └── task.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── time.ts
│   │   └── time.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── PROJECT_SPEC.md
├── TODO.md
├── LICENSE
├── package.json
└── README.md
```

## 📄 License

MIT

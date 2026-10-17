# Squad Collaboration Guide: haX.baby (Track 2)

Welcome to the **Nebupip** development squad:
- **Dhaya (Lead)**: Core interactive rig, Web Audio API synth, repo architecture.
- **Meena**: Lore, 5-point character sheet modal, story scenes, projects showcase, chaos mode.
- **Akshitha**: Early-web nostalgia, guestbook, visitor memory, hit counter, easter egg, DevOps.

---

## 🌲 Git Branching & Workflow Rules
1. `main` is protected. Nobody pushes directly to `main`.
2. `develop` is the shared working integration branch.
3. Feature branches are strictly named:
   - `feat/m1-<feature-name>` (Dhaya)
   - `feat/m2-<feature-name>` (Meena)
   - `feat/m3-<feature-name>` (Akshitha)
4. Commit prefix format:
   - `feat:` new user-facing functionality
   - `fix:` bug fixes or style patches
   - `style:` layout, colors, or animations
   - `test:` automated unit or smoke tests
   - `docs:` documentation or submission updates
5. Every Pull Request must target `develop` and require 1 review before merging.
6. Code Freeze: **19 October 2026, 17:17 IST**.
   - Dhaya will merge `develop` -> `main` at 14:00 IST and tag `v1.0.0`.

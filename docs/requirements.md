# StudyMate Kids — Product Requirements

**Version:** 0.1
**Status:** Draft
**Updated:** October 26, 2026

## 1. Product Vision

Build a safe, bilingual, offline educational Android application for children ages 4–7, beginning with kindergarten-level learning.

## 2. Core Principles

- No advertisements or external game links.
- Fully functional without internet access.
- Spanish and English interfaces and spoken instructions.
- Age-appropriate, engaging educational content.
- Multiple child profiles with independent progress.
- Local storage of learning data.

## 3. Onboarding and Profiles

- Splash screen displayed on launch.
- First-run onboarding for grown-up profile setup.
- Collect grown-up name and age (age requirement subject to privacy review).
- Add multiple children under one grown-up profile.
- Collect child name and age.
- Select an avatar for each child.
- Returning users bypass onboarding.

## 4. Learning Categories

- Numbers & Counting
- Letters & Sounds
- Colors & Shapes
- Animals & Discovery

## 5. Gamified Learning Journey

- Numbered learning path within each category.
- Avatar progresses between learning activities.
- Award 1–3 stars based on performance.
- Proposed rewards: 3 stars = 10 coins; 2 stars = 7 coins; 1 star = 1 coin.
- Allow retries and positive feedback.
- Support adding future levels without restructuring existing progress.

## 6. Bilingual Audio

- Spanish and English language selection.
- Spoken instructions, questions, and feedback.
- Audio works offline.

## 7. Parent Dashboard

- View each child's learning progress.
- Review completed activities and earned rewards.
- Future: scheduled learning sessions, effective engagement tracking, and parent notifications.

## 8. Future Learning Features

- Finger tracing (trazos).
- Grade-specific competencies for Pre-K, Kindergarten, and Grade 1.
- Expanded mascot interactions and rewards.

## 9. Safety and Privacy

- No ads, external game redirects, or in-app purchases.
- Parent-only controls protected by a parent gate.
- Minimize personal data collection.
- Store child profiles locally in the initial release.
- Never commit real children's information to the public repository.

## 10. MVP Acceptance Criteria

- APK installs and launches on a compatible Android tablet.
- Onboarding completes and persists after restarting.
- Multiple child profiles work independently.
- Four learning categories are accessible.
- At least one playable learning journey exists.
- Progress and rewards persist locally.
- Spanish and English audio work offline.
- Child experience has no ads or external links.

## 11. Technology (Planned)

- React Native + Expo
- TypeScript
- SQLite
- Git and GitHub
- Android APK via EAS Build

## 12. Open Product Decisions

- Final mascot and avatar designs.
- Exact scoring and star thresholds.
- Initial number of activities per category.
- Parent access protection method.
- Curriculum and grade-level competency standards.
- How to measure meaningful learning engagement.
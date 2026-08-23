# Sol orchestrator configuration

This project-scoped Codex configuration uses:

- GPT-5.6 Sol (High) as the primary orchestrator and final owner.
- GPT-5.6 Luna (Medium, Standard speed) for narrow, repeatable, read-heavy work.
- GPT-5.6 Terra (Medium, Standard speed) for bounded implementation work.
- Up to three concurrent subagent threads.

## Install

Copy the included `.codex` directory into the root of a repository, then open
that repository as a trusted project in the ChatGPT desktop app, Codex CLI, or
Codex IDE extension. Start a new Codex thread so the project configuration is
loaded.

Existing repository instructions in `AGENTS.md` remain separate and continue
to apply. Review this configuration before combining it with an existing
`.codex/config.toml` or `.codex/agents` directory.

## Usage

You can ask normally. The primary agent is instructed to delegate only when it
is worthwhile. To explicitly request delegation, use a prompt such as:

> Solを司令塔として、独立して分割できる調査はluna_worker、明確に切り出せる実装はterra_implementerへ委譲してください。最大3スレッドで、結果を検証してから統合してください。

For a small or tightly coupled task, the primary Sol thread should work alone.

## Cost and speed

Luna and Terra use Standard speed in this template. This prioritizes cost over
latency. To enable Fast mode for one custom agent, add the following top-level
setting to that agent's TOML file:

```toml
service_tier = "fast"
```

Fast mode consumes credits faster, so it is intentionally disabled here.


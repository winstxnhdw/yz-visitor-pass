# yz-visitor-pass

[![main.yml](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/main.yml)
[![generate.yml](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/generate.yml/badge.svg)](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/generate.yml)
[![formatter.yml](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/formatter.yml)
[![dependabot.yml](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/dependabot.yml/badge.svg)](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/dependabot.yml)
[![CodeQL](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/winstxnhdw/yz-visitor-pass/actions/workflows/github-code-scanning/codeql)

<p align="center">
    <b><a href="https://github.com/winstxnhdw/yz-visitor-pass/tree/ea05a553aaeef3002ea9b0f4b8cfe4e6d1e11bb8#yz-visitor-pass">Go to previous QR Code</a></b>
</p>

<div align="center">
    <img src="resources/qr_code.svg" width="250" height="250" />
</div>

## Installation

```bash
yarn
```

## Usage

```bash
yarn start
```

## Pipeline Architecture

The `Deploy` and `Generate QR Code` Actions are separated to eliminate the redundant step of re-installing/caching dependencies. This separation effectively reduces the time required to generate a Quick Response code. The pipeline architecture can be illustrated with the following.

```mermaid
flowchart TD
    Developer(Developer)
    GitHub(GitHub)
    QR[resources/qr_code.svg]
    README[README.md]

    subgraph Pipeline
        Deploy(Deploy)
        Generate(Generate QR Code)
        Release[(Release)]
    end

    Developer  --> |Commit| GitHub
    GitHub --> |Trigger| Deploy

    Deploy --> |Build| Release
    Release -. Pull Minified<br>JavaScript .-> Generate

    Generate <-. Daily Job fa:fa-spinner .-> Generate
    Generate --> |Update Image| QR
    Generate --> |Update URL| README
```

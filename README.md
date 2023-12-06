# 스마트폰 스펙 확인 및 360도 이미지

기간: 2023.11 ~ 2023.12

## 목표

1. 상태관리를 이용한 필터
2. 이미지 360도 적용
3. PWA 적용

## 필터 및 360도 이미지 프로젝트

상태관리를 이용한 필터 적용과 360도 돌릴 수 있는 이미지를 만들어 보기위한 프로젝트


## Zustand Slicing Store 하기

점점 저장해야하는 공간이 많아지면서 한 공간(Store)에 넣기에는 힘들어 졌기에 나누는 방법을 찾아 보았습니다.

## tailwindcss 오류 발생

이 경고는 Tailwind CSS가 소스 파일에서 유틸리티 클래스를 찾지 못했다는 것을 의미합니다.

```bash
warn - No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.
warn - https://tailwindcss.com/docs/content-configuration
```

### 원인

해당 에러는 `tailwind.config.{js, ts}`에서 **content** 구문을 인식하지 못해서 나오는 에러라고 하여 참조한 주소에서 해결방법을 찾아서 적용해 보았습니다.

- `tailwind.config.ts`를 `tailwind.config.js`로 변경 
  - 똑같은 경고창 발생
- **content** 구문에 `{js,ts}` 괄호를 적용하지말고 개별 `.js`, `.ts`를 적용하기
  - 똑같은 경고창 발생

### 해결

하지만 동일한 경고창이 계속 발생하여 생각보는 중 문구 중 아래가 보여서 소스파일을 확인해보니

```bash
`No utility classes were detected in your source files.`
```

아직 코드상에서 `tailwind`를 사용하지 않았는 것을 확인하고 `div` 태그에 기본적으로 `className`에 `tailwind` 구문을 작성해보고 실행을 해보니 경고가 사라졌습니다.

> 찾아본 사이트: [경고문 stackoverflow 문제](https://stackoverflow.com/questions/71070781/tailwind-css-classes-is-not-working-in-my-project)

## Github Action

Gtihub Action은 워크플로우 파일 YAML 구문을 사용하며 확장자는 `.yml, .yaml` 이어야 합니다.

## Github Action 워크플로우 구문

[공식문서 사이트](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions)

### `name`

workflow 이름입니다.

repository의  Action 탭에서 이름으로 표시되면 name을 생략하는 경우 repository의 root를 기준으로 표시합니다.

```yaml
name: CI/CD
```

### `run-name`

Action 탭에 있는 workflow 실행 목록에 workflow  실행 이름을 표시합니다.

생략 시 이벤트 별 정보로 설정됩니다.

```yaml
run-name: Build and Deploy
```

### `on`

 workflow를 실행할 수 있는 이벤트를 정의합니다.

특정 파일, 태그 또는 브랜치 변경에 대해서만 workflow가 실행되도록 제한할 수 있습니다.

```yaml
# 한개의 이벤트 사용
on: push 
```

```yaml
# 여러개의 이벤트 사용
on: [push, fork]
```

```yaml
# 필터 사용 일치한 분기에 푸시가 발생했을때 적용됩니다.
on:
  push:
    branches:
      - main
      - 'releases/**'
```

다른 경우 **[Using activity types](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions#using-activity-types), [Using activity types and filters with multiple events](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions#using-activity-types-and-filters-with-multiple-events)** 가 존재합니다.

### **`permissions`**

`GITHUB_TOKEN` 에 부여된 기본 권한을 수정할 수 있습니다.

자세한 상황은 [해당 사이트](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions#permissions)를 확인해주세요.

```yaml
permissions:
  actions: read|write|none
  checks: read|write|none
  contents: read|write|none
  deployments: read|write|none
  id-token: read|write|none
  issues: read|write|none
  discussions: read|write|none
  packages: read|write|none
  pages: read|write|none
  pull-requests: read|write|none
  repository-projects: read|write|none
  security-events: read|write|none
  statuses: read|write|none
```

### `jobs`

workflow를 구성하는 주요 단위입니다.

workflow는 하나 이상의 `jobs`로 구성되며, 각 `job`은 workflow가 수행할 작업들을 나타냅니다
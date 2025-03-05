async function createDeepDiveTemplate(tp) {
  // 사용자에게 챕터 번호 입력 받기
  const chapter = await tp.system.prompt("챕터 번호를 입력하세요", "");

  // 사용자에게 제목 입력 받기
  const title = await tp.system.prompt("챕터 제목을 입력하세요", "");
  const safeTitle = title.replace(/"/g, '\\"'); // 따옴표 이스케이프 처리

  // frontmatter 생성
  let frontmatter = `

---
tags: [book, deepdive, javascript]
chapter: "${chapter}"
title: "${safeTitle}"
created: ${tp.file.creation_date("YYYY-MM-DD")}
modified: ${tp.file.last_modified_date("YYYY-MM-DD")}
book: "모던 자바스크립트 Deep Dive"
author: "이웅모"
imageNameKey: "book_deepdive"
---

`;

  // 본문 생성
  let content = `
# ${chapter}장. ${safeTitle}

## 핵심 개념 요약
- 
- 
- 


### ${chapter}.1 



## 추가 학습 자료
- 
- 
- 

## 개인 메모 및 질문
`;

  // 전체 템플릿 반환
  return frontmatter + content;
}

module.exports = createDeepDiveTemplate;

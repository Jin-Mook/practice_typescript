// 아래 코드는 typescript에서 사용 가능한 코드이다. => 네임스페이스를 사용하기 위한 코드
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />


namespace App {
  new ProjectInput()
  new ProjectList('active')
  new ProjectList('finished')
}



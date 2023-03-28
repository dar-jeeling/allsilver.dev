// ref: https://github.com/toss/slash/blob/main/packages/react/react/src/components/SwitchCase/SwitchCase.tsx
// https://slash.page/ko/libraries/react/react/src/components/switchcase/switchcase.tsx.tossdocs/#switchcase

export const SwitchCase = ({ value, caseBy, defaultComponent = null }) => {
  if (value == null) {
    return defaultComponent
  }

  return caseBy[value] ?? defaultComponent
}

// This module shouldn't contain anything, and by "anything" I mean any other
// functions, variables, classes and other declarations, apart from a "eval"
// wrapper.  It is called a "sandbox" for a reason.

export function sandboxedEval(code: string) {
  return eval(code);
}
